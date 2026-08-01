import React from 'react';
import { Layers } from 'lucide-react';

export default function UsageOverview({ agents, usageStats }) {
  // Find max count to scale progress bars smoothly
  const maxChats = Math.max(1, ...Object.values(usageStats));

  return (
    <div className="dark-panel-card">
      <div className="panel-header">
        <div className="panel-title">
          <Layers size={16} color="#38BDF8" />
          <span>USAGE OVERVIEW</span>
        </div>
      </div>

      <div className="usage-bars-list">
        {agents.map((agent) => {
          const chats = usageStats[agent.id] || 0;
          const percentage = Math.min(100, Math.round((chats / maxChats) * 100));

          return (
            <div key={agent.id} className="usage-item">
              <div className="usage-label-row">
                <span className="agent-usage-name">
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: agent.color
                  }}></span>
                  {agent.name}
                </span>
                <span className="usage-count">{chats}</span>
              </div>
              <div className="usage-track">
                <div
                  className="usage-fill"
                  style={{
                    width: chats === 0 ? '0%' : `${percentage}%`,
                    backgroundColor: agent.color
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
