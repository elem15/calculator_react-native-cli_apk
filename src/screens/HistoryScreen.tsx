import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IPageProps {
  navigation: NativeStackNavigationProp<ParamListBase, 'Calculation'>;
  route: any;
}

export default function HistoryScreen({ navigation, route }: IPageProps) {
  const { history } = route.params;
  return (
    <View style={styles.container}>
      <Button
        title="Calculation"
        onPress={() => navigation.navigate('Calculation')}
      />
      <Text style={styles.historyText}>{history}</Text>
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
  },
});
