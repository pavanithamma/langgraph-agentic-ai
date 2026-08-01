import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function CreateAgentModal({ isOpen, onClose, onCreateAgent }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [icon, setIcon] = useState('Bot');
  const [color, setColor] = useState('#8B5CF6');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCreateAgent({
      id: 'agent_' + Date.now(),
      name,
      description: description || 'Custom AI Assistant',
      icon,
      color,
      active: false,
      chats: 0,
      systemPrompt: systemPrompt || 'You are a helpful AI assistant built with LangGraph.',
      samplePrompts: [
        { id: 'custom1', title: `Ask ${name}`, subtitle: 'Custom workflow instruction', icon: 'Bot' }
      ]
    });

    // Reset and close
    setName('');
    setDescription('');
    setSystemPrompt('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Agent</h2>
          <button className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-group" style={{ gap: '14px' }}>
          <div className="form-group">
            <label>Agent Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Physics Tutor"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Short Description</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Quantum mechanics & problem solver"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>System Instructions (Prompt)</label>
            <textarea
              className="form-textarea"
              rows="3"
              placeholder="e.g. You are a senior physics professor. Explain equations step-by-step."
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Theme Color & Icon</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select className="form-input" value={icon} onChange={(e) => setIcon(e.target.value)}>
                <option value="Bot">🤖 Default Bot</option>
                <option value="GraduationCap">🎓 Education</option>
                <option value="Code2">💻 Software</option>
                <option value="TrendingUp">📊 Business</option>
                <option value="Stethoscope">🩺 Health</option>
                <option value="Plane">✈️ Travel</option>
              </select>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ width: '45px', height: '40px', border: 'none', cursor: 'pointer', borderRadius: '8px' }}
              />
            </div>
          </div>

          <button type="submit" className="submit-modal-btn">
            <Sparkles size={16} style={{ display: 'inline', marginRight: '6px' }} />
            Build & Compile LangGraph Node
          </button>
        </form>
      </div>
    </div>
  );
}
