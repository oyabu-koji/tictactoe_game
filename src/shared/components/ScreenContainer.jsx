import { StyleSheet, View } from 'react-native';

export function ScreenContainer({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdf7',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 24,
  },
});
