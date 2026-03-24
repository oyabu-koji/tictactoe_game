import { GAME_STATUS, WINNING_LINES, getNextPlayer } from '../types/gameStatus';

export function evaluateBoard(board, currentPlayer) {
  for (const winningLine of WINNING_LINES) {
    const [firstIndex, secondIndex, thirdIndex] = winningLine;
    const firstMark = board[firstIndex].mark;

    if (
      firstMark !== null &&
      firstMark === board[secondIndex].mark &&
      firstMark === board[thirdIndex].mark
    ) {
      return {
        status: GAME_STATUS.WON,
        winner: currentPlayer,
        winningLine,
        message: `Winner: ${currentPlayer}`,
      };
    }
  }

  const isBoardFull = board.every((cell) => cell.mark !== null);

  if (isBoardFull) {
    return {
      status: GAME_STATUS.DRAW,
      winner: null,
      winningLine: null,
      message: 'Draw game',
    };
  }

  return {
    status: GAME_STATUS.PLAYING,
    winner: null,
    winningLine: null,
    message: `Turn: ${getNextPlayer(currentPlayer)}`,
  };
}
