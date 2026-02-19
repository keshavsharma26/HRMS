# HRMS Lite - Technical Documentation

A production-ready, lightweight Human Resource Management System for a single admin user.

## What has been implemented
The following features and configurations have been successfully implemented:

- **Backend Architecture**:
    - **FastAPI** framework with modular routing (`/employees`, `/attendance`).
    - **SQLAlchemy ORM** for PostgreSQL data persistence.
    - **Pydantic Schemas** for strict data validation and serialization.
    - **CORS Configuration** to allow frontend communication.
    - **Error Handling** for duplicate IDs and missing records.
- **Frontend Architecture**:
    - **React (Vite)** with a clean, functional component structure.
    - **Vanilla CSS** design system for a premium admin tool experience.
    - **Axios Service Layer** for centralized API communication.
    - **Lucide React** for consistent iconography.
- **Functional Features**:
    - **Employee Management**: Full CRUD (Add, List, Delete) with validation.
    - **Attendance Management**: Mark status (Present/Absent) per date with history tracking.
    - **Dashboard**: Real-time summary statistics of the workforce.
    - **Bonus Features**: Date filtering for attendance and "Present Days" counter per employee.

---

## How to Run Locally

### 1. Backend
#### PostgreSQL Setup (Windows)
1. **Download & Install**: Download the PostgreSQL installer from [postgresql.org](https://www.postgresql.org/download/windows/) and install it.
2. **Create Database**:
   - Open **pgAdmin 4** or use the **SQL Shell (psql)**.
   - Run the following command to create the database:
     ```sql
     CREATE DATABASE hrms_db;
     ```
3. **Update .env**: Create a `.env` file in the `backend/` directory and set your credentials:
   ```env
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/hrms_db
   ```

#### Local Run
```bash
python -m venv venv
# Windows (Git Bash/Bash):
source venv/Scripts/activate
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1

pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 10000 --reload
```

### 2. Frontend
```bash
cd frontend
npm install
# Create .env and add: VITE_API_URL=http://localhost:10000
npm run dev
```

---

## How to Run Tests

### Backend Tests
The backend includes a suite of integration tests using `pytest` and an in-memory SQLite database for isolation.

```bash
cd backend
# Run with PYTHONPATH set to current directory
PYTHONPATH=. pytest tests/test_api.py
# OR use python module mode:
python -m pytest tests/test_api.py
```
*Note: Ensure you have installed the requirements, including `pytest` and `httpx`.*

### Frontend Verification
Manual verification is performed via the development server. Ensure the backend is running before testing the frontend flows.

---

## How to Deploy

### Backend (Render / Heroku / DigitalOcean)
1. **Prepare Environment**: Set `DATABASE_URL` in your provider's dashboard.
2. **Build Configuration**: Use the provided `Dockerfile` or run:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port 10000`
3. **Internal Port**: Ensure the service listens on port `10000`.

### Frontend (Vercel / Netlify)
1. **Connect Repository**: Point to the `frontend/` directory.
2. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Environment Variable**: Set `VITE_API_URL` to the URL of your deployed backend.

---

## Tech Stack
- **Core**: Python 3.11+, React 18, Node.js 18+
- **DB**: PostgreSQL (Production), SQLite (Testing)
- **Styling**: Vanilla CSS (Custom tokens)
- **Validation**: Pydantic v2
