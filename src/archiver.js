/**
 * Sentinel-X: Archive Module
 * Manages the permanent storage of governance truth.
 */
const fs = require('fs');
const path = require('path');

class Archiver {
    constructor(dbPath = './governance_archive.json') {
        this.dbPath = path.resolve(dbPath);
        if (!fs.existsSync(this.dbPath)) {
            fs.writeFileSync(this.dbPath, JSON.stringify([]));
        }
    }

    async archive(entry) {
        console.log(`Sentinel-X: Archiving governance event: ${entry.id}`);
        const data = JSON.parse(fs.readFileSync(this.dbPath));
        data.push({
            ...entry,
            timestamp: new Date().toISOString()
        });
        fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
        
        // TODO: Implement Solana Shadow Drive / IROC integration here for true immutability
    }
}

module.exports = Archiver;
