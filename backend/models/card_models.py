from pydantic import BaseModel


class CardIn(BaseModel):
    question: str
    answer: str


class CardEdit(CardIn):
    wrong_count: int


class CardOut(CardIn):
    id: int
    user_id: int
    deck_id: int


class QuizIn(BaseModel):
    name: str
