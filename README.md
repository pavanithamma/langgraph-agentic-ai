# AgentIQ - AI LangGraph Multi-Agent Orchestrator 🚀

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-brightgreen?style=for-the-badge&logo=vercel)](https://langgraph-agentic-ai.vercel.app)
[![Powered by LangGraph](https://img.shields.io/badge/Orchestrator-LangGraph-6366F1?style=for-the-badge)](https://langgraph.com)
[![Groq Llama 3.3](https://img.shields.io/badge/Model-Groq_Llama_3.3_70B-F59E0B?style=for-the-badge)](https://groq.com)
[![React 18](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)

**AgentIQ** is a state-of-the-art Agentic AI Multi-Agent platform powered by a client-side **LangGraph State Machine Orchestrator** and **Groq Llama 3.3 70B** model acceleration.

🌐 **Live URL**: [https://langgraph-agentic-ai.vercel.app](https://langgraph-agentic-ai.vercel.app)

---

## ✨ Features

- 🤖 **Multi-Agent Ecosystem**: Pre-loaded with specialized agents (*Student Assistant*, *Travel Planner*, *Healthcare Assistant*, *Business Advisor*, *Software Dev Agent*, and *Multi-Agent Coordinator*).
- 🛠️ **Dynamic Agent Creator**: Build custom AI agents on the fly with personalized system prompts, theme colors, and icons.
- 🕸️ **Real-Time LangGraph Node Monitor**: Interactive execution trace visualizer mapping state flow across graph nodes:
  ```
  __start__ ➔ input_sanitizer ➔ agent_router ➔ llm_node (Groq 70B) ➔ tool_executor ➔ state_memory_saver ➔ __end__
  ```
- ⚡ **Groq Llama 3.3 70B Acceleration**: High-speed LLM inference integration with live API key connection support.
- 🔒 **Centered Authentication**: Glassmorphic Sign In & Sign Up login card with **1-Click Fast Demo Login**.
- 💾 **Chat History Persistence**: Automatic local storage session saving with a minimalist history drawer (💬) and New Chat (🔘) controls.
- 📊 **Usage Overview Panel**: High-contrast dark dashboard tracking call usage per agent with colorful progress metrics.
- 🌓 **Theme Switcher**: Seamless Light & Dark mode theme toggling.

---

## 🛠️ Tech Stack

- **Core**: React 18, Vite, JavaScript (ES6+)
- **State Machine**: LangGraph Engine Architecture
- **AI Model**: Groq Llama 3.3 70B (`llama-3.3-70b-versatile`) / OpenAI GPT-4o
- **Styling**: Modern Glassmorphism CSS Design System with custom color tokens
- **Icons**: Lucide React
- **Deployment**: Vercel & GitHub Actions

---

## 🚀 Getting Started locally

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pavanithamma/langgraph-agentic-ai.git
   cd langgraph-agentic-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📄 License & Credits

Built with ❤️ using **LangGraph**, **LangChain**, and **Groq Llama 3.3**.  
*BlackBucks Internship Final Project*
