import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ForgotPasswordPage.css';

// Simple icons using Unicode and CSS
const MailIcon = () => <span style={{ fontSize: '28px', color: 'white' }}>📧</span>;
const AlertIcon = () => <span style={{ fontSize: '14px', color: '#ef4444' }}>⚠️</span>;
const SendIcon = () => <span style={{ fontSize: '20px' }}>📤</span>;
const ArrowLeftIcon = () => <span style={{ fontSize: '16px' }}>←</span>;
const ArrowRightIcon = () => <span style={{ fontSize: '16px' }}>→</span>;
const CheckLargeIcon = () => <span style={{ fontSize: '40px', color: 'white' }}>✅</span>;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleSendAnother = () => {
    setIsSuccess(false);
    setEmail('');
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        {/* Header */}
        <div className="forgot-password-header">
          <div className={`forgot-password-icon ${isSuccess ? 'success' : ''}`}>
            {isSuccess ? <CheckLargeIcon /> : <MailIcon />}
          </div>
          <h1 className={`forgot-password-title ${isSuccess ? 'success' : ''}`}>
            {isSuccess ? 'Check Your Email' : 'Reset Password'}
          </h1>
          <p className="forgot-password-subtitle">
            {isSuccess 
              ? 'We sent you a password reset link'
              : 'Enter your email to receive reset instructions'
            }
          </p>
        </div>

        {/* Form */}
        {isSuccess ? (
          <div className="success-screen">
            <div className="success-icon-large">
              <CheckLargeIcon />
            </div>
            <p className="success-message">
              We've sent a password reset link to:
            </p>
            <div className="success-email">{email}</div>
            <p className="success-message">
              Please check your email and follow the instructions to reset your password.
            </p>
            <div className="success-actions">
              <button
                onClick={handleBackToLogin}
                className="action-button primary"
              >
                Back to Login
                <ArrowRightIcon />
              </button>
              <button
                onClick={handleSendAnother}
                className="action-button secondary"
              >
                Send Another Email
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="forgot-password-form">
            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <span style={{ fontSize: '20px' }}>📧</span>
                </span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  className={`form-input ${error ? 'error' : ''}`}
                  placeholder="Enter your email address"
                />
              </div>
              {error && (
                <div className="error-message">
                  <AlertIcon />
                  {error}
                </div>
              )}
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
                  Sending...
                </>
              ) : (
                <>
                  <SendIcon />
                  Send Reset Link
                  <ArrowRightIcon />
                </>
              )}
            </button>

            {/* Back to Login */}
            <div className="back-to-login">
              <Link to="/login">
                <ArrowLeftIcon />
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
