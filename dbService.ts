import {SQLiteDatabase, enablePromise, openDatabase} from 'react-native-sqlite-storage';

const databaseName = 'assignment.sqlite';

// Enable promise for SQLite
enablePromise(true);

export const getOrderDBConnection = async() => {
  return openDatabase(
      {name: `${databaseName}`},
      openCallback,
      errorCallback,
  );
}

export const createOrderItemTable = async(
  db:SQLiteDatabase,
) => {
  try{
    const query = "CREATE TABLE IF NOT EXISTS orderItem(orderId text NOT NULL, foodName text NOT NULL)";
    await db.executeSql(query);
  }
  catch(error){
    console.log("Unable to create table item.");
  }
}

export const insertOrderItem = async(
  db:SQLiteDatabase,
  orderId:string,
  foodName:string,
)=>{
  try{
    const query = "INSERT INTO orderItem(orderId,foodName) VALUES (?,?)";
    const param = [orderId,foodName]
    await db.executeSql(query,param);
    console.log("order item created.");
  }
  catch(error){
    console.log("Unable to insert into orderItem."+ error);
  }
}

export const getOrderItem = async(
  db:SQLiteDatabase,
  orderId:string
): Promise<any>=>{
  try{
    const itemData : any = [];
    const query = "SELECT * FROM orderItem WHERE orderId = ?";
    const results = await db.executeSql(query,[orderId]);
    results.forEach(result => {
      (result.rows.raw()).forEach(( item:any ) => {
          itemData.push(item);
      })
  });
  return itemData;
  }
  catch(error){
    console.log("Unable to get order item.");
  }
}

export const createOrderHistoryTable = async (db: SQLiteDatabase) => {
  try {
    const drop = "DELETE FROM order_history";
    await db.executeSql(drop);
    const query = "CREATE TABLE IF NOT EXISTS order_history (username TEXT NOT NULL, orderId TEXT NOT NULL, date TEXT NOT NULL, time TEXT NOT NULL)";
    await db.executeSql(query);
    console.log("Table 'order_history' created successfully.");
  } catch (error) {
    console.log("Unable to create table 'order_history'. Error:", error);
  }
}


export const insertOrderHistory = async(
  db:SQLiteDatabase,
  username:string,
  orderId:string,
  date:string,
  time:string,
)=>{
  try{
    const query = "INSERT INTO order_history(username,orderId,date,time) VALUES (?,?,?,?)";
    const param = [username,orderId,date,time];
    console.log(param);
    await db.executeSql(query,param);
    console.log("order history created.");
  }
  catch(error){
    console.log("Unable to insert order history."+error);
  }
}

export const getAllOrderHistory = async (db: SQLiteDatabase): Promise<any[]> => {
  try {
    const orderData: any[] = [];
    const query = "SELECT * FROM order_history";
    const results = await db.executeSql(query);
    results.forEach(result => {
      result.rows.raw().forEach((item: any) => {
        orderData.push({
          orderId: item.orderId,
          date: item.date,
          time: item.time
        });
      });
    });
    return orderData;
  } catch (error) {
    console.log("Unable to get all order history.");
    throw error;
  }
}

const openCallback = () => {
    console.log('database open success');
}

const errorCallback = (err: any) => {
    console.log('Error in opening the database: ' + err);
}
