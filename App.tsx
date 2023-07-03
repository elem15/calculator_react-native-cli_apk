import * as React from 'react';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import CalculationScreen from './src/screens/CalculationScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import { Button } from 'react-native';

interface IPageProps {
  navigation: NativeStackNavigationProp<ParamListBase, 'History'>;
}

const Stack = createNativeStackNavigator();

export const HistoryContext = React.createContext({
  history: [] as string[],
  setHistory: (() => { }) as React.Dispatch<React.SetStateAction<string[]>>,
});

function App() {
  const [history, setHistory] = React.useState<string[]>([]);
  const value = React.useMemo(() => ({ history, setHistory }), [history]);
  return (
    <HistoryContext.Provider value={value}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Calculation"
            component={CalculationScreen}
            options={({ navigation }: IPageProps) => ({
              title: 'Calculator',
              // eslint-disable-next-line react/no-unstable-nested-components
              headerRight: () => {
                return (
                  <Button
                    title="History"
                    onPress={() => navigation.navigate('History')}
                  />
                );
              },
            })}
          />
          <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={({ navigation }: IPageProps) => ({
              title: 'History',
              // eslint-disable-next-line react/no-unstable-nested-components
              headerRight: () => {
                return (
                  <Button
                    title="Calculator"
                    onPress={() => navigation.navigate('Calculation')}
                  />
                );
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </HistoryContext.Provider>
  );
}

export default App;
