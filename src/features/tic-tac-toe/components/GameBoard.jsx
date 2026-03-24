import { StyleSheet, View } from 'react-native';

import { MarkCell } from './MarkCell';

export function GameBoard({ board, disabled, onCellPress }) {
  return (
    <View style={styles.board} testID="game-board">
      {board.map((cell) => (
        <MarkCell
          cell={cell}
          disabled={disabled || cell.mark !== null}
          key={cell.index}
          onPress={() => onCellPress(cell.index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
});
