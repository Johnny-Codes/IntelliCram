from models.deck_models import DeckIn, DeckOut
from fastapi import APIRouter, Depends
from repos.deck_repo import DeckRepo
from routers.user_routers import get_current_active_user
from models.user_models import UserIn

router = APIRouter()


@router.post("/classrooms/{class_id}/decks")
async def create_deck(
    deck: DeckIn,
    class_id: int,
    repo: DeckRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    create_deck = repo.create(deck, class_id, current_user.id)
    return create_deck


@router.get("/classrooms/{class_id}/decks")
async def get_all_class_decks(
    class_id: int,
    repo: DeckRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    get_decks = repo.get_all_class_decks(current_user.id, class_id)
    return get_decks


@router.get("/classrooms/{class_id}/decks/{deck_id}")
async def get_one_deck(
    class_id: int,
    deck_id: int,
    repo: DeckRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    get_deck = repo.get_one_deck(class_id, current_user.id, deck_id)
    return get_deck


@router.delete("/classrooms/{class_id}/decks/{deck_id}")
async def delete_deck(
    class_id: int,
    deck_id: int,
    repo: DeckRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    delete_deck = repo.delete_deck(class_id, current_user.id, deck_id)
    return delete_deck


@router.put("/classrooms/{class_id}/decks/{deck_id}")
async def update_deck(
    class_id: int,
    deck_id: int,
    deck: DeckOut,
    repo: DeckRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    update_deck = repo.update_deck(
        class_id,
        current_user.id,
        deck_id,
        deck,
    )
    return update_deck
