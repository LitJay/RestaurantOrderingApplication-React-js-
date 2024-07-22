import { useState } from 'react';
import {SQLiteDatabase, enablePromise, openDatabase} from 'react-native-sqlite-storage';

const databaseName = 'assignment.sqlite';

enablePromise(true);

export const getDBConnection = async() => {
  return openDatabase(
      {name: `${databaseName}`},
      openCallback,
      errorCallback,
  );
}

const openCallback = () => {
    console.log('database open success');
}

const errorCallback = (err: any) => {
    console.log('Error in opening the database: ' + err);
}

export const createCartTable = async(db:SQLiteDatabase) => {
    try{
        const query = 'CREATE TABLE IF NOT EXISTS cart( userId text NOT NULL, tableNum text NOT NULL, foodName text NOT NULL, addOn text)';
        await db.executeSql(query);
    }
    catch(error){
        console.log("Unable to create table cart.");
    }
}

export const getCart = async(
    db:SQLiteDatabase,
    username:string
): Promise<any> => {
    const cartData : any = [];
    try{
        const query = "SELECT * FROM cart WHERE userId = ? ";
        const results = await db.executeSql(query,[username]);
        results.forEach(result => {
            (result.rows.raw()).forEach(( item:any ) => {
                cartData.push({
                    foodName: item.foodName, 
                    AddOn : item.addOn, 
                    tableNum : item.tableNum
                });
                console.log(item.foodName);
                console.log(item.tableNum);
                console.log(item.addOn);
            })
        });
        return cartData;
    }
    catch(error){
        console.log("Unable to get Cart data.");
    }
}

export const insertCart = async(
    db:SQLiteDatabase,
    username:string,
    table:string,
    foodName:string,
    addOn:string
) =>{
    try{
        const query  = "INSERT INTO cart (userId, tableNum, foodName, addOn) VALUES (?,?,?,?)";
        const param = [username,table,foodName,addOn]
        await db.executeSql(query,param);
    }
    catch(error){
        console.log("Unable to insert into cart table.",error);
    }
}

export const updateCart = async(
    db:SQLiteDatabase,
    username:string,
    foodName:string,
    addOn:string
)=>{
    try{
        const query = "UPDATE cart SET foodName=? , addOn=? WHERE username=?";
        const param = [foodName,addOn,username]
        await db.executeSql(query,param);
    }
    catch(error){
        console.log("Unable to update cart.");
    }
}

export const removeCart = async(
    db:SQLiteDatabase,
    username:string,
    foodName:string,
) => {
    try{
        const query = "DELETE FROM cart WHERE username=? AND foodName=?";
        const param=[username,foodName]
        await db.executeSql(query,param);
    }
    catch(error){
        console.log("Unable to remove from cart.");
    }
}

export const clearCart = async(
    db:SQLiteDatabase,
    username:string
)=>{
    try{
        const query =  "DELETE FROM cart WHERE username=?";
        await db.executeSql(query,[username]);
    }
    catch(error){
        console.log("Unable to clear cart.");
    }
}