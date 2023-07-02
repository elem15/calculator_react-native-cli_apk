import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Operations } from './types';

interface IProps {
  value: Operations;
  handlePress: (value: Operations) => void;
}
export default function OperationButton({ value, handlePress }: IProps) {
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
    backgroundColor: 'blue',
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
