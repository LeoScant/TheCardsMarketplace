import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {LikedCards} from '../models';
import {LikedCardsRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class LikedCardsService {
  constructor(
    @repository(LikedCardsRepository)
    public likedCardsRepository: LikedCardsRepository,
  ) { }

  async create(card_id: number, user_id: number) {
    const likedCard = new LikedCards({card_id, user_id});
    return await this.likedCardsRepository.create(likedCard);
  }

  async remove(card_id: number, user_id: number) {
    const likedCard = await this.findByCardIdUserId(card_id, user_id);
    if (!likedCard) throw new Error('Liked card not found')
    return await this.likedCardsRepository.deleteById(likedCard?.id);
  }

  async findByCardIdUserId(card_id: number, user_id: number) {
    return await this.likedCardsRepository.findOne({where: {and: [{card_id}, {user_id}]}});
  }
}
