from sqlalchemy import Column, Integer, String, Date, Time, Text, ARRAY, Boolean, DECIMAL, JSON
from pydantic import BaseModel
from typing import List, Optional
from datetime import date as date_type, time as time_type
from database import Base

# Model de Alerts
class AlertsDB(Base):
    __tablename__ = 'alerts'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    severity = Column(String, index=True)
    date = Column(Date)
    time = Column(Time)
    description = Column(Text)
    location = Column(String, index=True)
    source = Column(String)
    recommendations = Column(ARRAY(Text))

# BaseModel para alerts
class Alerts(BaseModel):
    id: int
    title: str
    severity: Optional[str] = None
    date: Optional[date_type] = None
    time: Optional[time_type] = None
    description: Optional[str] = None
    location: Optional[str] = None
    source: Optional[str] = None
    recommendations: Optional[List[str]] = None

    class Config:
        from_attributes = True

class NewsDB(Base):
    __tablename__ = 'news'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    summary = Column(Text)
    date = Column(Date)
    source = Column(String)
    category = Column(String, index=True)
    verified = Column(Boolean, default=True)
    url = Column(String)

class News(BaseModel):
    id: int
    title: str
    summary: Optional[str] = None
    date: Optional[date_type] = None
    source: Optional[str] = None
    category: Optional[str] = None
    verified: Optional[bool] = True
    url: Optional[str] = None

    class Config:
        from_attributes = True

class SupportPointsDB(Base):
    __tablename__ = 'support_points'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False, index=True)
    address = Column(String)
    phone = Column(String)
    services = Column(ARRAY(Text))
    capacity = Column(String)
    status = Column(String)
    hours = Column(String)
    needed_items = Column(ARRAY(Text))
    latitude = Column(DECIMAL(10, 8))
    longitude = Column(DECIMAL(11, 8))

class SupportPoints(BaseModel):
    id: int
    name: str
    type: str
    address: Optional[str] = None
    phone: Optional[str] = None
    services: Optional[List[str]] = None
    capacity: Optional[str] = None
    status: Optional[str] = None
    hours: Optional[str] = None
    needed_items: Optional[List[str]] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

    class Config:
        from_attributes = True

class OrganizationsDB(Base):
    __tablename__ = 'organizations'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    focus = Column(String)
    website = Column(String)
    verified = Column(Boolean, default=True)

class Organizations(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    focus: Optional[str] = None
    website: Optional[str] = None
    verified: Optional[bool] = True

    class Config:
        from_attributes = True

class SupplyNeedsDB(Base):
    __tablename__ = 'supply_needs'

    id = Column(Integer, primary_key=True, index=True)
    organization = Column(String, nullable=False)
    items = Column(ARRAY(Text), nullable=False)
    urgency = Column(String)
    location = Column(String, index=True)
    contact = Column(String)
    delivery_info = Column(Text)

class SupplyNeeds(BaseModel):
    id: int
    organization: str
    items: List[str]
    urgency: Optional[str] = None
    location: Optional[str] = None
    contact: Optional[str] = None
    delivery_info: Optional[str] = None

    class Config:
        from_attributes = True

class VolunteerJobsDB(Base):
    __tablename__ = 'volunteer_jobs'

    id = Column(Integer, primary_key=True, index=True)
    organization = Column(String, nullable=False)
    role = Column(String, nullable=False)
    description = Column(Text)
    requirements = Column(ARRAY(Text))
    location = Column(String, index=True)
    time_commitment = Column(String)
    contact = Column(String)
    urgent = Column(Boolean, default=False)

class VolunteerJobs(BaseModel):
    id: int
    organization: str
    role: str
    description: Optional[str] = None
    requirements: Optional[List[str]] = None
    location: Optional[str] = None
    time_commitment: Optional[str] = None
    contact: Optional[str] = None
    urgent: Optional[bool] = False

    class Config:
        from_attributes = True

class GuidesDB(Base):
    __tablename__ = 'guides'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category = Column(String, index=True)
    difficulty = Column(String)
    estimated_time = Column(String)
    description = Column(Text)
    content_md = Column(Text)

class GuidesSummary(BaseModel):
    id: int
    title: str
    category: Optional[str] = None
    difficulty: Optional[str] = None
    estimated_time: Optional[str] = None
    description: Optional[str] = None

    class Config:
        from_attributes = True

class GuidesDetail(GuidesSummary):
    content_md: str

    class Config:
        from_attributes = True
