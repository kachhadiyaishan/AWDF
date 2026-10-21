import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import { api } from '../api';

const today = new Date().toLocaleDateString('en-CA');
export default function ApplyLeave({ employee, token }) {
  const [types, setTypes] = useState([]);
  const [leaveTypeId, setLeaveTypeId] = useState('');
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  useEffect(() => { api('/leave-types', { token }).then(r => { setTypes(r.data || []); setLeaveTypeId(r.data?.[0]?._id || ''); }).catch(e => setError(e.message)).finally(() => setLoading(false)); }, [token]);
  const days = fromDate && toDate && new Date(toDate) >= new Date(fromDate) ? Math.round((new Date(toDate) - new Date(fromDate)) / 86400000) + 1 : 0;
  async function submit(e) {
    e.preventDefault(); setError(''); setSuccess('');
    if (!days) return setError('Please select a valid date range.');
    setBusy(true);
    try {
      const result = await api('/leaves', { token, method: 'POST', body: JSON.stringify({ leaveTypeId, fromDate, toDate, reason }) });
      setSuccess(result.message || 'Leave request submitted successfully.');
      setTimeout(() => navigate('/'), 900);
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  }
  return <main className="page form-page"><Link to="/" className="back-link"><ArrowLeft size={16}/> Back to dashboard</Link><div className="form-heading"><div className="form-icon"><CalendarDays/></div><h1>Apply for leave</h1><p className="muted">Submit a new leave request for manager approval.</p></div>
    <div className="balance-banner"><div><span>Current leave balance</span><strong>{employee.annualLeaveAllowance || 20} days</strong></div><div className="balance-user"><strong>{employee.department}</strong><span>Role: {employee.role}</span></div></div>
    <form className="apply-card" onSubmit={submit}>
      {error && <div className="alert">{error}</div>}{success && <div className="success">{success}</div>}
      <label>Leave type<select value={leaveTypeId} onChange={e => setLeaveTypeId(e.target.value)} required disabled={loading}><option value="">Choose a leave type</option>{types.map(t => <option key={t._id} value={t._id}>{t.name} (max {t.annualDays} days/request)</option>)}</select></label>
      <div className="field-row"><label>From date<input type="date" value={fromDate} min={today} onChange={e => { setFromDate(e.target.value); if (toDate < e.target.value) setToDate(e.target.value); }} required/></label><label>To date<input type="date" value={toDate} min={fromDate || today} onChange={e => setToDate(e.target.value)} required/></label></div>
      <div className="calculated"><span>Calculated total days</span><strong>{days || '—'} {days === 1 ? 'day' : 'days'}</strong></div>
      <label>Reason for leave <span className="muted">(max 500 characters)</span><textarea rows="4" maxLength="500" value={reason} onChange={e => setReason(e.target.value)} placeholder="Briefly explain your reason…" required/></label>
      <div className="form-footer"><span className="muted">{reason.length}/500 characters</span><button className="button button-primary" disabled={busy || loading}>{busy ? 'Submitting…' : 'Submit application'}</button></div>
    </form>
  </main>;
}
