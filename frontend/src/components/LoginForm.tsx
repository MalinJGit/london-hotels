import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginForm.css';

interface LoginProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginProps> = ({ onLoginSuccess }) => {
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

      if (response.data.token) {
        setMessage('Inloggning lyckades!');
        setError(null);
        localStorage.setItem('token', response.data.token);
        onLoginSuccess();
      } else {
        setError('Felaktig inloggning');
        setMessage(null);
      }
    } catch (error: any) {
      setError(error.response?.data || 'Något gick fel vid inloggning');
      setMessage(null);
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Log in</h2>
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
        <label>Lösenord</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Log in</button>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default LoginForm;
