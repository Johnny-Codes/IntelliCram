from pydantic import BaseModel
from typing import List


class Answer(BaseModel):
    id: int
    answer: str
    question_id: int


class Question(BaseModel):
    id: int
    question: str
    quiz_id: int
    answers: List[Answer]
    correct_answer: str


class QuizOut(BaseModel):
    id: int
    name: str
    user_id: int
    deck_id: int
    questions: List[Question]


class QuizOnlyOut(BaseModel):
    id: int
    name: str
    user_id: int
    deck_id: int
