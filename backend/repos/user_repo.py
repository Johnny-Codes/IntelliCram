from repos.pool import pool
from models.user_models import UserIn, UserOut
from typing import Optional

class UserRepo:
    def create(self, user: UserIn, hashed_password: str):
        print("====================================== user", user)
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
                    print("====================================== id", id)
                    # update get method to return UserOut
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

    def get(self, email: str) -> Optional[UserOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT id
                        , first_name
                        , last_name
                        , badge_number
                        , role
                        , hashed_password
                        FROM accounts
                        WHERE badge_number = %s
                        """,
                        [email],
                    )
                    record = result.fetchone()
                    return self.record_to_account_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that account"}

    def delete(self, badge_number: str) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM accounts
                        WHERE badge_number = %s
                        """,
                        [badge_number],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    # def record_to_account_out(self, record):
    #     return AccountsOutWithPassword(
    #         id=record[0],
    #         first_name=record[1],
    #         last_name=record[2],
    #         badge_number=record[3],
    #         role=record[4],
    #         # email=record[4],
    #         hashed_password=record[5],
    #     )
