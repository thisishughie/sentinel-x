const { Connection, PublicKey } = require('@solana/web3.js');
async function test() {
    const conn = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
    console.log("Testing RPC Connection...");
    const slot = await conn.getSlot();
    console.log("Current Solana Slot:", slot);
}
test();
