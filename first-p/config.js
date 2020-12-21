require('dotenv').config();
const mysql=require('mysql2');
const mysql2=require('mysql2/promise');
const DB_Connect=mysql.createConnection({
    host: 'localhost',
    user:'test',
    password:'password',
    database:'test'
}); 

const pool = mysql2.createPool({
    host: 'localhost',
    user:'test',
    password:'password',
    database:'test'
});   

module.exports={DB_Connect,pool};