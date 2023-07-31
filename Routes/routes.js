const {Router} = require('express')
const {createNoteBook, getAllNotes, getOneNote, updateNote, deleteNote} = require('../Controllers/noteBook')

const routes = Router()

routes.post('/', createNoteBook)
routes.get('/', getAllNotes)
routes.get('/:id', getOneNote)
routes.put('/:id', updateNote)
routes.delete('/:id', deleteNote)


module.exports = routes;
