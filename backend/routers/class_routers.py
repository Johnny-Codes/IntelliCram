from models.class_models import ClassroomIn
from fastapi import APIRouter, Depends
from repos.class_repo import ClassroomRepo
from routers.user_routers import get_current_active_user
from models.user_models import UserIn

router = APIRouter()


@router.post("/classrooms/")
async def create_classroom(
    classroom: ClassroomIn,
    repo: ClassroomRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    create_classroom = repo.create(classroom, current_user.id)
    return create_classroom


@router.get("/classrooms/")
async def get_classrooms(
    repo: ClassroomRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    get_classrooms = repo.get_all_users_classrooms(current_user.id)
    return get_classrooms


@router.get("/classrooms/{classroom_id}")
async def get_one_classroom(
    classroom_id: int,
    repo: ClassroomRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    print("---- userid", current_user.id)
    get_classroom = repo.get_one_classroom(
        classroom_id,
        user_id=current_user.id,
    )
    return get_classroom


@router.delete("/classrooms/{classroom_id}")
async def delete_classroom(
    classroom_id: int,
    repo: ClassroomRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    delete_classroom = repo.delete_classroom(
        classroom_id,
        current_user.id,
    )
    return delete_classroom


@router.put("/classrooms/{classroom_id}")
async def update_classroom(
    classroom_id: int,
    classroom: ClassroomIn,
    repo: ClassroomRepo = Depends(),
    current_user: UserIn = Depends(get_current_active_user),
):
    update_classroom = repo.update_classroom(
        classroom_id,
        classroom,
        current_user.id,
    )
    return update_classroom
