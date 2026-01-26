/**
 * BiUD Contract Migration Script
 * 
 * This script helps migrate data from a compromised contract to a new contract.
 * 
 * Usage:
 *   1. Set environment variables in .env
 *   2. Run: bun scripts/migrate.ts <command>
 * 
 * Commands:
 *   export-names    - Export all registered names from old contract
 *   verify-export   - Verify exported data integrity
 *   import-names    - Import names to new contract (requires new deployer mnemonic)
 *   check-status    - Check migration status
 */

import { 
  makeContractCall, 
  broadcastTransaction,
  AnchorMode,
  PostConditionMode,
  uintCV,
  stringUtf8CV,
  principalCV,
  cvToJSON,
  hexToCV,
  serializeCV
} from '@stacks/transactions';
import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';
import { generateWallet, getStxAddress } from '@stacks/wallet-sdk';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

// ============================================
// Configuration
// ============================================

interface Config {
  network: 'mainnet' | 'testnet';
  oldContractAddress: string;
  oldContractName: string;
  newContractAddress: string;
  newContractName: string;
  newDeployerMnemonic: string;
  apiUrl: string;
  exportFile: string;
}

interface NameRecord {
  nameId: number;
  label: string;
  fullName: string;
  owner: string;
  resolver: string | null;
  expiryHeight: number;
  isPremium: boolean;
  createdAt: number;
  lastRenewed: number;
  primaryName?: boolean;
}

interface MigrationState {
  exportedAt: string;
  totalNames: number;
  names: NameRecord[];
  migrated: string[];
  failed: string[];
}

function getConfig(): Config {
  const network = (process.env.STACKS_NETWORK || 'mainnet') as 'mainnet' | 'testnet';
  
  return {
    network,
    oldContractAddress: process.env.OLD_CONTRACT_ADDRESS || 'SP31G2FZ5JN87BATZMP4ZRYE5F7WZQDNEXJ7G7X97',
    oldContractName: process.env.OLD_CONTRACT_NAME || 'biud-username-v3',
    newContractAddress: process.env.NEW_CONTRACT_ADDRESS || '',
    newContractName: process.env.NEW_CONTRACT_NAME || 'biud-username-v5',
    newDeployerMnemonic: process.env.NEW_DEPLOYER_MNEMONIC || '',
    apiUrl: network === 'mainnet' 
      ? 'https://api.mainnet.hiro.so' 
      : 'https://api.testnet.hiro.so',
    exportFile: path.join(import.meta.dir, '../migration-data.json'),
  };
}

function getNetwork(config: Config) {
  return config.network;
}

/**
 * Derive private key from mnemonic
 */
async function getPrivateKeyFromMnemonic(mnemonic: string, network: 'mainnet' | 'testnet'): Promise<string> {
  const wallet = await generateWallet({
    secretKey: mnemonic,
    password: '',
  });
  
  const account = wallet.accounts[0];
  
  const address = getStxAddress({
    account,
    transactionVersion: network === 'mainnet' ? 22 : 26,
  });
  
  console.log(`   Derived address: ${address}`);
  
  return account.stxPrivateKey;
}

// ============================================
// HTTP-based Contract Calls
// ============================================

async function callReadOnly(
  config: Config, 
  functionName: string, 
  args: any[] = []
): Promise<any> {
  const url = `${config.apiUrl}/v2/contracts/call-read/${config.oldContractAddress}/${config.oldContractName}/${functionName}`;
  
  // Serialize arguments using stacks.js
  const serializedArgs = args.map(arg => '0x' + Buffer.from(serializeCV(arg)).toString('hex'));
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender: config.oldContractAddress,
      arguments: serializedArgs,
    }),
  });
  
  const data = await response.json() as { okay: boolean; result?: string; cause?: string };
  
  if (!data.okay) {
    throw new Error(`Contract call failed: ${data.cause || 'Unknown error'}`);
  }
  
  // Parse the Clarity value from hex
  const cv = hexToCV(data.result!);
  return cvToJSON(cv);
}

async function getTotalNames(config: Config): Promise<number> {
  const result = await callReadOnly(config, 'get-total-names');
  return Number(result.value);
}

async function getLabelById(config: Config, nameId: number): Promise<string | null> {
  const result = await callReadOnly(config, 'get-label-by-id', [uintCV(nameId)]);
  
  // Handle optional wrapper: result.value?.value?.value
  if (result.value === null) return null;
  return result.value?.value?.value || result.value?.value || null;
}

async function getNameRecord(config: Config, label: string): Promise<NameRecord | null> {
  const result = await callReadOnly(config, 'get-name', [stringUtf8CV(label)]);
  
  // Result is (optional (tuple ...))
  // So we need result.value.value to get the tuple
  if (result.value === null) return null;
  
  // The inner value contains the actual record
  const record = result.value.value;
  if (!record) return null;
  
  return {
    nameId: Number(record['name-id']?.value || 0),
    label: record.label?.value || label,
    fullName: record['full-name']?.value || '',
    owner: record.owner?.value || '',
    resolver: record.resolver?.value || null,
    expiryHeight: Number(record['expiry-height']?.value || 0),
    isPremium: record['is-premium']?.value || false,
    createdAt: Number(record['created-at']?.value || 0),
    lastRenewed: Number(record['last-renewed']?.value || 0),
  };
}

// ============================================
// Export Names
// ============================================

async function exportNames(config: Config): Promise<void> {
  console.log('🔍 Starting name export from old contract...\n');
  console.log(`   Old Contract: ${config.oldContractAddress}.${config.oldContractName}`);
  console.log(`   Network: ${config.network}\n`);
  
  const totalNames = await getTotalNames(config);
  console.log(`📊 Total names registered: ${totalNames}\n`);
  
  if (totalNames === 0) {
    console.log('⚠️  No names to export.');
    return;
  }
  
  const names: NameRecord[] = [];
  const owners = new Set<string>();
  const errors: string[] = [];
  
  console.log('📥 Fetching name records...\n');
  
  for (let id = 1; id <= totalNames; id++) {
    process.stdout.write(`\r   Progress: ${id}/${totalNames} (${Math.round(id/totalNames*100)}%)`);
    
    try {
      const label = await getLabelById(config, id);
      if (!label) {
        errors.push(`Name ID ${id}: Could not find label`);
        continue;
      }
      
      const record = await getNameRecord(config, label);
      if (!record) {
        errors.push(`Name ID ${id}: Could not find record for label "${label}"`);
        continue;
      }
      
      names.push(record);
      if (record.owner) {
        owners.add(record.owner);
      }
      
      // Rate limiting
      await sleep(200);
      
    } catch (error) {
      errors.push(`Name ID ${id}: ${(error as Error).message}`);
    }
  }
  
  const migrationState: MigrationState = {
    exportedAt: new Date().toISOString(),
    totalNames: names.length,
    names,
    migrated: [],
    failed: [],
  };
  
  fs.writeFileSync(config.exportFile, JSON.stringify(migrationState, null, 2));
  
  console.log('\n\n✅ Export complete!\n');
  console.log(`   Total names exported: ${names.length}`);
  console.log(`   Unique owners: ${owners.size}`);
  console.log(`   Errors: ${errors.length}`);
  console.log(`   Export file: ${config.exportFile}\n`);
  
  if (errors.length > 0) {
    console.log('⚠️  Errors encountered:');
    errors.slice(0, 10).forEach(e => console.log(`   - ${e}`));
    if (errors.length > 10) {
      console.log(`   ... and ${errors.length - 10} more`);
    }
  }
  
  // Display the exported names
  console.log('\n📋 Exported Names:');
  names.forEach(n => {
    console.log(`   - ${n.fullName}`);
    console.log(`     Owner: ${n.owner}`);
    console.log(`     Expiry: Block ${n.expiryHeight}`);
    console.log(`     Premium: ${n.isPremium}`);
    console.log('');
  });
}

// ============================================
// Verify Export
// ============================================

async function verifyExport(config: Config): Promise<void> {
  console.log('🔍 Verifying exported data...\n');
  
  if (!fs.existsSync(config.exportFile)) {
    console.error('❌ Export file not found. Run "export-names" first.');
    process.exit(1);
  }
  
  const data: MigrationState = JSON.parse(fs.readFileSync(config.exportFile, 'utf-8'));
  
  console.log(`   Export date: ${data.exportedAt}`);
  console.log(`   Total names: ${data.totalNames}`);
  console.log(`   Already migrated: ${data.migrated.length}`);
  console.log(`   Failed migrations: ${data.failed.length}\n`);
  
  const sampleSize = Math.min(5, data.names.length);
  console.log(`🧪 Verifying ${sampleSize} samples against blockchain...\n`);
  
  let verified = 0;
  
  for (const name of data.names.slice(0, sampleSize)) {
    const onChain = await getNameRecord(config, name.label);
    if (onChain && onChain.owner === name.owner) {
      console.log(`   ✅ ${name.label}.sBTC - Owner matches`);
      verified++;
    } else {
      console.log(`   ❌ ${name.label}.sBTC - Mismatch or not found`);
    }
    await sleep(200);
  }
  
  console.log(`\n   Verified: ${verified}/${sampleSize}\n`);
  
  const blockHeight = await getCurrentBlockHeight(config);
  const expired = data.names.filter(n => n.expiryHeight < blockHeight);
  const active = data.names.filter(n => n.expiryHeight >= blockHeight);
  const premium = data.names.filter(n => n.isPremium);
  
  console.log('📊 Summary:');
  console.log(`   Current block: ~${blockHeight}`);
  console.log(`   Active names: ${active.length}`);
  console.log(`   Expired names: ${expired.length}`);
  console.log(`   Premium names: ${premium.length}\n`);
}

// ============================================
// Import Names
// ============================================

async function importNames(config: Config): Promise<void> {
  console.log('📤 Starting import to new contract...\n');
  
  if (!config.newContractAddress || !config.newDeployerMnemonic) {
    console.error('❌ NEW_CONTRACT_ADDRESS and NEW_DEPLOYER_MNEMONIC must be set in .env');
    process.exit(1);
  }
  
  if (!fs.existsSync(config.exportFile)) {
    console.error('❌ Export file not found. Run "export-names" first.');
    process.exit(1);
  }
  
  console.log('🔑 Deriving private key from mnemonic...');
  const privateKey = await getPrivateKeyFromMnemonic(config.newDeployerMnemonic, config.network);
  
  const data: MigrationState = JSON.parse(fs.readFileSync(config.exportFile, 'utf-8'));
  
  console.log(`\n   New Contract: ${config.newContractAddress}.${config.newContractName}`);
  console.log(`   Total to migrate: ${data.names.length - data.migrated.length}\n`);
  
  console.log('⚠️  IMPORTANT: The new contract must be deployed first with admin-import-name function!');
  console.log('   See biud-username-v5.clar for the required implementation.\n');
  
  const network = getNetwork(config);
  let successCount = 0;
  let failCount = 0;
  
  for (const name of data.names) {
    if (data.migrated.includes(name.label)) {
      continue;
    }
    
    console.log(`\n📝 Migrating: ${name.fullName}`);
    console.log(`   Owner: ${name.owner}`);
    console.log(`   Expiry: Block ${name.expiryHeight}`);
    
    try {
      const tx = await makeContractCall({
        contractAddress: config.newContractAddress,
        contractName: config.newContractName,
        functionName: 'admin-import-name',
        functionArgs: [
          stringUtf8CV(name.label),
          principalCV(name.owner),
          uintCV(name.expiryHeight),
          uintCV(name.isPremium ? 1 : 0),
          uintCV(name.createdAt),
        ],
        senderKey: privateKey,
        network,
        anchorMode: AnchorMode.Any,
        postConditionMode: PostConditionMode.Allow,
        fee: 10000n,
      });
      
      const result = await broadcastTransaction(tx, network);
      
      if ('error' in result) {
        throw new Error(result.error);
      }
      
      console.log(`   ✅ Submitted: ${result.txid}`);
      data.migrated.push(name.label);
      successCount++;
      
      fs.writeFileSync(config.exportFile, JSON.stringify(data, null, 2));
      await sleep(5000);
      
    } catch (error) {
      console.log(`   ❌ Failed: ${(error as Error).message}`);
      data.failed.push(name.label);
      failCount++;
      fs.writeFileSync(config.exportFile, JSON.stringify(data, null, 2));
    }
  }
  
  console.log('\n\n📊 Migration Summary:');
  console.log(`   Successful: ${successCount}`);
  console.log(`   Failed: ${failCount}`);
  console.log(`   Remaining: ${data.names.length - data.migrated.length - failCount}`);
}

// ============================================
// Disable Migration Mode
// ============================================

async function disableMigration(config: Config): Promise<void> {
  console.log('🔒 Disabling migration mode...\n');
  
  const mnemonic = process.env.NEW_DEPLOYER_MNEMONIC;
  if (!mnemonic) {
    console.error('❌ NEW_DEPLOYER_MNEMONIC not set in .env');
    return;
  }
  
  console.log('🔑 Deriving private key from mnemonic...');
  const privateKey = await getPrivateKeyFromMnemonic(mnemonic, config.network);
  
  const network = getNetwork(config);
  
  // Get nonce
  const nonceResponse = await fetch(
    `https://api.${config.network}.hiro.so/extended/v1/address/${config.newContractAddress}/nonces`
  );
  const nonceData = await nonceResponse.json() as { possible_next_nonce: number };
  const nonce = BigInt(nonceData.possible_next_nonce);
  
  try {
    const tx = await makeContractCall({
      contractAddress: config.newContractAddress,
      contractName: config.newContractName,
      functionName: 'disable-migration',
      functionArgs: [],
      senderKey: privateKey,
      network,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
      fee: 10000n,
      nonce,
    });
    
    const result = await broadcastTransaction(tx, network);
    
    if ('error' in result) {
      throw new Error(result.error);
    }
    
    console.log('\n✅ Migration mode disabled!');
    console.log(`   Transaction: ${result.txid}`);
    console.log(`\n   View on explorer:`);
    console.log(`   https://explorer.hiro.so/txid/${result.txid}?chain=${config.network}`);
    console.log('\n⚠️  This is permanent. No more names can be imported via admin-import-name.\n');
    
  } catch (error) {
    console.error(`❌ Failed: ${(error as Error).message}`);
  }
}

// ============================================
// Check Status
// ============================================

async function checkStatus(config: Config): Promise<void> {
  console.log('📊 Migration Status\n');
  
  if (!fs.existsSync(config.exportFile)) {
    console.log('   No migration in progress. Run "export-names" to start.\n');
    return;
  }
  
  const data: MigrationState = JSON.parse(fs.readFileSync(config.exportFile, 'utf-8'));
  
  const percent = data.totalNames > 0 ? Math.round(data.migrated.length/data.totalNames*100) : 0;
  
  console.log(`   Export date: ${data.exportedAt}`);
  console.log(`   Total names: ${data.totalNames}`);
  console.log(`   Migrated: ${data.migrated.length} (${percent}%)`);
  console.log(`   Failed: ${data.failed.length}`);
  console.log(`   Remaining: ${data.totalNames - data.migrated.length - data.failed.length}\n`);
  
  if (data.failed.length > 0) {
    console.log('❌ Failed migrations:');
    data.failed.slice(0, 20).forEach(label => console.log(`   - ${label}`));
    if (data.failed.length > 20) {
      console.log(`   ... and ${data.failed.length - 20} more`);
    }
  }
}

// ============================================
// Utilities
// ============================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getCurrentBlockHeight(config: Config): Promise<number> {
  try {
    const response = await fetch(`${config.apiUrl}/v2/info`);
    const data = await response.json() as { stacks_tip_height: number };
    return data.stacks_tip_height;
  } catch {
    // Fallback estimate
    const startDate = new Date('2021-01-14T00:00:00Z');
    const now = new Date();
    const diffMs = now.getTime() - startDate.getTime();
    return Math.floor(diffMs / (10 * 60 * 1000));
  }
}

// ============================================
// Main
// ============================================

async function main() {
  const command = process.argv[2];
  const config = getConfig();
  
  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║      BiUD Contract Migration Tool v1.0         ║');
  console.log('╚════════════════════════════════════════════════╝\n');
  
  switch (command) {
    case 'export-names':
      await exportNames(config);
      break;
    case 'verify-export':
      await verifyExport(config);
      break;
    case 'import-names':
      await importNames(config);
      break;
    case 'check-status':
      await checkStatus(config);
      break;
    case 'disable-migration':
      await disableMigration(config);
      break;
    default:
      console.log('Usage: bun scripts/migrate.ts <command>\n');
      console.log('Commands:');
      console.log('  export-names       - Export all names from old contract');
      console.log('  verify-export      - Verify exported data integrity');
      console.log('  import-names       - Import names to new contract');
      console.log('  check-status       - Check migration progress');
      console.log('  disable-migration  - Permanently disable migration mode\n');
      console.log('Environment variables (set in .env):');
      console.log('  STACKS_NETWORK           - mainnet or testnet (default: mainnet)');
      console.log('  OLD_CONTRACT_ADDRESS     - Address of compromised contract');
      console.log('  OLD_CONTRACT_NAME        - Name of compromised contract');
      console.log('  NEW_CONTRACT_ADDRESS     - Address of new contract');
      console.log('  NEW_CONTRACT_NAME        - Name of new contract');
      console.log('  NEW_DEPLOYER_MNEMONIC    - Mnemonic phrase of new deployer (12 or 24 words)\n');
      break;
  }
}

main().catch(console.error);
