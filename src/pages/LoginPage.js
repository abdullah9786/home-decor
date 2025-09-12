import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './LoginPage.css';

// Simple icons using Unicode and CSS
const HomeIcon = () => <span style={{ fontSize: '28px' }}>🏠</span>;
const MailIcon = () => <span style={{ fontSize: '20px' }}>✉️</span>;
const LockIcon = () => <span style={{ fontSize: '20px' }}>🔒</span>;
const EyeIcon = () => <span style={{ fontSize: '16px' }}>👁️</span>;
const EyeOffIcon = () => <span style={{ fontSize: '16px' }}>🙈</span>;
const AlertIcon = () => <span style={{ fontSize: '14px', color: '#ef4444' }}>⚠️</span>;
const LoginIcon = () => <span style={{ fontSize: '20px' }}>🚀</span>;
const CheckIcon = () => <span style={{ fontSize: '18px' }}>✅</span>;

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const verified = searchParams.get('verified') === 'true';
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showVerifiedMessage, setShowVerifiedMessage] = useState(false);

  useEffect(() => {
    if (verified) {
      setShowVerifiedMessage(true);
      setTimeout(() => setShowVerifiedMessage(false), 5000);
    }
  }, [verified]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Validation
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, any email/password combination works
      navigate('/dashboard');
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="login-page">
      {/* Success Message */}
      {showVerifiedMessage && (
        <div className="success-message">
          <CheckIcon />
          Account verified successfully!
        </div>
      )}

      <div className="login-container">
        {/* Header */}
        <div className="login-header">
          <div className="login-icon">
            <HomeIcon />
          </div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to continue your design journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-wrapper">
              <span className="input-icon">
                <MailIcon />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <div className="error-message">
                <AlertIcon />
                {errors.email}
              </div>
            )}
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <span className="input-icon">
                <LockIcon />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.password && (
              <div className="error-message">
                <AlertIcon />
                {errors.password}
              </div>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="forgot-password">
            <Link to="/forgot-password">
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                Signing in...
              </>
            ) : (
              <>
                <LoginIcon />
                Sign In
                <span style={{ fontSize: '16px' }}>→</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Info */}
        <div className="demo-info">
          <p>
            <strong>Demo Mode:</strong> Use any email and password to sign in
          </p>
        </div>

        {/* Signup Link */}
        <div className="signup-link">
          <p>
            Don't have an account?{' '}
            <Link to="/signup">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
