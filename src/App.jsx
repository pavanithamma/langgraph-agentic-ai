import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import AgentSidebar from './components/AgentSidebar';
import CreateAgentModal from './components/CreateAgentModal';
import ApiKeyModal from './components/ApiKeyModal';
import SavedChatsModal from './components/SavedChatsModal';
import LoginPage from './components/LoginPage';
import ChatWindow from './components/ChatWindow';
import ExecutionMonitor from './components/ExecutionMonitor';
import UsageOverview from './components/UsageOverview';
import MemoryPanel from './components/MemoryPanel';
import Footer from './components/Footer';

import { INITIAL_AGENTS } from './data/agentsData';
import { LangGraphEngine } from './services/langgraphEngine';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const [activeAgent, setActiveAgent] = useState(INITIAL_AGENTS[0]);

  // User Authentication State persisted in localStorage
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('agentiq_user_session')) || null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (userSession) => {
    setUser(userSession);
    localStorage.setItem('agentiq_user_session', JSON.stringify(userSession));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('agentiq_user_session');
  };
  
  // API Key state initialized from localStorage or environment
  const [apiKey, setApiKey] = useState(() => 
    localStorage.getItem('agentiq_api_key') || 
    import.meta.env.VITE_GROQ_API_KEY || 
    ''
  );
  const [apiProvider, setApiProvider] = useState(() => localStorage.getItem('agentiq_api_provider') || 'groq');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // Saved Chats Persistence state
  const [savedChats, setSavedChats] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('agentiq_saved_chats')) || [];
    } catch {
      return [];
    }
  });
  const [isSavedChatsModalOpen, setIsSavedChatsModalOpen] = useState(false);

  const handleSaveApiKey = (key, provider) => {
    setApiKey(key);
    setApiProvider(provider);
    localStorage.setItem('agentiq_api_key', key);
    localStorage.setItem('agentiq_api_provider', provider);
  };
  
  // Store chat history per agent: { [agentId]: [ { role: 'user'|'assistant', content: '...' } ] }
  const [messagesByAgent, setMessagesByAgent] = useState({
    'student-assistant': []
  });

  // Track chat counts per agent for Usage Overview
  const [usageStats, setUsageStats] = useState({
    'student-assistant': 0,
    'travel-planner': 0,
    'healthcare-assistant': 0,
    'business-advisor': 0,
    'software-dev': 0,
    'multi-agent': 0
  });

  // Live LangGraph execution state for monitor
  const [executionState, setExecutionState] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);

  // Instantiated LangGraph engine
  const langgraphEngine = useMemo(() => new LangGraphEngine(), []);

  // Theme switch handler
  const handleToggleTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const handleSelectAgent = (agent) => {
    setActiveAgent(agent);
  };

  // Modal handler for creating new agents
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCreateAgent = (newAgent) => {
    setAgents((prev) => [...prev, newAgent]);
    setUsageStats((prev) => ({ ...prev, [newAgent.id]: 0 }));
    setActiveAgent(newAgent);
  };

  // Handle message submission & LangGraph Graph Execution
  const handleSendMessage = async (userPrompt) => {
    const agentId = activeAgent.id;

    // Append user message
    const userMsg = { role: 'user', content: userPrompt };
    let updatedMsgs = [];
    
    setMessagesByAgent((prev) => {
      updatedMsgs = [...(prev[agentId] || []), userMsg];
      return { ...prev, [agentId]: updatedMsgs };
    });

    // Update usage stat
    setUsageStats((prev) => ({
      ...prev,
      [agentId]: (prev[agentId] || 0) + 1
    }));

    // Trigger LangGraph state execution
    setIsExecuting(true);

    try {
      const result = await langgraphEngine.runGraph(
        activeAgent,
        userPrompt,
        (nodeEvent) => {
          setExecutionState(nodeEvent);
        },
        apiKey,
        apiProvider
      );

      // Append AI response
      const assistantMsg = { role: 'assistant', content: result.text };
      let finalMsgs = [];

      setMessagesByAgent((prev) => {
        finalMsgs = [...(prev[agentId] || []), assistantMsg];
        return { ...prev, [agentId]: finalMsgs };
      });

      // Save chat session into localStorage history
      saveChatSession(activeAgent, userPrompt, finalMsgs);
    } catch (err) {
      console.error('LangGraph Execution Error:', err);
    } finally {
      setIsExecuting(false);
    }
  };

  const saveChatSession = (agent, prompt, messages) => {
    const newChatSession = {
      id: 'chat_' + Date.now(),
      agentId: agent.id,
      agentName: agent.name,
      lastMessage: prompt,
      messages: messages,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setSavedChats((prev) => {
      // Filter existing chat for same agent or append
      const filtered = prev.filter((c) => c.agentId !== agent.id);
      const updated = [newChatSession, ...filtered];
      localStorage.setItem('agentiq_saved_chats', JSON.stringify(updated));
      return updated;
    });
  };

  const handleLoadChat = (savedChat) => {
    const targetAgent = agents.find((a) => a.id === savedChat.agentId) || activeAgent;
    setActiveAgent(targetAgent);
    setMessagesByAgent((prev) => ({
      ...prev,
      [targetAgent.id]: savedChat.messages || []
    }));
  };

  const handleDeleteChat = (chatId) => {
    setSavedChats((prev) => {
      const updated = prev.filter((c) => c.id !== chatId);
      localStorage.setItem('agentiq_saved_chats', JSON.stringify(updated));
      return updated;
    });
  };

  const handleNewChat = () => {
    const agentId = activeAgent.id;
    setMessagesByAgent((prev) => ({
      ...prev,
      [agentId]: []
    }));
    setExecutionState(null);
  };

  const activeMessages = messagesByAgent[activeAgent.id] || [];

  if (!user) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-container">
      {/* Header Bar */}
      <Header
        theme={theme}
        toggleTheme={handleToggleTheme}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasApiKey={!!apiKey}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Grid Workspace */}
      <div className="main-layout">
        {/* Left Sidebar: Agents */}
        <AgentSidebar
          agents={agents}
          activeAgent={activeAgent}
          onSelectAgent={handleSelectAgent}
          onOpenCreateModal={() => setIsModalOpen(true)}
          onNewChat={handleNewChat}
          onOpenSavedChats={() => setIsSavedChatsModalOpen(true)}
        />

        {/* Center: Chat Window & Prompt Cards */}
        <ChatWindow
          activeAgent={activeAgent}
          messages={activeMessages}
          onSendMessage={handleSendMessage}
          isExecuting={isExecuting}
          onNewChat={handleNewChat}
        />

        {/* Right Sidebar: Execution Monitor, Usage Overview, Memory */}
        <aside className="right-sidebar">
          <ExecutionMonitor executionState={executionState} />
          <UsageOverview agents={agents} usageStats={usageStats} />
          <MemoryPanel
            threadId={langgraphEngine.threadId}
            checkpointsCount={langgraphEngine.checkpoints.length}
            hasMessages={activeMessages.length > 0}
          />
        </aside>
      </div>

      {/* Footer */}
      <Footer />

      {/* Create New Agent Modal */}
      <CreateAgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateAgent={handleCreateAgent}
      />

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />

      {/* Saved Chats Modal */}
      <SavedChatsModal
        isOpen={isSavedChatsModalOpen}
        onClose={() => setIsSavedChatsModalOpen(false)}
        savedChats={savedChats}
        onLoadChat={handleLoadChat}
        onDeleteChat={handleDeleteChat}
      />
    </div>
  );
}
