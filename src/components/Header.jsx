import React from 'react';
import { Sparkles, Sun, Moon, Wand2, Key, LogOut } from 'lucide-react';

export default function Header({ 
  theme, 
  toggleTheme, 
  onOpenApiKeyModal, 
  hasApiKey, 
  user, 
  onLogout 
}) {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <header className="header">
      <div className="brand-section">
        <div className="brand-logo">
          <Sparkles size={22} />
        </div>
        <div className="brand-info">
          <h1>AI LangGraph</h1>
          <p>Powered by LangGraph + Groq</p>
        </div>
      </div>

      <div className="orchestrator-status-pill">
        <span className="status-dot"></span>
        <span>LangGraph Orchestrator • Groq Llama 3.3 70B • Synced {currentTime}</span>
      </div>

      <div className="header-controls">
        <button
          className={`theme-btn ${hasApiKey ? 'active' : ''}`}
          onClick={onOpenApiKeyModal}
          style={{ padding: '6px 12px', gap: '6px', color: hasApiKey ? '#10B981' : '#6366F1' }}
          title="Connect Live Groq/OpenAI API Key"
        >
          <Key size={14} /> {hasApiKey ? 'API Connected' : 'Connect API'}
        </button>

        <div className="theme-toggle">
          <button
            className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={() => toggleTheme('light')}
          >
            <Sun size={14} /> Light
          </button>
          <button
            className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => toggleTheme('dark')}
          >
            <Moon size={14} /> Dark
          </button>
        </div>

        <button className="theme-btn" style={{ padding: '8px' }} title="Magic Assistant">
          <Wand2 size={16} color="#6366F1" />
        </button>

        <div className="profile-pill" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="avatar-circle">{user?.avatar || 'SA'}</div>
          <div className="user-badge">
            <span className="user-title">{user?.name || 'Student'}</span>
            <span className="pro-tag">{user?.role || 'Pro'}</span>
          </div>

          <button
            onClick={onLogout}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              marginLeft: '4px',
              padding: '4px'
            }}
            title="Log Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
