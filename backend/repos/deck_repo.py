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

    def deck_out(self, deck: DeckIn):
        return DeckOut(
            id=deck[0],
            name=deck[1],
            user_id=deck[2],
            favorite=deck[3],
            class_id=deck[4],
        )
