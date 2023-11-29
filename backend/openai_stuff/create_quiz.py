import os
import json
from openai import OpenAI


client = OpenAI()
client.api_key = os.getenv("OPENAI_API_KEY")

models = {
    "3.5": "gpt-3.5-turbo",
    "4": "gpt-4",
}

json_response_template = "A list of objects with a key 'question', a key 'answers' that is a list of strings, and the 'correct_answer'."

prompts = {
    "quiz_prompt": f"You are my teacher. For each question and answer create a multiple choice quiz with 3 clearly incorrect answers with the correct answer being exactly the answer you receive. Return a JSON {json_response_template}",
}


async def create_ai_quiz(cards: list):
    quiz_question_list = []
    for card in cards:
        quiz_question_list.append(
            {
                "question": card.question,
                "answer": card.answer,
            }
        )
    response = client.chat.completions.create(
        model=models["3.5"],
        messages=[
            {
                "role": "system",
                "content": prompts["quiz_prompt"],
            },
            {"role": "user", "content": json.dumps(quiz_question_list)},
        ],
        temperature=1.0,
    )
    response_content = response.choices[0].message.content
    return response_content
