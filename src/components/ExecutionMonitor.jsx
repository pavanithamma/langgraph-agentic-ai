import React from 'react';
import { Activity, CheckCircle2, Clock } from 'lucide-react';

export default function ExecutionMonitor({ executionState }) {
  const { nodes = [], isRunning, currentNode, latency, payload } = executionState || {};

  return (
    <div className="sidebar-panel-card">
      <div className="panel-header">
        <div className="panel-title">
          <Activity size={16} color="#6366F1" />
          <span>Execution Monitor</span>
        </div>
        <span className="live-badge">+ Live</span>
      </div>

      <div className="execution-graph-container">
        {!nodes || nodes.length === 0 ? (
          <>
            <svg className="waveform-svg" viewBox="0 0 200 40" fill="none">
              <path
                d="M0 20 Q25 5, 50 20 T100 20 T150 20 T200 20"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
            <p className="no-execution-text">No execution yet</p>
            <p className="execution-subtext">Send a message to see steps in action</p>
          </>
        ) : (
          <div className="nodes-flow-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748B', marginBottom: '4px' }}>
              <span>Step Execution Trace</span>
              <span style={{ color: '#6366F1', fontWeight: '700' }}>
                <Clock size={10} style={{ display: 'inline', marginRight: '3px' }} />
                {latency || '0ms'}
              </span>
            </div>

            {nodes.map((node) => {
              const isActive = node.status === 'active';
              const isDone = node.status === 'done';

              return (
                <div
                  key={node.id}
                  className={`node-chip ${isActive ? 'active' : isDone ? 'done' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {isDone ? (
                      <CheckCircle2 size={13} color="#10B981" />
                    ) : isActive ? (
                      <span className="status-dot"></span>
                    ) : (
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#CBD5E1' }}></span>
                    )}
                    <span>{node.name}</span>
                  </div>
                  <span style={{ fontSize: '0.65rem', color: isDone ? '#10B981' : isActive ? '#6366F1' : '#94A3B8' }}>
                    {isActive ? 'RUNNING' : isDone ? 'COMPLETED' : 'PENDING'}
                  </span>
                </div>
              );
            })}

            {payload && (
              <div style={{
                marginTop: '8px',
                padding: '8px 10px',
                background: '#0F172A',
                borderRadius: '8px',
                fontSize: '0.68rem',
                color: '#38BDF8',
                fontFamily: 'monospace',
                maxHeight: '60px',
                overflowY: 'auto'
              }}>
                Payload: {JSON.stringify(payload)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
