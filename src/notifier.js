/**
 * Sentinel-X: Notification Dispatcher
 * Dispatches alerts to X and Telegram based on proposal analysis.
 */
class Notifier {
    constructor(config = {}) {
        this.enabled = config.enabled || true;
    }

    async sendAlert(analysis, action) {
        if (!this.enabled) return;

        const message = `🚨 Sentinel-X Alert: ${analysis.impact} Impact Detected!\nAction: ${action}\nSummary: ${analysis.summary}`;
        
        console.log("Sentinel-X: Dispatching notification...");
        console.log("-------------------");
        console.log(message);
        console.log("-------------------");

        // Integration with OpenClaw message tool or direct API calls will go here
    }
}

module.exports = Notifier;
