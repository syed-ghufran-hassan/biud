/**
 * Fund Test Wallets Script
 * 
 * Funds all 50 test wallets from a master funding wallet.
 * Each wallet receives enough STX to register a name (0.10 STX + fees)
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

const AMOUNT_PER_WALLET = 200000n; // 0.20 STX per wallet (0.10 registration + 0.05 tx fee + buffer)
const TX_FEE = 2000n; // 0.002 STX per transfer

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fundWallets() {
  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║     Test Wallet Funder v1.0                    ║');
  console.log('╚════════════════════════════════════════════════╝\n');

  // Load funding wallet mnemonic
  const fundingMnemonic = process.env.FUNDING_WALLET_MNEMONIC;
  if (!fundingMnemonic) {
    console.error('❌ FUNDING_WALLET_MNEMONIC not set in .env');
    console.error('   Add: FUNDING_WALLET_MNEMONIC=your mnemonic here');
    process.exit(1);
  }

  // Load test wallets
  const walletsFile = 'test-wallets.json';
  if (!fs.existsSync(walletsFile)) {
    console.error('❌ test-wallets.json not found');
    console.error('   Run: bun scripts/generate-wallets.ts first');
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
    transactionVersion: 22, // Mainnet
  });

  console.log(`   Address: ${fundingAddress}`);

  // Verify it's the expected address
  const expectedAddress = 'SP1QPNQB6R3EFMTQYGHG9J7N03S3K52ARSE1VEVX4';
  if (fundingAddress !== expectedAddress) {
    console.error(`\n❌ Address mismatch!`);
    console.error(`   Expected: ${expectedAddress}`);
    console.error(`   Got: ${fundingAddress}`);
    process.exit(1);
  }
  console.log('   ✅ Address matches expected funding wallet\n');

  // Check funding wallet balance
  console.log('💰 Checking funding wallet balance...');
  const balanceResponse = await fetch(
    `https://api.mainnet.hiro.so/extended/v1/address/${fundingAddress}/balances`
  );
  const balanceData = await balanceResponse.json() as { stx: { balance: string } };
  const balanceSTX = Number(balanceData.stx.balance) / 1_000_000;
  console.log(`   Balance: ${balanceSTX.toFixed(6)} STX\n`);

  const totalNeeded = Number(AMOUNT_PER_WALLET + TX_FEE) * wallets.length / 1_000_000;
  console.log(`   Total needed: ~${totalNeeded.toFixed(2)} STX for ${wallets.length} wallets`);
  console.log(`   Amount per wallet: ${Number(AMOUNT_PER_WALLET) / 1_000_000} STX\n`);

  if (balanceSTX < totalNeeded) {
    console.error(`❌ Insufficient balance! Need at least ${totalNeeded.toFixed(2)} STX`);
    process.exit(1);
  }

  // Get initial nonce
  let nonce = await getNonce(fundingAddress, 'mainnet');
  console.log(`🔢 Starting nonce: ${nonce}\n`);

  console.log('📤 Funding wallets...\n');

  let successCount = 0;
  let failCount = 0;
  const results: { address: string; txid?: string; error?: string }[] = [];

  for (const wallet of wallets) {
    process.stdout.write(`   [${wallet.index.toString().padStart(2, '0')}/50] ${wallet.address.slice(0, 20)}...`);

    try {
      const tx = await makeSTXTokenTransfer({
        recipient: wallet.address,
        amount: AMOUNT_PER_WALLET,
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
      results.push({ address: wallet.address, txid: result.txid });
      successCount++;
      nonce++;

      // Small delay to avoid rate limiting
      await sleep(100);

    } catch (error) {
      console.log(` ❌ ${(error as Error).message}`);
      results.push({ address: wallet.address, error: (error as Error).message });
      failCount++;
    }
  }

  // Save results
  fs.writeFileSync('funding-results.json', JSON.stringify(results, null, 2));

  console.log('\n' + '═'.repeat(60));
  console.log('\n📊 Funding Summary:');
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   💰 Total sent: ${(successCount * Number(AMOUNT_PER_WALLET) / 1_000_000).toFixed(2)} STX`);
  console.log('\n📁 Results saved to: funding-results.json');
  console.log('\n⏳ Wait for transactions to confirm before running mass-mint.ts\n');
}

fundWallets().catch(console.error);
