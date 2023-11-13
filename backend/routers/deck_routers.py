from models.deck_models import DeckIn
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
