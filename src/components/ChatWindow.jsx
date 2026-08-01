import React, { useState, useRef, useEffect } from 'react';
import { 
  Paperclip, 
  Image as ImageIcon, 
  Sparkles, 
  Send, 
  GraduationCap, 
  Plane,
  Stethoscope,
  TrendingUp,
  Code2,
  Network,
  Award, 
  Calendar, 
  FileText,
  Bot,
  PlusCircle
} from 'lucide-react';

const iconMap = {
  GraduationCap: GraduationCap,
  Plane: Plane,
  Stethoscope: Stethoscope,
  TrendingUp: TrendingUp,
  Code2: Code2,
  Network: Network,
  Award: Award,
  Calendar: Calendar,
  FileText: FileText,
  Bot: Bot
};

export default function ChatWindow({ 
  activeAgent, 
  messages, 
  onSendMessage, 
  isExecuting,
  onNewChat
}) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const HeroIconComponent = iconMap[activeAgent.icon] || Bot;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isExecuting]);

  const handleSend = () => {
    if (!inputText.trim() || isExecuting) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePromptClick = (title) => {
    if (isExecuting) return;
    onSendMessage(title);
  };

  return (
    <main className="center-workspace">
      {/* Top Header Bar for Active Agent */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        padding: '12px 20px',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-card)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            backgroundColor: activeAgent.color || '#6366F1',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justify: 'center'
          }}>
            <HeroIconComponent size={16} />
          </div>
          <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
            {activeAgent.name}
          </span>
        </div>
      </div>

      {messages.length === 0 ? (
        /* Empty / Hero State with Dynamic Agent Icon */
        <div className="welcome-hero">
          <div className="hero-3d-icon">
            <div className="cap-svg-wrapper" style={{
              background: `radial-gradient(circle, ${activeAgent.color || '#6366F1'}33 0%, rgba(255,255,255,0) 70%)`,
              borderRadius: '50%',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justify: 'center'
            }}>
              <div style={{
                width: '74px',
                height: '74px',
                borderRadius: '20px',
                background: `linear-gradient(135deg, ${activeAgent.color || '#6366F1'}, #8B5CF6)`,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                boxShadow: `0 10px 25px ${activeAgent.color || '#6366F1'}66`
              }}>
                <HeroIconComponent size={42} />
              </div>
            </div>
          </div>

          <h2 className="hero-title">
            Hi! 👋 What shall we <span className="gradient-text">build</span> today?
          </h2>
          <p className="hero-subtitle">
            {activeAgent.description || 'Your AI study assistant for homework help, topic explanations, quizzes & personalized study plans.'}
          </p>

          <div className="try-asking-section">
            <div className="try-asking-header">
              <Sparkles size={14} />
              <span>Try Asking</span>
            </div>

            <div className="prompt-cards-grid">
              {(activeAgent.samplePrompts || []).map((prompt) => {
                const IconComp = iconMap[prompt.icon] || GraduationCap;
                return (
                  <div
                    key={prompt.id}
                    className="prompt-card"
                    onClick={() => handlePromptClick(prompt.title)}
                  >
                    <div className="prompt-icon">
                      <IconComp size={20} />
                    </div>
                    <div className="prompt-text-group">
                      <h3>{prompt.title}</h3>
                      <p>{prompt.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Chat Messages List */
        <div className="chat-messages-container">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-bubble ${msg.role}`}>
              <div className="bubble-avatar">
                {msg.role === 'user' ? 'SA' : <HeroIconComponent size={18} />}
              </div>
              <div className="bubble-content">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: formatMarkdown(msg.content) 
                  }} 
                />
              </div>
            </div>
          ))}

          {isExecuting && (
            <div className="chat-bubble assistant">
              <div className="bubble-avatar"><HeroIconComponent size={18} /></div>
              <div className="thinking-indicator">
                <div className="dot-bounce"></div>
                <div className="dot-bounce"></div>
                <div className="dot-bounce"></div>
                <span style={{ marginLeft: '4px' }}>LangGraph is reasoning...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Section */}
      <div className="chat-input-container">
        <div className="chat-input-box">
          <textarea
            className="chat-input"
            rows="1"
            placeholder={`Message ${activeAgent.name}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>

          <div className="input-actions">
            <button className="action-icon-btn" title="Attach file">
              <Paperclip size={18} />
            </button>
            <button className="action-icon-btn" title="Add image">
              <ImageIcon size={18} />
            </button>
            <button className="action-icon-btn" title="Prompts library">
              <Sparkles size={18} />
            </button>

            <button
              className="send-btn"
              onClick={handleSend}
              disabled={!inputText.trim() || isExecuting}
              title="Send Message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

// Simple Helper for rich markdown formatting inside messages
function formatMarkdown(text) {
  if (!text) return '';
  let formatted = text
    .replace(/^### (.*$)/gim, '<h3 style="font-size: 1rem; font-weight: 700; color: #4F46E5; margin: 8px 0 4px 0;">$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4 style="font-size: 0.9rem; font-weight: 700; color: #6366F1; margin: 6px 0 2px 0;">$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="background: rgba(99, 102, 241, 0.1); color: #6366F1; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.82rem;">$1</code>')
    .replace(/```([\s\S]*?)```/g, '<pre style="background: #0F172A; color: #F8FAFC; padding: 12px; border-radius: 10px; font-family: monospace; font-size: 0.8rem; overflow-x: auto; margin: 8px 0;"><code>$1</code></pre>')
    .replace(/`\n`/g, '<br/>')
    .replace(/\n/g, '<br/>');
  return formatted;
}
