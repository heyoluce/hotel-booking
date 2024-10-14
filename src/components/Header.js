import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Link } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Бронирование отелей
          </Link>
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={RouterLink} to="/hotels">
              Отели
            </Button>
            <Button color="inherit" component={RouterLink} to="/profile">
              Профиль
            </Button>
            <Button color="inherit" onClick={logout}>
              Выйти
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">
              Войти
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Регистрация
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;