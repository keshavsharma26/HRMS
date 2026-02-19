from pydantic import BaseModel, EmailStr
from datetime import date
from typing import List, Optional

class AttendanceBase(BaseModel):
    employee_id: str
    date: date
    status: str

class AttendanceCreate(AttendanceBase):
    pass

class Attendance(AttendanceBase):
    id: int

    class Config:
        from_attributes = True

class EmployeeBase(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: int
    present_days: int = 0
    
    class Config:
        from_attributes = True

class DashboardSummary(BaseModel):
    total_employees: int
    total_attendance: int
    present_count: int
    absent_count: int
