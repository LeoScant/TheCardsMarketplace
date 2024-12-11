# The Cards Emporium - NFT Marketplace

This monorepo contains all the components of The Cards Emporium NFT Marketplace:
- Frontend: Next.js web application
- Backend: Loopback 4 API server
- Smart Contract: Ethereum NFT contracts

## Project Structure
```
windsurf-project/
├── packages/
│   ├── frontend/        # Next.js frontend application (cards-marketplace-fe)
│   ├── backend/         # Loopback 4 backend server (cards-marketplace-be)
│   └── smart-contract/  # Ethereum smart contracts (cards-marketplace-sc)
```

## Prerequisites
- Node.js >= 22.0.0
- pnpm >= 8.0.0
- PostgreSQL >= 14.0.0

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Configure environment variables:
- Copy `.env.example` to `.env` in each package directory
- Update the values according to your setup

3. Start development servers:
```bash
pnpm dev
```

## Available Scripts

- `pnpm dev`: Start frontend and backend development servers
- `pnpm build`: Build all packages
- `pnpm test`: Run tests across all packages
- `pnpm lint`: Run linting across all packages
- `pnpm clean`: Clean build artifacts

### Package-specific Commands
- `pnpm frontend <command>`: Run command in frontend package
- `pnpm backend <command>`: Run command in backend package
- `pnpm smart-contract <command>`: Run command in smart-contract package

## Package Details

### Frontend (cards-marketplace-fe)
- Next.js 14
- TailwindCSS
- Wagmi for Ethereum integration
- React Query for data fetching
- Zustand for state management

### Backend (cards-marketplace-be)
- Loopback 4
- PostgreSQL database
- JWT authentication
- Ethereum wallet integration
- IPFS integration via Pinata

### Smart Contract (cards-marketplace-sc)
- Solidity 0.8.20
- OpenZeppelin contracts
- Hardhat development environment
- Deployed on Sepolia testnet

## Contributing

1. All shared configurations are at the root level
2. Package-specific configurations are in their respective directories
3. Use pnpm workspaces for dependency management
4. Follow the established coding standards and commit conventions

## Environment Setup

### Smart Contract
Required variables in `.env`:
```
ALCHEMY_API_KEY=your_alchemy_api_key
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### Backend
Required variables in `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=cards_marketplace
TOKEN_SECRET_VALUE=your_jwt_secret
TOKEN_EXPIRES_IN_VALUE=8h
ETH_PRIVATE_KEY=your_ethereum_private_key
CONTRACT_ADDRESS=your_contract_address
ALCHEMY_API_KEY=your_alchemy_api_key
PINATA_JWT=your_pinata_jwt
```

### Frontend
Required variables in `.env`:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
```

## License

[Add your license here]
