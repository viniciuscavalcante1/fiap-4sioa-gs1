from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

import crud
from models import GuidesSummary, GuidesDetail
from database import get_db

router = APIRouter()

@router.get("/api/preparedness-guides", response_model=List[GuidesSummary])
async def read_guides_summary(db: AsyncSession = Depends(get_db)):
    """
    Endpoint para retornar a lista resumida de todos os guias de preparo.
    """
    guides = await crud.get_all_guides(db)
    return guides

@router.get("/api/preparedness-guides/{guide_id}", response_model=GuidesDetail)
async def read_guide_detail(guide_id: int, db: AsyncSession = Depends(get_db)):
    """
    Endpoint para retornar os detalhes de um guia específico.
    """
    db_guide = await crud.get_guide_by_id(db, guide_id=guide_id)
    if db_guide is None:
        raise HTTPException(status_code=404, detail="Guia não encontrado")
    return db_guide