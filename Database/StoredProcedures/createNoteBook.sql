CREATE
OR ALTER PROCEDURE createNoteBook(
    @id VARCHAR(200),
    @note_title VARCHAR(200),
    @note_content VARCHAR(500),
    @create_date DATE
) AS BEGIN
INSERT INTO
    NotesTable(
        id,
        note_title,
        note_content,
        create_date
    )
VALUES
(
        @id,
        @note_title,
        @note_content,
        @create_date
    )
END

SELECT * FROM NotesTable