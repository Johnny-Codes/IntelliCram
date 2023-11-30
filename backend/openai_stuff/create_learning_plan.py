import os
import json
from openai import OpenAI


client = OpenAI()
client.api_key = os.getenv("OPENAI_API_KEY")

models = {
    "3.5": "gpt-3.5-turbo-1106",
    "4": "gpt-4",
}

json_response_template = """
{
  "topic": "topic",
  "schedule": [
      {
          "week x": {
              "day x": {
                  "tasks": []
              },
          }
      },
      {
          "week x + 1": {
              "day x": {
                  "tasks": []
              },
          }
      }
  ]
}
each week needs to be it's own object
"""

# topic = "music theory"
# time_to_study = "8 weeks"
# user_input = f"What is a learning plan for me to learn {topic} in {time_to_study}? Return a JSON response of the schedule like {json_response_template}. Each week must have 6 days (combine day 6 & 7 into one day). If you can create a plan in less time, omit that from the response."

# prompts = {
#     "create-learning-plan": f"You are subject matter expert in {topic}.",
# }


def prompt_function(topic: str):
    return f"You are subject matter expert in {topic}."


def create_learning_plan(topic: str, time_to_study: str):
    user_input = f"What is a learning plan for me to learn {topic} in {time_to_study}?  Each week must have 6 days (combine day 6 & 7 into one day). If you can create a plan in less time, omit that from the response. Return a JSON response of the schedule structured exactly like {json_response_template}."
    print('user input', user_input)
    response = client.chat.completions.create(
        model=models["3.5"],
        messages=[
            {
                "role": "system",
                "content": prompt_function(topic),
            },
            {"role": "user", "content": user_input},
        ],
        temperature=1.0,
    )
    response_content = response.choices[0].message.content
    with open('response_content_10.json', 'w') as file:
        file.write(response_content)
    return response_content


# if __name__ == "__main__":
#     create_learning_plan(user_input)