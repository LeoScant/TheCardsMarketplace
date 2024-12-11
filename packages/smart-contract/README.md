# The Cards Emporium NFT

The Cards Emporium NFT is a smart contract developed for the Ethereum blockchain. Utilizing the Solidity programming language, this contract is built upon the OpenZeppelin smart contract standards, particularly focusing on ERC721 tokens, a popular standard for non-fungible tokens (NFTs). The contract is designed to create, manage, and handle unique digital assets on the Ethereum network.

## Features
- **ERC721 Compliance:** Inherits from `ERC721URIStorage` and `IERC721` for standard NFT functionality.
- **Ownership Control:** Uses `Ownable` from OpenZeppelin, granting exclusive control over key functions to the contract owner.
- **NFT Minting:** Allows the owner to mint new NFTs with unique identifiers and associated metadata URIs.
- **NFT Burning:** Permits the owner to burn (permanently remove) NFTs from existence.
- **Event Logging:** Emits events for both NFT minting and burning for transparency and tracking.

## Contract Details
- **SPDX-License-Identifier:** MIT
- **Pragma Solidity Version:** ^0.8.20
- **Imported Contracts:** 
  - `@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol`
  - `@openzeppelin/contracts/token/ERC721/IERC721.sol`
  - `@openzeppelin/contracts/access/Ownable.sol`

## Functions
### Constructor
Initializes the contract by setting the name and symbol of the NFT and assigning ownership to the contract deployer.

### mint
```solidity
function mint(address to, string memory tokenURI) public onlyOwner returns (uint256)
```
- **Purpose:** Creates a new NFT.
- **Access:** Only the contract owner.
- **Parameters:**
  - `address to`: The address to receive the NFT.
  - `string memory tokenURI`: The URI of the token's metadata.
- **Returns:** The tokenId of the newly minted NFT.

### burn
```solidity
function burn(uint256 tokenId) public onlyOwner
```
- **Purpose:** Permanently removes an NFT from existence.
- **Access:** Only the contract owner.
- **Parameters:**
  - `uint256 tokenId`: The identifier of the NFT to be burned.

## Events
- **NFTMinted:** `event NFTMinted(address indexed to, uint256 indexed tokenId)`
- **NFTBurned:** `event NFTBurned(uint256 indexed tokenId)`

## Usage and Deployment
To use this contract, deploy it on the Ethereum blockchain using a Solidity environment like Remix, Truffle, or Hardhat. Ensure to link the OpenZeppelin contracts correctly when compiling.

## Security Considerations
This contract inherits security features from OpenZeppelin's contracts. However, it is essential to thoroughly test and audit the contract before deploying it on the mainnet, especially for functions that handle financial transactions or asset management.

## License
This project is licensed under the MIT License. See the SPDX-License-Identifier comment at the top of the contract for more information.
