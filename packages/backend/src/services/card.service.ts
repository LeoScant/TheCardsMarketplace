import {BindingScope, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Cards, Users} from '../models';
import {CardsRepository} from '../repositories';
import {burnNFT, mintNFT, pinJSONToIPFS} from '../utils/utils';
import {LikedCardsService} from './liked-cards.service';
import {UserService} from './user.service';

interface IpfsResponse {
  IpfsHash: string;
}

@injectable({scope: BindingScope.TRANSIENT})
export class CardService {
  constructor(
    @repository(CardsRepository)
    public cardRepository: CardsRepository,
    @service(LikedCardsService)
    public likedCardsService: LikedCardsService,
    @service(UserService)
    public userService: UserService,
  ) { }

  // This function is called when a user wants to see all cards
  async getAllCards() {
    return await this.cardRepository.find({include: [{relation: 'owner', scope: {fields: {walletAddress: true}}}]});
  }

  // This function is called when a user wants to see their own cards
  async getCardsByOwner(userId: number) {
    return await this.cardRepository.find({where: {owner_id: userId}});
  }

  // This function is called when a user likes or unlikes a card
  async likeCard(cardId: number, userId: number) {
    // Check if card exists
    const card = await this.cardRepository.findById(cardId, {include: [{relation: 'users'}]});
    if (!card) throw new Error('Card not found');

    // Check if user already liked the card
    const userIsIncluded = card?.users?.find(
      (user: Users) => user.id === userId);

    // If user already liked the card, remove the like, otherwise add it
    if (userIsIncluded) await this.likedCardsService.remove(cardId, userId);
    else await this.likedCardsService.create(cardId, userId);

    // Return the updated card
    return await this.userService.getLikedCards(userId);
  }

  // This function is called to create a new card
  async createCard(card: Cards, walletAddress: string, userId: number) {
    try {
      console.log('Creating card with data:', { card, walletAddress, userId });
      
      // Set the user as the owner of the card
      card.owner_id = userId;

      // Upload the card to IPFS
      console.log('Uploading to IPFS...');
      const ipfsResponse: IpfsResponse = await pinJSONToIPFS(card.title, card.description, card.imageurl);
      console.log('IPFS Response:', ipfsResponse);

      // Mint the card as an NFT and save the token ID
      console.log('Minting NFT...');
      card.tokenId = await mintNFT(ipfsResponse.IpfsHash, walletAddress);
      console.log('NFT minted with token ID:', card.tokenId);

      // Create the card in the DB
      console.log('Creating card in database...');
      const result = await this.cardRepository.create(card);
      console.log('Card created successfully:', result);
      
      return result;
    } catch (error) {
      console.error('Error in createCard:', error);
      throw error;
    }
  }

  // This function is called to delete a card
  async deleteCard(cardId: number, userId: number) {

    // Check if card exists and if the user is the owner of the card
    const card = await this.cardRepository.findById(cardId);
    if (!card) throw new Error('Card not found');
    if (card.owner_id !== userId) throw new Error('User is not the owner of the card');

    // Burn the NFT and delete the card from the DB
    if (card.tokenId) await burnNFT(card.tokenId);
    return await this.cardRepository.deleteById(cardId);
  }

  // This function is called to see a specific card
  async getCardById(cardId: number) {
    return await this.cardRepository.findById(cardId, {include: ['owner']});
  }
}
