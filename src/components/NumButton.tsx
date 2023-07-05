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
    width: '17%',
    height: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  gray: {
    backgroundColor: 'gray',
  },
  red: {
    backgroundColor: 'red',
  },
  blue: {
    backgroundColor: 'blue',
  },
  textContent: {
    fontSize: 40,
    color: 'white',
  },
});
