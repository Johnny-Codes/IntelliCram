import json
from models.quiz_models import Question, Answer, QuizOut, QuizOnlyOut
from .pool import pool


class QuizRepo:
    def get_all_quizzes_for_deck(self, user_id: int, deck_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT * FROM quizzes
                        WHERE deck_id = %s
                        AND user_id = %s;
                    """,
                        [
                            deck_id,
                            user_id,
                        ],
                    )
                    quizzes = result.fetchall()
                    print("quizzes? ", quizzes)
                    return [self.quiz_only_out(quiz) for quiz in quizzes]
        except Exception as e:
            print(e)
            return {"message": "Cannot Get Quizzes for that deck"}

    def get_all_quizzes_for_user(self, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT * FROM quizzes
                        WHERE user_id = %s;
                    """,
                        [
                            user_id,
                        ],
                    )
                    quizzes = result.fetchall()
                    print("get all quizzes? ", quizzes)
                    return [self.quiz_only_out(quiz) for quiz in quizzes]
        except Exception as e:
            print(e)
            return {"message": "Cannot Get Quizzes for that user"}

    def get_one_quiz(self, user_id: int, deck_id: int, quiz_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT * FROM quizzes
                        WHERE id = %s
                        AND user_id = %s
                        AND deck_id = %s;
                    """,
                        [
                            quiz_id,
                            user_id,
                            deck_id,
                        ],
                    )
                    quiz = result.fetchone()
                    questions = self.get_all_questions_for_quiz(
                        user_id,
                        quiz[0],
                    )
                    return self.quiz_out(quiz, questions)
        except Exception as e:
            print(e)
            return {"message": "Cannot get that quizzzzzzzzz"}

    def delete_quiz(self, user_id: int, deck_id: int, quiz_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM quizzes
                        WHERE id = %s
                        AND user_id = %s
                        AND deck_id = %s;
                    """,
                        [quiz_id, user_id, deck_id],
                    )
                    if cur.rowcount != 1:
                        return None
                    return True
        except Exception as e:
            print(e)
            return None

    def get_all_questions_for_quiz(self, user_id: int, quiz_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                            SELECT q.* FROM questions q
                            JOIN quizzes qu ON q.quiz_id = qu.id
                            WHERE q.quiz_id = %s AND qu.user_id = %s;
                        """,
                        [
                            quiz_id,
                            user_id,
                        ],
                    )
                    questions = result.fetchall()
                    final_list = []
                    for question in questions:
                        answers = self.get_answers_for_question(
                            user_id,
                            quiz_id,
                            question[0],
                        )
                        final_list.append(
                            self.question_out(
                                question=question,
                                answers=answers,
                            )
                        )
                    return final_list
        except Exception as e:
            print(e)
            return {"message": "Cannot Get questions for that quiz"}

    def get_single_question(self, user_id: int, quiz_id: int, question_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT q.* FROM questions q
                        JOIN quizzes qu ON q.quiz_id = qu.id
                        WHERE q.quiz_id = %s AND qu.user_id = %s AND q.id = %s;
                        """,
                        [quiz_id, user_id, question_id],
                    )
                    question = cur.fetchone()
                    return self.question_out(question)
        except Exception as e:
            print(e)
            return {"message": "Cannot get the question for that quiz"}

    def delete_question(self, user_id: int, quiz_id: int, question_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    # Delete associated answers
                    cur.execute(
                        """
                        DELETE FROM answers
                        WHERE question_id = %s;
                        """,
                        [question_id],
                    )
                    # Delete the question
                    cur.execute(
                        """
                        DELETE FROM questions
                        WHERE quiz_id = %s AND id = %s AND quiz_id IN (
                            SELECT id FROM quizzes WHERE user_id = %s
                        );
                        """,
                        [quiz_id, question_id, user_id],
                    )

                    if cur.rowcount != 1:
                        return None
                    return True
        except Exception as e:
            print(e)
            return None

    def get_answers_for_question(self, user_id: int, quiz_id: int, question_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT a.* FROM answers a
                        JOIN questions q ON a.question_id = q.id
                        JOIN quizzes qu ON q.quiz_id = qu.id
                        WHERE q.quiz_id = %s AND qu.user_id = %s AND q.id = %s;
                        """,
                        [quiz_id, user_id, question_id],
                    )
                    answers = cur.fetchall()
                    return [self.answer_out(answer) for answer in answers]
        except Exception as e:
            print(e)
            return {"message": "Cannot get answers for that question"}

    def quiz_out(self, quiz: QuizOut, questions: Question):
        return QuizOut(
            id=quiz[0],
            name=quiz[1],
            user_id=quiz[2],
            deck_id=quiz[3],
            questions=questions,
        )

    def quiz_only_out(
        self,
        quiz: QuizOnlyOut,
    ):
        return QuizOnlyOut(
            id=quiz[0],
            name=quiz[1],
            user_id=quiz[2],
            deck_id=quiz[3],
        )

    def question_out(self, question: Question, answers: Answer):
        return Question(
            id=question[0],
            question=question[1],
            quiz_id=question[2],
            correct_answer=question[3],
            answers=answers,
        )

    def answer_out(self, answer: Answer):
        return Answer(
            id=answer[0],
            answer=answer[1],
            question_id=answer[2],
        )
