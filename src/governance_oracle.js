/**
 * Sentinel-X: Main Governance Oracle
 * End-to-end autonomous flow: Polling -> Decoding -> Analysis -> Archiving -> Notification
 */
const { PublicKey } = require('@solana/web3.js');
const RPCEngine = require('./rpc_engine');
const InstructionDecoder = require('./instruction_decoder');
const ProposalAnalyzer = require('./proposal_analyzer');
const Archiver = require('./archiver');
const Notifier = require('./notifier');

const JUP_GOVERNANCE_ID = new PublicKey('GqTPL6qRf5aUztCcq569u7C47sV6V428p47nN9xXj');

const rpc = new RPCEngine();
const decoder = new InstructionDecoder();
const analyzer = new ProposalAnalyzer();
const archiver = new Archiver();
const notifier = new Notifier();

async function startWatching() {
    console.log("Sentinel-X: Eternal Watch Mode Initiated.");
    
    // Poll for the last 5 signatures
    const signatures = await rpc.getLatestSignatures(JUP_GOVERNANCE_ID, 5);
    
    for (const sig of signatures) {
        console.log(`Sentinel-X: Processing Signature: ${sig}`);
        
        const tx = await rpc.getTransactionData(sig);
        if (!tx) continue;

        // Extract instruction data (simplified for POC)
        const instructionData = tx.transaction.message.instructions[0]?.data;
        if (!instructionData) continue;

        const bufferData = Buffer.from(instructionData, 'base64');
        const decoded = decoder.decode(bufferData);
        
        // Analyze Metadata (Placeholder metadata for now)
        const metadata = { title: `TX: ${sig.slice(0, 8)}`, description: 'Instruction data captured from chain.' };
        const report = analyzer.analyze(metadata);

        // Archive & Notify
        await archiver.archive({ id: sig, analysis: report, action: decoded.action });

        if (['HIGH', 'CRITICAL'].includes(report.impact)) {
            await notifier.sendAlert(report, decoded.action);
        }
    }
}

// Run the sequence every 5 minutes (300000ms)
setInterval(() => {
    startWatching().catch(err => console.error(err));
}, 300000);

startWatching().catch(err => console.error(err));
