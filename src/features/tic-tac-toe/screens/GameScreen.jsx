import { StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../../../shared/components/PrimaryButton';
import { ScreenContainer } from '../../../shared/components/ScreenContainer';
import { GameBoard } from '../components/GameBoard';
import { ResultBanner } from '../components/ResultBanner';
import { useTicTacToeSession } from '../hooks/useTicTacToeSession';
import { GAME_STATUS } from '../types/gameStatus';

export function GameScreen({ onExit }) {
  const { state, placeMark, restartGame } = useTicTacToeSession();
  const isFinished =
    state.status === GAME_STATUS.WON || state.status === GAME_STATUS.DRAW;

  return (
    <ScreenContainer>
      <Text style={styles.title}>TicTacToe</Text>

      {isFinished ? (
        <ResultBanner message={state.message} status={state.status} />
      ) : (
        <Text style={styles.turnIndicator} testID="turn-indicator">
          {state.message}
        </Text>
      )}

      <GameBoard
        board={state.board}
        disabled={isFinished}
        onCellPress={placeMark}
      />

      <View style={styles.actions}>
        {isFinished ? (
          <PrimaryButton
            label="Play again"
            onPress={restartGame}
            testID="play-again-button"
          />
        ) : null}
        <PrimaryButton
          label="Back to home"
          onPress={onExit}
          testID="back-home-button"
          variant="secondary"
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
  },
  turnIndicator: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  actions: {
    marginTop: 'auto',
    gap: 12,
  },
});
