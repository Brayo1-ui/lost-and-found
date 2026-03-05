const BASE = 'http://localhost:5000/api';

// Store token after login
export const saveToken = (token) => localStorage.setItem('token', token);
export const getToken  = ()      => localStorage.getItem('token');
export const logout    = ()      => localStorage.removeItem('token');

// Generic fetch wrapper
async function request(endpoint, options = {}) {
  const token = getToken();
  const res   = await fetch(BASE + endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    ...options
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// Auth
export const register = (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) });
export const login    = (body) => request('/auth/login',    { method: 'POST', body: JSON.stringify(body) });

// Items
export const getItems    = ()     => request('/items');
export const createItem  = (form) => fetch(BASE+'/items', { method:'POST', headers:{ Authorization:`Bearer ${getToken()}` }, body: form });
export const resolveItem = (id)   => request(`/items/${id}`, { method: 'PUT',    body: JSON.stringify({ status: 'resolved' }) });
export const deleteItem  = (id)   => request(`/items/${id}`, { method: 'DELETE' });