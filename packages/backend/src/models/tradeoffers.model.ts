import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Cards} from './cards.model';
import {Users} from './users.model';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'trade_offers'}}
})
export class Tradeoffers extends Entity {
  @property({
    type: 'number',
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO', generated: true},
  })
  id: number;

  @property({
    type: 'date',
    postgresql: {columnName: 'createdat', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  createdat?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'updatedat', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  updatedat?: string;

  @belongsTo(() => Users, {name: 'userFrom'})
  from: number;

  @belongsTo(() => Users, {name: 'userTo'})
  to: number;

  @belongsTo(() => Cards, {name: 'cardToRel'})
  card_to: number;

  @belongsTo(() => Cards, {name: 'cardFromRel'})
  card_from: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Tradeoffers>) {
    super(data);
  }
}

export interface TradeoffersRelations {
  userFrom?: Users;
  userTo?: Users;
  cardFromRel?: Cards;
  cardToRel?: Cards;
}

export type TradeoffersWithRelations = Tradeoffers & TradeoffersRelations;
