const { ethers } = require('ethers');
const axios = require('axios');

async function main() {
    try {
        // Create a new random wallet for testing
        const wallet = ethers.Wallet.createRandom();
        console.log('Test Wallet Address:', wallet.address);
        console.log('Test Wallet Private Key:', wallet.privateKey);

        // Get nonce
        const nonceResponse = await axios.get(`http://localhost:8000/users/getNonce?walletAddress=${wallet.address}`);
        const nonce = nonceResponse.data;
        console.log('Nonce:', nonce);

        // Sign the nonce
        const signature = await wallet.signMessage(nonce);
        console.log('Signature:', signature);

        // Login to get JWT token
        const loginResponse = await axios.post('http://localhost:8000/users/login', {
            walletAddress: wallet.address,
            signature: signature
        });
        console.log('Login Response:', loginResponse.data);

        // Test creating a card with the JWT token
        try {
            const cardResponse = await axios.post('http://localhost:8000/cards', 
                {
                    title: "Dragonite",
                    description: "Fossil",
                    imageurl: "https://www.cardtrader.com/uploads/blueprints/image/119606/show_dragonite-holo-rare-4-62-fossil.jpg"
                },
                {
                    headers: {
                        'Authorization': `Bearer ${loginResponse.data.token}`
                    }
                }
            );
            console.log('Card Creation Response:', cardResponse.data);
        } catch (error) {
            console.error('Card Creation Error:', error.response?.data || error.message);
        }
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

main();
