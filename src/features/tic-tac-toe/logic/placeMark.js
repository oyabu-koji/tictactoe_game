import { ValidationError } from '../../../shared/utils/ValidationError';
import { evaluateBoard } from './evaluateBoard';
import { GAME_STATUS, getNextPlayer } from '../types/gameStatus';

function createNextBoard(board, index, currentPlayer) {
  return board.map((cell) => {
    if (cell.index === index) {
      return {
        ...cell,
        mark: currentPlayer,
        isWinningCell: false,
      };
    }

    return {
      ...cell,
      isWinningCell: false,
    };
  });
}

function highlightWinningLine(board, winningLine) {
  if (!winningLine) {
    return board;
  }

  const winningIndexes = new Set(winningLine);

  return board.map((cell) => ({
    ...cell,
    isWinningCell: winningIndexes.has(cell.index),
  }));
}

export function placeMark(state, index) {
  if (!Number.isInteger(index) || index < 0 || index >= state.board.length) {
    throw new ValidationError('invalid board index', { index });
  }

  if (state.status !== GAME_STATUS.PLAYING) {
    return state;
  }

  if (state.board[index].mark !== null) {
    return state;
  }

  const nextBoard = createNextBoard(state.board, index, state.currentPlayer);
  const evaluation = evaluateBoard(nextBoard, state.currentPlayer);

  if (evaluation.status === GAME_STATUS.WON) {
    return {
      ...state,
      board: highlightWinningLine(nextBoard, evaluation.winningLine),
      status: evaluation.status,
      winner: evaluation.winner,
      winningLine: evaluation.winningLine,
      message: evaluation.message,
    };
  }

  if (evaluation.status === GAME_STATUS.DRAW) {
    return {
      ...state,
      board: nextBoard,
      status: evaluation.status,
      winner: null,
      winningLine: null,
      message: evaluation.message,
    };
  }

  return {
    ...state,
    board: nextBoard,
    currentPlayer: getNextPlayer(state.currentPlayer),
    status: evaluation.status,
    winner: null,
    winningLine: null,
    message: evaluation.message,
  };
}
