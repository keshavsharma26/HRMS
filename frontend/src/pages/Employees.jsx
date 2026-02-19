import React, { useEffect, useState } from 'react';
import { employeeApi } from '../api/api';
import { Trash2, UserPlus } from 'lucide-react';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ employee_id: '', full_name: '', email: '', department: '' });
    const [error, setError] = useState('');

    const fetchEmployees = async () => {
        try {
            const res = await employeeApi.getAll();
            setEmployees(res.data);
            setLoading(false);
            setError('');
        } catch (err) {
            setError('Failed to load employees. Please check server status.');
            setLoading(false);
        }
    };

    useEffect(() => { fetchEmployees(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!form.employee_id.trim() || !form.full_name.trim() || !form.email.trim() || !form.department.trim()) {
            setError('All fields are compulsory and cannot be empty.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{3,}$/;
        if (!emailRegex.test(form.email)) {
            setError('Invalid email format. Must follow user@domain.tld (e.g., .com, .org)');
            return;
        }

        try {
            await employeeApi.create(form);
            setForm({ employee_id: '', full_name: '', email: '', department: '' });
            fetchEmployees();
        } catch (err) {
            const detail = err.response?.data?.detail;
            setError(typeof detail === 'string' ? detail : 'Error creating employee');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await employeeApi.delete(id);
                fetchEmployees();
            } catch (err) {
                alert('Error deleting employee');
            }
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Employee Management</h2>
            </div>

            {error && !loading && employees.length === 0 && (
                <div className="error-alert">
                    <p>{error}</p>
                    <button onClick={fetchEmployees} className="btn btn-primary" style={{ marginLeft: 'auto' }}>Retry</button>
                </div>
            )}

            <div className="card">
                <h3>Add New Employee</h3>
                <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    <div className="form-group">
                        <label>Employee ID <span className="required-star">*</span></label>
                        <input className="input" value={form.employee_id} onChange={e => setForm({ ...form, employee_id: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Full Name <span className="required-star">*</span></label>
                        <input className="input" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Email <span className="required-star">*</span></label>
                        <input className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Department <span className="required-star">*</span></label>
                        <input className="input" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        {error && <p style={{ color: 'var(--danger)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
                        <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <UserPlus size={18} /> Add Employee
                        </button>
                    </div>
                </form>
            </div>

            <div className="card">
                <h3>Employee List</h3>
                <div style={{ marginTop: '1.5rem', overflowX: 'auto' }}>
                    {loading ? <p>Loading...</p> : employees.length === 0 ? <p>No employees found.</p> : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Present Days</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map(emp => (
                                    <tr key={emp.id}>
                                        <td>{emp.employee_id}</td>
                                        <td>{emp.full_name}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.department}</td>
                                        <td>{emp.present_days}</td>
                                        <td>
                                            <button onClick={() => handleDelete(emp.id)} className="btn btn-danger" style={{ padding: '0.4rem' }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Employees;
