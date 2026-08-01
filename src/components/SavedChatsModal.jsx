import React from 'react';
import { MessageSquare, X, Trash2, Clock, ArrowRight } from 'lucide-react';

export default function SavedChatsModal({ 
  isOpen, 
  onClose, 
  savedChats, 
  onLoadChat, 
  onDeleteChat 
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
            <MessageSquare size={20} color="#6366F1" />
            Saved Conversations History
          </h2>
          <button className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '380px', overflowY: 'auto' }}>
          {savedChats.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: '#64748B' }}>
              <MessageSquare size={32} style={{ opacity: 0.4, marginBottom: '8px' }} />
              <p style={{ fontSize: '0.88rem', fontWeight: '600' }}>No saved conversations yet</p>
              <p style={{ fontSize: '0.76rem', color: '#94A3B8' }}>Start a chat with any agent to save history automatically!</p>
            </div>
          ) : (
            savedChats.map((chat) => (
              <div
                key={chat.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  padding: '12px 14px',
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => {
                  onLoadChat(chat);
                  onClose();
                }}
              >
                <div style={{ flex: 1, minWidth: 0, paddingRight: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.85rem', color: '#6366F1' }}>
                      {chat.agentName}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Clock size={10} /> {chat.timestamp}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {chat.lastMessage || 'Conversation thread'}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                    title="Delete Chat History"
                  >
                    <Trash2 size={15} />
                  </button>
                  <ArrowRight size={16} color="#6366F1" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
