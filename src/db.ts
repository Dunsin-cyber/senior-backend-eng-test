import { Client } from 'pg';
import {
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
} from './constants/index';

const db = new Client({
  user: POSTGRES_USER,
  host: 'localhost',
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: 5432, // Default PostgreSQL port
});

//Establish conection to the db.
const checkDBConnection = () => {
  db.connect()
    .then(() => {
      console.log('Connected to the database');
    })
    .catch((error) => {
      console.error(
        'Error connecting to the database: retrying in 5 seconds.....',
        error
      );
      setTimeout(checkDBConnection, 5000);
    });
};

checkDBConnection();

export default db;
