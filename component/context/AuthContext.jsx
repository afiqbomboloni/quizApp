import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [name, setName] =useState('')

  const register = (name, email, password) => {
    try {
      console.log('register');
      setIsLoading(true);
      fetch('http://localhost:8080/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama: name,
          email: email,
          password: password,
        }),
      })
        .then(response => response.json())
        .then(data => {
        
          const token = data.data.token;
          const name = data.data.name;
          setUserToken(token);
          setUserName(name);
          setIdUser(data.data.id);
          AsyncStorage.setItem('userToken', token);
          AsyncStorage.setItem('userName', name);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          Alert.alert(
            'Error',
            'Network request failed. Please check your internet connection.',
          );
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }
  const login = (email, password) => {
    try {
      console.log('login');
      setIsLoading(true);
      fetch('http://localhost:8080/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if(data.message == "error auth") {
            Alert.alert(
              'Error',
              'Invalid email or password.',
            );
            setIsLoading(false);
            return;
          }
          console.log(data);
          const token = data.data.token;
          const name = data.data.name;
          const id_user = data.data.id
          setUserToken(token);
          setUserName(name);
          setIdUser(id_user);
          
          AsyncStorage.setItem('userToken', token);
          AsyncStorage.setItem('userName', name);
          // AsyncStorage.setItem('idUser', id_user)
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          Alert.alert(
            'Error',
            'Network request failed. Please check your internet connection.',
          );
        });
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => {
    try {
      console.log('logout');
      setUserToken(null);
      AsyncStorage.removeItem('userToken');
      AsyncStorage.removeItem('userName');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem('userToken');
      let userName = await AsyncStorage.getItem('userName');
      let idUser = await AsyncStorage.getItem('idUser');
      setUserToken(userToken);
      setUserName(userName);
      setIdUser(idUser);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true)
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider value={{login, logout, register, isLoading, userToken, userName, idUser}}>
      {children}
    </AuthContext.Provider>
  );
};
