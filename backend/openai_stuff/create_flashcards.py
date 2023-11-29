import PyPDF2
import os
import json
from openai import OpenAI

client = OpenAI()
client.api_key = os.getenv("OPENAI_API_KEY")


def read_pdf(file_path):
    """
    Read text from a PDF file.

    Parameters:
    - file_path (str): The path to the PDF file.

    Returns:
    - str: The extracted text from the PDF.
    """
    try:
        # Open the PDF file
        with open(file_path, "rb") as file:
            # Create a PDF reader object
            pdf_reader = PyPDF2.PdfReader(file)

            # Get the number of pages in the PDF
            num_pages = len(pdf_reader.pages)

            # Initialize an empty string to store the extracted text
            text = ""
            i = 0
            # Loop through all pages and extract text
            for page_num in range(num_pages):
                page = pdf_reader.pages[page_num]
                text += page.extract_text()
                i += 1

            text = text.replace("\n\n", " ").replace("\n", " ")
            flash_cards = create_flashcards(text)

            return flash_cards
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None


models = {
    "3.5": "gpt-3.5-turbo",
    "3.5-turbo": "gpt-3.5-turbo-1106",
    "4": "gpt-4",
}

prompts = {
    "create_flashcards": "You are a teacher and will make multiple flashcards with questions and simple answers in a JSON format for the provided text.",
}


def create_flashcards(text: str):
    try:
        response = client.chat.completions.create(
            model=models["3.5-turbo"],
            messages=[
                {
                    "role": "system",
                    "content": prompts["create_flashcards"],
                },
                {"role": "user", "content": json.dumps(text)},
            ],
            temperature=0.5,
        )
        response_content = response.choices[0].message.content
        return response_content
    except Exception as e:
        print(e)
    except client.APIError as e:
        print(f"OpenAI API returned an API Error: {e}")
        pass
    except client.APIConnectionError as e:
        print(f"Failed to connect to OpenAI API: {e}")
        pass
    except client.RateLimitError as e:
        print(f"OpenAI API request exceeded rate limit: {e}")
        pass


# pdf_path = "data.pdf"
# pdf_text = read_pdf(pdf_path)
# flashcard_json = create_flashcards(pdf_text)


# def read_upload_pdf_and_create_flashcards(pdf_file_path):
#     pdf_text = read_pdf(pdf_file_path)
#     flashcard_json = create_flashcards(pdf_text)
#     return flashcard_json


# """
# create_flashcards response:
# {
#     "flashcards": [
#         {
#             "question": "question text",
#             "answer": "answer text"
#         }, more...
#     ]
# }
# """
if __name__ == "__main__":
    pass