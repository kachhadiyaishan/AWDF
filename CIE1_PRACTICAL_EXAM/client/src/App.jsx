import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { Building2, LogOut, Plus, Search, ShieldCheck } from 'lucide-react';
import { api } from './api';
import LeaveCard from './components/LeaveCard';
import ProtectedRoute from './components/ProtectedRoute';
const ApplyLeave = lazy(() => import('./pages/ApplyLeave.jsx'));

function Login({ onLogin }) {
  const [email, setEmail] = useState('aarav@techsolutions.com');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault(); setError(''); setBusy(true);
    try { const data = await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }); onLogin(data); }
    catch (err) { setError(err.message); } finally { setBusy(false); }
  }
  return <main className="login-wrap"><form className="login-card" onSubmit={submit}>
    <div className="brand-mark"><Building2 size={24}/></div><h1>TechSolutions</h1><p className="muted center">Employee Leave Portal</p>
    {error && <div className="alert">{error}</div>}
    <label>Work Email Address<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
    <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
    <button className="button button-primary full" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
    <div className="demo-hint"><strong>Demo access</strong><br/>Employee: aarav@techsolutions.com<br/>HR: hr@techsolutions.com<br/>Password: Password123!</div>
  </form></main>;
}
function Shell({ employee, logout, children }) {
  return <><header className="topbar"><Link className="brand" to="/"><span className="brand-mark small"><Building2 size={18}/></span><span><strong>TechSolutions</strong><small>Leave Portal</small></span></Link>
    {employee && <nav><Link to="/">Dashboard</Link>{employee.role === 'EMPLOYEE' && <Link to="/apply"><Plus size={14}/> Apply Leave</Link>}{employee.role === 'HR' && <span className="role-chip"><ShieldCheck size={14}/> HR Panel</span>}</nav>}
    <div className="user-area">{employee && <><span className="user-name">{employee.name} <small>({employee.role})</small></span><button className="logout" onClick={logout}><LogOut size={15}/> Logout</button></>}</div>
  </header>{children}</>;
}
function Dashboard({ employee, token }) {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    setLoading(true); setError('');
    try { const result = await api('/leaves', { token }); setRequests(result.data || []); }
    catch (err) { setError(err.message); } finally { setLoading(false); }
  }, [token]);
  useEffect(() => { refresh(); }, [refresh]);
  async function review(id, nextStatus) {
    try { await api(`/leaves/${id}/status`, { token, method: 'PATCH', body: JSON.stringify({ status: nextStatus }) }); refresh(); }
    catch (err) { setError(err.message); }
  }
  const filtered = useMemo(() => requests.filter(r => (status === 'all' || r.status === status) &&
    `${r.reason} ${r.leaveTypeId?.name || ''} ${r.employeeId?.name || ''}`.toLowerCase().includes(search.toLowerCase())), [requests, status, search]);
  const used = requests.filter(r => r.status === 'approved').reduce((n, r) => n + r.days, 0);
  const pending = requests.filter(r => r.status === 'pending').length;
  const balance = Math.max(0, (employee.annualLeaveAllowance || 20) - used);
  return <main className="page">
    <section className="welcome"><div><p className="eyebrow">{employee.role === 'HR' ? 'PEOPLE OPERATIONS' : 'EMPLOYEE SELF SERVICE'}</p><h1>Welcome, {employee.name.split(' ')[0]}</h1><p className="muted">{employee.department} · {employee.role === 'HR' ? 'Review employee requests' : 'Manage your time away'}</p></div>{employee.role === 'EMPLOYEE' && <Link className="button button-primary" to="/apply"><Plus size={16}/> Apply for leave</Link>}</section>
    <section className="stats"><div className="stat-card blue"><span>Available balance</span><strong>{balance} <small>days</small></strong><p>Annual allowance: {employee.annualLeaveAllowance || 20} days</p></div><div className="stat-card"><span>Total requests</span><strong>{requests.length}</strong><p>All submitted applications</p></div><div className="stat-card"><span>Awaiting review</span><strong>{pending}</strong><p>Pending approval</p></div></section>
    <section className="list-section"><div className="section-heading"><div><h2>{employee.role === 'HR' ? 'Leave requests' : 'My leaves'}</h2><p className="muted">{filtered.length} request{filtered.length === 1 ? '' : 's'} shown</p></div></div>
      <div className="toolbar"><div className="searchbox"><Search size={16}/><input placeholder="Search requests…" value={search} onChange={e => setSearch(e.target.value)}/></div><select value={status} onChange={e => setStatus(e.target.value)} aria-label="Filter by status"><option value="all">All statuses</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select></div>
      {error && <div className="alert">{error}</div>}
      {loading ? <div className="empty">Loading leave requests…</div> : filtered.length ? <div className="cards-grid">{filtered.map(r => <LeaveCard key={r._id} request={r} hr={employee.role === 'HR'} onReview={review}/>)}</div> : <div className="empty"><div className="empty-icon"><Search/></div><strong>No leave requests found</strong><p>Try changing your filters or submit a new request.</p></div>}
    </section>
  </main>;
}
export default function App() {
  const [session, setSession] = useState(() => { try { return JSON.parse(sessionStorage.getItem('leave-session') || 'null'); } catch { return null; } });
  const navigate = useNavigate();
  function onLogin(data) { const next = { token: data.token, employee: data.employee }; setSession(next); sessionStorage.setItem('leave-session', JSON.stringify(next)); navigate('/'); }
  function logout() { setSession(null); sessionStorage.removeItem('leave-session'); navigate('/login'); }
  const employee = session?.employee, token = session?.token;
  return <Shell employee={employee} logout={logout}><Routes>
    <Route path="/login" element={employee ? <Navigate to="/" replace/> : <Login onLogin={onLogin}/>}/>
    <Route element={<ProtectedRoute employee={employee}/>}>
      <Route path="/" element={<Dashboard employee={employee} token={token}/>}/>
      <Route path="/apply" element={employee?.role === 'EMPLOYEE' ? <Suspense fallback={<main className="page">Loading form…</main>}><ApplyLeave employee={employee} token={token}/></Suspense> : <Navigate to="/" replace/>}/>
    </Route>
    <Route path="*" element={<Navigate to={employee ? '/' : '/login'} replace/>}/>
  </Routes></Shell>;
}
