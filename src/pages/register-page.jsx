import './register.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    phone: '',
    aadhaar: '',
    accountNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const register = async () => {
    if (user.password !== user.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      const result = await response.text();
      alert(result);
    } catch (err) {
      alert('Registration failed: ' + err.message);
    }
  };

  return (
    <>
      {/* Modern Header */}
      <header className="header">
        <div className="header-content">
          <img src="/vm Bank logo.png" alt="Bank Logo" className="header-logo" />
          <h1 className="header-title">VM Bank</h1>
        </div>
        <nav className="nav-links">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/" className="nav-link">Home</Link>
        </nav>
      </header>

      {/* Registration Form */}
      <div className="register-container">
        <div className="register-box">
          <h2 className="register-heading">Create Your Account</h2>

          <form onSubmit={(e) => { e.preventDefault(); register(); }}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={user.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={user.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="aadhaar">Aadhaar Number</label>
              <input
                id="aadhaar"
                name="aadhaar"
                type="text"
                value={user.aadhaar}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="accountNumber">Account Number</label>
              <input
                id="accountNumber"
                name="accountNumber"
                type="text"
                value={user.accountNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={user.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={user.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="register-button">Register</button>
          </form>

          <p className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </>
  );
}
