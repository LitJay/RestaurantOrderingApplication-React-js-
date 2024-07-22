import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import io from 'socket.io-client';

const SERVER_URL = 'http://10.0.2.2:5000/cartList';

interface CartItem {
  foodName: string;
  AddOn: string;
  tableNum: string;
}

const OrderHistoryScreen: React.FC = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);

  useEffect(() => {
    const socket = io(SERVER_URL);

    socket.on('getData', (data: any) => {
      console.log('Received cart data:', data);
      setCartData(data.cartData);
    });

    // Emitting getData event when the component mounts
    socket.emit('getData');

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={cartData}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.faltListText}>Food Name: {item.foodName}</Text>
            <Text style={styles.faltListText}>Add On: {item.AddOn}</Text>
            <Text style={styles.faltListText}>Table Num: {item.tableNum}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

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

export default OrderHistoryScreen;
