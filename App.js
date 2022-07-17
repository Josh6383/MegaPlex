
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import VideoWebView from './screens/WebView';

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
          name='WebView' 
          component={VideoWebView} 
          headerShown={false}
          options={{
            headerTintColor: 'white', //'#ffd500',
            headerStyle: {
              backgroundColor: 'black'
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}