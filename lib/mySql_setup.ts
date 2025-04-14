// lib/mysql.ts
import { MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USER } from '@/constants';
import mysql from 'mysql2/promise';

export const connectMySQL = async () => {
  try {
    const connection = await mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      port: MYSQL_PORT,
    });

    console.log('✅ MySQL connection successful');
    return connection;
  } catch (error) {
    console.error('❌ MySQL connection failed:', (error as Error).message);
    throw error;
  }
};