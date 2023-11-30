import os
import json
from openai import OpenAI


client = OpenAI()
client.api_key = os.getenv("OPENAI_API_KEY")

models = {
    "3.5": "gpt-3.5-turbo",
    "4": "gpt-4",
}

json_response_template = "response with a key 'is_correct' and a key 'improvement' where you state if the answer the user provided is correct or false, and how they can improve their answer if they got it wrong, as well as a bit more information about the topic"

prompts = {
    "quiz_prompt": f"You are my teacher. For each question, correct answer, and user answer Return a JSON {json_response_template}",
}


async def create_text_chat_quiz(input):
    response = client.chat.completions.create(
        model=models["3.5"],
        messages=[
            {
                "role": "system",
                "content": prompts["quiz_prompt"],
            },
            {"role": "user", "content": (input)},
        ],
        temperature=1.0,
    )
    response_content = response.choices[0].message.content
    return response_content
