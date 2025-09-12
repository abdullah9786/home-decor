import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './VerifyOTPPage.css';

// Simple icons using Unicode and CSS
const ShieldIcon = () => <span style={{ fontSize: '32px' }}>🛡️</span>;
const MailIcon = () => <span style={{ fontSize: '16px' }}>📧</span>;
const AlertIcon = () => <span style={{ fontSize: '14px', color: '#ef4444' }}>⚠️</span>;
const RefreshIcon = () => <span style={{ fontSize: '16px' }}>🔄</span>;
const CheckIcon = () => <span style={{ fontSize: '48px' }}>✅</span>;

const VerifyOTPPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    let interval;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(''); // Clear error when typing
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then(text => {
        const digits = text.replace(/\D/g, '').slice(0, 6);
        const newOtp = [...otp];
        digits.split('').forEach((digit, i) => {
          if (i < 6) newOtp[i] = digit;
        });
        setOtp(newOtp);
        // Focus last filled input or next empty
        const nextIndex = Math.min(digits.length, 5);
        inputRefs.current[nextIndex]?.focus();
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      if (otpString === '123456') {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/login?verified=true');
        }, 2000);
      } else {
        setError('Invalid OTP. Please try again.');
        // Clear OTP and focus first input
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleResend = () => {
    setResendCooldown(30);
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
    
    // Simulate resend API call
    console.log('Resending OTP to:', email);
  };

  if (!email) {
    navigate('/signup');
    return null;
  }

  return (
    <div className="otp-page">
      <div className="otp-container">
        {/* Header */}
        <div className="otp-header">
          <div className={`otp-icon ${isSuccess ? 'success' : ''}`}>
            {isSuccess ? <CheckIcon /> : <ShieldIcon />}
          </div>
          <h1 className={`otp-title ${isSuccess ? 'success' : ''}`}>
            {isSuccess ? 'Verified!' : 'Verify Your Email'}
          </h1>
          <p className="otp-subtitle">
            {isSuccess ? 'Account created successfully' : 'Enter the 6-digit code sent to'}
          </p>
          {!isSuccess && (
            <p className="otp-email">{email}</p>
          )}
        </div>

        {/* Form */}
        {isSuccess ? (
          <div className="success-screen">
            <div className="success-icon-large">
              <CheckIcon />
            </div>
            <p className="success-message">Account verified successfully!</p>
            <p className="redirect-message">Redirecting to login page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="otp-form">
            {/* OTP Input */}
            <div className="otp-inputs-section">
              <label className="otp-inputs-label">
                Enter Verification Code
              </label>
              <div className="otp-inputs">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`otp-input ${error ? 'error' : ''}`}
                    disabled={isLoading}
                  />
                ))}
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
              disabled={isLoading || otp.join('').length !== 6}
              className={`submit-button ${isSuccess ? 'success' : ''}`}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <ShieldIcon />
                  Verify Account
                  <span style={{ fontSize: '16px' }}>→</span>
                </>
              )}
            </button>

            {/* Resend */}
            <div className="resend-section">
              <p className="resend-text">Didn't receive the code?</p>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className="resend-button"
              >
                <RefreshIcon />
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
              </button>
            </div>

            {/* Demo Info */}
            <div className="demo-info">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <MailIcon />
                <p>
                  <strong>For testing:</strong> Use code <span className="demo-code">123456</span>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default VerifyOTPPage;
