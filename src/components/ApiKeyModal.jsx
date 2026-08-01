import React, { useState } from 'react';
import { Key, X, Check, ExternalLink, Zap } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSaveApiKey }) {
  const [keyInput, setKeyInput] = useState(apiKey || '');
  const [provider, setProvider] = useState('groq');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveApiKey(keyInput.trim(), provider);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Key size={20} color="#6366F1" />
            Connect Live API
          </h2>
          <button className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="form-group" style={{ gap: '14px' }}>
          <div className="form-group">
            <label>API Provider</label>
            <select
              className="form-input"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
            >
              <option value="groq">⚡ Groq API (Llama 3.3 70B - Ultra Fast)</option>
              <option value="openai">🤖 OpenAI API (GPT-4o / GPT-3.5)</option>
            </select>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>API Key</span>
              <a
                href={provider === 'groq' ? 'https://console.groq.com/keys' : 'https://platform.openai.com/api-keys'}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#6366F1', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '3px' }}
              >
                Get Free Key <ExternalLink size={10} />
              </a>
            </label>
            <input
              type="password"
              className="form-input"
              placeholder={provider === 'groq' ? 'gsk_...' : 'sk-...'}
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
            />
          </div>

          <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: '1.4' }}>
            {keyInput ? (
              <span style={{ color: '#10B981', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Zap size={13} /> Real-time API mode active! All queries will invoke live {provider.toUpperCase()} servers.
              </span>
            ) : (
              'Leave blank to run in Local Autonomous Engine mode.'
            )}
          </p>

          <button type="submit" className="submit-modal-btn">
            {savedSuccess ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Check size={18} /> Saved & Connected!
              </span>
            ) : (
              'Save API Settings'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
