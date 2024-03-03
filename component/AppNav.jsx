import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './Navigator/AuthNavigator';
import AppNavigator from './Navigator/AppNavigator';
import {useContext} from 'react';
import {AuthContext} from './context/AuthContext';
import {ActivityIndicator, View} from 'react-native';

export default function AppNav() {
  const {isLoading, userToken} = useContext(AuthContext);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userToken !== null ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
