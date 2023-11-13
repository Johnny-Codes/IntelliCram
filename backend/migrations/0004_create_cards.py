steps = [
    [
        """
            CREATE TABLE cards (
            id SERIAL PRIMARY KEY NOT NULL,
            question VARCHAR(100),
            answer VARCHAR(100),
            wrong_count INT DEFAULT 0,
            user_id INT REFERENCES users(id),
            deck_id INT REFERENCES decks(id)
            )
        """,
        """
        DROP TABLE cards;
        """
    ]
]
