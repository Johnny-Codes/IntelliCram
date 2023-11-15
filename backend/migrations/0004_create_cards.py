steps = [
    [
        """
            CREATE TABLE cards (
            id SERIAL PRIMARY KEY NOT NULL,
            question TEXT,
            answer TEXT,
            wrong_count INT DEFAULT 0,
            user_id INT REFERENCES users(id),
            deck_id INT REFERENCES decks(id)
            )
        """,
        """
        DROP TABLE cards;
        """,
    ]
]
