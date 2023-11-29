from models.upload_file_models import UploadFileOut
from .pool import pool


class UploadFileRepo:
    def create(self, file_path: str, user_id: int, name: str):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO upload_files (
                            file_path
                            , user_id
                            , name
                        )
                        VALUES (%s, %s, %s)
                        RETURNING *;
                        """,
                        [
                            file_path,
                            user_id,
                            name,
                        ],
                    )
                    upload_file = result.fetchone()
                    return UploadFileOut(
                        id=upload_file[0],
                        name=upload_file[1],
                        file_path=upload_file[3],
                    )
        except Exception as e:
            print(e)
            return {"error": f"{e}"}

    def read(self, file_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT * FROM upload_files WHERE id = %s;
                        """,
                        [file_id],
                    )
                    upload_file = result.fetchone()
                    if upload_file is None:
                        return None
                    return UploadFileOut(
                        id=upload_file[0],
                        name=upload_file[1],
                        user_id=upload_file[2],
                        file_path=upload_file[3]
                    )
        except Exception as e:
            print(e)
            return {"error": f"{e}"}

    def delete(self, file_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM upload_files WHERE id = %s;
                        """,
                        [file_id],
                    )
                    conn.commit()
                    return {"result": "file deleted"}
        except Exception as e:
            print(e)
            return {"error": f"{e}"}
        
    def get_all(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT * FROM upload_files
                        WHERE user_id = %s;
                        """,
                        [user_id]
                    )
                    upload_files = cur.fetchall()
                    users_files = [self.create_uploaded_file_out(data) for data in upload_files]
                    return users_files
        except Exception as e:
            print(e)
            return {"error": f"{e}"}
    
    def create_uploaded_file_out(self, data):
        return UploadFileOut(
            id=data[0],
            name=data[1],
            file_path=data[3],
        )
