steps = [
    [
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(200) NOT NULL UNIQUE,
            first_name VARCHAR(200) NOT NULL,
            last_name VARCHAR(200) NOT NULL,
            email VARCHAR(200) NOT NULL UNIQUE,
            role VARCHAR(200) NOT NULL,
            disabled BOOLEAN DEFAULT FALSE,
            hashed_password VARCHAR(200) NOT NULL
        );
        """,
        """
        DROP TABLE users;
        """,
    ]] 