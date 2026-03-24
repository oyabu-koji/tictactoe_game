import { StyleSheet, Text, View } from 'react-native';

import { GAME_STATUS } from '../types/gameStatus';

export function ResultBanner({ status, message }) {
  if (status !== GAME_STATUS.WON && status !== GAME_STATUS.DRAW) {
    return null;
  }

  return (
    <View style={styles.banner} testID="result-banner">
      <Text style={styles.label}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginBottom: 20,
    borderRadius: 18,
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  label: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
});
