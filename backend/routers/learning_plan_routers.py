from fastapi import APIRouter
import json
import re
from openai_stuff import create_learning_plan

router = APIRouter()


@router.post("/learning_plans")
async def create_user_learning_plan(
    data: dict,
):
    print('data', data)
    chat_response = create_learning_plan.create_learning_plan(
        topic=data["topic"],
        time_to_study=data["time_to_study"],
    )
    pattern = re.compile(r"```json(.*?)```", re.DOTALL)
    match = pattern.search(chat_response)
    print('chat response', chat_response)
    if match:
        print('match', match)
        json_response = json.loads(match.group(1))
        print('json response', json_response)
        return json_response
    print('no json match')
    return chat_response

