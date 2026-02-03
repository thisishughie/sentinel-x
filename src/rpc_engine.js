/**
 * Sentinel-X: RPC Engine
 * Polls the Solana mainnet for new signatures associated with a Program ID.
 */
const { Connection, PublicKey } = require('@solana/web3.js');

class RPCEngine {
    constructor(rpcUrl = 'https://api.mainnet-beta.solana.com') {
        this.connection = new Connection(rpcUrl, 'confirmed');
    }

    async getLatestSignatures(programId, limit = 10) {
        console.log(`Sentinel-X: Polling RPC for signatures on Program: ${programId.toBase58()}...`);
        try {
            const signatures = await this.connection.getSignaturesForAddress(programId, { limit });
            return signatures.map(s => s.signature);
        } catch (error) {
            console.error("RPC Error:", error.message);
            return [];
        }
    }

    async getTransactionData(signature) {
        return await this.connection.getTransaction(signature, {
            maxSupportedTransactionVersion: 0
        });
    }
}

module.exports = RPCEngine;
