/**
 * Sentinel-X: Main Governance Oracle
 * The brain that orchestrates monitoring, analysis, and archiving.
 */
const { Connection, PublicKey } = require('@solana/web3.js');
const ProposalAnalyzer = require('./proposal_analyzer');
const Archiver = require('./archiver');

const analyzer = new ProposalAnalyzer();
const archiver = new Archiver();

async function runOracle() {
    console.log("Sentinel-X: Oracle sequence initialized.");
    
    // 1. Fetch Latest Proposals (Simulated for this block)
    const mockProposals = [
        { id: 'JUP-101', title: 'Treasury Diversification', description: 'Move 1M USDC to Helius RPC funding.', isControversial: false },
        { id: 'JUP-102', title: 'LFG Token Mint', description: 'Enable minting for new launchpad project.', isControversial: true }
    ];

    for (const proposal of mockProposals) {
        // 2. Analyze
        const report = analyzer.analyze(proposal);
        console.log(`Analysis for ${proposal.id}: `, report);

        // 3. Archive
        await archiver.archive({
            ...proposal,
            analysis: report
        });
    }

    console.log("Sentinel-X: Cycle complete. Entering watch mode...");
}

runOracle().catch(err => console.error(err));
