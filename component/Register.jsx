import Axios from 'axios';
import { useContext, useState } from 'react';
import {View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert} from 'react-native';
import { AuthContext } from './context/AuthContext';


export default function Register({navigation}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {register} = useContext(AuthContext);
  

  const handleRegister = () => {

    fetch("http://localhost:8080/v1/register", {
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
        console.log(data);
        if (data.message === 'Success') {
          Alert.alert('Success', 'Register Success', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home'),
              // onPress: () => navigation.navigate('Login'),
            },
          ]);
        } else {
          Alert.alert('Error', 'Register Failed', [
            {
              text: 'OK',
            },
          ]);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'Network request failed. Please check your internet connection.');
      
    })
  }
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/avatar-login.png')}
        style={{width: 200, height: 100}}
      />
      <Text style={styles.login}>Register</Text>
      <View>
      <Text>Name</Text>
        <TextInput
          style={{
            height: 40,
            borderRadius: 10,
            width: 300,
            borderColor: 'gray',
            borderWidth: 1,
            padding: 10,
          }}
          onChangeText={nama => setName(nama)}
          placeholder="Name"
          keyboardType="default"
        />
        <Text style={{ marginTop:10 }}>Email</Text>
        <TextInput
          style={{
            height: 40,
            borderRadius: 10,
            width: 300,
            borderColor: 'gray',
            borderWidth: 1,
            padding: 10,
          }}
          onChangeText={email => setEmail(email)}
          placeholder="Email"
          keyboardType="email-address"
        />
        <Text style={{marginTop: 10}}>Password</Text>
        <TextInput
          style={{
            height: 40,
            borderRadius: 10,
            width: 300,
            borderColor: 'gray',
            borderWidth: 1,
            padding: 10,
          }}
          onChangeText={password => setPassword(password)}
          secureTextEntry={true}
          placeholder="Password"
        />
      </View>
      <View style={{marginTop: 20}}>
        <TouchableOpacity style={styles.button} onPress={() => {register(name,email,password)}}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function onChangeText(text) {
  console.log(text);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F6EE',
    padding: 10,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#5d76cb',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
