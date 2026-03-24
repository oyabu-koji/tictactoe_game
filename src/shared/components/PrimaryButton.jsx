import { Pressable, StyleSheet, Text } from 'react-native';

export function PrimaryButton({
  label,
  onPress,
  variant = 'primary',
  testID,
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === 'secondary' ? styles.secondary : styles.primary,
        pressed ? styles.pressed : null,
      ]}
      testID={testID}
    >
      <Text
        style={[
          styles.label,
          variant === 'secondary' ? styles.secondaryLabel : styles.primaryLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minWidth: 160,
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#111827',
  },
  secondary: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  primaryLabel: {
    color: '#ffffff',
  },
  secondaryLabel: {
    color: '#111827',
  },
});
