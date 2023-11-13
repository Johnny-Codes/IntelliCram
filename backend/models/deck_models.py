from pydantic import BaseModel


class DeckIn(BaseModel):
    name: str


class DeckOut(DeckIn):
    id: int
    user_id: int
    class_id: int
    favorite: bool = False

