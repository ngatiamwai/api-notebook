BEGIN TRY CREATE TABLE NotesTable(
    id VARCHAR(200) PRIMARY KEY,
    note_title VARCHAR (500) NOT NULL,
    note_content VARCHAR (1000) NOT NULL,
    create_date DATE NOT NULL
)
END TRY BEGIN CATCH THROW 50001, 'Table already exists!', 1;
END CATCH


SELECT * FROM NotesTable