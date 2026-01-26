# BiUD Contract Migration Guide

This guide explains how to migrate from a compromised v4 contract to a new v5 contract with improved admin security.

## Why Migrate?

The v4 contract uses a hardcoded `CONTRACT_DEPLOYER` constant that cannot be changed. If this deployer key is compromised, you must deploy a new contract.

## v5 Improvements

1. **Transferable Admin** - 2-step admin transfer pattern (initiate + accept)
2. **Migration Mode** - Import names from v4 without charging fees
3. **Emergency Pause** - Pause all operations if needed
4. **Better Security** - Admin stored in variable, not constant

## Migration Steps

### 1. Prepare Environment

Create a `.env` file:

```bash
# Network (mainnet or testnet)
STACKS_NETWORK=mainnet

# Old (compromised) contract
OLD_CONTRACT_ADDRESS=SP31G2FZ5JN87BATZMP4ZRYE5F7WZQDNEXJ7G7X97
OLD_CONTRACT_NAME=biud-username-v4

# New contract (after deployment)
NEW_CONTRACT_ADDRESS=<your-new-deployer-address>
NEW_CONTRACT_NAME=biud-username-v5

# Private key of new deployer (KEEP SECRET!)
NEW_DEPLOYER_PRIVATE_KEY=<your-private-key>
```

### 2. Install Dependencies

```bash
npm install ts-node @types/node --save-dev
```

### 3. Deploy New Contract

Deploy `contracts/biud-username-v5.clar` using your new, secure wallet:

```bash
# Using Clarinet
clarinet deployment generate --mainnet

# Or manually with Stacks.js
```

### 4. Export Names from Old Contract

```bash
npx ts-node scripts/migrate.ts export-names
```

This creates `migration-data.json` with all registered names.

### 5. Verify Export

```bash
npx ts-node scripts/migrate.ts verify-export
```

### 6. Import Names to New Contract

```bash
npx ts-node scripts/migrate.ts import-names
```

This will:
- Call `admin-import-name` for each name
- Preserve original owners
- Preserve expiry dates
- Skip already migrated names (resumable)

### 7. Import Primary Names

After all names are imported, run:

```bash
npx ts-node scripts/migrate.ts import-primary-names
```

### 8. Disable Migration Mode

Once complete, disable migration to prevent future admin imports:

```clarity
(contract-call? .biud-username-v5 disable-migration)
```

### 9. Update Frontend/Integrations

Update all references to point to the new contract address.

### 10. (Optional) Transfer Admin

If you want to use a multisig or different admin later:

```clarity
;; Current admin initiates transfer
(contract-call? .biud-username-v5 transfer-admin 'SP...)

;; New admin accepts
(contract-call? .biud-username-v5 accept-admin)
```

## Checking Migration Status

```bash
npx ts-node scripts/migrate.ts check-status
```

## Important Notes

1. **Expiry Times** - Names keep their original expiry heights
2. **Fees** - No fees charged during migration
3. **Primary Names** - Must be set separately after name import
4. **Resolvers** - Not migrated; users must re-configure
5. **Transaction Costs** - Admin pays gas for import transactions

## Emergency Actions

If the compromised key hasn't been exploited yet:

```clarity
;; Redirect fees to safe address immediately
(contract-call? .biud-username-v4 set-fee-recipient 'SP<safe-address>)
(contract-call? .biud-username-v4 set-protocol-treasury 'SP<safe-address>)
```

## Contract Differences (v4 → v5)

| Feature | v4 | v5 |
|---------|----|----|
| Admin | Constant (immutable) | Variable (transferable) |
| Admin Transfer | Not possible | 2-step pattern |
| Migration Import | Not available | `admin-import-name` |
| Pause Function | Not available | `pause-contract` |
| Migration Lock | Not available | `disable-migration` |

## File Structure

```
scripts/
├── migrate.ts           # Main migration script
├── MIGRATION_README.md  # This file
contracts/
├── biud-username-v4.clar # Old contract
├── biud-username-v5.clar # New contract with migration support
```
