# Pull Request for BiUD Security Fix

## PR Title
**🔐 Security: Remove exposed private keys from deployment scripts**

---

## PR Description

### 🚨 CRITICAL SECURITY FIX

This PR addresses a **critical security vulnerability** where a private key was hardcoded in the deployment scripts.

### Changes Made

#### 🔴 Critical Fixes
- **Removed hardcoded private key** from:
  - `deploy-mainnet.js`
  - `deploy-mainnet-v2.js`
  - `deploy-clean.js`

#### 🟢 Security Improvements
- All scripts now load private key from `DEPLOYER_PRIVATE_KEY` environment variable
- Added `dotenv` dependency for `.env` file support
- Created `.env.example` template for secure configuration
- Added `SECURITY.md` with key management guidelines
- Scripts fail with clear error message if key is not provided
- Deployer address is now derived dynamically from the private key

#### 🔧 Other Fixes
- Fixed hardcoded file path (`/home/thee1/ebookMP/biud/`) in `deploy-clean.js`
- Uses relative paths with `path.join(__dirname, ...)` for portability

### How to Use

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` from template:
   ```bash
   cp .env.example .env
   ```

3. Add your private key to `.env`:
   ```
   DEPLOYER_PRIVATE_KEY=your_private_key_here
   ```

4. Run deployment:
   ```bash
   node deploy-mainnet.js
   ```

### ⚠️ IMPORTANT ACTION REQUIRED

Since the private key `75d9...8901` was previously exposed in this repository's commit history, you should:

1. **Immediately transfer all funds** from the compromised wallet (`SP31G2FZ5JN87BATZMP4ZRYE5F7WZQDNEXJ7G7X97`) to a new secure wallet
2. **Generate a new private key/mnemonic** for future deployments
3. **Consider rotating contract admin rights** if the contracts support it

### Files Changed
- `deploy-mainnet.js` - Use env var instead of hardcoded key
- `deploy-mainnet-v2.js` - Use env var instead of hardcoded key
- `deploy-clean.js` - Use env var + fix hardcoded paths
- `package.json` - Add dotenv dependency
- `.env.example` - New template file
- `SECURITY.md` - New security guidelines

---

### Testing
- [x] Scripts fail gracefully without env var
- [x] Scripts work correctly with env var set
- [x] Relative paths resolve correctly

### Checklist
- [x] No sensitive data in commit
- [x] Added security documentation
- [x] Tested deployment scripts locally
