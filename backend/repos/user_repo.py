from repos.pool import pool
from models.user_models import UserIn, UserOut, UserRole
from typing import Optional


class UserRepo:
    def create(self, user: UserIn, hashed_password: str):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO users (
                            username
                            , first_name
                            , last_name
                            , email
                            , role
                            , hashed_password
                        )
                        VALUES (%s, %s, %s, %s, %s, %s)
                        RETURNING id
                        """,
                        [
                            user.username,
                            user.first_name,
                            user.last_name,
                            user.email,
                            user.role,
                            hashed_password,
                        ],
                    )
                    id = result.fetchone()[0]
                    return UserOut(
                        id=id,
                        username=user.username,
                        first_name=user.first_name,
                        last_name=user.last_name,
                        email=user.email,
                        role=user.role,
                        disabled=False,
                        hashed_password=hashed_password,
                    )
        except Exception as e:
            print(e)
            return None

    def get(self, username: str) -> Optional[UserOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT *
                        FROM users
                        WHERE username = %s;
                        """,
                        [username],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    else:
                        return self.record_to_account_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that account"}

    def delete(self, username: str) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE users
                        SET disabled = %s
                        WHERE username = %s
                        """,
                        [True, username],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def record_to_account_out(self, record):
        return UserOut(
            id=record[0],
            username=record[1],
            first_name=record[2],
            last_name=record[3],
            email=record[4],
            role=UserRole(record[5]),
            disabled=record[6],
            hashed_password=record[7],
        )
