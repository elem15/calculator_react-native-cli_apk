import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface IProps {
  value: string;
  handlePress: (value: string) => void;
}
export default function NumButton({ value, handlePress }: IProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handlePress(value)}>
      <Text style={styles.textContent}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    margin: 10,
    width: 80,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textContent: {
    fontSize: 40,
    color: 'white',
  },
});
