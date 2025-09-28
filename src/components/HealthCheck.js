import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './HealthCheck.css';

const HealthCheck = () => {
  const { checkHealth } = useAuth();
  const [healthStatus, setHealthStatus] = useState({
    loading: true,
    connected: false,
    message: '',
    timestamp: null,
    error: null
  });

  const performHealthCheck = async () => {
    setHealthStatus(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await checkHealth();
      
      if (result.success) {
        setHealthStatus({
          loading: false,
          connected: true,
          message: result.message,
          timestamp: result.timestamp,
          error: null
        });
      }
    } catch (error) {
      console.error('Health check failed:', error);
      setHealthStatus({
        loading: false,
        connected: false,
        message: 'Backend server is not responding',
        timestamp: null,
        error: error.message || 'Connection failed'
      });
    }
  };

  useEffect(() => {
    performHealthCheck();
    
    // Perform health check every 30 seconds
    const interval = setInterval(performHealthCheck, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    if (healthStatus.loading) return '⏳';
    return healthStatus.connected ? '✅' : '❌';
  };

  const getStatusColor = () => {
    if (healthStatus.loading) return '#f59e0b';
    return healthStatus.connected ? '#10b981' : '#ef4444';
  };

  return (
    <div className="health-check">
      <div className="health-status">
        <span 
          className="status-icon" 
          style={{ color: getStatusColor() }}
        >
          {getStatusIcon()}
        </span>
        <div className="status-content">
          <div className="status-text">
            <span className="status-label">Backend: </span>
            <span 
              className="status-value"
              style={{ color: getStatusColor() }}
            >
              {healthStatus.loading ? 'Checking...' : 
               healthStatus.connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          {healthStatus.message && (
            <div className="status-message">
              {healthStatus.message}
            </div>
          )}
          {healthStatus.timestamp && (
            <div className="status-timestamp">
              Last checked: {new Date(healthStatus.timestamp).toLocaleTimeString()}
            </div>
          )}
          {healthStatus.error && (
            <div className="status-error">
              Error: {healthStatus.error}
            </div>
          )}
        </div>
      </div>
      
      <button 
        className="refresh-button"
        onClick={performHealthCheck}
        disabled={healthStatus.loading}
      >
        🔄 Refresh
      </button>
    </div>
  );
};

export default HealthCheck;
