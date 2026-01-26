/**
 * Mass Mint Script
 * 
 * Each of the 50 test wallets registers a random 12-letter name.
 */

import { 
  makeContractCall, 
  broadcastTransaction,
  AnchorMode,
  PostConditionMode,
  stringUtf8CV,
  getNonce,
} from '@stacks/transactions';
import { generateWallet, getStxAddress } from '@stacks/wallet-sdk';
import * as fs from 'fs';
import 'dotenv/config';

interface TestWallet {
  index: number;
  address: string;
  mnemonic: string;
}

interface MintResult {
  index: number;
  address: string;
  name: string;
  txid?: string;
  error?: string;
}

const CONTRACT_ADDRESS = 'SP2KYZRNME33Y39GP3RKC90DQJ45EF1N0NZNVRE09';
const CONTRACT_NAME = 'biud-username-v5';
const TX_FEE = 50000n; // 0.05 STX

// Generate a random 12-letter lowercase name
function generateRandomName(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let name = '';
  for (let i = 0; i < 12; i++) {
    name += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return name;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function massMint() {
  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║     Mass Name Minting Script v1.0              ║');
  console.log('╚════════════════════════════════════════════════╝\n');

  // Load test wallets
  const walletsFile = 'test-wallets.json';
  if (!fs.existsSync(walletsFile)) {
    console.error('❌ test-wallets.json not found');
    console.error('   Run: bun scripts/generate-wallets.ts first');
    process.exit(1);
  }

  const wallets: TestWallet[] = JSON.parse(fs.readFileSync(walletsFile, 'utf-8'));

  console.log(`📋 Loaded ${wallets.length} wallets`);
  console.log(`📝 Contract: ${CONTRACT_ADDRESS}.${CONTRACT_NAME}`);
  console.log(`🔤 Name length: 12 letters (random)\n`);

  // Generate unique names for each wallet
  const usedNames = new Set<string>();
  const walletNames: Map<number, string> = new Map();

  for (const wallet of wallets) {
    let name: string;
    do {
      name = generateRandomName();
    } while (usedNames.has(name));
    usedNames.add(name);
    walletNames.set(wallet.index, name);
  }

  console.log('🎲 Generated unique 12-letter names for all wallets\n');
  console.log('📤 Starting mass registration...\n');

  let successCount = 0;
  let failCount = 0;
  const results: MintResult[] = [];

  for (const wallet of wallets) {
    const name = walletNames.get(wallet.index)!;
    process.stdout.write(`   [${wallet.index.toString().padStart(2, '0')}/50] ${name}.sBTC `);

    try {
      // Derive wallet
      const walletObj = await generateWallet({
        secretKey: wallet.mnemonic,
        password: '',
      });
      const account = walletObj.accounts[0];
      const privateKey = account.stxPrivateKey;

      // Get nonce
      const nonce = await getNonce(wallet.address, 'mainnet');

      // Create registration transaction
      const tx = await makeContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'register-name',
        functionArgs: [stringUtf8CV(name)],
        senderKey: privateKey,
        network: 'mainnet',
        anchorMode: AnchorMode.Any,
        postConditionMode: PostConditionMode.Allow,
        fee: TX_FEE,
        nonce: nonce,
      });

      const result = await broadcastTransaction(tx, 'mainnet');

      if ('error' in result) {
        throw new Error(result.error);
      }

      console.log(`✅ ${result.txid.slice(0, 16)}...`);
      results.push({ 
        index: wallet.index, 
        address: wallet.address, 
        name: name + '.sBTC',
        txid: result.txid 
      });
      successCount++;

      // Small delay to avoid rate limiting
      await sleep(200);

    } catch (error) {
      console.log(`❌ ${(error as Error).message}`);
      results.push({ 
        index: wallet.index, 
        address: wallet.address, 
        name: name + '.sBTC',
        error: (error as Error).message 
      });
      failCount++;
    }
  }

  // Save results
  fs.writeFileSync('mint-results.json', JSON.stringify(results, null, 2));

  console.log('\n' + '═'.repeat(60));
  console.log('\n📊 Mass Mint Summary:');
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log('\n📁 Results saved to: mint-results.json');
  
  if (successCount > 0) {
    console.log('\n🎉 Names registered:');
    results.filter(r => r.txid).slice(0, 10).forEach(r => {
      console.log(`   • ${r.name} -> ${r.address.slice(0, 20)}...`);
    });
    if (successCount > 10) {
      console.log(`   ... and ${successCount - 10} more`);
    }
  }
  
  console.log('\n⏳ Wait for transactions to confirm to verify registrations.\n');
}

massMint().catch(console.error);
