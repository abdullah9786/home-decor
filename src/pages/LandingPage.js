import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(); // This will automatically redirect to login page
  };

  const roomOptions = [
    {
      id: 'hall',
      name: 'Hall',
      description: 'Design your living room and hall area',
      icon: '🛋️',
      color: '#FF6B6B'
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      description: 'Create your perfect kitchen layout',
      icon: '🍳',
      color: '#4ECDC4'
    },
    {
      id: 'dining',
      name: 'Dining Area',
      description: 'Design your dining space',
      icon: '🍽️',
      color: '#45B7D1'
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      description: 'Create your dream bedroom',
      icon: '🛏️',
      color: '#F7DC6F'
    }
  ];

  const handleRoomSelect = (roomId) => {
    navigate(`/editor/${roomId}`);
  };

  return (
    <div className="landing-page">
      {/* Authenticated Header */}
      <header className="authenticated-header">
        <div className="header-container">
          <div className="logo">
            <span className="logo-icon">🏠</span>
            <span className="logo-text">Home Decor Customizer</span>
          </div>
          
          <div className="user-section">
            <div className="user-info">
              <span className="user-icon">👤</span>
              <span className="user-name">
                {user?.email ? user.email.split('@')[0] : 'User'}
              </span>
            </div>
            <div className="header-actions">
              <button 
                className="header-btn dashboard-btn"
                onClick={() => navigate('/dashboard')}
              >
                <span className="btn-icon">📊</span>
                Dashboard
              </button>
              <button 
                className="header-btn logout-btn"
                onClick={handleLogout}
              >
                <span className="btn-icon">🚪</span>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Title Section */}
      <div className="title-section">
        <h1 className="main-title">Choose Your Space</h1>
        <p className="subtitle">Select a room to start designing</p>
      </div>

      <main className="room-selection">
        <h2 className="section-title" style={{marginBottom: '20px'}}>Choose an area to decorate</h2>
        <div className="room-grid">
          {roomOptions.map((room) => (
            <div
              key={room.id}
              className="room-card"
              onClick={() => handleRoomSelect(room.id)}
              style={{ '--room-color': room.color }}
            >
              <div className="room-icon">{room.icon}</div>
              <h3 className="room-name">{room.name}</h3>
              <p className="room-description">{room.description}</p>
              <button className="room-button">
                Start Designing →
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer className="landing-footer">
        <p>Create beautiful spaces with our intuitive design tools</p>
      </footer>
    </div>
  );
};

export default LandingPage;
