from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional

from models import AlertsDB, NewsDB, SupportPointsDB, OrganizationsDB, SupplyNeedsDB, VolunteerJobsDB, GuidesDB

async def get_all_alerts(db: AsyncSession) -> List[AlertsDB]:
    """
    Busca todos os alertas
    """
    query = select(AlertsDB).order_by(AlertsDB.date.desc(), AlertsDB.time.desc())
    result = await db.execute(query)
    return result.scalars().all()

async def get_all_news(db: AsyncSession) -> List[NewsDB]:
    """
Busca todas as notícias, ordenando pelas mais recentes primeiro.
    """
    query = select(NewsDB).order_by(NewsDB.date.desc())
    result = await db.execute(query)
    return result.scalars().all()

async def get_all_support_points(db: AsyncSession) -> List[SupportPointsDB]:
    """
    Busca todos os pontos de apoio
    """
    query = select(SupportPointsDB).order_by(SupportPointsDB.name)
    result = await db.execute(query)
    return result.scalars().all()

async def get_all_organizations(db: AsyncSession) -> List[OrganizationsDB]:
    """
    Busca todas as organizações
    """
    query = select(OrganizationsDB).order_by(OrganizationsDB.name)
    result = await db.execute(query)
    return result.scalars().all()

async def get_all_supply_needs(db: AsyncSession) -> List[SupplyNeedsDB]:
    """
    Busca todas as necessidades de suprimentos
    """
    query = select(SupplyNeedsDB).order_by(SupplyNeedsDB.id)
    result = await db.execute(query)
    return result.scalars().all()

async def get_all_volunteer_opportunities(db: AsyncSession) -> List[VolunteerJobsDB]:
    """
    Busca todas as oportunidades de voluntariado
    """
    query = select(VolunteerJobsDB).order_by(VolunteerJobsDB.id)
    result = await db.execute(query)
    return result.scalars().all()

async def get_all_guides(db: AsyncSession) -> List[GuidesDB]:
    """
    Busca a lista de todos os guias
    """
    query = select(
        GuidesDB.id,
        GuidesDB.title,
        GuidesDB.category,
        GuidesDB.difficulty,
        GuidesDB.estimated_time,
        GuidesDB.description
    ).order_by(GuidesDB.id)
    result = await db.execute(query)
    return result.all()

async def get_guide_by_id(db: AsyncSession, guide_id: int) -> Optional[GuidesDB]:
    """
    Busca um guia específico pelo seu ID
    """
    query = select(GuidesDB).where(GuidesDB.id == guide_id)
    result = await db.execute(query)
    return result.scalars().first()
