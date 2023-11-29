from models.class_models import ClassroomOut, ClassroomIn
from .pool import pool


class ClassroomRepo:
    def create(self, classroom: ClassroomIn, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                    INSERT INTO classes (
                        name
                        , user_id
                    )
                    VALUES (%s, %s)
                    RETURNING *;
                    """,
                        [
                            classroom.name,
                            user_id,
                        ],
                    )
                    classroom_id = result.fetchone()[0]
                    return ClassroomOut(
                        id=classroom_id,
                        name=classroom.name,
                        user_id=user_id,
                    )
        except Exception as e:
            print(e)
            return None

    def get_all_users_classrooms(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT * FROM classes
                        WHERE user_id = %s;
                    """,
                        [
                            user_id,
                        ],
                    )
                    users_classrooms = result.fetchall()
                    return [
                        self.classroom_out(user_classroom)
                        for user_classroom in users_classrooms
                    ]
        except Exception as e:
            print(e)
            return None

    def get_one_classroom(self, classroom_id: int, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT * FROM classes
                        WHERE id = %s
                        AND user_id = %s;
                    """,
                        [
                            classroom_id,
                            user_id,
                        ],
                    )
                    classroom = result.fetchone()
                    return ClassroomOut(
                        id=classroom[0],
                        name=classroom[1],
                        user_id=classroom[2],
                    )
        except Exception as e:
            print(e)
            return None

    def delete_classroom(self, classroom_id: int, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM classes
                        WHERE id = %s
                        AND user_id = %s;
                    """,
                        [
                            classroom_id,
                            user_id,
                        ],
                    )
                    if cur.rowcount != 1:
                        return None
                    return True
        except Exception as e:
            print(e)
            return None

    def update_classroom(
        self,
        classroom_id: int,
        classroom: ClassroomIn,
        user_id: int,
    ):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE classes
                        SET name = %s
                        WHERE id = %s
                        AND user_id = %s
                        RETURNING *;
                    """,
                        [
                            classroom.name,
                            classroom_id,
                            user_id,
                        ],
                    )
                    classroom = result.fetchone()
                    return ClassroomOut(
                        id=classroom[0],
                        name=classroom[1],
                        user_id=classroom[2],
                    )
        except Exception as e:
            print(e)
            return None

    def classroom_out(self, classroom: ClassroomIn):
        return ClassroomOut(
            id=classroom[0],
            name=classroom[1],
            user_id=classroom[2],
        )
