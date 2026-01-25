# Security Policy

## ⚠️ Important Security Notice

### Private Key Management

**NEVER hardcode private keys in source files or commit them to version control.**

This project uses environment variables for all sensitive credentials. To deploy contracts:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your private key:
   ```bash
   DEPLOYER_PRIVATE_KEY=your_actual_private_key_here
   ```

3. Ensure `.env` is in your `.gitignore` (it already is by default)

4. Run deployment:
   ```bash
   npm install  # Install dotenv dependency
   node deploy-mainnet.js
   ```

### What to do if your private key was exposed

If your private key was ever exposed in a public repository:

1. **Immediately transfer all funds** from the compromised wallet to a new secure wallet
2. **Rotate the key** - generate a new private key/mnemonic
3. If the exposed key controls deployed contracts, consider:
   - Transferring admin rights to a new address (if the contract supports it)
   - Deploying new contract versions with the new key
4. Report the exposure to relevant parties

### Reporting Security Vulnerabilities

If you discover a security vulnerability in this project, please:

1. **Do NOT** create a public GitHub issue
2. Send details privately to the maintainers
3. Allow reasonable time for a fix before public disclosure

## Security Best Practices

- Use hardware wallets for mainnet deployments
- Use separate keys for testnet and mainnet
- Enable 2FA on all accounts
- Regularly audit contract permissions
- Keep dependencies updated
