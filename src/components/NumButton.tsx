import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface IProps {
  value: string;
  handlePress: (value: string) => void;
  color?: keyof typeof styles;
}
export default function NumButton({
  value,
  handlePress,
  color = 'gray',
}: IProps) {
  return (
    <TouchableOpacity
      style={{ ...styles[color], ...styles.container }}
      onPress={() => handlePress(value)}>
      <Text style={styles.textContent}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
  },
  gray: {
    backgroundColor: 'darkgreen',
  },
  red: {
    backgroundColor: 'red',
  },
  blue: {
    backgroundColor: 'blue',
  },
  textContent: {
    fontSize: 25,
    color: 'white',
  },
});
