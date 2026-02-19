from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/employees", tags=["Employees"])

@router.post("/", response_model=schemas.Employee, status_code=status.HTTP_201_CREATED)
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    db_employee = db.query(models.Employee).filter(models.Employee.employee_id == employee.employee_id).first()
    if db_employee:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Employee ID already registered")
    
    new_employee = models.Employee(**employee.model_dump())
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee

@router.get("/", response_model=List[schemas.Employee])
def get_employees(db: Session = Depends(get_db)):
    employees = db.query(models.Employee).all()
    for emp in employees:
        emp.present_days = db.query(models.Attendance).filter(
            models.Attendance.employee_id == emp.employee_id,
            models.Attendance.status == "Present"
        ).count()
    return employees

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_employee(id: int, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.id == id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    db.delete(employee)
    db.commit()
    return None
