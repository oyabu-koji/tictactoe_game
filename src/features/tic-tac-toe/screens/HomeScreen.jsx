import { StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../../../shared/components/PrimaryButton';
import { ScreenContainer } from '../../../shared/components/ScreenContainer';

export function HomeScreen({ onStartGame }) {
  return (
    <ScreenContainer>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Offline two-player game</Text>
        <Text style={styles.title}>TicTacToe Game</Text>
        <Text style={styles.body}>
          Start a quick local match on one device. No login, no network, no
          setup.
        </Text>
      </View>

      <PrimaryButton
        label="Start game"
        onPress={onStartGame}
        testID="start-game-button"
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    justifyContent: 'center',
  },
  eyebrow: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#b45309',
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#111827',
  },
  body: {
    marginTop: 14,
    maxWidth: 320,
    fontSize: 18,
    lineHeight: 27,
    color: '#4b5563',
  },
});
