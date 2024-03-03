import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Home';
import QuizAll from '../QuizAll';
import Question from '../Question';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen 
      name="Home" 
      component={Home}
      options={{ 
        headerShown: false
       }} />
       <Stack.Screen 
      name="QuizAll" 
      component={QuizAll}
      options={{ 
        headerShown: false
       }} />
        <Stack.Screen 
      name="Question" 
      component={Question}
      initialParams={{ item: {judul: 'judul', deskripsi: 'deskripsi', id: 3}}}
      options={{ 
        headerShown: false
       }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
