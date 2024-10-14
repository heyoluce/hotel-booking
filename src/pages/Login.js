import React, { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { TextField, Button, Typography, Container, Link } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Заменил useHistory на useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/hotels'); // Заменил history.push на navigate
    } catch (error) {
      setError('Неверное имя пользователя или пароль');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Вход в систему
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleLogin}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem' }}
        >
          Войти
        </Button>
      </form>
      <Typography style={{ marginTop: '1rem' }}>
        Нет аккаунта? <Link component={RouterLink} to="/register">Зарегистрируйтесь</Link>
      </Typography>
    </Container>
  );
}

export default Login;
