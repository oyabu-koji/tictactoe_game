import { describe, expect, it } from '@jest/globals';

import { evaluateBoard } from '../logic/evaluateBoard';
import { GAME_STATUS } from '../types/gameStatus';

function createBoard(marks) {
  return marks.map((mark, index) => ({
    index,
    mark,
    isWinningCell: false,
  }));
}

describe('evaluateBoard', () => {
  it.each([
    {
      winningLine: [0, 1, 2],
      marks: ['X', 'X', 'X', null, 'O', null, 'O', null, null],
    },
    {
      winningLine: [3, 4, 5],
      marks: ['O', null, 'X', 'X', 'X', 'X', 'O', null, null],
    },
    {
      winningLine: [6, 7, 8],
      marks: ['O', null, null, 'O', null, 'X', 'X', 'X', 'X'],
    },
    {
      winningLine: [0, 3, 6],
      marks: ['X', 'O', null, 'X', 'O', null, 'X', null, null],
    },
    {
      winningLine: [1, 4, 7],
      marks: ['O', 'X', null, null, 'X', 'O', null, 'X', null],
    },
    {
      winningLine: [2, 5, 8],
      marks: ['O', null, 'X', 'O', null, 'X', null, null, 'X'],
    },
    {
      winningLine: [0, 4, 8],
      marks: ['X', 'O', null, null, 'X', 'O', null, null, 'X'],
    },
    {
      winningLine: [2, 4, 6],
      marks: ['O', null, 'X', 'O', 'X', null, 'X', null, null],
    },
  ])('detects the winning line $winningLine for the current player', ({ marks, winningLine }) => {
    const board = createBoard(marks);
    const result = evaluateBoard(board, 'X');

    expect(result.status).toBe(GAME_STATUS.WON);
    expect(result.winner).toBe('X');
    expect(result.winningLine).toEqual(winningLine);
    expect(result.message).toBe('Winner: X');
  });

  it('returns draw when the board is full and no line is completed', () => {
    const board = createBoard(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']);
    const result = evaluateBoard(board, 'X');

    expect(result.status).toBe(GAME_STATUS.DRAW);
    expect(result.winner).toBeNull();
    expect(result.winningLine).toBeNull();
    expect(result.message).toBe('Draw game');
  });

  it('returns the next turn when the game should continue', () => {
    const board = createBoard(['X', null, null, null, 'O', null, null, null, null]);
    const result = evaluateBoard(board, 'X');

    expect(result.status).toBe(GAME_STATUS.PLAYING);
    expect(result.message).toBe('Turn: O');
  });
});
