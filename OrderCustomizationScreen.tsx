import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute, RouteProp } from '@react-navigation/native';
import { createCartTable,getDBConnection,insertCart } from '../cartDbService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderCustomizationScreen = () => {
    const [customization, setCustomization] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [username,setUsername] = useState<any>('');
    const [tableNum,setTableNumber] = useState<any>('');

    const route = useRoute<RouteProp<{params: { category: string; foodName: string; price: number; }}, 'params'>>();
    const { category, price: initialPrice } = route.params || { category: 'none', price: 0 };
    const foodName = route.params?.foodName || '';

    const _insert =async() => {
        await createCartTable(await getDBConnection());
        await insertCart(await getDBConnection(),username,tableNum,foodName,customization);
        Alert.alert("Added to Cart");
    }

    const fetchData = async()=>{
        setUsername(await AsyncStorage.getItem('@username'));
        setTableNumber(await AsyncStorage.getItem('@tableNum'));
    }

    useEffect(()=>{
        fetchData();
    })

    type Category = 'drinks' | 'mainDish'; 
    const validCategories: Category[] = ['drinks', 'mainDish'];
    const isValidCategory = validCategories.includes(category as Category);

    const customizationOptions: Record<Category, { key: string; value: string; addPrice: number; }[]> = {
        drinks: [
            { key: '1', value: 'Ice', addPrice: 1.00 },
            { key: '2', value: 'Hot', addPrice: 0.00 },
        ],
        mainDish: [
            {key:'0',value:'None',addPrice:0},
            { key: '1', value: 'Telur Goreng', addPrice: 2.00 },
            { key: '2', value: 'Telur Mata', addPrice: 2.00 },
            { key: '3', value: 'Ayam Goreng', addPrice: 5.00 },
        ],
    };

    const emptyOptions = [{ key: '0', value: 'No options available', addPrice: 0 }];

    const currentCustomizationOptions = isValidCategory ? customizationOptions[category as Category] : emptyOptions;

    useEffect(() => {
        setCustomization('');
        setTotalPrice(initialPrice);
    }, [initialPrice, category]);

    const handleValueChange = (itemValue: string) => {
        const selectedOption = currentCustomizationOptions.find(option => option.value === itemValue);
        if (selectedOption && selectedOption.addPrice !== 0) {
            setCustomization(itemValue);
            calculateTotalPrice(selectedOption.addPrice + initialPrice);
        }
    };

    const calculateTotalPrice = (newTotalPrice: number) => {
        setTotalPrice(newTotalPrice);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Customize Your Order</Text>
            <>
                <Text>Choose your customization:</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={customization}
                    onValueChange={handleValueChange}
                    enabled={isValidCategory} // Disable Picker when category is not valid
                >
                    {currentCustomizationOptions.map((option) => (
                        <Picker.Item  label={`${option.value} (+RM${option.addPrice.toFixed(2)})`} value={option.value} key={option.key} />
                    ))}
                </Picker>
            </>
            <Text style={styles.totalPrice}>Total Price: RM{totalPrice.toFixed(2)}</Text>
            <Button 
                title="Add To Cart" 
                color='purple'
                onPress={() => {
                    _insert();
                  }
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    picker: {
        width: '100%',
        marginBottom: 20,
    },
    totalPrice: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OrderCustomizationScreen;
