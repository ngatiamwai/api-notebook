const mssql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true,
        // trustedConnection: true, // Use Windows Authentication (Trusted Connection)
    }
};

// console.log(sqlConfig);

mssql.connect(sqlConfig)
    .then(pool => {
        if (pool.connected) {
            console.log('Connected to DB...');
        }
    })
    .catch(err => {
        console.error('Error connecting to DB:', err);
    });
module.exports={
    sqlConfig
}