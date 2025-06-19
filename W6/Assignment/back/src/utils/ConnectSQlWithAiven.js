// // const Valkey = require('ioredis');
// import Valkey from 'ioredis';
// const serviceUri = 'mysql://avnadmin:AVNS_KiWXNwxtH4tpuvcCgbt@coffe-management-db1st-choengrayu307-607c.b.aivencloud.com:21011/defaultdb?ssl-mode=REQUIRED';
// const valkey = new Valkey(serviceUri);

// valkey.set('key', 'hello world');

// valkey.get('key').then( (result) => {
//   console.log(`The value of key is: ${result}`);
//   valkey.disconnect();
// });

import mysql from 'mysql2/promise';
import fs from 'fs';

const ca = fs.readFileSync(new URL('../../ca.pem', import.meta.url));

const connection = await mysql.createConnection({
  host: 'coffe-management-db1st-choengrayu307-607c.b.aivencloud.com',
  port: 21011,
  user: 'avnadmin',
  password: 'AVNS_KiWXNwxtH4tpuvcCgbt',
  database: 'defaultdb',
  ssl: {
    ca: ca
  }
});

console.log('Connected to MySQL database!');

// Example query
const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
console.log('Test query result:', rows);

await connection.end();



// ...existing code...
export async function getConnection() {
  const ca = fs.readFileSync(new URL('../../ca.pem', import.meta.url));
  return mysql.createConnection({
    host: 'coffe-management-db1st-choengrayu307-607c.b.aivencloud.com',
    port: 21011,
    user: 'avnadmin',
    password: 'AVNS_KiWXNwxtH4tpuvcCgbt',
    database: 'Week6DB',
    ssl: { ca }
  });
}