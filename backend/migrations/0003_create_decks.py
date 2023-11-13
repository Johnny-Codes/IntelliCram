steps = [
    [
        """
            CREATE TABLE decks (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100),
            user_id INT REFERENCES users(id),
            favorite BOOLEAN DEFAULT FALSE,
            class_id INT REFERENCES classes(id)
            )
        """,
        """
        DROP TABLE decks;
        """
    ]
]
