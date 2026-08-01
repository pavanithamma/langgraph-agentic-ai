import React from 'react';
import { 
  GraduationCap, 
  Plane, 
  Stethoscope, 
  TrendingUp, 
  Code2, 
  Network, 
  Plus, 
  Bot,
  MessageSquare
} from 'lucide-react';

const iconMap = {
  GraduationCap: GraduationCap,
  Plane: Plane,
  Stethoscope: Stethoscope,
  TrendingUp: TrendingUp,
  Code2: Code2,
  Network: Network,
  Bot: Bot
};

export default function AgentSidebar({ 
  agents, 
  activeAgent, 
  onSelectAgent, 
  onOpenCreateModal,
  onNewChat,
  onOpenSavedChats
}) {
  return (
    <aside className="agents-sidebar">
      {/* Sleek Action Header with circular + button & chat history icon matching screenshot */}
      <div className="sidebar-header" style={{ justifyContent: 'space-between', paddingBottom: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bot size={16} color="#6366F1" />
          <span>Agents</span>
        </div>

        {/* Minimalist Icon Controls matching user screenshot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onNewChat}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-main)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="New Chat (+)"
          >
            <Plus size={16} />
          </button>

          <button
            onClick={onOpenSavedChats}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Saved Chat History (💬)"
          >
            <MessageSquare size={16} />
          </button>
        </div>
      </div>

      <div className="agents-list">
        {agents.map((agent) => {
          const IconComp = iconMap[agent.icon] || Bot;
          const isActive = activeAgent.id === agent.id;

          return (
            <div
              key={agent.id}
              className={`agent-card ${isActive ? 'active' : ''}`}
              onClick={() => onSelectAgent(agent)}
            >
              <div className="agent-icon-wrapper" style={!isActive ? { color: agent.color } : {}}>
                <IconComp size={20} />
              </div>

              <div className="agent-info">
                <div className="agent-name-row">
                  <span className="agent-name">{agent.name}</span>
                  {isActive && (
                    <span className="active-pill">
                      <span className="status-dot"></span> Active
                    </span>
                  )}
                </div>
                <p className="agent-desc">{agent.description}</p>
                <span className="agent-chat-count">{agent.chats || 0} chats</span>
              </div>
            </div>
          );
        })}
      </div>

      <button className="create-agent-btn" onClick={onOpenCreateModal}>
        <Plus size={18} />
        <span>Create New Agent</span>
      </button>
    </aside>
  );
}
