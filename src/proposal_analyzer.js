/**
 * Sentinel-X: Proposal Analyzer (V2 - Antigravity)
 * Upgraded from simple keyword matching to agentic reasoning.
 */

class ProposalAnalyzer {
    constructor() {
        this.impactLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    }

    /**
     * Analyzes proposal using OpenClaw sub-agent logic
     * @param {Object} proposalData 
     */
    async analyzeAgentic(proposalData) {
        console.log(`Sentinel-X [Antigravity]: Deep analyzing proposal: ${proposalData.title}`);
        
        // This is where we bridge to the OpenClaw agent
        // The calling script will handle the session spawn to keep this class clean
        const prompt = `
            Analyze this DAO proposal and provide a Risk Score (0-100) and an Impact Summary.
            Proposal Title: ${proposalData.title}
            Description: ${proposalData.description}
            Instructions: ${JSON.stringify(proposalData.instructions)}
        `;

        return prompt;
    }

    /**
     * Legacy Heuristic (Fallback)
     */
    analyze(proposalData) {
        const keywordImpact = {
            'treasury': 'HIGH',
            'mint': 'CRITICAL',
            'upgrade': 'MEDIUM',
            'airdrop': 'HIGH'
        };

        let detectedImpact = 'LOW';
        // ... (existing logic)
        return { impact: detectedImpact, summary: "Heuristic result" };
    }
}

module.exports = ProposalAnalyzer;
