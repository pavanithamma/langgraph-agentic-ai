import React, { useState } from 'react';
import { Sparkles, Mail, Lock, Eye, EyeOff, User, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (isSignUp && !fullName)) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const userName = isSignUp ? fullName : email.split('@')[0];
    const userSession = {
      name: userName.charAt(0).toUpperCase() + userName.slice(1),
      email: email,
      role: 'Student Pro',
      avatar: userName.substring(0, 2).toUpperCase()
    };

    onLoginSuccess(userSession);
  };

  const handleDemoLogin = () => {
    onLoginSuccess({
      name: 'Alex Rivera',
      email: 'student.pro@agentiq.ai',
      role: 'Student Pro',
      avatar: 'AR'
    });
  };

  return (
    <div className="login-page-wrapper">
      {/* Subtle Background Glow Orbs */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(255,255,255,0) 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(255,255,255,0) 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }}></div>

      {/* Main Glass Card */}
      <div className="login-card-container" style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '28px',
        padding: '36px 32px',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        zIndex: 10,
        backdropFilter: 'blur(10px)'
      }}>
        {/* Brand Logo Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            color: 'white',
            marginBottom: '14px',
            boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)'
          }}>
            <Sparkles size={28} />
          </div>

          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            AI LangGraph
          </h1>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {isSignUp ? 'Create your AgentIQ account to get started' : 'Sign in to access your Agentic AI workspace'}
          </p>
        </div>

        {/* Form Error Banner */}
        {errorMsg && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#EF4444',
            fontSize: '0.8rem',
            fontWeight: '600',
            padding: '10px 14px',
            borderRadius: '12px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            {errorMsg}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isSignUp && (
            <div className="form-group">
              <label>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Alex Rivera"
                  value={fullName}
                  onChange={(e) => { setFullName(e.target.value); setErrorMsg(''); }}
                  style={{ paddingLeft: '42px', width: '100%' }}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input
                type="email"
                className="form-input"
                placeholder="student@agentiq.ai"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
                style={{ paddingLeft: '42px', width: '100%' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrorMsg(''); }}
                style={{ paddingLeft: '42px', paddingRight: '42px', width: '100%' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {!isSignUp && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: '#6366F1' }} />
                Remember me
              </label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} style={{ color: '#6366F1', fontWeight: '600', textDecoration: 'none' }}>
                Forgot Password?
              </a>
            </div>
          )}

          {/* Primary Submit Button */}
          <button type="submit" className="submit-modal-btn" style={{ padding: '14px', fontSize: '0.95rem', borderRadius: '14px', marginTop: '4px' }}>
            {isSignUp ? 'Create Account' : 'Sign In'} <ArrowRight size={18} style={{ display: 'inline', marginLeft: '6px' }} />
          </button>
        </form>

        {/* Fast Demo Login Action */}
        <div style={{ marginTop: '14px', textAlign: 'center' }}>
          <button
            onClick={handleDemoLogin}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '12px',
              border: '1px dashed var(--accent-purple)',
              backgroundColor: 'var(--accent-purple-light)',
              color: 'var(--accent-purple)',
              fontSize: '0.82rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Zap size={15} /> 1-Click Fast Demo Login
          </button>
        </div>

        {/* Toggle Login / Sign Up */}
        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(''); }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#6366F1',
              fontWeight: '700',
              cursor: 'pointer',
              marginLeft: '4px'
            }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}
