const express = require('express');
const mssql = require ('mssql')
const  {sqlConfig} = require('./Config/config')
const routes = require('./Routes/routes')

const app = express();

app.use(express.json())
app.use("/notes", routes);

app.use((err, req, res, next) => {
    console.log(err.message);
    res.json({Error: err})
})
app.listen(5000,async ()=>{
    await mssql.connect (sqlConfig) 
    console.log('listening on port 5000')
})