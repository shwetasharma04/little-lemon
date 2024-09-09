import SQLite from 'react-native-sqlite-storage';

class Database {
  constructor() {
    this.db = null;
  }

  initDB() {
    if (!this.db) {
      this.db = SQLite.openDatabase(
        {
          name: 'myDatabase.db',
          location: 'default',
        },
        () => {
          console.log('Database opened');
          this.createTable(); // Create tables after opening the DB
        },
        error => {
          console.log('Error opening database: ', error);
        }
      );
    }
    return this.db;
  }
  getDB() {
    if (!this.db) {
      throw new Error('Database has not been initialized. Call initDB first.');
    }
    return this.db;
  }

  createTable = () => {

    if (!this.db) {
        throw new Error('Database has not been initialized. Call initDB first.');
      }
      this.db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT,lastName TEXT, email TEXT, phone TEXT, image TEXT)',
          [],
          () => {
            console.log('Table created successfully');
          },
          error => {
            console.log('Error in creating table: ', error);
          }
        );
      });
  };
}

const dbInstance = new Database();
export default dbInstance;
