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

export const createUserTable = async( db: SQLiteDatabase) => {
    try{
        const query = 'CREATE TABLE IF NOT EXISTS user( id integer AUTO_INCREMENT PRIMARY KEY, username text NOT NULL, password text NOT NULL, email text NOT NULL)' ;
        await db.executeSql(query);
      } catch (error) {
        console.error(error);
        throw Error('Failed to get user !!!');
    }
}
    
export const checkUsername = async( 
    db: SQLiteDatabase,
    username:string
): Promise<any> => {
    try{
        const userData : any = [];
        const query = `SELECT * FROM user WHERE username=?`;
        const results = await db.executeSql(query,[username]);
        results.forEach(result => {
            (result.rows.raw()).forEach(( item:any ) => {
                userData.push(item);
            })
        });
        return userData;
    } catch (error) {
        console.error(error);
        throw Error('Username not found.');
    }
}


export const getUserById = async( db: SQLiteDatabase, placeId: string ): Promise<any> => {
    try{
        const query = `SELECT * FROM user WHERE id=?`;
        const results = await db.executeSql(query,[placeId]);
        return results[0].rows.item(0)
    } catch (error) {
        console.error(error);
        throw Error('Failed to get user !!!');
    }
}


export const createUser = async( 
        db: SQLiteDatabase,
        name: string,
        password : string,
        email : string,
    ) => {
    try{
        const query = 'INSERT INTO user(username,password,email) VALUES(?,?,?)';
        const parameters = [name,password,email]
        await db.executeSql(query,parameters);
        console.log("User created.");
    } catch (error) {
        console.error(error);
        throw Error('Failed to create user !!!');
    }
}

const openCallback = () => {
    console.log('database open success');
}

const errorCallback = (err: any) => {
    console.log('Error in opening the database: ' + err);
}