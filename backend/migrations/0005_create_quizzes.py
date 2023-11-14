steps = [
    [
        """
            CREATE TABLE quizzes (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NULL,
            user_id INT REFERENCES users(id),
            deck_id INT REFERENCES decks(id)
            );
            CREATE TABLE questions (
            id SERIAL PRIMARY KEY NOT NULL,
            question TEXT,
            quiz_id INT REFERENCES quizzes(id)
            );
            CREATE TABLE answers (
            id SERIAL PRIMARY KEY NOT NULL,
            answer TEXT,
            question_id INT REFERENCES questions(id)
            );
        """,
        """
        DROP TABLE quizzes;
        DROP TABLE questions;
        DROP TABLE answers;
        """,
    ]
]
