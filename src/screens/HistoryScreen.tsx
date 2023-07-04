import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HistoryContext } from '../../App';

interface IPageProps {
  navigation: NativeStackNavigationProp<ParamListBase, 'Calculation'>;
  route: any;
}

export default function HistoryScreen({ navigation }: IPageProps) {
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
