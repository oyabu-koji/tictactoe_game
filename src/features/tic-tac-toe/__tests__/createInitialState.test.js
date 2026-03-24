import { describe, expect, it } from '@jest/globals';

import { createInitialState } from '../logic/createInitialState';
import { GAME_STATUS, PLAYER_MARKS } from '../types/gameStatus';

describe('createInitialState', () => {
  it('creates an empty 3x3 board with the first turn set to X', () => {
    const state = createInitialState();

    expect(state.board).toHaveLength(9);
    expect(state.board.every((cell) => cell.mark === null)).toBe(true);
    expect(state.currentPlayer).toBe(PLAYER_MARKS.X);
    expect(state.status).toBe(GAME_STATUS.PLAYING);
    expect(state.message).toBe('Turn: X');
  });
});
