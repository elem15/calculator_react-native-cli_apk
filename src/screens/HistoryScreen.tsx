import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IPageProps {
  navigation: NativeStackNavigationProp<ParamListBase, 'Calculation'>;
}

export default function HistoryScreen({ navigation }: IPageProps) {
  return (
    <View style={styles.container}>
      <Button
        title="Calculation"
        onPress={() => navigation.navigate('Calculation')}
      />
      <Text>History</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
