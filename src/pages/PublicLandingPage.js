import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HealthCheck from '../components/HealthCheck';
import './PublicLandingPage.css';

const PublicLandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect to home page if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="public-landing-page">
      {/* Header */}
      <header className="public-header">
        <div className="header-container">
          <div className="logo">
            <span className="logo-icon">🏠</span>
            <span className="logo-text">Home Decor Customizer</span>
          </div>
          
          <div className="auth-buttons">
            <button 
              className="auth-btn login-btn"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button 
              className="auth-btn signup-btn"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="public-main">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Design Your Dream Space
            </h1>
            <p className="hero-subtitle">
              Transform your home with our intuitive interior design tools. 
              Create beautiful, functional spaces that reflect your style.
            </p>
            
            <div className="hero-actions">
              <button 
                className="cta-button primary"
                onClick={() => navigate('/signup')}
              >
                <span className="cta-icon">✨</span>
                Get Started Free
                <span className="cta-arrow">→</span>
              </button>
              <button 
                className="cta-button secondary"
                onClick={() => navigate('/login')}
              >
                <span className="cta-icon">👤</span>
                Sign In
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="feature-preview">
              <div className="preview-room">🛋️</div>
              <div className="preview-text">Living Room</div>
            </div>
            <div className="feature-preview">
              <div className="preview-room">🍳</div>
              <div className="preview-text">Kitchen</div>
            </div>
            <div className="feature-preview">
              <div className="preview-room">🍽️</div>
              <div className="preview-text">Dining Area</div>
            </div>
            <div className="feature-preview">
              <div className="preview-room">🛏️</div>
              <div className="preview-text">Bedroom</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title" style={{marginBottom: '20px'}}>Why Choose Our Design Platform?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3 className="feature-title">Intuitive Design Tools</h3>
              <p className="feature-description">
                Easy-to-use canvas with drag-and-drop functionality. 
                No design experience required.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3 className="feature-title">Multiple Room Types</h3>
              <p className="feature-description">
                Design living rooms, kitchens, bedrooms, and dining areas 
                with specialized tools for each space.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💾</div>
              <h3 className="feature-title">Save & Share</h3>
              <p className="feature-description">
                Save your designs and share them with friends and family. 
                Your projects are always secure.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Mobile Friendly</h3>
              <p className="feature-description">
                Design on any device. Our platform works seamlessly 
                on desktop, tablet, and mobile.
              </p>
            </div>
          </div>
        </section>

        {/* Backend Status */}
        <div className="status-section">
          <HealthCheck />
        </div>
      </main>

      {/* Footer */}
      <footer className="public-footer">
        <div className="footer-content">
          <p>© 2024 Home Decor Customizer. Create beautiful spaces with ease.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLandingPage;
