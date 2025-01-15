import { useState } from 'react';
import axios from 'axios';

const useLogin = () => {
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
        return true;  // Signalera lyckad inloggning
      } else {
        setError('Felaktig inloggning');
        setMessage(null);
        return false;  // Signalera misslyckad inloggning
      }
    } catch (error: any) {
      setError(error.response?.data || 'Något gick fel vid inloggning');
      setMessage(null);
      return false;  // Signalera misslyckad inloggning
    }
  };

  return { email, setEmail, password, setPassword, error, message, handleLogin };
};

export default useLogin;
