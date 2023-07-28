const {Router} = require('express')
const {createNoteBook, getAllNotes} = require('./../Controllers/noteBook')

const routes = Router()

routes.post('/', createNoteBook)
routes.get('/', getAllNotes)



module.exports = {
    routes
}
