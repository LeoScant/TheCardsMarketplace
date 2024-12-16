import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {recoverPersonalSignature} from 'eth-sig-util';
import {bufferToHex} from 'ethereumjs-util';
import {generateToken} from '../authentication-strategies/jwt-strategy';
import {UsersRepository} from '../repositories';
import {AppError, ErrorCodes, handleError} from '../utils/error.utils';
import {generateNonce} from '../utils/utils';

@injectable({scope: BindingScope.TRANSIENT})
export class UserService {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
  ) { }

  /**
   * Retrieves the nonce for a given wallet address.
   * If the user does not exist, a new user is created.
   * @param walletAddress The wallet address for which to retrieve the nonce.
   * @returns The nonce value of the user.
   * @throws AppError if the wallet address is not provided or if there's a database error.
   */
  async getNonce(walletAddress: string) {
    try {
      if (!walletAddress) {
        throw new AppError('Wallet address is required', 400, ErrorCodes.VALIDATION_ERROR);
      }

      // Check if the user exists
      let user = await this.usersRepository.findOne({where: {walletAddress: walletAddress}});

      // If the user does not exist, create a new user
      if (!user) {
        user = await this.createUser(walletAddress);
      }

      if (!user?.nonce) {
        throw new AppError('Failed to generate nonce', 500, ErrorCodes.DATABASE_ERROR);
      }

      return user.nonce;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Creates a new user with the specified wallet address.
   * @param walletAddress The wallet address of the user.
   * @returns The newly created user.
   * @throws AppError if the wallet address is not provided or if there's a database error.
   */
  async createUser(walletAddress: string) {
    try {
      if (!walletAddress) {
        throw new AppError('Wallet address is required', 400, ErrorCodes.VALIDATION_ERROR);
      }

      // Generate a nonce and create the user
      const nonce = generateNonce();
      const newUser = await this.usersRepository.create({walletAddress: walletAddress, nonce});

      if (!newUser) {
        throw new AppError('Failed to create user', 500, ErrorCodes.DATABASE_ERROR);
      }

      return newUser;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Logs in a user by verifying the wallet address and signature.
   * @param walletAddress The wallet address of the user.
   * @param signature The signature provided by the user.
   * @returns An object containing the generated token and user information.
   * @throws AppError for various validation and authentication errors.
   */
  async login(walletAddress: string, signature: string) {
    try {
      if (!walletAddress) {
        throw new AppError('Wallet address is required', 400, ErrorCodes.VALIDATION_ERROR);
      }
      if (!signature) {
        throw new AppError('Signature is required', 400, ErrorCodes.VALIDATION_ERROR);
      }

      // Check if the user exists
      const user = await this.usersRepository.findOne({
        where: {walletAddress: walletAddress},
        include: ['likedCards', 'ownedCards']
      });

      if (!user) {
        throw new AppError('User not found', 404, ErrorCodes.NOT_FOUND);
      }

      const nonce = user.nonce;
      if (!nonce) {
        throw new AppError('Nonce not found', 400, ErrorCodes.VALIDATION_ERROR);
      }

      // Verify the signature
      const msgBufferHex = bufferToHex(Buffer.from(nonce, 'utf8'));
      const address = recoverPersonalSignature({
        data: msgBufferHex,
        sig: signature,
      });

      // The signature verification is successful if the recovered address matches the user's publicAddress
      if (address.toLowerCase() === walletAddress.toLowerCase()) {
        // Create a JWT or session identifier
        const token = await generateToken(walletAddress, user.id);

        // Update the user's nonce value
        const newNonce = generateNonce();
        await this.usersRepository.updateById(user.id, {nonce: newNonce});

        return {token, user};
      } else {
        throw new AppError('Invalid signature', 401, ErrorCodes.UNAUTHORIZED);
      }
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Retrieves the liked cards for a user.
   * @param userId The ID of the user.
   * @returns Array of liked cards.
   * @throws AppError if the user is not found or if there's a database error.
   */
  async getLikedCards(userId: number) {
    try {
      const user = await this.usersRepository.findById(userId, {
        include: [{relation: 'likedCards'}]
      });

      if (!user) {
        throw new AppError('User not found', 404, ErrorCodes.NOT_FOUND);
      }

      return user.likedCards || [];
    } catch (error) {
      throw handleError(error);
    }
  }
}
