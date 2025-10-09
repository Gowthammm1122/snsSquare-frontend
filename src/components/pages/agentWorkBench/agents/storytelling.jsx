import { useState } from "react";
import axios from "axios";

function StorylineGenerator() {
  const [storyIdea, setStoryIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Function to format markdown-like text
  const formatStoryline = (text) => {
    if (!text) return "";

    return text
      .split('\n')
      .map((line, index) => {
        // Handle bold text (**text**)
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>');
        // Handle italic text (*text*)
        line = line.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

        // Handle main section headers (like **Strengths:**)
        if (line.trim().match(/^\*\*.*?:\*\*$/)) {
          return `<h3 class="text-xl font-bold text-blue-800 mt-6 mb-3 border-b-2 border-blue-200 pb-2">${line.replace(/\*\*/g, '')}</h3>`;
        }

        // Handle bullet points (* item)
        if (line.trim().startsWith('*')) {
          const content = line.trim().substring(1).trim();
          // Check if it's a sub-bullet (starts with additional formatting)
          if (content.startsWith('*') || content.startsWith('-')) {
            return `<li class="ml-8 mb-1 text-gray-600">${content.substring(1).trim()}</li>`;
          }
          return `<li class="ml-4 mb-2 flex items-start"><span class="text-blue-500 mr-2 mt-1">•</span><span>${content}</span></li>`;
        }

        // Handle regular paragraphs
        if (line.trim()) {
          return `<p class="mb-3 leading-relaxed text-gray-800">${line}</p>`;
        }
        return '<div class="mb-2"></div>';
      })
      .join('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!storyIdea.trim()) {
      setError('Please enter a story idea or theme');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/storyline_generator/storyline', {
        text: storyIdea
      });
      
      setResult(response.data);
    } catch (err) {
      console.error('Storyline generation error:', err);
      setError(err.response?.data?.detail || err.message || 'An error occurred while generating the storyline');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-700">SNS Square</h1>
          <nav className="flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
            <a href="/agent-workbench" className="text-blue-600 font-semibold">Agent Workbench</a>
            <a href="/usecase" className="text-gray-700 hover:text-blue-600">Use Case</a>
            <a href="/life" className="text-gray-700 hover:text-blue-600">Life at SNS Square</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600">About Us</a>
          </nav>
          <button className="bg-black text-white px-4 py-2 rounded-full">
            Contact Us
          </button>
        </div>
      </header>

      {/* Main Card */}
      <main className="flex justify-center px-4 py-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg border border-blue-200"
        >
        {/* Active Agent Badge */}
        <span className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full mb-6">
          Active Agent
        </span>

        {/* Title */}
        <div className="flex items-center mb-6">
          <span className="text-3xl mr-2">🎬</span>
          <h2 className="text-2xl font-bold text-blue-700">
            Storyline Generator
          </h2>
        </div>

        {/* Textarea */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your story idea or theme
          </label>
          <textarea
            value={storyIdea}
            onChange={(e) => setStoryIdea(e.target.value)}
            placeholder="E.g., A time traveler stuck in the past, a love story in space, etc."
            rows={5}
            className="w-full px-4 py-3 border rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition disabled:cursor-not-allowed"
        >
          {loading ? 'Generating Storyline...' : 'Generate Storyline'}
        </button>
        </form>

        {/* Result Section */}
        {loading && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              <span className="text-blue-700">Generating storyline...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {result && result.storyline && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">📖</span>
              <h3 className="text-xl font-bold text-gray-800">Generated Storyline</h3>
            </div>
            <div className="prose max-w-none">
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatStoryline(result.storyline) }}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default StorylineGenerator;