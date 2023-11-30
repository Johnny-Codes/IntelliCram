import json
from models.card_models import (
    CardIn,
    CardOut,
    CardEdit,
    QuizIn,
)
from .pool import pool
from openai_stuff.create_quiz import create_ai_quiz


class CardRepo:
    def create(self, card: CardIn, user_id: int, deck_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                    INSERT INTO cards (
                        question
                        ,answer
                        , user_id
                        , deck_id
                    )
                    VALUES (%s, %s, %s, %s)
                    RETURNING *;
                    """,
                        [card.question, card.answer, user_id, deck_id],
                    )
                    card = result.fetchone()
                    return self.card_out(card, card[0])
        except Exception as e:
            print(e)
            return None

    def get_all_deck_cards(self, user_id: int, deck_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT * FROM cards
                        WHERE deck_id = %s
                        AND user_id = %s;
                    """,
                        [
                            deck_id,
                            user_id,
                        ],
                    )
                    deck_cards = result.fetchall()
                    return [
                        self.card_out(deck_card, deck_card[0])
                        for deck_card in deck_cards
                    ]
        except Exception as e:
            print(e)
            return {"message": "Cannot Get card for deck"}

    def get_card_for_deck(self, user_id: int, deck_id: int, card_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT * FROM cards
                        WHERE deck_id = %s
                        AND user_id = %s
                        AND id = %s;
                    """,
                        [
                            deck_id,
                            user_id,
                            card_id,
                        ],
                    )
                    card = result.fetchone()
                    return self.card_out(card, card[0])
        except Exception as e:
            print(e)
            return {"message": "Cannot Get card for deck"}

    def delete_card(self, user_id: int, deck_id: int, card_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM cards
                        WHERE id = %s
                        AND deck_id = %s
                        AND user_id = %s;
                    """,
                        [
                            card_id,
                            deck_id,
                            user_id,
                        ],
                    )
                    if cur.rowcount != 1:
                        return None
                    return True
        except Exception as e:
            print(e)
            return {"message": "could not delete card"}

    def update_card(self, deck_id: int, user_id: int, card_id: int, card: CardEdit):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                       UPDATE cards
                    SET
                        question = %s,
                        answer = %s,
                        wrong_count = %s
                    WHERE id = %s
                    AND deck_id = %s
                    AND user_id = %s
                    RETURNING *;
                    """,
                        [
                            card.question,
                            card.answer,
                            card.wrong_count,
                            card_id,
                            deck_id,
                            user_id,
                        ],
                    )
                    card = result.fetchone()
                    return self.card_out(card, card[0])
        except Exception as e:
            print(e)
            return {"message": "Could not create card"}

    def card_out(self, card: CardIn, card_id: int):
        return CardOut(
            id=card_id,
            question=card[1],
            answer=card[2],
            wrong_count=card[3],
            user_id=card[4],
            deck_id=card[5],
        )

    async def create_quiz_for_deck(
        self,
        user_id: int,
        deck_id: int,
        quiz_in: QuizIn,
    ):
        cards = self.get_all_deck_cards(user_id, deck_id)
        response = await create_ai_quiz(cards)
        response = json.loads(response)

        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO quizzes
                        (name, user_id, deck_id)
                        VALUES (%s, %s, %s)
                        RETURNING id;
                    """,
                        [
                            quiz_in.name,
                            user_id,
                            deck_id,
                        ],
                    )
                    quiz_id = result.fetchone()[0]
                    for obj in response:
                        question = obj["question"]
                        cur.execute(
                            """
                            INSERT INTO questions
                            (question, quiz_id, correct_answer)
                            VALUES (%s, %s, %s)
                            RETURNING id;
                            """,
                            [question, quiz_id, obj["correct_answer"]],
                        )
                        question_id = cur.fetchone()[0]
                        for choice in obj["answers"]:
                            ch = cur.execute(
                                """
                                INSERT INTO answers
                                (answer, question_id)
                                VALUES (%s, %s)
                                RETURNING id;
                                """,
                                [choice, question_id],
                            )
                            answer_id = cur.fetchone()[0]
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not create card"}
        


