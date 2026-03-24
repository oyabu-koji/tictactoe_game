import { useEffect, useRef, useState } from 'react';

import { createInitialState } from '../logic/createInitialState';
import { placeMark as applyPlaceMark } from '../logic/placeMark';
import { GAME_STATUS } from '../types/gameStatus';
import { feedbackService } from '../services/feedbackService';

export function useTicTacToeSession() {
  const [state, setState] = useState(() => createInitialState());
  const previousStateRef = useRef(null);

  useEffect(() => {
    const previousState = previousStateRef.current;

    if (previousState !== null && state.board !== previousState.board) {
      let eventName = 'move';

      if (state.status === GAME_STATUS.WON) {
        eventName = 'win';
      } else if (state.status === GAME_STATUS.DRAW) {
        eventName = 'draw';
      } else if (previousState.status !== GAME_STATUS.PLAYING) {
        eventName = 'restart';
      }

      void feedbackService.trigger(eventName).catch(() => {});
    }

    previousStateRef.current = state;
  }, [state]);

  function placeMark(index) {
    setState((currentState) => applyPlaceMark(currentState, index));
  }

  function restartGame() {
    setState(createInitialState());
  }

  return {
    state,
    placeMark,
    restartGame,
  };
}
