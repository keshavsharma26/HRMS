from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.post("/", response_model=schemas.Attendance, status_code=status.HTTP_201_CREATED)
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.employee_id == attendance.employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    existing = db.query(models.Attendance).filter(
        models.Attendance.employee_id == attendance.employee_id,
        models.Attendance.date == attendance.date
    ).first()
    
    if existing:
        existing.status = attendance.status
        db.commit()
        db.refresh(existing)
        return existing
    
    new_attendance = models.Attendance(**attendance.model_dump())
    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)
    return new_attendance

@router.get("/{employee_id}", response_model=List[schemas.Attendance])
def get_employee_attendance(employee_id: str, db: Session = Depends(get_db)):
    return db.query(models.Attendance).filter(models.Attendance.employee_id == employee_id).all()

@router.get("/", response_model=List[schemas.Attendance])
def get_all_attendance(
    date: Optional[date] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(models.Attendance)
    if date:
        query = query.filter(models.Attendance.date == date)
    return query.all()

@router.get("/summary/stats", response_model=schemas.DashboardSummary)
def get_dashboard_summary(db: Session = Depends(get_db)):
    total_employees = db.query(models.Employee).count()
    total_attendance = db.query(models.Attendance).count()
    present_count = db.query(models.Attendance).filter(models.Attendance.status == "Present").count()
    absent_count = db.query(models.Attendance).filter(models.Attendance.status == "Absent").count()
    
    return {
        "total_employees": total_employees,
        "total_attendance": total_attendance,
        "present_count": present_count,
        "absent_count": absent_count
    }
