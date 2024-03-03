import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';


import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';

export default function Login({navigation}) {
  console.log('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);

  const onPressRegister = () => {
    navigation.navigate('Register');
  }
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/avatar-login.png')}
        style={{width: 200, height: 100}}
      />
      <Text style={styles.login}>Login</Text>
      <View>
        <Text style={{fontWeight: 'bold', color: '#5d76cb'}}>Email</Text>
        <TextInput
          style={{
            height: 40,
            borderRadius: 10,
            width: 300,
            borderColor: 'gray',
            borderWidth: 1,
            padding: 10,
          }}
          value={email}
          onChangeText={email => setEmail(email)}
          placeholder="Email"
          keyboardType='email-address'
       
        />
   
        <Text style={{marginTop: 10, fontWeight: 'bold', color: '#5d76cb'}}>
          Password
        </Text>
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
          id="password-input"
          value={password}
          secureTextEntry={true}
          placeholder="Password"
        />
        
      </View>
      <View style={{marginTop: 20}}>
        <TouchableOpacity style={styles.button} onPress={() => {login(email,password)}}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister} onPress={onPressRegister}>
          <Text style={styles.buttonRegisterText}>Register</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
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
  buttonRegister: {
    backgroundColor: 'transparent',
    borderColor: '#5d76cb',
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 300,
  },
  buttonRegisterText: {
    color: '#5d76cb',
    fontSize: 18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
