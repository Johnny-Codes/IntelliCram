import os
import json
from openai import OpenAI


client = OpenAI()
client.api_key = os.getenv("OPENAI_API_KEY")

models = {
    "3.5": "gpt-3.5-turbo-1106",
    "4": "gpt-4",
}

json_response_template = '{"topic": "topic", "schedule": [{"week x": {"day x": {"tasks": []}}}}]}'

topic = "music theory"
time_to_study = "8 weeks"
user_input = f"What is a learning plan for me to learn {topic} in {time_to_study}? Return a JSON response of the schedule like {json_response_template}. Each week must have 6 days (combine day 6 & 7 into one day). If you can create a plan in less time, omit that from the response."

prompts = {
    "create-learning-plan": f"You are subject matter expert in {topic}.",
}


def prompt_function(topic: str):
    return f"You are subject matter expert in {topic}."


def create_learning_plan(user_input: str):
    response = client.chat.completions.create(
        model=models["3.5"],
        messages=[
            {
                "role": "system",
                "content": prompt_function(topic),
            },
            {"role": "user", "content": f"{user_input}"},
        ],
        temperature=1.0,
    )
    print(response)
    response_content = response.choices[0].message.content
    print(response_content)
    with open('response_content_2.txt', 'w') as file:
        file.write(response_content)
    return response_content


if __name__ == "__main__":
    create_learning_plan(user_input)

"""
Example Response:
response = [{
  "Month 1": {
    "Week 1": {
      "Day 1": {
        "tasks": ["Introduction to linear algebra, basic concepts and history"]
      },
      "Day 2": {
        "tasks": ["Scalar and vector operations"]
      },
      "Day 3": {
        "tasks": ["Vector spaces and subspaces"]
      },
      "Day 4": {
        "tasks": ["Linear independence and basis"]
      },
      "Day 5": {
        "tasks": ["Quiz or review"]
      }
    },
    "Week 2": {
      "Day 1": {
        "tasks": ["Matrices and matrix operations"]
      },
      "Day 2": {
        "tasks": ["Matrix transformations"]
      },
      "Day 3": {
        "tasks": ["Determinants and their properties"]
      },
      "Day 4": {
        "tasks": ["Matrix inverses and solving linear systems"]
      },
      "Day 5": {
        "tasks": ["Quiz or review"]
      }
    },
    "Week 3": {
      "Day 1": {
        "tasks": ["Eigenvalues and eigenvectors"]
      },
      "Day 2": {
        "tasks": ["Diagonalization of matrices"]
      },
      "Day 3": {
        "tasks": ["Orthogonality and orthogonal projections"]
      },
      "Day 4": {
        "tasks": ["Least square approximations"]
      },
      "Day 5": {
        "tasks": ["Quiz or review"]
      }
    },
    "Week 4": {
      "Day 1": {
        "tasks": ["Mid-term assessment or review"]
      },
      "Day 2": {
        "tasks": ["Applications of linear algebra in computer science"]
      },
      "Day 3": {
        "tasks": ["Applications of linear algebra in physics"]
      },
      "Day 4": {
        "tasks": ["Applications of linear algebra in engineering"]
      },
      "Day 5": {
        "tasks": ["Project work or review"]
      }
    }
  },
  "Month 2": {
    "Week 1": {
      "Day 1": {
        "tasks": ["Vector spaces and subspaces revisited"]
      },
      "Day 2": {
        "tasks": ["Linear transformations"]
      },
      "Day 3": {
        "tasks": ["Rank and nullity of a matrix"]
      },
      "Day 4": {
        "tasks": ["Systems of linear equations and their solutions"]
      },
      "Day 5": {
        "tasks": ["Quiz or review"]
      }
    },
    "Week 2": {
      "Day 1": {
        "tasks": ["Vector spaces and subspaces revisited"]
      },
      "Day 2": {
        "tasks": ["Linear transformations"]
      },
      "Day 3": {
        "tasks": ["Rank and nullity of a matrix"]
      },
      "Day 4": {
        "tasks": ["Systems of linear equations and their solutions"]
      },
      "Day 5": {
        "tasks": ["Quiz or review"]
      }
    },
    "Week 3": {
      "Day 1": {
        "tasks": ["Inner product spaces"]
      },
      "Day 2": {
        "tasks": ["Orthogonal sets and orthonormal bases"]
      },
      "Day 3": {
        "tasks": ["Gram-Schmidt process and QR factorization"]
      },
      "Day 4": {
        "tasks": ["Singular Value Decomposition (SVD)"]
      },
      "Day 5": {
        "tasks": ["Quiz or review"]
      }
    },
    "Week 4": {
      "Day 1": {
        "tasks": ["Applications of SVD in image compression"]
      },
      "Day 2": {
        "tasks": ["Applications of SVD in machine learning"]
      },
      "Day 3": {
        "tasks": ["Review of key concepts and applications"]
      },
      "Day 4": {
        "tasks": ["Final project work and presentation preparation"]
      },
      "Day 5": {
        "tasks": ["Final assessment and conclusion"]
      }
    }
  }
}{
  "Month 1": {
    "Week 1": {
      "Day 1": {
        "tasks": ["Introduction to linear algebra, basic concepts and history"]
      },
      "Day 2": {
        "tasks": ["Scalar and vector operations"]
      },
      "Day 3": {
        "tasks": ["Vector spaces and subspaces"]
      },
      "Day 4": {
        "tasks": ["Linear independence and basis"]
      },
      "Day 5": {
        "tasks": ["Quiz or review"]
      }
    },
    "Week 2": {
      "Day 1": {
        "tasks": ["Matrices and matrix operations"]
      },
      "Day 2": {
        "tasks": ["Matrix transformations"]
      },
      "Day 3": {
        "tasks": ["Determinants and their properties"]
      },
      "Day 4": {
        "tasks": ["Matrix inverses and solving linear systems"]
      },
      "Day 5": {
        "tasks": ["Quiz or review"]
      }
    },
    "Week 3": {
      "Day 1": {
        "tasks": ["Eigenvalues and eigenvectors"]
      },
      "Day 2": {
        "tasks": ["Diagonalization of matrices"]
      },
      "Day 3": {
        "tasks": ["Orthogonality and orthogonal projections"]
      },
      "Day 4": {
        "tasks": ["Least square approximations"]
      },
      "Day 5": {
        "tasks": ["Quiz or review"]
      }
    },
    "Week 4": {
      "Day 1": {
        "tasks": ["Mid-term assessment or review"]
      },
      "Day 2": {
        "tasks": ["Applications of linear algebra in computer science"]
      },
      "Day 3": {
        "tasks": ["Applications of linear algebra in physics"]
      },
      "Day 4": {
        "tasks": ["Applications of linear algebra in engineering"]
      },
      "Day 5": {
        "tasks": ["Project work or review"]
      }
    }
  },
  "Month 2": {
    "Week 1": {
      "Day 1": {
        "tasks": ["Vector spaces and subspaces revisited"]
      },
      "Day 2": {
        "tasks": ["Linear transformations"]
      },
      "Day 3": {
        "tasks": ["Rank and nullity of a matrix"]
      },
      "Day 4": {
        "tasks": ["Systems of linear equations and their solutions"]
      },
      "Day 5": {
        "tasks": ["Quiz or review"]
      }
    },
    "Week 2": {
      "Day 1": {
        "tasks": ["Vector spaces and subspaces revisited"]
      },
      "Day 2": {
        "tasks": ["Linear transformations"]
      },
      "Day 3": {
        "tasks": ["Rank and nullity of a matrix"]
      },
      "Day 4": {
        "tasks": ["Systems of linear equations and their solutions"]
      },
      "Day 5": {
        "tasks": ["Quiz or review"]
      }
    },
    "Week 3": {
      "Day 1": {
        "tasks": ["Inner product spaces"]
      },
      "Day 2": {
        "tasks": ["Orthogonal sets and orthonormal bases"]
      },
      "Day 3": {
        "tasks": ["Gram-Schmidt process and QR factorization"]
      },
      "Day 4": {
        "tasks": ["Singular Value Decomposition (SVD)"]
      },
      "Day 5": {
        "tasks": ["Quiz or review"]
      }
    },
    "Week 4": {
      "Day 1": {
        "tasks": ["Applications of SVD in image compression"]
      },
      "Day 2": {
        "tasks": ["Applications of SVD in machine learning"]
      },
      "Day 3": {
        "tasks": ["Review of key concepts and applications"]
      },
      "Day 4": {
        "tasks": ["Final project work and presentation preparation"]
      },
      "Day 5": {
        "tasks": ["Final assessment and conclusion"]
      }
    }
  }
}
]
"""