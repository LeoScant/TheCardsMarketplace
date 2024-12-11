// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TheCardsEmporiumNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    event NFTMinted(address indexed to, uint256 indexed tokenId);
    event NFTBurned(uint256 indexed tokenId);

    constructor() ERC721("The Cards Emporium NFT", "TCE") Ownable(msg.sender) {}

    function mint(address to, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        emit NFTMinted(to, tokenId);
        return tokenId;
    }

    function burn(uint256 tokenId) public onlyOwner {
        _burn(tokenId);
        emit NFTBurned(tokenId);
    }
}

