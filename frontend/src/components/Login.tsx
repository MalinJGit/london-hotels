import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginForm.css'; // Importera CSS-filen

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5003/api/login', {
        email,
        password,
      });
      setMessage(response.data.message);
      setError(null);
      localStorage.setItem('token', response.data.token); // Sparar token
    } catch (error: any) {
      setError(error.response?.data?.message || 'Något gick fel');
      setMessage(null);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Logga In</h2>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Logga In</button>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;