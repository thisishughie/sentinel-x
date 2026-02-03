/**
 * Sentinel-X: Proposal Analyzer
 * Uses AI-driven heuristics to determine the sentiment and potential impact of DAO proposals.
 */

class ProposalAnalyzer {
    constructor() {
        this.impactLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    }

    /**
     * Analyzes raw proposal data (instruction data)
     * @param {Object} proposalData 
     */
    analyze(proposalData) {
        console.log("Sentinel-X: Analyzing: ...");
        
        // Mocking the heuristic brain for now - this will eventually hit an internal LLM endpoint
        const keywordImpact = {
            'treasury': 'HIGH',
            'mint': 'CRITICAL',
            'upgrade': 'MEDIUM',
            'airdrop': 'HIGH'
        };

        let detectedImpact = 'LOW';
        for (const [key, value] of Object.entries(keywordImpact)) {
            if (proposalData.title?.toLowerCase().includes(key) || proposalData.description?.toLowerCase().includes(key)) {
                detectedImpact = value;
            }
        }

        return {
            impact: detectedImpact,
            summary: `Detected ${detectedImpact} impact proposal regarding ${proposalData.title}`,
            sentiment: proposalData.isControversial ? 'NEGATIVE' : 'POSITIVE'
        };
    }
}

module.exports = ProposalAnalyzer;
