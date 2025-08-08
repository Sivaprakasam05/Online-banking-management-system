import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import './loginpage.css';

export default function LoginForm() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const result = await response.text();
      if (response.ok) {
        localStorage.setItem('userId', result.trim());
        alert('Login successful! Welcome to VM Bank.');
        navigate('/dashboard');
      } else {
        alert('Login failed: ' + result);
      }
    } catch (error) {
      alert('Login error: ' + error.message);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="login-header">
        <div className="header-content">
          <img src="/vm Bank logo.png" alt="VM Bank Logo" className="header-logo" />
          <h1 className="header-title">VM Bank</h1>
        </div>
        <nav className="nav-links">
          <Link to="/register" className="nav-link">Register</Link>
          <Link to="/" className="nav-link">Home</Link>
        </nav>
      </header>

      {/* Login Form Section */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #e0eafc, #cfdef3)',
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={12}
            sx={{
              p: 5,
              borderRadius: 4,
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            }}
          >
            <Box textAlign="center" mb={2}>
              <img
                src="/vm Bank logo.png"
                alt="VM Bank Logo"
                style={{ height: '60px', marginBottom: '10px' }}
              />
              <Typography
                variant="h4"
                fontWeight="bold"
                color="primary"
                gutterBottom
              >
                VM BANK
              </Typography>
              <Typography variant="h6" color="text.secondary" fontWeight="bold">
                Login To Your Account
              </Typography>
            </Box>

            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: '0.3s',
                '&:hover': {
                  backgroundColor: '#125ea7',
                  transform: 'scale(1.03)',
                },
              }}
              onClick={login}
            >
              Login
            </Button>

            <Typography textAlign="center" sx={{ mt: 3 }}>
              Don't have an account?{' '}
              <Link
                to="/register"
                style={{
                  color: '#1976d2',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
                onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
              >
                Sign up here
              </Link>
            </Typography>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
