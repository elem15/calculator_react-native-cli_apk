import React, { useEffect, useMemo, useState } from 'react';
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
export default function CalculationScreen({ navigation }: IPageProps) {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [savedNumbers, setSavedNumbers] = useState<ISavedNumber[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [compute, setCompute] = useState(false);
  const reset = () => {
    setCurrentNumber('0');
    setSavedNumbers([]);
  };
  const addNumberToScreen = (num: string) => {
    if (currentNumber === '0' || currentNumber === 'Error! Too long number') {
      setCurrentNumber(num);
    } else if (currentNumber.length < 10) {
      setCurrentNumber(prev => prev + num);
    }
  };

  const savePrevNumber = (operand: Operations) => {
    if (currentNumber === 'Error! Too long number') {
      reset();
      return;
    }
    const prevNumber: ISavedNumber = {
      number: currentNumber,
      operation: operand,
    };
    setSavedNumbers(saved => {
      return [...saved, prevNumber];
    });
    setCurrentNumber('0');
  };
  useEffect(() => {
    const setResult = async () => {
      let operand = '+';
      const result = savedNumbers.reduce((acc, item) => {
        switch (operand) {
          case '+':
            acc += +item.number;
            break;
          case '-':
            acc -= +item.number;
            break;
          case '*':
            acc *= +item.number;
            break;
          case '/':
            acc /= +item.number;
            break;
          default:
            break;
        }
        operand = item.operation;
        return acc;
      }, 0);
      setSavedNumbers([]);
      const numberToString = String(Number(result.toFixed(7)));
      const historyEl = savedNumbersToString + numberToString;
      setHistory([...history, historyEl]);
      setCurrentNumber(
        Number(numberToString).toFixed(1).length > 10
          ? 'Error! Too long number'
          : numberToString,
      );
    };
    if (compute) {
      setResult();
    }
    setCompute(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compute]);

  const savedNumbersToString = useMemo(
    () =>
      savedNumbers.length &&
      savedNumbers.reduce(
        (acc, item) => acc + item.number + item.operation,
        '',
      ),
    [savedNumbers],
  );

  return (
    <View style={styles.container}>
      <Button
        title="History"
        onPress={() =>
          navigation.navigate('History', { history: history.join('\n') })
        }
      />
      <View style={styles.history}>
        <Text style={styles.historyText}>{savedNumbersToString}</Text>
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
        <OperationButton
          value={Operations.minus}
          handlePress={() => {
            savePrevNumber(Operations.minus);
          }}
        />
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
        <OperationButton
          value={Operations.multiply}
          handlePress={() => {
            savePrevNumber(Operations.multiply);
          }}
        />
      </View>
      <View style={styles.row}>
        <ResetButton value={'C'} handlePress={reset} />
        <NumButton
          value="0"
          handlePress={() => {
            addNumberToScreen('0');
          }}
        />
        <OperationButton
          value={Operations.equals}
          handlePress={() => {
            savePrevNumber(Operations.equals);
            setCompute(true);
          }}
        />
        <OperationButton
          value={Operations.divide}
          handlePress={() => {
            savePrevNumber(Operations.divide);
          }}
        />
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
