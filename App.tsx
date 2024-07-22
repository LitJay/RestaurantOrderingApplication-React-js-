import React,{Component} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screen/HomeScreen';
import ShoppingCartScreen from './Screen/ShoppingCartScreen';
import TableBookingScreen from './Screen/TableBookingScreen';
import MenuScreen from './Screen/MenuScreen'

import OrderCustomizationScreen from './Screen/OrderScreen/OrderCustomizationScreen';
import SignInSignUpScreen from './Screen/SIgnInSignUpScreen';
import CustomDrawerContent from './ExtensionTSXFile/CustomDrawerContent';
import OrderHistoryScreen from './Screen/OrderScreen/OrderHistoryScreen';
import ProfileScreen from './Screen/ProfileScreen';
import { RootStackParamList } from './ExtensionTSXFile/navigationTypes'; 
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FeedbackScreen from './Screen/FeedbackScreen';
const Stack = createStackNavigator<RootStackParamList>();


const Drawer = createDrawerNavigator();


const MenuStack = () => {
  return (
    <Stack.Navigator>
       <Stack.Screen name="UTAR_MAMAK" component={HomeScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="OrderCustomization" component={OrderCustomizationScreen} />
     
     
    </Stack.Navigator>
  );
};
const CartStack=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="Cart" component={ShoppingCartScreen}/>
      
    </Stack.Navigator>
  )
}
const App = () => {
  return (
    <NavigationContainer>
      
      <Drawer.Navigator 
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}

      >
        
        <Drawer.Screen name="Home" component={MenuStack}
        options={{
          drawerIcon: ({color}) => (
            <Entypo name="home" size={20} color={color} />
          ),
          drawerLabelStyle:{
            fontSize: 23
          }
        }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="account" size={20} color={color} />
          ),
          drawerLabelStyle:{
            fontSize: 15
          }
        }} />
        <Drawer.Screen name="Cart" component={CartStack}
        options={{
          drawerIcon: ({color}) => (
            <Feather name="shopping-cart" size={20} color={color} />
          ),
          drawerLabelStyle:{
            fontSize: 15
          }
        }} />
        <Drawer.Screen name="TableBooking" component={TableBookingScreen}
        options={{
          drawerIcon: ({color}) => 
          (
            <MaterialIcons name="table-restaurant" size={20} color={color} />
          ),
          drawerLabelStyle:
          {
            fontSize: 15
          }
        }} />
        <Drawer.Screen name="OrderHistory" component={OrderHistoryScreen}
         options={{
          drawerIcon: ({color}) => 
          (
            <MaterialIcons name="manage-history" size={20} color={color} />
          ),
          drawerLabelStyle:
          {
            fontSize: 15
          }
        }}
         />
         <Drawer.Screen name="Feedback" component={FeedbackScreen}
         options={{
          drawerIcon: ({color}) => 
          (
            <Feather name="edit" size={20} color={color} />
          ),
          drawerLabelStyle:
          {
            fontSize: 15
          }
        }}/>
        <Drawer.Screen name="SignIn/SignUp" component={SignInSignUpScreen}
         options={{
          drawerIcon: ({color}) => 
          (
            <Feather name="log-in" size={20} color={color} />
          ),
          drawerLabelStyle:
          {
            fontSize: 15
          }
        }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};


export default App;

