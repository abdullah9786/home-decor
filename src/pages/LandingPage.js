import React from 'react';
import { useNavigate } from 'react-router-dom';
import HealthCheck from '../components/HealthCheck';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

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
      <header className="landing-header">
        <div className="auth-links">
          <button 
            className="auth-link login"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button 
            className="auth-link signup"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
        <h1 className="main-title">Home Decor Customizer</h1>
        <p className="subtitle">Design and customize your perfect living space</p>
        <HealthCheck />
      </header>

      <main className="room-selection">
        <h2 className="section-title">Choose an area to decorate</h2>
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
