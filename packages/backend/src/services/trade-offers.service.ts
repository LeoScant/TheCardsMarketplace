import {BindingScope, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {TradeoffersRepository} from '../repositories';
import {getApproved, safeTransferFrom} from '../utils/utils';
import {CardService} from './card.service';

@injectable({scope: BindingScope.TRANSIENT})
export class TradeOffersService {
  constructor(
    @repository(TradeoffersRepository)
    public tradeOffersRepository: TradeoffersRepository,
    @service(CardService)
    public cardService: CardService,
  ) { }

  // This function is called to see all trade offers for a user
  async getTradeOffersByUserTo(userId: number) {
    return this.tradeOffersRepository.find({
      where: {to: userId},
      include: ['cardFromRel', 'cardToRel', 'userFrom', 'userTo']
    });
  }

  // This function is called to create a new trade offer
  async createTradeOffer(cardFromId: number, cardToId: number, userFromId: number) {
    const cardFrom = await this.cardService.getCardById(cardFromId);
    const cardTo = await this.cardService.getCardById(cardToId);

    if (!cardFrom) throw new Error('Card from not found');
    if (!cardTo) throw new Error('Card to not found');
    if (cardFrom.owner_id !== userFromId) throw new Error('User is not the owner of the card');

    return this.tradeOffersRepository.create({card_from: cardFromId, card_to: cardToId, to: cardTo.owner_id, from: userFromId});
  }

  // This function is called when a user wants to accept a trade offer
  async acceptTradeOffer(tradeOfferId: number, userToId: number) {
    // Check if trade offer exists and if the user is the user that received the trade offer
    const tradeOffer = await this.tradeOffersRepository.findById(tradeOfferId);
    if (!tradeOffer) throw new Error('Trade offer not found');
    if (tradeOffer.to !== userToId) throw new Error('User is not the userTo of the trade offer');

    const cardFrom = await this.cardService.getCardById(tradeOffer.card_from);
    const cardTo = await this.cardService.getCardById(tradeOffer.card_to);

    if (!cardFrom) throw new Error('Card from not found');
    if (!cardTo) throw new Error('Card to not found');

    const cardFromOwnerId = cardFrom.owner_id;
    const cardToOwnerId = cardTo.owner_id;

    // Swap the owners of the cards
    cardFrom.owner_id = cardToOwnerId;
    cardTo.owner_id = cardFromOwnerId;

    if (cardFrom.tokenId && cardTo.tokenId && cardFrom.owner?.walletAddress && cardTo.owner?.walletAddress) {
      // Check if our wallet has been approved to transfer the NFTs
      const approvedAddress1 = await getApproved(cardFrom.tokenId)
      if (approvedAddress1 !== process.env.ETH_ADDRESS) throw new Error('Trade not approved');
      const approvedAddress2 = await getApproved(cardTo.tokenId)
      if (approvedAddress2 !== process.env.ETH_ADDRESS) throw new Error('Trade not approved');

      // Transfer the NFTs
      await safeTransferFrom(cardFrom.owner.walletAddress, cardTo.owner.walletAddress, cardFrom.tokenId);
      await safeTransferFrom(cardTo.owner.walletAddress, cardFrom.owner.walletAddress, cardTo.tokenId);
    }

    // Update the owners of the cards
    await this.cardService.cardRepository.updateById(cardFrom.id, {owner_id: cardToOwnerId});
    await this.cardService.cardRepository.updateById(cardTo.id, {owner_id: cardFromOwnerId});

    // Delete the trade offer
    await this.tradeOffersRepository.deleteById(tradeOfferId);

    return {cardFrom, cardTo};
  }
}
