const mssql = require('mssql');
const {sqlConfig} = require('/Config/config')

const createNotesTable = async (req, res, next) => {
    try {
        const table = `
        BEGIN TRY CREATE TABLE NotesTable(
            id VARCHAR(200) PRIMARY KEY,
            note_title VARCHAR (500) NOT NULL,
            note_content VARCHAR (1000) NOT NULL,
            create_date DATE NOT NULL
        )
        END TRY BEGIN CATCH THROW 50001, 'Table already exists!', 1;
        END CATCH
        
        `

    const pool = await mssql.connect(sqlConfig)

    await pool.query(table, (err)=>{
        if (err instanceof mssql.RequestError){
            console.log({Error: err.message});
        }else{
            console.log('Table Created Successfully');
        } 
    })

    } catch (error) {
        return res({Error: error})
    }
}
createNotesTable();

module.exports ={
    createNotesTable
}