/**
 * Sentinel-X: Plugin Manager
 * Allows dynamically adding new DAOs to monitor.
 */
class PluginManager {
    constructor() {
        this.plugins = new Map();
    }

    register(name, programId, decoderFn) {
        console.log(`Sentinel-X: Registering plugin for ${name} [${programId}]`);
        this.plugins.set(programId, { name, decoderFn });
    }

    getPlugin(programId) {
        return this.plugins.get(programId);
    }
}

module.exports = PluginManager;
