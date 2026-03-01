'use client';
import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Trash2, Plus, MessageSquare, Clock } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000';

interface Message {
  id: string | number;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: {
    eventsUsed?: number;
    responseTime?: number;
  };
}

interface ChatSession {
  sessionId: string;
  userId?: string;
  userRole: string;
  title: string;
  lastActiveAt: string;
  messageCount: number;
  createdAt: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [hasToken, setHasToken] = useState(() => {
    if (typeof window !== 'undefined') return !!localStorage.getItem('token');
    return false;
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const WELCOME_MESSAGE: Message = {
    id: 'welcome',
    role: 'assistant',
    content: "Hi! I'm Kai 🎓 — your campus assistant. I can help you find events, answer questions about registrations, and more. What would you like to know?",
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Re-check token whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setHasToken(!!localStorage.getItem('token'));
    }
  }, [isOpen]);

  // Initialize session and load history
  useEffect(() => {
    if (isOpen) {
      loadChatHistory();
      if (!sessionId) {
        initializeSession();
      }
    }
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && !initializing) {
      inputRef.current?.focus();
    }
  }, [isOpen, initializing]);

  const loadChatHistory = async () => {
    const token = localStorage.getItem('token');
    if (!token) return; // Skip for guest users

    setLoadingSessions(true);
    try {
      const response = await fetch(`${API_URL}/api/chat/my-sessions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSessions(data.data || []);
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    } finally {
      setLoadingSessions(false);
    }
  };

  const loadSession = async (sid: string) => {
    if (sid === sessionId) return;

    setInitializing(true);
    try {
      const response = await fetch(`${API_URL}/api/chat/session/${sid}`);

      if (response.ok) {
        const data = await response.json();
        const loadedMessages = data.messages || [];
        setMessages(loadedMessages.length > 0 ? loadedMessages : [WELCOME_MESSAGE]);
        setSessionId(sid);
        localStorage.setItem('kai_session_id', sid);
      }
    } catch (error) {
      console.error('Failed to load session:', error);
      setMessages([WELCOME_MESSAGE, {
        id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        role: 'assistant' as const,
        content: '⚠️ Failed to load this conversation.',
      }]);
    } finally {
      setInitializing(false);
    }
  };

  const createNewChat = async () => {
    setInitializing(true);
    setMessages([WELCOME_MESSAGE]);
    
    // Create new session
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/chat/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSessionId(data.sessionId);
        localStorage.setItem('kai_session_id', data.sessionId);
        setMessages([WELCOME_MESSAGE]);
      }
    } catch (error) {
      console.error('Failed to create new chat:', error);
      setMessages([WELCOME_MESSAGE, {
        id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        role: 'assistant' as const,
        content: '⚠️ Failed to create new chat session.',
      }]);
    } finally {
      setInitializing(false);
      await loadChatHistory(); // Refresh history
    }
  };

  const deleteSession = async (sid: string) => {
    if (!confirm('Delete this conversation?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/chat/session/${sid}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      });

      if (response.ok) {
        // Remove from list
        setSessions(prev => prev.filter(s => s.sessionId !== sid));

        // If it's the current session, create a new one
        if (sid === sessionId) {
          localStorage.removeItem('kai_session_id');
          setSessionId(null);
          setMessages([WELCOME_MESSAGE]);
          initializeSession();
        }
      }
    } catch (error) {
      console.error('Delete session error:', error);
    }
  };

  const initializeSession = async () => {
    try {
      const storedSessionId = localStorage.getItem('kai_session_id');

      if (storedSessionId) {
        // Try to restore session
        const response = await fetch(`${API_URL}/api/chat/session/${storedSessionId}`);
        if (response.ok) {
          const data = await response.json();
          setSessionId(storedSessionId);

          if (data.messages && data.messages.length > 0) {
            setMessages([WELCOME_MESSAGE, ...data.messages]);
          } else {
            setMessages([WELCOME_MESSAGE]);
          }
          setInitializing(false);
          return;
        }
      }

      // Create new session
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/chat/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSessionId(data.sessionId);
        localStorage.setItem('kai_session_id', data.sessionId);
        setMessages([WELCOME_MESSAGE]);
      }
    } catch (error) {
      console.error('Failed to initialize session:', error);
      setMessages([WELCOME_MESSAGE, {
        id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        role: 'assistant' as const,
        content: '⚠️ Failed to connect to chat service. Please ensure Ollama and Qdrant are running.',
      }]);
    } finally {
      setInitializing(false);
    }
  };

  const handleSend = async () => {
    const question = input.trim();
    if (!question || loading || !sessionId) return;

    setInput('');
    setLoading(true);

    const userMessageId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const userMessage: Message = {
      id: userMessageId,
      role: 'user' as const,
      content: question,
    };

    setMessages(prev => [...prev, userMessage]);

    // Create placeholder for AI response
    const aiMessageId = `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const placeholderMessage: Message = {
      id: aiMessageId,
      role: 'assistant' as const,
      content: '',
    };
    setMessages(prev => [...prev, placeholderMessage]);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/chat/ask/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ question, sessionId }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to get streaming response');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.type === 'content') {
                accumulatedContent += data.content;
                // Update the message with accumulated content
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === aiMessageId
                      ? { ...msg, content: accumulatedContent }
                      : msg
                  )
                );
              } else if (data.type === 'metadata') {
                // Store metadata for later
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === aiMessageId
                      ? { ...msg, metadata: data }
                      : msg
                  )
                );
              } else if (data.type === 'error') {
                throw new Error(data.error);
              }
            } catch (parseError) {
              console.error('Failed to parse SSE data:', parseError);
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat streaming error:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        role: 'assistant' as const,
        content: '❌ Sorry, I encountered an error. Please try again or check if Ollama is running.',
      };
      // Replace placeholder with error message
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== aiMessageId);
        return [...filtered, errorMessage];
      });
    } finally {
      setLoading(false);
      // Refresh chat history if user is logged in
      if (localStorage.getItem('token')) {
        loadChatHistory();
      }
    }
  };

  const handleClearChat = async () => {
    if (!sessionId || !confirm('Clear this conversation?')) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/api/chat/session/${sessionId}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      });

      setSessions(prev => prev.filter(s => s.sessionId !== sessionId));
      setMessages([WELCOME_MESSAGE]);
      localStorage.removeItem('kai_session_id');
      setSessionId(null);
      initializeSession();
    } catch (error) {
      console.error('Clear chat error:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex overflow-hidden">

        {/* Chat History Sidebar */}
        {hasToken && showHistory && (
          <div className="w-64 border-r border-gray-200 flex flex-col bg-gray-50">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200">
              <button
                onClick={createNewChat}
                className="w-full flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </button>
            </div>

            {/* Sessions List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {loadingSessions ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                </div>
              ) : sessions.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-8">
                  No chat history yet
                </p>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session.sessionId}
                    className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${session.sessionId === sessionId
                      ? 'bg-white border border-gray-300'
                      : 'hover:bg-white border border-transparent'
                      }`}
                    onClick={() => loadSession(session.sessionId)}
                  >
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {session.title === 'New Chat'
                            ? `Chat ${sessions.length - sessions.indexOf(session)}`
                            : session.title
                          }
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <p className="text-xs text-gray-500">
                            {new Date(session.lastActiveAt).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                          <span className="text-xs text-gray-400">•</span>
                          <p className="text-xs text-gray-500">
                            {session.messageCount} msgs
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.sessionId);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-opacity"
                        title="Delete chat"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-black">Kai Assistant</h3>
                <p className="text-xs text-gray-500">AI-powered campus helper</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasToken && (
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className={`p-2 rounded-lg transition-colors ${showHistory ? 'bg-gray-100 text-black' : 'hover:bg-gray-100 text-gray-600'}`}
                  title={showHistory ? 'Hide history' : 'Show history'}
                >
                  <Clock className="w-4 h-4" />
                </button>
              )}
              {sessionId && (
                <button
                  onClick={handleClearChat}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Clear conversation"
                >
                  <Trash2 className="w-4 h-4 text-gray-600" />
                </button>
              )}
              <button
                onClick={onClose}
                className="text-2xl text-gray-600 hover:text-black font-bold w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {initializing ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <div
                    key={msg.id || (msg as any)._id || idx}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 ${msg.role === 'user'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      {msg.metadata && (
                        <p className="text-xs opacity-60 mt-2">
                          {msg.metadata.eventsUsed} events • {msg.metadata.responseTime}ms
                        </p>
                      )}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-4 py-3">
                      <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about events, registrations, clubs..."
                disabled={loading || !sessionId}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black text-sm disabled:bg-gray-50 disabled:text-gray-400"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading || !sessionId}
                className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by Groq (Llama 3.3 70B) + Qdrant RAG
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
