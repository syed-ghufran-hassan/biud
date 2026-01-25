/**
 * BiUD Clean Deployment Script
 * Deploy BiUD contracts to Stacks mainnet
 * Using clean ASCII-only contract files
 * 
 * SECURITY: Private key must be provided via environment variable
 * Usage: DEPLOYER_PRIVATE_KEY=your_key node deploy-clean.js
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const https = require('https');
const {
  makeContractDeploy,
  AnchorMode,
  getAddressFromPrivateKey,
  TransactionVersion,
} = require('@stacks/transactions');

// SECURITY: Load private key from environment variable
const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
if (!PRIVATE_KEY) {
  console.error('❌ ERROR: DEPLOYER_PRIVATE_KEY environment variable is required');
  console.error('Usage: DEPLOYER_PRIVATE_KEY=your_key node deploy-clean.js');
  console.error('Or create a .env file with DEPLOYER_PRIVATE_KEY=your_key');
  process.exit(1);
}

// Use string network name
const network = 'mainnet';

async function getNonce(address) {
  return new Promise((resolve, reject) => {
    https.get(`https://api.mainnet.hiro.so/extended/v1/address/${address}/nonces`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const json = JSON.parse(data);
        resolve(json.possible_next_nonce);
      });
    }).on('error', reject);
  });
}

async function broadcastTx(txBytes) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.mainnet.hiro.so',
      port: 443,
      path: '/v2/transactions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': txBytes.length
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ json: JSON.parse(data), status: res.statusCode });
        } catch {
          resolve({ raw: data, status: res.statusCode });
        }
      });
    });

    req.on('error', reject);
    req.write(Buffer.from(txBytes));
    req.end();
  });
}

async function deployContract(contractName, codeBody, nonce) {
  console.log(`\nDeploying ${contractName}...`);
  console.log(`Contract size: ${codeBody.length} characters`);
  
  // Verify the code is ASCII only
  for (let i = 0; i < codeBody.length; i++) {
    if (codeBody.charCodeAt(i) > 127) {
      console.error(`Non-ASCII character at position ${i}: ${codeBody.charCodeAt(i)}`);
      throw new Error('Contract contains non-ASCII characters');
    }
  }
  console.log('Contract is ASCII-clean');

  const txOptions = {
    contractName: contractName,
    codeBody: codeBody,
    senderKey: PRIVATE_KEY,
    network: network,
    anchorMode: AnchorMode.Any,
    fee: 500000n, // 0.5 STX
    nonce: BigInt(nonce),
    clarityVersion: 2
  };

  const transaction = await makeContractDeploy(txOptions);
  
  // Serialize to bytes (Uint8Array)
  const txBytes = transaction.serialize();
  
  console.log(`TX bytes: ${txBytes.length}`);
  console.log(`Broadcasting to mainnet...`);

  const result = await broadcastTx(txBytes);
  console.log('Response:', result);
  
  return result;
}

async function main() {
  try {
    // Get deployer address from private key
    const address = getAddressFromPrivateKey(PRIVATE_KEY, TransactionVersion.Mainnet);
    console.log(`Deployer address: ${address}`);
    
    // Get current nonce
    const nonce = await getNonce(address);
    console.log(`Current nonce: ${nonce}`);

    // Read clean contract files using relative paths
    const contractsDir = path.join(__dirname, 'contracts');
    const usernameCode = fs.readFileSync(path.join(contractsDir, 'biud-username-v2.clar'), 'utf8');
    const resolverCode = fs.readFileSync(path.join(contractsDir, 'biud-resolver-v2.clar'), 'utf8');

    // Deploy biud-username-v3 first (v2 code with explicit clarity version)
    const result1 = await deployContract('biud-username-v3', usernameCode, nonce);

    if (result1.status === 200 || (result1.json && !result1.json.error)) {
      console.log('\nbiud-username-v3 deployment submitted!');
      console.log('TX ID:', result1.json || result1.raw);
      
      // Deploy resolver with next nonce
      const result2 = await deployContract('biud-resolver-v3', resolverCode.replace(/biud-username-v2/g, 'biud-username-v3'), nonce + 1);
      console.log('\nbiud-resolver-v3 deployment submitted!');
      console.log('TX ID:', result2.json || result2.raw);
    } else {
      console.log('\nFirst deployment failed, skipping resolver');
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
