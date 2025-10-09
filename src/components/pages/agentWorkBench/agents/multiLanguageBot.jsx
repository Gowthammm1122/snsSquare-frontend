import { useState, useEffect, useRef } from 'react';

export default function MultiLanguageChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId] = useState('user-' + Math.random().toString(36).substr(2, 9));
  const [name, setName] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const chatContainerRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  ];

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (message = input) => {
    if (!message.trim()) return;

    setError(null);
    setIsLoading(true);

    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: message,
      language: selectedLanguage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://127.0.0.1:8000/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          message,
          name: name || undefined,
          language: selectedLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Add assistant message to chat
      const assistantMessage = {
        role: 'assistant',
        content: data.response,
        language: selectedLanguage,
        timestamp: data.timestamp,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to get response from the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (suggestion) => {
    handleSend(suggestion);
  };

  const handleExportChat = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/chatbot/export/${userId}?format=txt`);
      if (!response.ok) {
        throw new Error('Failed to export chat history');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chat_history_${userId}_${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export Error:', error);
      setError('Failed to export chat history. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };    

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  return (
    <div className="min-h-screen bg-[#F2F6FE] flex items-center justify-center p-4 pt-44">
      <div className="w-full max-w-4xl h-[90vh] bg-white shadow-2xl rounded-3xl border border-gray-200 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#064EE3] to-[#3D76EC] px-6 py-4 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <circle cx="15.5" cy="8.5" r="1.5"/>
                  <path d="M8.5 13.5c1.5 2 2.5 2.5 3.5 2.5s2-0.5 3.5-2.5"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Language Assistant</h1>
                <div className="flex items-center space-x-2 text-sm text-blue-100">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>Online</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <span>{currentLanguage.flag}</span>
                    <span>{currentLanguage.name}</span>
                  </span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
              </svg>
            </button>
          </div>
          
          {/* Settings Panel */}
          {showSettings && (
            <div className="absolute top-full left-0 right-0 bg-white rounded-b-2xl shadow-xl border-t border-gray-200 p-6 z-10 text-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name (optional)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064EE3] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#064EE3] focus:border-transparent"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* <div className="mt-6 flex justify-end">
                <button
                  onClick={handleExportChat}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#064EE3] to-[#3D76EC] text-white rounded-xl hover:from-[#0540D4] hover:to-[#356AE5] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span>Export Chat</span>
                </button>
              </div> */}
            </div>
          )}
        </div>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-6 bg-[#F2F6FE] space-y-4"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="w-20 h-20 bg-gradient-to-br from-[#064EE3]/10 to-[#3D76EC]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-[#064EE3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Welcome to AI Language Assistant</h3>
              <p className="text-center text-gray-500 max-w-md">
                Start a conversation in any of the {languages.length} supported languages. I'm here to help you communicate naturally!
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom duration-300`}
              >
                <div className={`flex items-end space-x-3 max-w-2xl ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-lg ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-br from-[#064EE3] to-[#3D76EC]' 
                      : 'bg-gradient-to-br from-gray-600 to-gray-700'
                  }`}>
                    {message.role === 'user' ? (name ? name[0].toUpperCase() : 'U') : 'AI'}
                  </div>
                  
                  {/* Message bubble */}
                  <div className={`px-5 py-4 rounded-3xl shadow-lg ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-[#064EE3] to-[#3D76EC] text-white rounded-br-lg'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-lg'
                  }`}>
                    <p className="leading-relaxed">{message.content}</p>
                    <div className={`flex items-center space-x-2 text-xs mt-2 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                    }`}>
                      <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <span>{languages.find((lang) => lang.code === message.language)?.flag}</span>
                        <span>{languages.find((lang) => lang.code === message.language)?.name}</span>
                      </span>
                    </div>
                    
                    {/* Quick Reply Buttons */}
                    {message.role === 'assistant' && messages[index + 1]?.role !== 'user' && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {(message.content.includes('suggestions')
                          ? JSON.parse(message.content.split('suggestions: ')[1] || '[]')
                          : []).map((suggestion, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuickReply(suggestion)}
                            className="px-3 py-1 bg-[#F2F6FE] text-[#064EE3] rounded-full hover:bg-blue-100 text-sm font-medium transition-colors border border-blue-200"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  AI
                </div>
                <div className="bg-white rounded-3xl px-5 py-4 shadow-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Error message */}
          {error && (
            <div className="flex justify-center">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Type your message in ${currentLanguage.name}...`}
                className="w-full resize-none rounded-3xl border-2 border-gray-200 px-6 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-[#064EE3] focus:border-transparent text-gray-800 max-h-32 min-h-[56px] bg-white"
                rows={1}
                disabled={isLoading}
              />
              <div className="absolute right-4 bottom-3 text-xs text-gray-400">
                {currentLanguage.flag}
              </div>
            </div>
            
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-[#064EE3] to-[#3D76EC] hover:from-[#0540D4] hover:to-[#356AE5] disabled:from-gray-400 disabled:to-gray-400 text-white p-4 rounded-3xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#064EE3] focus:ring-offset-2 shadow-lg disabled:transform-none disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              )}
            </button>
          </div>
          
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center space-x-1">
              <kbd className="px-2 py-1 bg-gray-100 rounded border">Enter</kbd>
              <span>to send</span>
            </span>
            <span>{input.length} characters</span>
          </div>
        </div>
      </div>
    </div>
  );
}