import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet ,FlatList,Image} from 'react-native';
import PagerView from 'react-native-pager-view';
import { StackScreenProps } from '@react-navigation/stack';

const MenuScreen = ({ navigation }: StackScreenProps<any>) => {
  const [selectedMenu, setSelectedMenu] = useState(0); 
  const pagerRef = useRef(null);
  const menus = [
    { 
      id: 'mainDish', 
      title: 'Main Dish', 
      foods: [
        { name: 'Maggi Goreng ',
         price: 6,
         image:require('../img/maggiGoreng.jpg'), 
        },
        { name: 'Maggi Goreng Ayam',  
          price: 10 ,
          image:require('../img/maggiGorengAyam.jpg')
        },
        {
          name:'Mee Goreng',
          price:6,
          image:require('../img/meeGoreng.jpg')
        },
        
        {
          name:'Mee Goreng Ayam',
          price:6,
          image:require('../img/meeGorengAyam.jpg')
        },
        {
          name:'Nasi Goreng Ayam',
          price:6,
          image:require('../img/nasiGorengAyam.jpg')
        },
        {
          name:'Maggi Soup Kari',
          price: 5,
          image:require('../img/maggiKari.jpg')
        },
        {
          name:'Maggi Soup Ayam',
          price:6,
          image:require('../img/maggiSoupAyam.jpg')
        },

        

        
        
      ] 
    },
    { 
      id: 'drinks', 
      title: 'Drinks', 
      foods: 
      [
        { 
          name: 'Teh Tarik', 
          price: 4 ,
          image:require('../img/tehTarik.jpg')
        },
        { 
          name: 'Milo',  
          price: 4,
          image:require('../img/Milo.jpg')
        },
        { 
          name: 'Kopi',  
          price: 5,
          image:require('../img/Kopi.jpg')
        },
        { 
          name: 'Limau',  
          price: 4,
          image:require('../img/Limau.jpg')
        },
        { 
          name: 'Teh O Limau', 
          price: 4,
          image:require('../img/TEH-O-LIMAU-PANAS.jpg')
        },
      ] 
    },
    {
      id: 'alaCarte', 
      title: 'AlaCarte', 
      foods: [
        { 
          name: 'Ayam Goreng',
          price: 5 ,
          image:require('../img/ayamGoreng.jpg')
        },
        { 
          name: 'Telur Mata', 
          price: 2 ,
          image:require('../img/telurMata.jpg')
        },
        { 
          name: 'Burger', 
          price: 2 ,
          image:require('../img/Burger.jpg')
        },
        { 
          name: 'French Fries', 
          price: 2 ,
          image:require('../img/frenchFries.jpg')
        },
        
      ] 
    },
    {
      id: 'roti', 
      title: 'Roti', 
      foods: [
        { 
          name: 'Roti Canai',
          price: 3 ,
          image:require('../img/rotiCanai.jpg')
        },
        { 
          name: 'Roti Planta', 
          price: 3.5 ,
          image:require('../img/rotiPlanta.jpg')
        },
        { 
          name: 'Roti Puri', 
          price: 3.5,
          image:require('../img/rotiPuri.jpg')
        },
        { 
          name: 'Roti Telur', 
          price: 3.5 ,
          image:require('../img/rotiTelur.jpg')
        },
        { 
          name: 'Roti Bom', 
          price: 3.5 ,
          image:require('../img/rotiBom.jpg')
        },
        
        
      ] 
    },
    {
      id:'soup',
      title:'Soup',
      foods:[
        {
          name: 'Sup Kambing', 
          price: 9 ,
          image:require('../img/kambingSup.jpg')
        },
        {
          name: 'Sup Ayam', 
          price: 7.5 ,
          image:require('../img/ayamSup.jpg')
        },
        {
          name: 'Sup Daging', 
          price: 8 ,
          image:require('../img/dagingSup.jpg')
        },
        {
          name: 'Sup Tomyam', 
          price: 10 ,
          image:require('../img/tomyamSup.jpg')
        },
      ]
    }
  ];
  

  const handleCategoryPress = (index: number) => {
    setSelectedMenu(index);
    if (pagerRef.current) {
      pagerRef.current.setPage(index);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuBar}>
        {menus.map((menu, index) => (
          <Button
            key={index}
            title={menu.title}
            onPress={() => handleCategoryPress(index)}
            color={selectedMenu === index ? 'orange' : '#2196F3'} 
          />
        ))}
      </View>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={e => setSelectedMenu(e.nativeEvent.position)}
        ref={pagerRef}
      >
        {menus.map((menu, index) => (
          <View key={index} style={styles.page}>
            <Text>{menu.title}</Text>
            <FlatList
              data={menu.foods}
              keyExtractor={(item, index) => item.name + index}
              renderItem={({ item }) => (
                <View style={styles.foodItem}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodPrice}>RM{item.price}</Text>
                  <Image source={item.image} style={styles.menuImage} />
                  <Button
                    onPress={() => navigation.navigate('OrderCustomization', {
                      category: menu.id, 
                      foodName: item.name,
                      price: item.price, 
                    })}
                    title="Add To Cart"
                    color="#841584"
                  />
                </View>
              )}
            />
          </View>
        ))}
      </PagerView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10, 
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  menuImage: {
    width: 250, 
    height: 200, 
    resizeMode: 'contain', 
  },
  foodItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 80,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: "#000", 
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  
  foodName: {
    fontSize: 18,
    alignItems:'center',
    justifyContent:'center',
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 5, 
  },
  
  foodPrice: {
    fontSize: 16,
    color: '#666', 
    fontStyle: 'italic', 
  },
});

export default MenuScreen;
