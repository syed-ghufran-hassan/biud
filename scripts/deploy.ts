/**
 * BiUD Contract Deployment Script
 * 
 * Deploys the v5 contract to mainnet using the mnemonic from .env
 */

import { 
  makeContractDeploy, 
  broadcastTransaction,
  AnchorMode,
  PostConditionMode,
  TxBroadcastResult,
  getNonce,
} from '@stacks/transactions';
import { generateWallet, getStxAddress } from '@stacks/wallet-sdk';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

async function deploy() {
  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║      BiUD Contract Deployment Tool v1.0        ║');
  console.log('╚════════════════════════════════════════════════╝\n');

  const mnemonic = process.env.NEW_DEPLOYER_MNEMONIC;
  if (!mnemonic) {
    console.error('❌ NEW_DEPLOYER_MNEMONIC not set in .env');
    process.exit(1);
  }

  console.log('🔑 Deriving wallet from mnemonic...');
  
  const wallet = await generateWallet({
    secretKey: mnemonic,
    password: '',
  });
  
  const account = wallet.accounts[0];
  const privateKey = account.stxPrivateKey;
  
  const address = getStxAddress({
    account,
    transactionVersion: 22, // Mainnet
  });
  
  console.log('   Address: ' + address);
  
  // Verify it matches expected
  const expectedAddress = process.env.NEW_CONTRACT_ADDRESS || 'SP2KYZRNME33Y39GP3RKC90DQJ45EF1N0NZNVRE09';
  if (address !== expectedAddress) {
    console.error('\n❌ Address mismatch!');
    console.error('   Expected: ' + expectedAddress);
    console.error('   Got: ' + address);
    console.error('\n   Please verify your mnemonic is correct.');
    process.exit(1);
  }
  
  console.log('   ✅ Address matches expected deployer\n');

  // Check balance
  console.log('💰 Checking account balance...');
  const balanceResponse = await fetch('https://api.mainnet.hiro.so/extended/v1/address/' + address + '/balances');
  const balanceData = await balanceResponse.json() as { stx: { balance: string } };
  const balanceSTX = Number(balanceData.stx.balance) / 1_000_000;
  console.log('   Balance: ' + balanceSTX.toFixed(6) + ' STX\n');
  
  if (balanceSTX < 1) {
    console.error('❌ Insufficient balance! Need at least 1 STX for deployment.');
    console.error('   Please fund ' + address + ' with STX first.');
    process.exit(1);
  }

  // Read contract source
  const contractPath = path.join(import.meta.dir, '../contracts/biud-username-v5.clar');
  console.log('📄 Reading contract from: ' + contractPath);
  
  if (!fs.existsSync(contractPath)) {
    console.error('❌ Contract file not found!');
    process.exit(1);
  }
  
  const contractSource = fs.readFileSync(contractPath, 'utf-8');
  const contractName = 'biud-username-v5';
  
  console.log('   Contract name: ' + contractName);
  console.log('   Contract size: ' + contractSource.length + ' bytes\n');

  // Check if contract already exists
  console.log('🔍 Checking if contract already exists...');
  const contractCheckResponse = await fetch(
    'https://api.mainnet.hiro.so/v2/contracts/interface/' + address + '/' + contractName
  );
  
  if (contractCheckResponse.ok) {
    console.error('❌ Contract ' + address + '.' + contractName + ' already exists!');
    console.error('   You cannot redeploy an existing contract.');
    process.exit(1);
  }
  console.log('   ✅ Contract does not exist yet\n');

  // Get current nonce
  console.log('🔢 Fetching account nonce...');
  const nonce = await getNonce(address, 'mainnet');
  console.log('   Nonce: ' + nonce + '\n');

  // Create deployment transaction
  console.log('📝 Creating deployment transaction...');
  
  const tx = await makeContractDeploy({
    contractName,
    codeBody: contractSource,
    senderKey: privateKey,
    network: 'mainnet',
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
    fee: 500000n, // 0.5 STX fee for large contract
    nonce: nonce,
  });
  
  console.log('   ✅ Transaction created\n');

  // Broadcast
  console.log('📡 Broadcasting to mainnet...');
  
  const result: TxBroadcastResult = await broadcastTransaction(tx, 'mainnet');
  
  if ('error' in result) {
    console.error('❌ Broadcast failed: ' + result.error);
    if ('reason' in result) {
      console.error('   Reason: ' + result.reason);
    }
    process.exit(1);
  }
  
  console.log('\n✅ Contract deployment submitted!\n');
  console.log('   Transaction ID: ' + result.txid);
  console.log('   Contract: ' + address + '.' + contractName);
  console.log('\n   View on explorer:');
  console.log('   https://explorer.hiro.so/txid/' + result.txid + '?chain=mainnet');
  console.log('\n⏳ Wait for transaction to confirm (10-30 minutes)');
  console.log('   Then run: bun scripts/migrate.ts import-names\n');
}

deploy().catch(err => {
  console.error('❌ Deployment failed:', err.message);
  process.exit(1);
});
