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
            Hotels booking
          </Link>
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={RouterLink} to="/hotels">
              Hotels
            </Button>
            <Button color="inherit" component={RouterLink} to="/profile">
              Profile
            </Button>
            <Button color="inherit" onClick={logout}>
              Log out
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">
              Sign in
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Sign up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;