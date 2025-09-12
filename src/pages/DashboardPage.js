import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

// Simple icons using Unicode and CSS
const HomeIcon = () => <span style={{ fontSize: '24px' }}>🏠</span>;
const SettingsIcon = () => <span style={{ fontSize: '20px' }}>⚙️</span>;
const UserIcon = () => <span style={{ fontSize: '20px' }}>👤</span>;
const LogoutIcon = () => <span style={{ fontSize: '18px' }}>🚪</span>;
const PaletteIcon = () => <span style={{ fontSize: '24px', color: 'white' }}>🎨</span>;
const PlusIcon = () => <span style={{ fontSize: '16px' }}>➕</span>;
const ArrowIcon = () => <span style={{ fontSize: '20px' }}>→</span>;
const ProjectIcon = () => <span style={{ fontSize: '20px', color: 'white' }}>🏠</span>;

const DashboardPage = () => {
  const navigate = useNavigate();

  const rooms = [
    { 
      id: 'hall', 
      name: 'Living Room', 
      color: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)', 
      projects: 3 
    },
    { 
      id: 'kitchen', 
      name: 'Kitchen', 
      color: 'linear-gradient(135deg, #26d0ce 0%, #1dd1a1 100%)', 
      projects: 1 
    },
    { 
      id: 'dining', 
      name: 'Dining Area', 
      color: 'linear-gradient(135deg, #4834d4 0%, #686de0 100%)', 
      projects: 2 
    },
    { 
      id: 'bedroom', 
      name: 'Bedroom', 
      color: 'linear-gradient(135deg, #f9ca24 0%, #f0932b 100%)', 
      projects: 4 
    }
  ];

  const recentProjects = [
    { name: 'Modern Living Room', type: 'Hall', updated: '2 hours ago' },
    { name: 'Cozy Kitchen', type: 'Kitchen', updated: '1 day ago' },
    { name: 'Elegant Dining', type: 'Dining', updated: '3 days ago' },
    { name: 'Master Bedroom', type: 'Bedroom', updated: '1 week ago' }
  ];

  const handleRoomSelect = (roomId) => {
    navigate(`/editor/${roomId}`);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      {/* Navigation */}
      <nav className="dashboard-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <HomeIcon />
            DecorSpace
          </div>
          
          <div className="nav-actions">
            <button className="nav-button">
              <SettingsIcon />
              Settings
            </button>
            <button className="nav-button">
              <UserIcon />
              Profile
            </button>
            <button className="nav-button logout" onClick={handleLogout}>
              <LogoutIcon />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-container">
        {/* Welcome Section */}
        <div className="dashboard-welcome">
          <h1 className="welcome-title">Welcome back!</h1>
          <p className="welcome-subtitle">Ready to create your next amazing design?</p>
        </div>

        {/* Room Cards */}
        <div className="rooms-grid">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className="room-card"
              onClick={() => handleRoomSelect(room.id)}
              style={{ 
                '--room-color': room.color,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="room-icon-wrapper" style={{ background: room.color }}>
                <PaletteIcon />
              </div>
              
              <h3 className="room-name">{room.name}</h3>
              <p className="room-projects">{room.projects} projects</p>
              
              <button className="new-design-button">
                <PlusIcon />
                New Design
              </button>
            </div>
          ))}
        </div>

        {/* Recent Projects */}
        <div className="recent-projects">
          <div className="section-header">
            <h2 className="section-title">Recent Projects</h2>
            <button className="view-all-button" onClick={() => console.log('View all projects')}>
              View All
              <ArrowIcon />
            </button>
          </div>
          
          <div className="projects-list">
            {recentProjects.map((project, index) => (
              <div key={project.name} className="project-item">
                <div className="project-info">
                  <div className="project-icon">
                    <ProjectIcon />
                  </div>
                  <div className="project-details">
                    <h3>{project.name}</h3>
                    <p>{project.type} • {project.updated}</p>
                  </div>
                </div>
                <div className="project-arrow">
                  <ArrowIcon />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card projects">
            <h3 className="stat-number">12</h3>
            <p className="stat-label">Total Projects</p>
          </div>
          
          <div className="stat-card completed">
            <h3 className="stat-number">8</h3>
            <p className="stat-label">Completed Designs</p>
          </div>
          
          <div className="stat-card hours">
            <h3 className="stat-number">24</h3>
            <p className="stat-label">Hours Designed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
