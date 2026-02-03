/**
 * Sentinel-X: Core Solana RPC Scanner
 * Functional logic to fetch program accounts and log activity.
 */
const { Connection, PublicKey } = require('@solana/web3.js');

// Jupiter Governance Program ID
const JUP_GOVERNANCE_ID = new PublicKey('GqTPL6qRf5aUztCcq569u7C47sV6V428p47nN9xXj');

async function scanProposals() {
    const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
    
    try {
        console.log("Sentinel-X: Fetching program accounts for Jupiter Governance...");
        const accounts = await connection.getProgramAccounts(JUP_GOVERNANCE_ID);
        
        console.log(`Found ${accounts.length} active governance accounts.`);
        
        accounts.forEach((account, index) => {
            if (index < 5) { // Log first 5 for verification
                console.log(`Account ${index}: ${account.pubkey.toBase58()}`);
            }
        });

    } catch (error) {
        console.error("Sentinel-X Error:", error.message);
    }
}

scanProposals();
