from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

import crud
from models import VolunteerJobs
from database import get_db

router = APIRouter()

@router.get("/api/volunteer-opportunities", response_model=List[VolunteerJobs])
async def read_volunteer_opportunities(db: AsyncSession = Depends(get_db)):
    """
    Endpoint para retornar a lista de oportunidades de voluntariado.
    """
    opportunities = await crud.get_all_volunteer_opportunities(db)
    return opportunities