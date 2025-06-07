from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

import crud
from models import News
from database import get_db

router = APIRouter()

@router.get("/api/news", response_model=List[News])
async def read_news(db: AsyncSession = Depends(get_db)):
    """
    Endpoint para retornar a lista de todas as notícias verificadas.
    """
    news = await crud.get_all_news(db)
    return news