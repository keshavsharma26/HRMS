import React, { useEffect, useState } from 'react';
import { attendanceApi, employeeApi } from '../api/api';
import { CheckCircle2, XCircle, Search } from 'lucide-react';

const Attendance = () => {
    const [employees, setEmployees] = useState([]);
    const [records, setRecords] = useState([]);
    const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const [empRes, attRes] = await Promise.all([
                employeeApi.getAll(),
                attendanceApi.getAll(filterDate)
            ]);
            setEmployees(empRes.data);
            setRecords(attRes.data);
            setLoading(false);
            setError('');
        } catch (err) {
            setError('Connection failed. Is the backend running?');
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [filterDate]);

    const markAttendance = async (employee_id, status) => {
        try {
            await attendanceApi.mark({
                employee_id,
                status,
                date: filterDate
            });
            fetchData();
        } catch (err) {
            alert('Error marking attendance');
        }
    };

    const getStatus = (employee_id) => {
        const record = records.find(r => r.employee_id === employee_id);
        return record ? record.status : 'Not Marked';
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Attendance Tracking</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <label>Filter Date:</label>
                    <input type="date" className="input" style={{ width: 'auto' }} value={filterDate} onChange={e => setFilterDate(e.target.value)} />
                </div>
            </div>

            {error && (
                <div className="error-alert">
                    <p>{error}</p>
                    <button onClick={fetchData} className="btn btn-primary" style={{ marginLeft: 'auto' }}>Retry</button>
                </div>
            )}

            <div className="card">
                <h3>Mark Attendance for {filterDate}</h3>
                <div style={{ marginTop: '1.5rem', overflowX: 'auto' }}>
                    {loading ? <p>Loading...</p> : employees.length === 0 ? <p>No employees found to mark attendance.</p> : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Name</th>
                                    <th>Current Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map(emp => {
                                    const status = getStatus(emp.employee_id);
                                    return (
                                        <tr key={emp.id}>
                                            <td>{emp.employee_id}</td>
                                            <td>{emp.full_name}</td>
                                            <td>
                                                <span className={`status-badge ${status === 'Present' ? 'status-present' : status === 'Absent' ? 'status-absent' : ''}`}>
                                                    {status}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button
                                                        onClick={() => markAttendance(emp.employee_id, 'Present')}
                                                        className="btn btn-primary"
                                                        style={{ background: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                    >
                                                        <CheckCircle2 size={16} /> Present
                                                    </button>
                                                    <button
                                                        onClick={() => markAttendance(emp.employee_id, 'Absent')}
                                                        className="btn btn-danger"
                                                        style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                    >
                                                        <XCircle size={16} /> Absent
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Attendance;
