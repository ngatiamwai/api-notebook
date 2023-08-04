const ejs = require('ejs');
const mssql = require('mssql');
const {sqlConfig }= require('../Config/config')

const welcomeAbord = async() =>{
    const pool = await mssql.connect(sqlConfig)

    if(pool.connected){
        const users = (await pool.request().query(`SELECT email from employeesTable WHERE issent = 0`)).recordset

        console.log(users);
    }else{
        console.log('connection failed');
    }
}
module.exports = {
    welcomeAbord
}