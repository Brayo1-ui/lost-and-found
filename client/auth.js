import { login, register, saveToken } from './api.js';

document.getElementById('btn-signin')?.addEventListener('click', async () => {
  const email    = document.getElementById('login-email').value;
  const password = document.getElementById('login-pw').value;
  try {
    const { token, user } = await login({ email, password });
    saveToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = 'home.html';
  } catch (err) {
    alert(err.message);
  }
});