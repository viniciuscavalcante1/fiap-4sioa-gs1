from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

import crud
from models import Organizations
from database import get_db


router = APIRouter()

@router.get("/api/organizations", response_model=List[Organizations])
async def read_organizations(db: AsyncSession = Depends(get_db)):
    """
    Endpoint para retornar a lista de todas as ongs para doação.
    """
    organizations = await crud.get_all_organizations(db)
    return organizations