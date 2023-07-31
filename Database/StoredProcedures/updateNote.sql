CREATE
OR ALTER PROCEDURE updateNote (
    @id VARCHAR(200),
    @note_title VARCHAR(500),
    @note_content VARCHAR(1000),
    @create_date DATE
) AS BEGIN
UPDATE
    NotesTable
SET
    id = @id,
    note_title = @note_title,
    note_content = @note_content,
    create_date = @create_date
WHERE
    id = @id
END