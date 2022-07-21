type UserId = string;

export type Puzzle = {
    _id: string;
    fen: string;
    variant: string;
    moves: string;
    eval: string;
    type: string;
    gameId?: string;
    uploadedBy?: string;
    site?: string;
}

export type ServerData = {
    username: string;
    pychessURL: string;
    home: string;
    assetURL: string;
    fen: string;
    variant: string;
    all: boolean;
    _id: string;
    gameId?: string;
    site?: string;
    moves: string;
    eval: string;
    type: string;
    ply?: number;
}

export interface Review {
  by: UserId;
  at: Date;
  approved: boolean;
}

const idChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const idLength = 5;

export function randomId() {
  let result = '';
  for (let i = idLength; i > 0; --i) result += idChars[Math.floor(Math.random() * idChars.length)];
  return result;
}
