/**
 * Top-up Test Wallets Script
 * 
 * Sends additional STX to all existing test wallets.
 */

import { 
  makeSTXTokenTransfer, 
  broadcastTransaction,
  AnchorMode,
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

const TOPUP_AMOUNT = 100000n; // 0.10 STX per wallet
const TX_FEE = 2000n; // 0.002 STX per transfer

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function topupWallets() {
  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║     Wallet Top-up Script v1.0                  ║');
  console.log('╚════════════════════════════════════════════════╝\n');

  // Load funding wallet mnemonic
  const fundingMnemonic = process.env.FUNDING_WALLET_MNEMONIC;
  if (!fundingMnemonic) {
    console.error('❌ FUNDING_WALLET_MNEMONIC not set in .env');
    process.exit(1);
  }

  // Load test wallets
  const walletsFile = 'test-wallets.json';
  if (!fs.existsSync(walletsFile)) {
    console.error('❌ test-wallets.json not found');
    process.exit(1);
  }

  const wallets: TestWallet[] = JSON.parse(fs.readFileSync(walletsFile, 'utf-8'));

  // Derive funding wallet
  console.log('🔑 Loading funding wallet...');
  const fundingWallet = await generateWallet({
    secretKey: fundingMnemonic,
    password: '',
  });
  const fundingAccount = fundingWallet.accounts[0];
  const fundingPrivateKey = fundingAccount.stxPrivateKey;
  const fundingAddress = getStxAddress({
    account: fundingAccount,
    transactionVersion: 22,
  });

  console.log(`   Address: ${fundingAddress}\n`);

  // Check funding wallet balance
  console.log('💰 Checking funding wallet balance...');
  const balanceResponse = await fetch(
    `https://api.mainnet.hiro.so/extended/v1/address/${fundingAddress}/balances`
  );
  const balanceData = await balanceResponse.json() as { stx: { balance: string } };
  const balanceSTX = Number(balanceData.stx.balance) / 1_000_000;
  console.log(`   Balance: ${balanceSTX.toFixed(6)} STX\n`);

  const totalNeeded = Number(TOPUP_AMOUNT + TX_FEE) * wallets.length / 1_000_000;
  console.log(`   Top-up amount per wallet: ${Number(TOPUP_AMOUNT) / 1_000_000} STX`);
  console.log(`   Total needed: ~${totalNeeded.toFixed(2)} STX for ${wallets.length} wallets\n`);

  if (balanceSTX < totalNeeded) {
    console.error(`❌ Insufficient balance! Need at least ${totalNeeded.toFixed(2)} STX`);
    process.exit(1);
  }

  // Get initial nonce
  let nonce = await getNonce(fundingAddress, 'mainnet');
  console.log(`🔢 Starting nonce: ${nonce}\n`);

  console.log('📤 Topping up wallets...\n');

  let successCount = 0;
  let failCount = 0;

  for (const wallet of wallets) {
    process.stdout.write(`   [${wallet.index.toString().padStart(2, '0')}/50] ${wallet.address.slice(0, 20)}...`);

    try {
      const tx = await makeSTXTokenTransfer({
        recipient: wallet.address,
        amount: TOPUP_AMOUNT,
        senderKey: fundingPrivateKey,
        network: 'mainnet',
        anchorMode: AnchorMode.Any,
        fee: TX_FEE,
        nonce: nonce,
      });

      const result = await broadcastTransaction(tx, 'mainnet');

      if ('error' in result) {
        throw new Error(result.error);
      }

      console.log(` ✅ ${result.txid.slice(0, 16)}...`);
      successCount++;
      nonce++;

      await sleep(100);

    } catch (error) {
      console.log(` ❌ ${(error as Error).message}`);
      failCount++;
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log('\n📊 Top-up Summary:');
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   💰 Total sent: ${(successCount * Number(TOPUP_AMOUNT) / 1_000_000).toFixed(2)} STX`);
  console.log('\n⏳ Wait for transactions to confirm, then run mass-mint.ts again\n');
}

topupWallets().catch(console.error);
