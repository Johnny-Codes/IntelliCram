steps = [
    [
        """
        CREATE TABLE user_profiles (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INT REFERENCES users(id) UNIQUE,
            openai_api_key VARCHAR(255)
        );
        """,
        """
        DROP TABLE user_profiles;
        """,
    ]
]
