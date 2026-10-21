const date = value => new Date(value).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
export default function LeaveCard({ request, hr = false, onReview }) {
  const employee = request.employeeId;
  const type = request.leaveTypeId;
  return <article className="leave-card">
    <div className="card-top"><span className="type-dot">{(type?.name || 'L')[0]}</span><div className="card-title"><strong>{type?.name || 'Leave'}</strong>{hr && <small>{employee?.name || 'Employee'} · {employee?.department || ''}</small>}</div><span className={`badge ${request.status}`}>{request.status}</span></div>
    <div className="date-range"><div><small>FROM</small><strong>{date(request.fromDate)}</strong></div><span className="arrow">→</span><div><small>TO</small><strong>{date(request.toDate)}</strong></div><span className="days-pill">{request.days} {request.days === 1 ? 'day' : 'days'}</span></div>
    <div className="reason"><small>REASON</small><p>{request.reason}</p></div>
    {hr && request.status === 'pending' && <div className="review-actions"><button className="button button-quiet" onClick={() => onReview(request._id, 'rejected')}>Reject</button><button className="button button-primary" onClick={() => onReview(request._id, 'approved')}>Approve</button></div>}
  </article>;
}
