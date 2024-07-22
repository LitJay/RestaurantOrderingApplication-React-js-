import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView ,Alert, ToastAndroid} from 'react-native';
import { getDBConnection, createUserTable, createUser, checkUsername } from './userDbService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {
  const [isSignIn, setIsSignIn] = useState(true); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [tempPassword, setTempPassword] = useState<any>([]);

  const toggleForm = () => {
    setIsSignIn(!isSignIn); 
    setUsername('');
    setPassword('');
  }

  const _query = async() => {
    await createUserTable(await getDBConnection());
  }

  const _SignUp = async() => {
    await createUser(await getDBConnection(),username, password, email);
    Alert.alert('SignUp Successfully !')
  }

  const _SignIn = async() => {
    setTempPassword(await checkUsername(await getDBConnection(), username));
    if(tempPassword.length>0){
      console.log(tempPassword);
      if(tempPassword[0].password==password){
        await AsyncStorage.setItem("@username",tempPassword[0].username);
        console.log(tempPassword[0].username);
        await AsyncStorage.setItem("@email",tempPassword[0].email);
        console.log(tempPassword[0].email);
        Alert.alert("Login Successfully");
      }
      else{
        Alert.alert("Login Unsuccessful");
      }
    }
    else{
      Alert.alert("User not found.");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{isSignIn ? 'Sign In' : 'Sign Up'}</Text>

      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize="none"
      />

      {!isSignIn && (
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      )}

      <Button
        title={isSignIn ? "Sign In" : "Sign Up"}
        onPress={() => {
            if(isSignIn){
              _query()
              _SignIn()
            }
            else{
              _query()
              _SignUp()
            }
          }
        }
      />
      <Button
        title={isSignIn ? "Need an account? Sign Up" : "Have an account? Sign In"}
        onPress={toggleForm}
        color="#6a5acd"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginVertical: 10,
  }
});

export default SignInScreen;
