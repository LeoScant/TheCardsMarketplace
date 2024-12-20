import {Entity, hasMany, model, property} from '@loopback/repository';
import {Cards} from './cards.model';
import {LikedCards} from './liked-cards.model';

@model({settings: {idInjection: false, postgresql: {schema: 'public', table: 'users'}}})
export class Users extends Entity {
  @property({
    type: 'number',
    jsonSchema: {nullable: false},
    scale: 0,
    generated: true,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO', generated: undefined},
  })
  id: number;

  @property({
    type: 'string',
    length: 50,
    postgresql: {columnName: 'username', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  username?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {columnName: 'email', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  email?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'password', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO', generated: undefined},
  })
  password?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 100,
    postgresql: {columnName: 'fullname', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  fullname?: string;

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'createdat', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  createdat?: string;

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'updatedat', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  updatedat?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 50,
    postgresql: {columnName: 'role', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  role?: string;

  @property({
    type: 'boolean',
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'isactive', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  isactive?: boolean;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 255,
    postgresql: {columnName: 'walletaddress', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  walletAddress?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'profileimage', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  profileimage?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'bio', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
  })
  bio?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    scale: 0,
    postgresql: {columnName: 'nonce', dataType: 'string', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES', generated: undefined},
  })
  nonce?: string;

  @hasMany(() => Cards, {
    through: {
      model: () => LikedCards,
      keyFrom: 'user_id',
      keyTo: 'card_id'
    },
    name: 'likedCards',
    keyTo: 'id'
  })
  likedCards: Cards[];

  @hasMany(() => Cards, {
    keyFrom: 'id',
    keyTo: 'owner_id',
    name: 'ownedCards'
  })
  ownedCards: Cards[];

  // Define well-known properties here

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  likedCards?: Cards[];
  ownedCards?: Cards[];
}

export type UsersWithRelations = Users & UsersRelations;
