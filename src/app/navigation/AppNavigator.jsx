import { useState } from 'react';

import { GameScreen } from '../../features/tic-tac-toe/screens/GameScreen';
import { HomeScreen } from '../../features/tic-tac-toe/screens/HomeScreen';

export const APP_SCREENS = Object.freeze({
  HOME: 'home',
  GAME: 'game',
});

export function AppNavigator() {
  const [screen, setScreen] = useState(APP_SCREENS.HOME);

  if (screen === APP_SCREENS.GAME) {
    return <GameScreen onExit={() => setScreen(APP_SCREENS.HOME)} />;
  }

  return <HomeScreen onStartGame={() => setScreen(APP_SCREENS.GAME)} />;
}
