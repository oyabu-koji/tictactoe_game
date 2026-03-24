import { describe, expect, it } from '@jest/globals';

import { createInitialState } from '../logic/createInitialState';
import { placeMark } from '../logic/placeMark';
import { ValidationError } from '../../../shared/utils/ValidationError';
import { GAME_STATUS } from '../types/gameStatus';

describe('placeMark', () => {
  it('places a mark and switches the turn on a valid move', () => {
    const nextState = placeMark(createInitialState(), 0);

    expect(nextState.board[0].mark).toBe('X');
    expect(nextState.currentPlayer).toBe('O');
    expect(nextState.status).toBe(GAME_STATUS.PLAYING);
    expect(nextState.message).toBe('Turn: O');
  });

  it('ignores a move on an occupied cell', () => {
    const currentState = placeMark(createInitialState(), 0);
    const nextState = placeMark(currentState, 0);

    expect(nextState).toBe(currentState);
  });

  it('throws a validation error for an out-of-range index', () => {
    expect(() => placeMark(createInitialState(), 9)).toThrow(ValidationError);
  });
});
