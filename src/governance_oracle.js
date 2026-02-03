/**
 * Sentinel-X: Main Governance Oracle
 * The brain that orchestrates monitoring, analysis, and archiving.
 */
const { Connection, PublicKey } = require('@solana/web3.js');
const ProposalAnalyzer = require('./proposal_analyzer');
const Archiver = require('./archiver');
const InstructionDecoder = require('./instruction_decoder');
const Notifier = require('./notifier');

const analyzer = new ProposalAnalyzer();
const archiver = new Archiver();
const decoder = new InstructionDecoder();
const notifier = new Notifier();

async function runOracle() {
    console.log("Sentinel-X: Oracle sequence initialized.");
    
    // Simulated input from RPC
    const mockEvents = [
        { 
            proposal: { id: 'JUP-201', title: 'Whale Liquidity Migration', description: 'Moving 500k SOL to new vault.' },
            data: Buffer.from([2, 0, 0, 0]) // Simulated ExecuteProposal instruction
        }
    ];

    for (const event of mockEvents) {
        // 1. Decode
        const decoded = decoder.decode(event.data);

        // 2. Analyze
        const report = analyzer.analyze(event.proposal);

        // 3. Archive
        await archiver.archive({ ...event.proposal, analysis: report, action: decoded.action });

        // 4. Notify if High/Critical
        if (['HIGH', 'CRITICAL'].includes(report.impact)) {
            await notifier.sendAlert(report, decoded.action);
        }
    }

    console.log("Sentinel-X: Cycle complete.");
}

runOracle().catch(err => console.error(err));
