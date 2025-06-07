from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

import crud
import models
from database import get_db

router = APIRouter()

@router.get("/api/alerts", response_model=List[models.Alerts])
async def read_alerts(db: AsyncSession = Depends(get_db)):
    """
    Endpoint para retornar a lista de todos os alertas
    """
    alerts = await crud.get_all_alerts(db)
    return alerts