const tasksRoot = document.querySelector('#tasks');
const form = document.querySelector('#task-form');
const message = document.querySelector('#form-message');
const statusPill = document.querySelector('#api-status');

async function request(path, options = {}) {
  const response = await fetch(path, { headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options });
  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) throw new Error(payload?.error?.message || payload?.message || 'Request failed');
  return payload;
}
function showMessage(text, type = '') { message.textContent = text; message.className = 'message ' + type; }
function renderTasks(tasks) {
  tasksRoot.replaceChildren();
  if (!tasks.length) { const p = document.createElement('p'); p.className = 'empty'; p.textContent = 'No tasks yet. Add your first task above.'; tasksRoot.append(p); return; }
  tasks.forEach(task => {
    const row = document.createElement('article'); row.className = 'task';
    const title = document.createElement('span'); title.className = 'task-title'; title.textContent = task.title;
    const remove = document.createElement('button'); remove.className = 'delete'; remove.type = 'button'; remove.textContent = 'Delete';
    remove.addEventListener('click', async () => { remove.disabled = true; try { await request('/tasks/' + encodeURIComponent(task.id), { method: 'DELETE' }); await loadTasks(); } catch (e) { showMessage(e.message, 'error'); remove.disabled = false; } });
    row.append(title, remove); tasksRoot.append(row);
  });
}
async function loadTasks() {
  tasksRoot.textContent = 'Loading tasks…';
  try { const result = await request('/tasks'); renderTasks(result.data || result.tasks || []); statusPill.textContent = 'API connected'; }
  catch (e) { tasksRoot.textContent = 'Could not load tasks: ' + e.message; statusPill.textContent = 'API unavailable'; }
}
form.addEventListener('submit', async event => {
  event.preventDefault(); const submit = form.querySelector('button[type="submit"]'); submit.disabled = true;
  try { await request('/tasks', { method: 'POST', body: JSON.stringify({ title: form.title.value.trim() }) }); form.reset(); showMessage('Task created.', 'success'); await loadTasks(); }
  catch (e) { showMessage(e.message, 'error'); }
  finally { submit.disabled = false; }
});
document.querySelector('#refresh').addEventListener('click', loadTasks);
loadTasks();