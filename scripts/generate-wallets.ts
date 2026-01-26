/**
 * Generate 50 Test Wallets for Mass Minting Test
 * 
 * This script generates 50 random wallets and saves them to a JSON file.
 * The file is gitignored for security.
 */

import { generateWallet, getStxAddress } from '@stacks/wallet-sdk';
import * as fs from 'fs';
import * as crypto from 'crypto';

interface TestWallet {
  index: number;
  address: string;
  mnemonic: string;
}

async function generateTestWallets() {
  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║     Test Wallet Generator v1.0                 ║');
  console.log('╚════════════════════════════════════════════════╝\n');

  const walletCount = 50;
  const wallets: TestWallet[] = [];

  console.log(`🔐 Generating ${walletCount} test wallets...\n`);

  for (let i = 0; i < walletCount; i++) {
    // Generate a random mnemonic (24 words)
    const entropy = crypto.randomBytes(32);
    const bip39 = await import('@scure/bip39');
    const english = await import('@scure/bip39/wordlists/english.js');
    const mnemonic = bip39.entropyToMnemonic(entropy, english.wordlist);

    // Generate wallet from mnemonic
    const wallet = await generateWallet({
      secretKey: mnemonic,
      password: '',
    });

    const account = wallet.accounts[0];
    const address = getStxAddress({
      account,
      transactionVersion: 22, // Mainnet
    });

    wallets.push({
      index: i + 1,
      address,
      mnemonic,
    });

    process.stdout.write(`\r   Generated wallet ${i + 1}/${walletCount}`);
  }

  console.log('\n');

  // Save to file
  const outputFile = 'test-wallets.json';
  fs.writeFileSync(outputFile, JSON.stringify(wallets, null, 2));

  console.log(`✅ Generated ${walletCount} wallets`);
  console.log(`📁 Saved to: ${outputFile}`);
  console.log('\n⚠️  Keep this file secure! It contains private mnemonics.\n');

  // Print summary
  console.log('📋 Wallet Addresses:');
  console.log('─'.repeat(60));
  wallets.forEach((w, i) => {
    console.log(`   ${(i + 1).toString().padStart(2, '0')}. ${w.address}`);
  });
  console.log('─'.repeat(60));
  console.log(`\n   Total: ${wallets.length} wallets\n`);
}

generateTestWallets().catch(console.error);
