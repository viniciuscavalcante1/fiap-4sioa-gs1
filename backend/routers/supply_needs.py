from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

import crud
from models import SupplyNeeds
from database import get_db


router = APIRouter()

@router.get("/api/supply-needs", response_model=List[SupplyNeeds])
async def read_supply_needs(db: AsyncSession = Depends(get_db)):
    """
    Endpoint para retornar a lista de necessidades de suprimentos.
    """
    supply_needs = await crud.get_all_supply_needs(db)
    return supply_needs