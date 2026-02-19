import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserCheck } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';

const Sidebar = () => (
    <div className="sidebar">
        <h1>HRMS Lite</h1>
        <nav>
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <LayoutDashboard size={20} /> Dashboard
            </NavLink>
            <NavLink to="/employees" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <Users size={20} /> Employees
            </NavLink>
            <NavLink to="/attendance" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <UserCheck size={20} /> Attendance
            </NavLink>
        </nav>
    </div>
);

function App() {
    return (
        <Router>
            <div className="layout">
                <Sidebar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/employees" element={<Employees />} />
                        <Route path="/attendance" element={<Attendance />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
