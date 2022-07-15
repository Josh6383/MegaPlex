
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Info from './screens/Info';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName ='Home'>
        <Stack.Screen  
          name='MegaPlex' 
          component={Home} 
          options={{
            headerTintColor: 'white', //'#ffd500',
            headerStyle: {
              backgroundColor: 'black'
            }
          }}
        />
        <Stack.Screen  
          name='Information' 
          component={Info} 
          options={{
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'black'
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}