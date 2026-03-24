import { GAME_STATUS, PLAYER_MARKS } from '../types/gameStatus';

function createEmptyCell(index) {
  return {
    index,
    mark: null,
    isWinningCell: false,
  };
}

export function createInitialState() {
  return {
    board: Array.from({ length: 9 }, (_, index) => createEmptyCell(index)),
    currentPlayer: PLAYER_MARKS.X,
    status: GAME_STATUS.PLAYING,
    winner: null,
    winningLine: null,
    message: `Turn: ${PLAYER_MARKS.X}`,
  };
}
