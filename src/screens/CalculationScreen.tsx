import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NumButton from '../components/NumButton';
import OperationButton from '../components/OperationButton';
import ResetButton from '../components/ResetButton';
import { Operations } from '../components/types';

interface IPageProps {
  navigation: NativeStackNavigationProp<ParamListBase, 'History'>;
}

export default function CalculationScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <NumButton value="1" handlePress={() => { }} />
        <NumButton value="2" handlePress={() => { }} />
        <NumButton value="3" handlePress={() => { }} />
        <OperationButton value={Operations.plus} handlePress={() => { }} />
      </View>
      <View style={styles.row}>
        <NumButton value="4" handlePress={() => { }} />
        <NumButton value="5" handlePress={() => { }} />
        <NumButton value="6" handlePress={() => { }} />
        <OperationButton value={Operations.minus} handlePress={() => { }} />
      </View>
      <View style={styles.row}>
        <NumButton value="7" handlePress={() => { }} />
        <NumButton value="8" handlePress={() => { }} />
        <NumButton value="9" handlePress={() => { }} />
        <OperationButton value={Operations.multiply} handlePress={() => { }} />
      </View>
      <View style={styles.row}>
        <ResetButton value={'C'} handlePress={() => { }} />
        <NumButton value="0" handlePress={() => { }} />
        <OperationButton value={Operations.equals} handlePress={() => { }} />
        <OperationButton value={Operations.divide} handlePress={() => { }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
});
