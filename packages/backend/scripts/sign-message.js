require('dotenv').config();
const { ethers } = require('ethers');

async function signMessage() {
    const wallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY);
    const message = "Welcome to The Cards Emporium - dwquQp0axRCD1WJUN";
    const signature = await wallet.signMessage(message);
    console.log('Signature:', signature);
}

signMessage().catch(console.error);
