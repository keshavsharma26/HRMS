import React, { useEffect, useState } from 'react';
import { attendanceApi } from '../api/api';
import { Users, ClipboardCheck, UserCheck } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        total_employees: 0,
        total_attendance: 0,
        present_count: 0,
        absent_count: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        attendanceApi.getSummary().then(res => {
            setStats(res.data);
            setLoading(false);
        }).catch(err => {
            setError('Could not connect to the server. Please check your backend connection.');
            setLoading(false);
        });
    }, []);

    if (loading) return (
        <div className="loading-container">
            <p>Loading summary data...</p>
        </div>
    );

    if (error) return (
        <div className="error-alert">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ marginLeft: 'auto' }}>Retry</button>
        </div>
    );

    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>Dashboard Overview</h2>
            <div className="stats-grid">
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="stat-label">Total Employees</span>
                        <Users color="#4f46e5" size={24} />
                    </div>
                    <p className="stat-value">{stats.total_employees}</p>
                </div>
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="stat-label">Total Attendance Records</span>
                        <ClipboardCheck color="#10b981" size={24} />
                    </div>
                    <p className="stat-value">{stats.total_attendance}</p>
                </div>
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="stat-label">Present Count</span>
                        <UserCheck color="#10b981" size={24} />
                    </div>
                    <p className="stat-value text-success">{stats.present_count}</p>
                </div>
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="stat-label">Absent Count</span>
                        <UserCheck color="#ef4444" size={24} />
                    </div>
                    <p className="stat-value text-danger">{stats.absent_count}</p>
                </div>
            </div>

            <div className="card">
                <h3>Welcome Admin</h3>
                <p style={{ marginTop: '1rem', color: '#6b7280' }}>
                    Manage your workforce and track attendance efficiently with HRMS Lite.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
