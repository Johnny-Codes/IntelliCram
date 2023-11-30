from pydantic import BaseModel


class TextInputIn(BaseModel):
    question: str 
    correct_answer: str 
    user_answer: str 