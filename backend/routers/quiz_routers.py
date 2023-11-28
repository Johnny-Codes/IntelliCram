from models.quiz_models import QuizOut, Question, Answer
from fastapi import APIRouter, Depends
from repos.quiz_repo import QuizRepo
from routers.user_routers import get_current_active_user
from models.user_models import UserIn
from fastapi.responses import JSONResponse

router = APIRouter()


@router.get("/classrooms/{class_id}/decks/{deck_id}/quizzes")
async def get_all_deck_quizzes(
    class_id: int,
    deck_id: int,
    repo: QuizRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    get_quizzes = repo.get_all_quizzes_for_deck(current_user.id, deck_id)
    return get_quizzes


@router.get("/quizzes")
async def get_all_user_quizzes(
    repo: QuizRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    print("current user id", current_user.id)
    get_quizzes = repo.get_all_quizzes_for_user(current_user.id)
    return get_quizzes


@router.get("/classrooms/{class_id}/decks/{deck_id}/quizzes/{quiz_id}")
async def get_one_quiz(
    class_id: int,
    deck_id: int,
    quiz_id: int,
    repo: QuizRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    get_quiz = repo.get_one_quiz(current_user.id, deck_id, quiz_id)
    return get_quiz


@router.delete("/classrooms/{class_id}/decks/{deck_id}/quizzes/{quiz_id}")
async def delete_quiz(
    class_id: int,
    deck_id: int,
    quiz_id: int,
    repo: QuizRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    delete_quiz = repo.delete_quiz(current_user.id, deck_id, quiz_id)
    return delete_quiz


@router.get("/quizzes/{quiz_id}/questions")
async def get_all_quiz_questions(
    quiz_id: int,
    repo: QuizRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    get_questions = repo.get_all_questions_for_quiz(current_user.id, quiz_id)
    return get_questions


@router.get("/quizzes/{quiz_id}/questions/{question_id}")
async def get_quiz_question(
    quiz_id: int,
    question_id: int,
    repo: QuizRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    get_question = repo.get_single_question(current_user.id, quiz_id, question_id)
    return get_question


@router.delete("/quizzes/{quiz_id}/questions/{question_id}")
async def delete_quiz_question(
    quiz_id: int,
    question_id: int,
    repo: QuizRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    deleted = repo.delete_question(current_user.id, quiz_id, question_id)

    if deleted is None:
        return JSONResponse(
            content={"message": "Error deleting the question"}, status_code=500
        )
    elif deleted:
        return JSONResponse(
            content={"message": "Question deleted successfully"}, status_code=200
        )
    else:
        return JSONResponse(
            content={"message": "Question not found or unauthorized"}, status_code=404
        )


@router.get("/quizzes/{quiz_id}/questions/{question_id}/answers")
async def get_question_answers(
    quiz_id: int,
    question_id: int,
    repo: QuizRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    answers = repo.get_answers_for_question(current_user.id, quiz_id, question_id)
    return answers
