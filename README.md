# HRMS Lite - Technical Documentation

A production-ready, lightweight Human Resource Management System for a single admin user.

Url: https://hrms-hkydchgk9-keshavs-9306s-projects.vercel.app/

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

## Tech Stack
- **Core**: Python 3.11+, React 18, Node.js 18+
- **DB**: PostgreSQL (Production), SQLite (Testing)
- **Styling**: Vanilla CSS (Custom tokens)
- **Validation**: Pydantic v2


Note: Backend is hosted on Render free tier and may take 20–30 seconds to wake after inactivity.
