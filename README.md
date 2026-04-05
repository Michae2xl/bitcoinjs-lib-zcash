# bitcoinjs-lib-zcash

Zcash fork of [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib) with **Orchard shielded transactions** (Halo2, no trusted setup).

Automated migration by [Zcash Migrate](https://github.com/Michae2xl/zcash-migrate).

## Migration Stats

| Metric | Value |
|--------|-------|
| Original | [bitcoinjs/bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib) |
| Language | Typescript |
| Source files | 150 |
| RPC calls detected | 0 |
| Code changes applied | 227 |
| Framework | npm |
| RPC calls mapped | 0 |
| Shielded methods |  |

## Quick Start

```javascript
const { ZcashClient } = require("./zcash-enhancements/zcash_rpc.cjs");

const client = new ZcashClient({ zebraPort: 8232, zkoolPort: 8000 });

// Chain data (via zebrad)
const info = await client.chain.getblockchaininfo();

// Shielded wallet (via zkool — Orchard/Halo2)
const balance = await client.wallet.getBalance(accountId);
const addrs = await client.wallet.getAddresses(accountId, 6);
const txid = await client.wallet.send(accountId, [
  { address: addrs.ua, amount: "0.1", memo: "Private payment" }
], 4); // Orchard pool
```

## What Changed

| Before (Bitcoin) | After (Zcash) |
|-----------------|---------------|
| `bitcoin/` module | `zcash/` module |
| `CBitcoinAddress` | `CZcashAddress` |
| Port 8332/8333 | Port 8232/8233 |
| `bitcoin-cli`, `bitcoind` | `zcash-cli`, `zcashd` |
| `~/.bitcoin/` | `~/.zcash/` |
| BTC, satoshis | ZEC, zatoshis |
| Public transactions | Shielded (Orchard/Halo2, zero-knowledge) |

## Generated Files

| File | Purpose |
|------|---------|
| `zcash-enhancements/zcash_rpc.cjs` | ZcashClient (ZebraRPC + ZkoolWallet) |
| `zcash-enhancements/test_zcash_rpc.mjs` | Test suite for zebrad + zkool |
| `zcash-enhancements/MIGRATION-MAP.md` | 0 RPC calls mapped to Zcash |
| `zcash-enhancements/ZK-GUIDE.md` | Integration guide with examples |
| `zcash-deploy/` | Node config + setup scripts |
| `NOTICE` | Open source attribution |

## Requirements

| Service | Port | Purpose |
|---------|------|---------|
| [zebrad](https://github.com/ZcashFoundation/zebra) | 8232 | Chain data (blocks, transactions, validation) |
| [zkool](https://github.com/hhanh00/zkool2) | 8000 | Wallet (accounts, send, shield, Orchard/Halo2) |

## License

Original code: see LICENSE (preserved from upstream project)
Zcash enhancements: MIT (see zcash-enhancements/LICENSE)
See NOTICE for full attribution.

## How to Test

### 1. Verify the wrapper loads

```bash
git clone https://github.com/Michae2xl/bitcoinjs-lib-zcash.git
cd bitcoinjs-lib-zcash/zcash-enhancements
node -e "const {ZcashClient}=require('./zcash_rpc.cjs'); console.log('Wrapper OK')"
```

This confirms the ZcashClient wrapper (ZebraRPC + ZkoolWallet) imports correctly. No node required for this step.

### 2. Test against a live Zcash node

If you have zebrad running:

```bash
cd zcash-enhancements
node -e "
const {ZcashClient} = require('./zcash_rpc.cjs');
const c = new ZcashClient({zebraHost:'127.0.0.1', zebraPort:8232});
c.chain.getblockchaininfo().then(r => console.log('Chain:', r.chain + 'net, Block:', r.blocks));
"
```

### 3. Test wallet operations (requires zkool)

If you have zebrad + zkool running:

```bash
node -e "
const {ZcashClient} = require('./zcash_rpc.cjs');
const c = new ZcashClient({zebraHost:'127.0.0.1', zebraPort:8232, zkoolHost:'127.0.0.1', zkoolPort:8000});
(async () => {
  const info = await c.chain.getblockchaininfo();
  console.log('Block:', info.blocks);
  const bal = await c.wallet.getBalance(1);
  console.log('Balance:', bal);
})();
"
```

### 4. Run your own migration

Want to migrate a different Bitcoin project? Use the migration tool:

```bash
git clone https://github.com/Michae2xl/zcash-migrate.git
cd zcash-migrate
npm install
npm run dev
# Open http://localhost:3000 and paste any Bitcoin GitHub repo
```

### Node Setup

| Service | Install | Purpose |
|---------|---------|---------|
| [zebrad](https://github.com/ZcashFoundation/zebra) | `cargo install --locked --git https://github.com/ZcashFoundation/zebra zebrad` | Chain data |
| [zkool](https://github.com/hhanh00/zkool2) | `cargo install --locked --git https://github.com/hhanh00/zkool2 --features=graphql zkool_graphql` | Wallet (Orchard/Halo2) |

Testnet faucet: https://testnet.zecfaucet.com/
