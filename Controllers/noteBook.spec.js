import mssql from 'mssql'
import { createNoteBook, getAllNotes, getOneNote } from './noteBook'

const req = {
    body: {
        note_title: "Complete Testing Today",
        note_content: "Learn more about jest",
        create_date: "2023-8-4"
    }
}
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
}
describe('New Notebook', () => {

    it('should create a new notebook successfully', async () => {

        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockReturnThis()

        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }
        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await createNoteBook(req, res)
        expect(mockedInput).toHaveBeenCalledWith('note_title', 'Complete Testing Today')
        expect(mockedInput).toHaveBeenCalledWith('note_content', 'Learn more about jest')
        expect(mockedInput).toHaveBeenCalledWith('create_date', '2023-8-4')
        expect(mockedExecute).toHaveBeenCalledWith('createNoteBook')
    })

})

describe("Notes Controller", () => {
    describe('Get all notebooks', () => {
        it('should get all projects', async () => {
            const mockNoteBooks = [
                {
                    "id": "10352ddf-9032-4d15-bc58-1e1adaa2d24e",
                    "note_title": "API get",
                    "note_content": "Fech the API during the break period",
                    "create_date": "2023-07-28T00:00:00.000Z"
                },
                {
                    "id": "759e0f40-3e1c-49da-9f2c-9858e2033f08",
                    "note_title": "API Fetch",
                    "note_content": "Fech the API during the break period",
                    "create_date": "2023-07-28T00:00:00.000Z"
                }
            ]

            const mockedExecute = jest.fn().mockReturnThis()
            const mockedRequest = {
                execute: mockedExecute
            }
            const mockedPool = {
                request: jest.fn().mockReturnValue(mockedRequest)
            }
            jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

            await getAllNotes(req, res)
            expect(mockedExecute).toHaveBeenCalledWith('getAllNotes')

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: mockNoteBooks
                })
            })
        })
    })
    describe("Get one Note", () => {
        it("should return one note", async()=> {
            const noteId = "qira789o3rqksdfsd"

            const mockNote = {
                id: "759e0f40-3e1c-49da-9f2c-9858e2033f08",
                note_title: "API Fetch",
                note_content: "Fech the API during the break period",
                create_date: "2023-07-28"
            }

            const req = {
                params:{
                    id: noteId
                }
            }
            jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockReturnValueOnce({
                    recordset: [mockNote]
                })
            })
            await getOneNote(req, res)
            expect(res.json).toHaveBeenCalledWith({Notebook: [mockNote]})
        })
    })
})


