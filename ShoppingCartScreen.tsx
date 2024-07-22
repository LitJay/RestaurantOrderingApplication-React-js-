import React, { useEffect, useState } from 'react';
import {Button,View,Text, FlatList, Alert, StyleSheet,ToastAndroid} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { createCartTable, getDBConnection, getCart, removeCart } from './cartDbService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createOrderItemTable, getOrderDBConnection,insertOrderItem,createOrderHistoryTable,insertOrderHistory, } from './dbService';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import io from 'socket.io-client';


const socket = io('http://10.0.2.2:5000/cartList', {
    transports: ['websocket'],
});

const App = ({ navigation }: StackScreenProps<any>) => {
  const [cartData,setCartData] = useState<any>([]);
  const [orderData,setOrderData] = useState<any>([]);
  const [username,setUsername] = useState<any>('');
  const [orderId,setOrderId] = useState('');
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0]; 
  const hours = currentDate.getHours().toString().padStart(2, '0'); 
  const minutes = currentDate.getMinutes().toString().padStart(2, '0'); 
  const formattedTime = `${hours}:${minutes}`;

  useEffect(() => {
    socket.on('connect', () => {
        console.log(socket.id);
        socket.emit('client_connected', { connected: true });
        ToastAndroid.show('Connected to server', ToastAndroid.LONG);
    });

    socket.on('error', (error) => {
        ToastAndroid.show('Failed to connect to server', ToastAndroid.LONG);
    });

    socket.on('feedbackReceived', (data) => {
        const parsedData = JSON.parse(data); 
        
    });

    return () => {
        socket.off('connect');
        socket.off('error');
        socket.off('feedbackReceived');
    };
}, []);
  const _getUser = async()=>{
    setUsername(await AsyncStorage.getItem('@username'));
  }

  const _getCartData = async() => {
    _getUser();
    createCartTable(await getDBConnection());
    setCartData(await getCart(await getDBConnection(),username));
    console.log(cartData.foodName);
    console.log(cartData.addOn);
  }

  const _handleRemove= async(
    foodName:string
  ) => {
    Alert.alert(
      'Confirmation','Do you want to remove the selected cart?',
      [
        {
          text:'Cancel',
        },
        {
          text:'ok',
          onPress: async () =>{
            _removeItemByFoodName(foodName);
            _getCartData();
          }
        }
      ]
    )
  }

  const _removeItemByFoodName = async(
    foodName:string
  )=>{
    await removeCart(await getDBConnection(),username,foodName);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>_handleRemove(item.foodName)}>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 10 }}>
        <Text style={styles.faltListText}>Food Name: {item.foodName}</Text>
        <Text style={styles.faltListText}>Add On: {item.addOn}</Text>
      </View>
    </TouchableOpacity>
  );

  const _confirmOrder = async () => {
    if (cartData.length === 0) {
      Alert.alert('Cart is empty', 'Please add items to your cart before confirming the order.');
      return;
    }
    else{
      Alert.alert('Add to Cart Succesfully!')
    }
  
    try {
      socket.emit('confirmOrder', { cartData });
      await AsyncStorage.removeItem('@tableNum');
    } catch (error) {
      console.error('Error confirming order:', error);
      Alert.alert('Error', 'Failed to confirm the order. Please try again.');
    }
  };
  

  const RefreshCart =()=>{
    _getCartData();
  }

    return (
      <>
      <View>
        <Button
          title = "Refresh Cart"
          onPress={RefreshCart}
        />
      </View>
      <View>
      <FlatList
        data={cartData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
        <View>
        <Button
        onPress={() => {
          _confirmOrder();
        }}
        title="Confirm Order"
        color="orange"
      />
      </View>
      </>
    );
}

const styles = StyleSheet.create({
  Header: {
      fontSize:25,
      color: 'black'
  },
  faltListText: {
      fontSize:20,
      color:'black'
  }
});

export default App;