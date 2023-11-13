from pydantic import BaseModel
from models.user_models import UserOut


class CardIn(BaseModel):
    question: str
    answer: str

class CardEdit(CardIn):
    wrong_count: int

class CardOut(CardIn):
    id: int
    user_id: int
    deck_id: int
