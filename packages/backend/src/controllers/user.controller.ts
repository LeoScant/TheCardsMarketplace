import {AuthenticationBindings, authenticate} from "@loopback/authentication";
import {inject, service} from '@loopback/core';
import {get, oas, param, post, requestBody} from '@loopback/rest';
import {UserProfile} from "@loopback/security";
import {UserService} from '../services';

@oas.tags('users')
export class UserController {
  constructor(
    @service(UserService)
    public userService: UserService,
  ) { }

  @get('/users/getNonce')
  @oas.response(200, {
    description: 'Get nonce for wallet address',
    content: {'application/json': {schema: {type: 'string'}}},
  })
  async getNonce(
    @param.query.string('walletAddress', {
      description: 'Wallet address to get nonce for',
      required: true,
    }) walletAddress: string,
  ) {
    return await this.userService.getNonce(walletAddress);
  }

  @post('/users/login')
  @oas.response(200, {
    description: 'Login with wallet address and signature',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            token: {type: 'string'},
            user: {
              type: 'object',
              properties: {
                id: {type: 'number'},
                walletAddress: {type: 'string'},
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody({
      description: 'Login credentials',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['walletAddress', 'signature'],
            properties: {
              walletAddress: {type: 'string'},
              signature: {type: 'string'},
            },
          },
        },
      },
    }) body: {walletAddress: string; signature: string},
  ) {
    return await this.userService.login(body.walletAddress, body.signature);
  }

  @authenticate('jwt')
  @get('/users/likedCards')
  @oas.response(200, {
    description: 'Get liked cards for authenticated user',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {type: 'number'},
              title: {type: 'string'},
              description: {type: 'string'},
              imageurl: {type: 'string'},
            },
          },
        },
      },
    },
  })
  async getLikedCards(
    @inject(AuthenticationBindings.CURRENT_USER) user: UserProfile,
  ) {
    return await this.userService.getLikedCards(user.userId);
  }
}
