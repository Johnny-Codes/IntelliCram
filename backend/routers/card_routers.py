import json
import re
from models.card_models import (
    CardIn,
    CardOut,
    CardEdit,
    QuizIn,
)
from fastapi import APIRouter, Depends
from repos.card_repo import CardRepo
from repos.upload_file_repo import UploadFileRepo
from routers.user_routers import get_current_active_user
from models.user_models import UserIn
from openai_stuff import create_flashcards

router = APIRouter()


@router.post("/classrooms/{class_id}/decks/{deck_id}/cards")
async def create_card(
    card: CardIn,
    class_id: int,
    deck_id: int,
    repo: CardRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    create_card = repo.create(card, current_user.id, deck_id)
    return create_card


@router.get("/classrooms/{class_id}/decks/{deck_id}/cards")
async def get_all_deck_cards(
    class_id: int,
    deck_id: int,
    repo: CardRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    get_cards = repo.get_all_deck_cards(current_user.id, deck_id)
    return get_cards


@router.post("/classrooms/{class_id}/decks/{deck_id}/cards/quiz")
async def create_quiz(
    class_id: int,
    deck_id: int,
    quiz_in: QuizIn,
    repo: CardRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    create_quiz = repo.create_quiz_for_deck(current_user.id, deck_id, quiz_in)
    return create_quiz


@router.get("/classrooms/{class_id}/decks/{deck_id}/cards/{card_id}")
async def get_a_deck_card(
    class_id: int,
    deck_id: int,
    card_id: int,
    repo: CardRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    get_card = repo.get_card_for_deck(current_user.id, deck_id, card_id)
    return get_card


@router.delete("/classrooms/{class_id}/decks/{deck_id}/cards/{card_id}")
async def delete_card(
    class_id: int,
    deck_id: int,
    card_id: int,
    repo: CardRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    delete_card = repo.delete_card(current_user.id, deck_id, card_id)
    return delete_card


@router.put("/classrooms/{class_id}/decks/{deck_id}/cards/{card_id}")
async def update_card(
    class_id: int,
    deck_id: int,
    card_id: int,
    card: CardEdit,
    repo: CardRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    update_card = repo.update_card(deck_id, current_user.id, card_id, card)
    return update_card


@router.post("/deck/{deck_id}/cards/new_cards_from_file/{file_id}")
async def create_new_cards_from_file(
    file_id: int,
    deck_id: int,
    repo: CardRepo = Depends(),
    upload_file_repo: UploadFileRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    file_path = upload_file_repo.read(file_id)
    file_path = file_path.file_path
    flashcards = create_flashcards.read_pdf(file_path)
    pattern = re.compile(r"```json(.*?)```", re.DOTALL)
    match = pattern.search(flashcards)
    if match:
        json_content = match.group(1)
        card_dict = json.loads(json_content)
        for card in card_dict["flashcards"]:
            card_in = CardIn(
                question=card["question"],
                answer=card["answer"],
            )
            repo.create(card_in, current_user.id, deck_id)
        return json_content
    else:
        return "JSON content not found."
