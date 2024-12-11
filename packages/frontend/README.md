# The Cards Emporium - Frontend Application

Welcome to the frontend application for The Cards Emporium, a marketplace for creating and trading cards. 

## Technologies Used

This project is built using a variety of modern web development technologies:

- **[Next.js](https://nextjs.org/)**: A powerful React framework that enables server-side rendering and generating static websites for React based web applications. It's used for the overall structure and layout of the application.

- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces. It allows us to create reusable UI components.

- **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that adds static types. It helps to write code that is more understandable and less prone to runtime errors.

- **[Wagmi](https://github.com/wagmi-io/wagmi-sdk)**: A library for interacting with the blockchain. It's used for handling transactions and communicating with smart contracts.

- **[Zustand](https://github.com/pmndrs/zustand)**: A small, fast and scaleable bearbones state-management solution. It's used for managing the global state of the application.

- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapidly building custom designs. It's used for styling the application.


## Features

On the homepage, you'll find a list of all the cards available in the store from various users. To unlock additional features, log in with your Metamask Wallet by clicking the "Login with Metamask" button in the upper right corner to:

- **View Card Details**: Click on a card to view its details.
- **Add a Card**: From your profile page, create a new card by specifying its name, description, and the URL of the card's image (please use HTTPS links).
- **Delete a Card**: You can delete any cards that you've created.
- **Like a Card**: Show your appreciation for a card by clicking on the heart icon. This will add it to your Liked cards list.
- **Offer a transfer**: from the details sidebar you can offer a card to the other user in exchange of that card
- **See the received offers of transfer**: on top of your profile page you can see the offers you received and accept the offer

To fully test the application, it is recommended to have two different wallets on the Sepolia Ethereum network. You can add some Sepolia ETH to your wallets using the [Sepolia Faucet](https://sepoliafaucet.com/). 

Once you have your wallets set up, create at least one card per wallet. Then, offer a trade from one profile to the other and then accept it. This will allow you to fully test the trading functionality of the application.


## Project structure
- In ```src/ui``` you can find all the components divided into ```atoms``` and ```molecules```.
- In ```src/pages``` you can find the 2 pages of the application, the Homepage and the User page.
- In ```src/services``` you can find all the api calls management.
- In ```src/store``` you can find all the application store management.


## Getting Started

To get the development server running, follow these steps:

1. Install the project dependencies:

```bash
npm install
# or
yarn install
```

2. Create a .env.local file with:
- NEXT_PUBLIC_CONTRACT_ADDRESS: The address of the Ethereum smartcontract you're interacting with.
- NEXT_PUBLIC_CONTRACT_OWNER_ADDRESS: Smartcontract owner address.
- NEXT_PUBLIC_API_BASE_URL: Baseurl of the backend server.

3. Start the development server:
```bash
npm run dev
```
Open http://localhost:3000 with your browser to see the result.
