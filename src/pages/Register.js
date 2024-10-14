import React, { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { TextField, Button, Typography, Container, Link } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate(); // используем useNavigate вместо useHistory

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Проверка на совпадение паролей
    if (password !== passwordConfirmation) {
      setError('Пароли не совпадают.');
      return;
    }

    try {
      await register(username, email, password);
      navigate('/login'); // используем navigate для перехода
    } catch (error) {
      setError('Ошибка при регистрации. Попробуйте еще раз.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Регистрация
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleRegister}>
        <TextField
          label="Имя пользователя"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Пароль"
          type="password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Подтвердите пароль"
          type="password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Зарегистрироваться
        </Button>
      </form>
      <Typography align="center" style={{ marginTop: '10px' }}>
        Уже есть аккаунт?{' '}
        <Link component={RouterLink} to="/login">
          Войти
        </Link>
      </Typography>
    </Container>
  );
}

export default Register;
