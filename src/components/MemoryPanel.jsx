import React from 'react';
import { Brain, Cpu, Database } from 'lucide-react';

export default function MemoryPanel({ threadId, checkpointsCount, hasMessages }) {
  return (
    <div className="sidebar-panel-card">
      <div className="panel-header">
        <div className="panel-title">
          <Brain size={16} color="#EC4899" />
          <span>MEMORY</span>
        </div>
      </div>

      <div className="memory-box">
        <div className="brain-icon-wrapper">
          <Brain size={20} />
        </div>
        <div className="memory-text">
          {!hasMessages ? (
            <>
              <h4>No active thread</h4>
              <p>Start a conversation to build memory</p>
            </>
          ) : (
            <>
              <h4 style={{ color: '#6366F1' }}>Active Thread: {threadId.substring(0, 14)}</h4>
              <p style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <Database size={11} /> {checkpointsCount} Checkpoints saved
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
