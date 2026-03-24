export const PLAYER_MARKS = Object.freeze({
  X: 'X',
  O: 'O',
});

export const GAME_STATUS = Object.freeze({
  IDLE: 'idle',
  PLAYING: 'playing',
  WON: 'won',
  DRAW: 'draw',
});

export const WINNING_LINES = Object.freeze([
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]);

export function getNextPlayer(player) {
  return player === PLAYER_MARKS.X ? PLAYER_MARKS.O : PLAYER_MARKS.X;
}
