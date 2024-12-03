import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Paper, Avatar, Link } from '@mui/material';
import { FiLogIn } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Welcome back! You have successfully logged in.');
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to login. Please check your credentials.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #6EE7B7, #3B82F6)',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          borderRadius: 2,
        }}
      >
        <Box textAlign="center" mb={3}>
          <Avatar
            sx={{
              mx: 'auto',
              bgcolor: 'primary.main',
              width: 56,
              height: 56,
            }}
          >
            <FiLogIn size={32} />
          </Avatar>
          <Typography variant="h5" component="h1" mt={2}>
            Login
          </Typography>
          <Typography color="textSecondary" variant="body2">
            Access your account to continue
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 2, mb: 1 }}
          >
            Login
          </Button>
        </form>
        <Typography align="center" mt={2} variant="body2" color="textSecondary">
          Don’t have an account?{' '}
          <Link href="/register" color="primary" underline="hover">
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
