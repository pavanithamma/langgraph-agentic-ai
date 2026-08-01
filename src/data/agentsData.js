export const INITIAL_AGENTS = [
  {
    id: 'student-assistant',
    name: 'Student Assistant',
    description: 'Your AI study partner',
    icon: 'GraduationCap',
    color: '#8B5CF6',
    active: true,
    chats: 0,
    systemPrompt: 'You are an expert AI study assistant specializing in homework help, topic explanations, quizzes, and personalized study plans.',
    samplePrompts: [
      { id: 'p1', title: 'Explain machine learning', subtitle: 'Simply and with examples', icon: 'GraduationCap' },
      { id: 'p2', title: 'Create a Python quiz', subtitle: '5 questions on loops', icon: 'Award' },
      { id: 'p3', title: '7-day AI study plan', subtitle: 'Personalized plan', icon: 'Calendar' },
      { id: 'p4', title: 'Summarize LangGraph', subtitle: 'Key concepts & examples', icon: 'FileText' }
    ]
  },
  {
    id: 'travel-planner',
    name: 'Travel Planner',
    description: 'Plan trips & itineraries',
    icon: 'Plane',
    color: '#06B6D4',
    active: false,
    chats: 0,
    systemPrompt: 'You are an intelligent travel planner offering detailed travel itineraries, budget recommendations, flight options, and destination guides.',
    samplePrompts: [
      { id: 'tp1', title: '5-Day Tokyo Itinerary', subtitle: 'Food & tech exploration', icon: 'Plane' },
      { id: 'tp2', title: 'Eurotrip Budgeting', subtitle: 'Cost tips for 2 weeks', icon: 'Award' }
    ]
  },
  {
    id: 'healthcare-assistant',
    name: 'Healthcare Assistant',
    description: 'Health info & tips',
    icon: 'Stethoscope',
    color: '#10B981',
    active: false,
    chats: 0,
    systemPrompt: 'You are a healthcare information guide providing wellness advice, fitness plans, and nutrition tips.',
    samplePrompts: [
      { id: 'hc1', title: 'Balanced Weekly Meal Plan', subtitle: 'High protein & healthy fats', icon: 'Stethoscope' },
      { id: 'hc2', title: 'Morning Workout Routine', subtitle: '20-min home cardio', icon: 'Award' }
    ]
  },
  {
    id: 'business-advisor',
    name: 'Business Advisor',
    description: 'Business & finance help',
    icon: 'TrendingUp',
    color: '#F59E0B',
    active: false,
    chats: 0,
    systemPrompt: 'You are a strategic business advisor helping with startup pitch decks, market research, financial projections, and growth strategy.',
    samplePrompts: [
      { id: 'ba1', title: 'SaaS Pitch Deck Framework', subtitle: '10 slide structure', icon: 'TrendingUp' },
      { id: 'ba2', title: 'Market Sizing Model', subtitle: 'TAM, SAM, SOM breakdown', icon: 'Award' }
    ]
  },
  {
    id: 'software-dev',
    name: 'Software Dev Agent',
    description: 'Code, debug & explain',
    icon: 'Code2',
    color: '#3B82F6',
    active: false,
    chats: 0,
    systemPrompt: 'You are a senior full-stack software engineer expert in React, Python, LangGraph, system design, and algorithmic optimization.',
    samplePrompts: [
      { id: 'sd1', title: 'Debug Async Event Loop', subtitle: 'Python asyncio patterns', icon: 'Code2' },
      { id: 'sd2', title: 'LangGraph Custom Node', subtitle: 'Stateful tool call pattern', icon: 'Award' }
    ]
  },
  {
    id: 'multi-agent',
    name: 'Multi-Agent Coordinator',
    description: 'Coordinate all agents',
    icon: 'Network',
    color: '#EC4899',
    active: false,
    chats: 0,
    systemPrompt: 'You are a LangGraph multi-agent orchestrator delegating complex tasks to specialized agents.',
    samplePrompts: [
      { id: 'ma1', title: 'Run Full Product Launch', subtitle: 'Coordinate Dev, Marketing & Business', icon: 'Network' }
    ]
  }
];
