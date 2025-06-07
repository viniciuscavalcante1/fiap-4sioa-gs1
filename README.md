# SOS Crise - Global Solution 2025.1

## Sobre o Projeto

O **SOS Crise** é uma plataforma web/mobile projetada para ser um ponto central de informações e ajuda durante crises e desastres naturais no Brasil.

A ideia vem da necessidade de centralizar dados confiáveis e facilitar a conexão entre quem precisa de ajuda e quem quer ajudar em momentos críticos.

### Aluno
* **Nome:** Vinícius de Abreu Cavalcante
* **RM:** 86108
* **Turma:** 4SIOA
* **Curso:** Sistemas de Informação

---

## Funcionalidades Implementadas

O protótipo funcional da plataforma inclui:

* **Página Inicial:** Mostra um resumo da plataforma e os alertas mais recentes.
* **Alertas de Emergência:** Exibe uma lista de alertas com níveis de severidade.
* **Notícias Verificadas:** Agrega notícias de fontes confiáveis sobre prevenção, meio ambiente, doações e tecnologia.
* **Mapa de Apoio Interativo:** Mostra um mapa com a localização de abrigos, hospitais, pontos de coleta e de distribuição de ajuda.
* **Central "Como Ajudar":** Uma seção com três abas, para quem quer ajudar:
    * **Doações Monetárias:** Direciona para ONGs confiáveis, para ajudar com doações.
    * **Doação de Suprimentos:** Lista as necessidades específicas de itens em diferentes locais.
    * **Oportunidades de Voluntariado:** Apresenta "vagas" de voluntariado.
* **Guias de Preparo:** Conteúdo educativo que ensina a se preparar e como reagir a diferentes tipos de crises.

---

## Tecnologias Utilizadas

* **Frontend:**
    * **Framework:** React com TypeScript e Vite
    * **Estilização:** Tailwind CSS com a biblioteca de componentes `shadcn/ui`
    * **Gerenciamento de Dados da API:** TanStack Query (React Query)
    * **Mapas:** Leaflet e React-Leaflet
    * **Renderização de Markdown:** React-Markdown

* **Backend:**
    * **Framework:** FastAPI (Python)
    * **Comunicação com o Banco:** SQLAlchemy com `asyncpg`

* **Banco de Dados:**
    * PostgreSQL

---

## Como Rodar

Você precisará ter o Node.js/npm e o Python/pip instalados, e de um servidor PostgreSQL rodando.

### 1. Backend

Inicie o servidor do backend:

```bash
cd backend
python -m venv venv
source venv/bin/activate

# Crie um arquivo .env com a sua DATABASE_URL
# Ex: DATABASE_URL="postgresql+asyncpg://postgres:sua_senha@localhost:5432/sos_crise_db"

# Execute o servidor
uvicorn main:app --reload --port 8000
```

### 2. Frontend

Em outro terminal, inicie o servidor do frontend:

```bash
cd frontend
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

O app então estará disponível em `http://localhost:8080` e se comunicará com a API em `http://localhost:8000`.