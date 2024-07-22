import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView ,Alert} from 'react-native';

const ProfileScreen = () => {
  const [username , setUsername] = useState<any>('');
  const [email, setEmail] = useState<any>('');

  const checkLogin = async () => {
    try {
      setUsername(await AsyncStorage.getItem('@username'));
      setEmail(await AsyncStorage.getItem('@email'));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  const clearStorage = async() => {
    await AsyncStorage.removeItem('@username');
    setUsername('');
    await AsyncStorage.removeItem('@email');
    setEmail('');
  }

  useEffect(()=>{
    checkLogin();
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../img/profilePic.jpg')}
        style={styles.avatar}
      />
      <Text style={styles.name}>{username}</Text>
      <Text style={styles.email}>{email}</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Logout"
          onPress={() =>{
            if(username!==null){
              clearStorage();
              Alert.alert('Logout clicked')
            }
            else{
              Alert.alert('No account logged in.')
            }
            }}
          color="red"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,  // Makes it circular
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  }
});

export default ProfileScreen;
