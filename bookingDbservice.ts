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

export const createBookingTable = async(
    db:SQLiteDatabase
) => {
    try{
        const query = "CREATE TABLE IF NOT EXISTS booking (name text NOT NULL, phoneNumber text NOT NULL, peopleNum text NOT NULL, date text NOT NULL, time text NOT NULL)";
        await db.executeSql(query);
    }
    catch(error){
        console.log("Unable to create booking table.");
    }
}

export const insertBooking = async(
    db:SQLiteDatabase,
    name:string,
    phoneNumber:string,
    peopleNum:string,
    date:string,
    time:string,
) => {
    try{
        const query = "INSERT INTO booking (name, phoneNumber, peopleNum, date, time) VALUES (?,?,?,?,?)";
        const param = [name,phoneNumber,peopleNum,date,time];
        await db.executeSql(query,param);
        console.log("Booking Added.");
    }
    catch(error){
        console.log("Unable to insert booking.");
    }
}

const openCallback = () => {
    console.log('database open success');
}

const errorCallback = (err: any) => {
    console.log('Error in opening the database: ' + err);
}