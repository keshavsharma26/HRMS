import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.database import Base, get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_create_employee():
    response = client.post(
        "/employees/",
        json={"employee_id": "EMP001", "full_name": "Test User", "email": "test@example.com", "department": "IT"}
    )
    assert response.status_code == 201
    assert response.json()["employee_id"] == "EMP001"

def test_get_employees():
    client.post("/employees/", json={"employee_id": "EMP001", "full_name": "Test User", "email": "test@example.com", "department": "IT"})
    response = client.get("/employees/")
    assert response.status_code == 200
    assert len(response.json()) == 1

def test_mark_attendance():
    client.post("/employees/", json={"employee_id": "EMP001", "full_name": "Test User", "email": "test@example.com", "department": "IT"})
    response = client.post(
        "/attendance/",
        json={"employee_id": "EMP001", "date": "2024-02-19", "status": "Present"}
    )
    assert response.status_code == 201
    assert response.json()["status"] == "Present"

def test_dashboard_summary():
    client.post("/employees/", json={"employee_id": "EMP001", "full_name": "Test User", "email": "test@example.com", "department": "IT"})
    client.post("/attendance/", json={"employee_id": "EMP001", "date": "2024-02-19", "status": "Present"})
    response = client.get("/attendance/summary/stats")
    assert response.status_code == 200
    assert response.json()["total_employees"] == 1
    assert response.json()["present_count"] == 1
