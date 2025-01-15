import React from 'react';
import useLogin from '../components/useLogin';
import '../styles/LoginForm.css';

interface LoginProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const { email, setEmail, password, setPassword, error, message, handleLogin } = useLogin();

  const onSubmit = async (e: React.FormEvent) => {
    const success = await handleLogin(e);
    if (success) onLoginSuccess();
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmit}>
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
          <label>Lösenord</label>
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