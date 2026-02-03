/**
 * Sentinel-X: Core Solana Scanner (V2 - Antigravity)
 * Upgraded from polling to real-time WebSocket subscriptions.
 */
const { Connection, PublicKey } = require('@solana/web3.js');

// Corrected: Using the actual Jupiter Governance Program ID
const JUP_GOVERNANCE_ID_STR = 'GovaE4iu227srtG2s3tZzB4RmWBzw8sTwrCLZz7kN7rY';
const JUP_GOVERNANCE_ID = new PublicKey(JUP_GOVERNANCE_ID_STR);

async function startWatcher() {
    const rpcUrl = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
    const connection = new Connection(rpcUrl, 'confirmed');

    console.log("Sentinel-X [Antigravity]: Initializing WebSocket subscription for Jupiter...");
    console.log(`Program ID: ${JUP_GOVERNANCE_ID.toBase58()}`);

    try {
        // Real-time subscription to program changes
        connection.onProgramAccountChange(
            JUP_GOVERNANCE_ID,
            (accountInfo, context) => {
                console.log("-----------------------------------------");
                console.log("NEW ACTIVITY DETECTED ON JUPITER DAO");
                console.log("Pubkey:", accountInfo.accountId.toBase58());
                console.log("Slot:", context.slot);
            },
            'confirmed'
        );

        console.log("Sentinel-X: Now watching for real-time governance changes.");
        
        // Keep process alive for testing
        console.log("(Test mode: Running for 30 seconds to capture live events...)");
        setTimeout(() => {
            console.log("Sentinel-X: Test window closed.");
            process.exit(0);
        }, 30000);

    } catch (err) {
        console.error("Sentinel-X critical startup error:", err.message);
        process.exit(1);
    }
}

if (require.main === module) {
    startWatcher();
}

module.exports = { startWatcher };
