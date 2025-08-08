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

export default function AdminLoginForm() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.text();
      if (response.ok) {
        localStorage.setItem('adminId', result.trim());
        alert('Admin login successful');
        navigate('/admin/dashboard');
      } else {
        alert('Login failed: ' + result);
      }
    } catch (err) {
      alert('Login error: ' + err.message);
    }
  };

  return (
    <>
      <header className="login-header">
        <div className="header-content">
          <img src="/vm Bank logo.png" alt="VM Bank Logo" className="header-logo" />
          <h1 className="header-title">VM Bank</h1>
        </div>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/login" className="nav-link">User Login</Link>
        </nav>
      </header>

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
                Admin Login
              </Typography>
            </Box>

            <TextField
              label="Admin Username"
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
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />

            <Button
              onClick={login}
              variant="contained"
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
            >
              Login
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
