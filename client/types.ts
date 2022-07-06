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
}

export type ServerData = {
    username: string;
    pychessURL: string;
    home: string;
    assetURL: string;
    fen: string;
    variant: string;
    _id: string;
    gameId?: string;
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
