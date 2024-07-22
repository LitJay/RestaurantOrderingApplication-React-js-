import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getDBConnection, createBookingTable, insertBooking } from './bookingDbservice';

const TableBookingScreen = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const _query=async() =>{
    await createBookingTable(await getDBConnection());
  }

  const handleBooking = async() => {
    if(name==='' || phoneNumber=== '' || numberOfPeople==='' || date==='' || time===''){
      Alert.alert("Please enter all the details.");
    }
    else{
      _query();
      await insertBooking(await getDBConnection(),name,phoneNumber,numberOfPeople,date,time);
      Alert.alert("Booking Confirmation", `You have booked a table for ${numberOfPeople} people on ${date} at ${time}.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        keyboardType="phone-pad"
        placeholder="Enter your phone number"
      />

      <Text style={styles.label}>Number of People:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNumberOfPeople}
        value={numberOfPeople}
        keyboardType="numeric"
        placeholder="Enter number of people"
      />

      <Text style={styles.label}>Date (e.g., 2023-04-15):</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDate}
        value={date}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Time (e.g., 18:30):</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTime}
        value={time}
        placeholder="HH:MM"
      />

      <Button
        title="Book Table"
        onPress={handleBooking}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  label: {
    marginLeft: 12,
  }
});

export default TableBookingScreen;
