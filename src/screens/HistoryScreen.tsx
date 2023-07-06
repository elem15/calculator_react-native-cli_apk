import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { HistoryContext } from '../../App';

export default function HistoryScreen() {
  const { history } = useContext(HistoryContext);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.historyText}>{history.join('\n')}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 20,
  },
  historyText: {
    fontSize: 20,
    color: 'black',
  },
});
