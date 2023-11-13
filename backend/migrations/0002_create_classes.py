steps = [
    [
        """
        CREATE TABLE classes (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100),
            user_id REFERENCES users(id)
        );
        """,
        """
        DROP TABLE classes;
        """,
    ]]
