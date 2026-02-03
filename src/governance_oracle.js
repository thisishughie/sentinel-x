const { PublicKey } = require('@solana/web3.js');
const RPCEngine = require('./rpc_engine');
const InstructionDecoder = require('./instruction_decoder');
const ProposalAnalyzer = require('./proposal_analyzer');
const Archiver = require('./archiver');
const Notifier = require('./notifier');
const PluginManager = require('./plugin_manager');

const rpc = new RPCEngine();
const decoder = new InstructionDecoder();
const analyzer = new ProposalAnalyzer();
const archiver = new Archiver();
const notifier = new Notifier();
const plugins = new PluginManager();

plugins.register('Jupiter Governance', 'GqTPL6qRf5aUztCcq569u7C47sV6V428p47nN9xXj');
plugins.register('Realms Governance', 'GovER5Lth9YzCRnS1M24LnaTvBnxA9vS53oU4X8hN1f');

async function watchDAO(name, programId) {
    console.log(`Sentinel-X: Watching ${name}...`);
    const signatures = await rpc.getLatestSignatures(new PublicKey(programId), 3);
    
    for (const sig of signatures) {
        console.log(`Sentinel-X: [${name}] Processing ${sig}`);
        const tx = await rpc.getTransactionData(sig);
        if (!tx) continue;

        const instructionData = tx.transaction.message.instructions[0]?.data;
        if (!instructionData) continue;

        const decoded = decoder.decode(Buffer.from(instructionData, 'base64'));
        const report = analyzer.analyze({ title: `[${name}] ${sig.slice(0, 8)}`, description: 'Governance event detected.' });

        await archiver.archive({ dao: name, id: sig, analysis: report, action: decoded.action });

        if (['HIGH', 'CRITICAL'].includes(report.impact)) {
            await notifier.sendAlert(report, decoded.action);
        }
    }
}

async function cycle() {
    console.log("--- Starting Watch Cycle ---");
    for (const [id, plugin] of plugins.plugins) {
        await watchDAO(plugin.name, id).catch(err => console.error("Cycle Error:", err.message));
    }
    console.log("--- Cycle Complete ---");
}

setInterval(cycle, 600000);
cycle();
