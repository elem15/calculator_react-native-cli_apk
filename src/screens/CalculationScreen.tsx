import React, { useState } from 'react';
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
interface ISavedNumber {
  number: string;
  operation: Operations;
}
export default function CalculationScreen() {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [savedNumbers, setSavedNumbers] = useState<ISavedNumber[]>([]);

  const addNumberToScreen = (num: string) => {
    if (currentNumber === '0') {
      setCurrentNumber(num);
    } else if (currentNumber.length < 10) {
      setCurrentNumber(prev => prev + num);
    }
  };

  const savePrevNumber = (operand: Operations) => {
    const prevNumber: ISavedNumber = {
      number: currentNumber,
      operation: operand,
    };
    setSavedNumbers(saved => {
      return [...saved, prevNumber];
    });
    setCurrentNumber('0');
  };
  return (
    <View style={styles.container}>
      <View style={styles.history}>
        <Text style={styles.historyText}>
          {savedNumbers.length &&
            savedNumbers.map((item, idx) => (
              <Text key={idx}>
                {item.number}
                {item.operation}
              </Text>
            ))}
        </Text>
      </View>
      <View style={styles.screen}>
        <Text style={styles.screenText}>{currentNumber}</Text>
      </View>
      <View style={styles.row}>
        <NumButton
          value="1"
          handlePress={() => {
            addNumberToScreen('1');
          }}
        />
        <NumButton
          value="2"
          handlePress={() => {
            addNumberToScreen('2');
          }}
        />
        <NumButton
          value="3"
          handlePress={() => {
            addNumberToScreen('3');
          }}
        />
        <OperationButton
          value={Operations.plus}
          handlePress={() => {
            savePrevNumber(Operations.plus);
          }}
        />
      </View>
      <View style={styles.row}>
        <NumButton
          value="4"
          handlePress={() => {
            addNumberToScreen('4');
          }}
        />
        <NumButton
          value="5"
          handlePress={() => {
            addNumberToScreen('5');
          }}
        />
        <NumButton
          value="6"
          handlePress={() => {
            addNumberToScreen('6');
          }}
        />
        <OperationButton value={Operations.minus} handlePress={() => { }} />
      </View>
      <View style={styles.row}>
        <NumButton
          value="7"
          handlePress={() => {
            addNumberToScreen('7');
          }}
        />
        <NumButton
          value="8"
          handlePress={() => {
            addNumberToScreen('8');
          }}
        />
        <NumButton
          value="9"
          handlePress={() => {
            addNumberToScreen('9');
          }}
        />
        <OperationButton value={Operations.multiply} handlePress={() => { }} />
      </View>
      <View style={styles.row}>
        <ResetButton
          value={'C'}
          handlePress={() => {
            setCurrentNumber('0');
          }}
        />
        <NumButton
          value="0"
          handlePress={() => {
            addNumberToScreen('0');
          }}
        />
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
    rowGap: 20,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  screen: {
    borderColor: 'gray',
    backgroundColor: 'white',
    color: 'black',
    width: '90%',
    height: 80,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 10,
    padding: 10,
  },
  screenText: {
    fontSize: 50,
  },
  history: {
    color: 'black',
    width: '90%',
    height: 80,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 10,
    padding: 10,
  },
  historyText: {
    fontSize: 30,
  },
});
