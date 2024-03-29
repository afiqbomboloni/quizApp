import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Login';
import Register from '../Register';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen 
      options={{ 
        headerShown: false
       }}
      name="Login" component={Login} />
      <Stack.Screen name="Register"
      options={{ 
        headerShown: false
       }}
      component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
