import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IPageProps {
  navigation: NativeStackNavigationProp<ParamListBase, 'History'>;
}

export default function CalculationScreen({ navigation }: IPageProps) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="History" onPress={() => navigation.navigate('History')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
