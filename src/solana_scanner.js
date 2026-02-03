/**
 * Sentinel-X: Core Solana Scanner (V2 - Antigravity)
 * Upgraded from polling to real-time WebSocket subscriptions.
 */
const { Connection, PublicKey } = require('@solana/web3.js');

const JUP_GOVERNANCE_ID = new PublicKey('GqTPL6qRf5aUztCcq569u7C47sV6V428p47nN9xXj');

async function startWatcher() {
    const rpcUrl = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
    const connection = new Connection(rpcUrl, 'confirmed');

    console.log("Sentinel-X [Antigravity]: Initializing WebSocket subscription for Jupiter...");

    // Real-time subscription to program changes
    connection.onProgramAccountChange(
        JUP_GOVERNANCE_ID,
        (accountInfo) => {
            console.log("-----------------------------------------");
            console.log("NEW ACTIVITY DETECTED ON JUPITER DAO");
            console.log("Pubkey:", accountInfo.accountId.toBase58());
            // Trigger analyzer logic here
        },
        'confirmed'
    );

    console.log("Sentinel-X: Now watching for real-time governance changes.");
}

if (require.main === module) {
    startWatcher();
}

module.exports = { startWatcher };
