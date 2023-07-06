import React, { useEffect, useMemo, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NumButton from '../components/NumButton';
import { Operations } from '../components/types';
import { HistoryContext } from '../../App';

interface ISavedNumber {
  number: string;
  operation: Operations;
}

export default function CalculationScreen() {
  const [currentNumber, setCurrentNumber] = useState('');
  const [savedNumbers, setSavedNumbers] = useState<ISavedNumber[]>([]);
  const { history, setHistory } = useContext(HistoryContext);
  const [compute, setCompute] = useState(false);
  const [resultCompute, setResultCompute] = useState(false);
  const reset = () => {
    setCurrentNumber('');
    setSavedNumbers([]);
    setCompute(false);
  };
  const addNumberToScreen = (num: string) => {
    if (
      currentNumber === '' ||
      currentNumber === '0' ||
      currentNumber === 'Error! Too long number' ||
      currentNumber === 'Infinity' ||
      compute
    ) {
      setCurrentNumber(num);
      setCompute(false);
    } else if (currentNumber.length < 10) {
      setCurrentNumber(prev => prev + num);
    }
  };

  const savePrevNumber = (operand: Operations) => {
    if (
      currentNumber === 'Error! Too long number' ||
      currentNumber === 'Infinity'
    ) {
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
    setCurrentNumber('');
    setCompute(true);
  };
  useEffect(() => {
    const numbers = savedNumbers;
    setSavedNumbers([]);
    const calculate = (j: number) => {
      let op = Number(numbers[j].number);
      while (numbers[j].operation === '*' || numbers[j].operation === '/') {
        if (numbers[j].operation === '*') {
          op *= Number(numbers[j + 1].number);
        } else if (numbers[j].operation === '/') {
          op /= Number(numbers[j + 1].number);
        }
        j++;
      }
      return [op, j - 1];
    };
    const setResult = async () => {
      let result = Number(numbers[0].number);
      for (let i = 0; i < numbers.length; i++) {
        if (numbers[i].operation === '*') {
          result *= Number(numbers[i + 1].number);
        } else if (numbers[i].operation === '/') {
          result /= Number(numbers[i + 1].number);
        } else if (
          numbers[i].operation === '+' &&
          numbers[i + 1] &&
          numbers[i + 1].operation !== '*' &&
          numbers[i + 1].operation !== '/'
        ) {
          result += Number(numbers[i + 1].number);
        } else if (
          numbers[i].operation === '-' &&
          numbers[i + 1] &&
          numbers[i + 1].operation !== '*' &&
          numbers[i + 1].operation !== '/'
        ) {
          result -= Number(numbers[i + 1].number);
        } else if (numbers[i].operation === '-') {
          const [op, j] = calculate(i + 1);
          result -= op;
          i = j;
        } else if (numbers[i].operation === '+') {
          const [op, j] = calculate(i + 1);
          result += op;
          i = j;
        }
      }
      const numberToString = String(Number(result.toFixed(7)));
      const historyEl = savedNumbersToString + numberToString;
      setHistory([...history, historyEl]);
      setCurrentNumber(
        Number(numberToString).toFixed(1).length > 10
          ? 'Error! Too long number'
          : numberToString,
      );
    };
    if (resultCompute) {
      setResult();
    }
    setResultCompute(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultCompute]);

  const savedNumbersToString = useMemo(
    () =>
      savedNumbers.length > 0
        ? savedNumbers.reduce(
            (acc, item) => `${acc}${item.number}${item.operation}`,
            '',
          )
        : '',
    [savedNumbers],
  );
  return (
    <View style={styles.container}>
      <View style={styles.history}>
        <Text
          style={
            !resultCompute ? styles.historyText : styles.historyTextInvisible
          }>
          {savedNumbersToString}
          {currentNumber}
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
        <NumButton
          color="blue"
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
        <NumButton
          color="blue"
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
        <NumButton
          color="blue"
          value={Operations.multiply}
          handlePress={() => {
            savePrevNumber(Operations.multiply);
          }}
        />
      </View>
      <View style={styles.row}>
        <NumButton value={'C'} handlePress={reset} color="red" />
        <NumButton
          value="0"
          handlePress={() => {
            addNumberToScreen('0');
          }}
        />
        <NumButton
          color="blue"
          value={Operations.equals}
          handlePress={() => {
            savePrevNumber(Operations.equals);
            setResultCompute(true);
          }}
        />
        <NumButton
          color="blue"
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
    justifyContent: 'space-evenly',
    display: 'flex',
    flexDirection: 'column',
    rowGap: 25,
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
    alignItems: 'flex-end',
    borderRadius: 10,
    padding: 10,
  },
  screenText: {
    fontSize: 40,
    color: 'black',
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
    color: 'black',
  },
  historyTextInvisible: {
    display: 'none',
  },
});
import React, { useEffect, useMemo, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NumButton from '../components/NumButton';
import { Operations } from '../components/types';
import { HistoryContext } from '../../App';

interface ISavedNumber {
  number: string;
  operation: Operations;
}

export default function CalculationScreen() {
  const [currentNumber, setCurrentNumber] = useState('');
  const [savedNumbers, setSavedNumbers] = useState<ISavedNumber[]>([]);
  const { history, setHistory } = useContext(HistoryContext);
  const [compute, setCompute] = useState(false);
  const [resultCompute, setResultCompute] = useState(false);
  const reset = () => {
    setCurrentNumber('');
    setSavedNumbers([]);
    setCompute(false);
  };
  const addNumberToScreen = (num: string) => {
    if (
      currentNumber === '' ||
      currentNumber === '0' ||
      currentNumber === 'Error! Too long number' ||
      currentNumber === 'Infinity' ||
      compute
    ) {
      setCurrentNumber(num);
      setCompute(false);
    } else if (currentNumber.length < 10) {
      setCurrentNumber(prev => prev + num);
    }
  };

  const savePrevNumber = (operand: Operations) => {
    if (
      currentNumber === 'Error! Too long number' ||
      currentNumber === 'Infinity'
    ) {
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
    setCurrentNumber('');
    setCompute(true);
  };
  useEffect(() => {
    const numbers = savedNumbers;
    setSavedNumbers([]);
    const calculate = (j: number) => {
      let op = Number(numbers[j].number);
      while (numbers[j].operation === '*' || numbers[j].operation === '/') {
        if (numbers[j].operation === '*') {
          op *= Number(numbers[j + 1].number);
        } else if (numbers[j].operation === '/') {
          op /= Number(numbers[j + 1].number);
        }
        j++;
      }
      return [op, j - 1];
    };
    const setResult = async () => {
      let result = Number(numbers[0].number);
      for (let i = 0; i < numbers.length; i++) {
        if (numbers[i].operation === '*') {
          result *= Number(numbers[i + 1].number);
        } else if (numbers[i].operation === '/') {
          result /= Number(numbers[i + 1].number);
        } else if (
          numbers[i].operation === '+' &&
          numbers[i + 1] &&
          numbers[i + 1].operation !== '*' &&
          numbers[i + 1].operation !== '/'
        ) {
          result += Number(numbers[i + 1].number);
        } else if (
          numbers[i].operation === '-' &&
          numbers[i + 1] &&
          numbers[i + 1].operation !== '*' &&
          numbers[i + 1].operation !== '/'
        ) {
          result -= Number(numbers[i + 1].number);
        } else if (numbers[i].operation === '-') {
          const [op, j] = calculate(i + 1);
          result -= op;
          i = j;
        } else if (numbers[i].operation === '+') {
          const [op, j] = calculate(i + 1);
          result += op;
          i = j;
        }
      }
      const numberToString = String(Number(result.toFixed(7)));
      const historyEl = savedNumbersToString + numberToString;
      setHistory([...history, historyEl]);
      setCurrentNumber(
        Number(numberToString).toFixed(1).length > 10
          ? 'Error! Too long number'
          : numberToString,
      );
    };
    if (resultCompute) {
      setResult();
    }
    setResultCompute(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultCompute]);

  const savedNumbersToString = useMemo(
    () =>
      savedNumbers.length > 0
        ? savedNumbers.reduce(
            (acc, item) => `${acc}${item.number}${item.operation}`,
            '',
          )
        : '',
    [savedNumbers],
  );
  return (
    <View style={styles.container}>
      <View style={styles.history}>
        <Text
          style={
            !resultCompute ? styles.historyText : styles.historyTextInvisible
          }>
          {savedNumbersToString}
          {currentNumber}
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
        <NumButton
          color="blue"
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
        <NumButton
          color="blue"
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
        <NumButton
          color="blue"
          value={Operations.multiply}
          handlePress={() => {
            savePrevNumber(Operations.multiply);
          }}
        />
      </View>
      <View style={styles.row}>
        <NumButton value={'C'} handlePress={reset} color="red" />
        <NumButton
          value="0"
          handlePress={() => {
            addNumberToScreen('0');
          }}
        />
        <NumButton
          color="blue"
          value={Operations.equals}
          handlePress={() => {
            savePrevNumber(Operations.equals);
            setResultCompute(true);
          }}
        />
        <NumButton
          color="blue"
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
    justifyContent: 'space-evenly',
    display: 'flex',
    flexDirection: 'column',
    rowGap: 25,
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
    alignItems: 'flex-end',
    borderRadius: 10,
    padding: 10,
  },
  screenText: {
    fontSize: 40,
    color: 'black',
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
    color: 'black',
  },
  historyTextInvisible: {
    display: 'none',
  },
});
