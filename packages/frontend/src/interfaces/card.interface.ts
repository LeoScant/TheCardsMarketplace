export interface ICard {
    id: number;
    title: string;
    description: string;
    imageurl: string;
    tokenId?: string;
    ownerId?: number;
    owner?: {walletAddress: string};
}

export interface IUser {
    id: number;
    walletAddress: string;
    username: string;
    password: string;
    email: string;
    token: string;
    likedCards: ICard[];
}