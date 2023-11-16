steps = [
    [
        """
        CREATE TABLE upload_files (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(124),
            user_id INT REFERENCES users(id),
            file_path VARCHAR(255)
        )
        """,
        """
        DROP TABLE upload_files;
        """
    ]
]