from models.deck_models import DeckIn, DeckOut
from .pool import pool


class DeckRepo:
    def create(self, deck: DeckIn, class_id: int, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                    INSERT INTO decks (
                        name
                        , user_id
                        , class_id
                    )
                    VALUES (%s, %s, %s)
                    RETURNING *;
                    """,
                        [
                            deck.name,
                            user_id,
                            class_id,
                        ],
                    )
                    deck = result.fetchone()
                    return self.deck_out(deck)
        except Exception as e:
            print(e)
            return None

    def get_all_class_decks(self, user_id: int, classroom_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT * FROM decks
                        WHERE class_id = %s
                        AND user_id = %s;
                    """,
                        [
                            classroom_id,
                            user_id,
                        ],
                    )
                    classroom_decks = result.fetchall()
                    return [
                        self.deck_out(classroom_deck)
                        for classroom_deck in classroom_decks
                    ]
        except Exception as e:
            print(e)
            return {"message": "Cannot Get Decks for Classroom"}

    def get_one_deck(self, classroom_id: int, user_id: int, deck_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT * FROM decks
                        WHERE id = %s
                        AND class_id = %s
                        AND user_id = %s;
                    """,
                        [
                            deck_id,
                            classroom_id,
                            user_id,
                        ],
                    )
                    deck = result.fetchone()
                    return self.deck_out(deck)

        except Exception as e:
            print(e)
            return None

    def delete_deck(self, classroom_id: int, user_id: int, deck_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM decks
                        WHERE id = %s
                        AND class_id = %s
                        AND user_id = %s;
                    """,
                        [
                            deck_id,
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

    def update_deck(self, class_id: int, user_id: int, deck_id: int, deck: DeckOut):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                       UPDATE decks
                    SET
                        name = %s,
                        favorite = %s,
                        class_id = %s
                    WHERE id = %s
                    AND class_id = %s
                    AND user_id = %s
                    RETURNING *;
                    """,
                        [
                            deck.name,
                            deck.favorite,
                            deck.class_id,
                            deck_id,
                            class_id,
                            user_id,
                        ],
                    )
                    deck = result.fetchone()
                    return self.deck_out(deck)
        except Exception as e:
            print(e)
            return None

    def deck_out(self, deck: DeckIn):
        return DeckOut(
            id=deck[0],
            name=deck[1],
            user_id=deck[2],
            favorite=deck[3],
            class_id=deck[4],
        )
