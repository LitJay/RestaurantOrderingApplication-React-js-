import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Modal, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tableNumber, setTableNumber] = useState('');

  const handleAddOrder = () => {
    if (tableNumber) {
      navigation.navigate('Menu');
    } else {
      setModalVisible(true);
    }
  };

  const storeTableNumber = async() => {
    try{
      await AsyncStorage.setItem('@tableNum',tableNumber)
    }
    catch(error){
      console.log(error);
    }
  };

  const readTableNumber = async() => {
    try{
      let tempTableNumber = await AsyncStorage.getItem('@tableNum');
      if(tempTableNumber!==null){
        setTableNumber(tempTableNumber);
      }
      else{
        console.log('table not set');
      }
    }
    catch(error){
      console.log(error);
    }
  };

  useEffect(()=>{
    readTableNumber();
  },[]);

  const handleSubmitTableNumber = () => {
    if (tableNumber) {
      storeTableNumber();
      setModalVisible(false);
    } else {
      Alert.alert('Please enter a table number.');
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setTableNumber('');
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Please Enter Your Table Number:</Text>
            <TextInput
              style={styles.input}
              onChangeText={ (input:string) =>{
                setTableNumber(input)
              }}
              value={tableNumber}
              keyboardType="numeric"
              placeholder="Table Number"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmitTableNumber}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {tableNumber && <Text style={styles.tableNumber}>Table Number: {tableNumber}</Text>}
      <TouchableOpacity style={styles.orderButton} onPress={handleAddOrder}>
        <Text style={styles.orderButtonText}>Add Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  tableNumber: {
    fontSize: 30,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  orderButton: {
    height: 50,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 10
  },
  orderButtonText: {
    fontSize: 20,
    color: 'white'
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});

export default HomeScreen;
