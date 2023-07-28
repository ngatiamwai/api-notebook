const { v4 } = require('uuid');
const { sqlConfig } = require('../Config/config');
const mssql = require('mssql')

// const notebook = [];

class Notebook {
    constructor (id, note_title, note_content, create_date ){
        this.note_title = note_title
        this.note_content = note_content
        this.create_date = create_date
    }
}

const createNoteBook = async (req, res) => {

    try {
        const id = v4()
        // console.log(req.body);

        const { note_title, note_content, create_date } = req.body
        const newNote = {id, note_title, note_content, create_date }

       const pool = await mssql.connect(sqlConfig)

        const result = await pool.request()
        .input('id',id)
        .input('note_title',note_title)
        .input('note_content',note_content)
        .input('create_date',create_date)

        .execute('createNoteBook')
        
        console.log(result);

        res.json({
            message: 'Note created',
            Notebook: newNote,
        })
    } catch (error) {
        return res.json({ error })
        // console.log(error);
    }

}

const getAllNotes = async (req, res) => {
    try {
        const pool = await (mssql.connect(sqlConfig))

        const getAllNotes = (await pool.request().execute('getAllNotes')).recordset

        res.json({ notes: getAllNotes });
    } catch (error) {
        return res.json({ error })
    }
}

module.exports = {
    createNoteBook,
    getAllNotes
}