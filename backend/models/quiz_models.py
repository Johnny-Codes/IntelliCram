from pydantic import BaseModel


class QuizOut(BaseModel):
    id: int
    name: str
    user_id: int
    deck_id: int


class Question(BaseModel):
    id: int
    question: str
    quiz_id: int


class Answer(BaseModel):
    id: int
    answer: str
    question_id: int
