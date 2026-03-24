import { Pressable, StyleSheet, Text } from 'react-native';

export function MarkCell({ cell, disabled, onPress }) {
  return (
    <Pressable
      accessibilityLabel={`Cell ${cell.index + 1}`}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.cell,
        cell.mark !== null ? styles.filledCell : null,
        cell.isWinningCell ? styles.winningCell : null,
        pressed && !disabled ? styles.pressedCell : null,
      ]}
      testID={`cell-${cell.index}`}
    >
      <Text style={styles.mark} testID={`cell-${cell.index}-mark`}>
        {cell.mark ?? ''}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledCell: {
    borderColor: '#9ca3af',
  },
  winningCell: {
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
  },
  pressedCell: {
    transform: [{ scale: 0.97 }],
  },
  mark: {
    fontSize: 42,
    fontWeight: '800',
    color: '#111827',
  },
});
