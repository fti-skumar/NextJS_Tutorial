// lib/mysql.ts
import { MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USER } from '@/app/(main)/constants';
import mysql from 'mysql2/promise';

export const connectMySQL = async () => {
  return mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    port:MYSQL_PORT,
  });
};
