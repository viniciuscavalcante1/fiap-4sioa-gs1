from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import alerts, news, support_points, organizations, supply_needs, volunteer_jobs, guides

app = FastAPI(
    title="SOS Crise API",
    description="API para a plataforma SOS Crise, que centraliza informações de emergência.",
    version="1.0.0"
)

# Configuração do CORS
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8081",
    "http://127.0.0.1:8081",
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclui as rotas
app.include_router(alerts.router)
app.include_router(news.router)
app.include_router(support_points.router)
app.include_router(organizations.router)
app.include_router(supply_needs.router)
app.include_router(volunteer_jobs.router)
app.include_router(guides.router)


@app.get("/")
def read_root():
    return {"message": "Bem-vindo à API do SOS Crise!"}