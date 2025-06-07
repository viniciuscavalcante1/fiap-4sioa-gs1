from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

import crud
from models import SupportPoints
from database import get_db


router = APIRouter()

@router.get("/api/support-points", response_model=List[SupportPoints])
async def read_support_points(db: AsyncSession = Depends(get_db)):
    """
    Endpoint para retornar a lista de todos os pontos de apoio
    """
    support_points = await crud.get_all_support_points(db)
    return support_points