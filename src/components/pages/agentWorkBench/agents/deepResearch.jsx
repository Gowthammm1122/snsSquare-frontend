import { useState } from "react";
import axios from "axios";

function DeepResearchAgent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [depth, setDepth] = useState("small");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const formatContent = (content) => {
    // Replace **text** with <strong>text</strong>
    let formatted = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Split by double newlines for paragraphs
    return formatted.split('\n\n').map((para, index) => (
      <p key={index} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: para.replace(/\n/g, '<br />') }} />
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await axios.post('http://127.0.0.1:8000/research/run', {
        title,
        brief: description || null,
        length: depth
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-blue-600">SNS Square</h1>
              <div className="hidden md:block h-6 w-px bg-gray-300"></div>
              <span className="hidden md:block text-sm text-gray-600">Agent Workbench</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="/agent-playground" className="text-blue-600 font-medium">Agents</a>
              <a href="/usecase" className="text-gray-600 hover:text-blue-600 transition-colors">Use Cases</a>
              <a href="/about-us" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            </nav>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </header>

      {/* Agent Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Deep Research Agent</h1>
              <p className="mt-2 text-lg text-gray-600">Advanced research and analysis with comprehensive data gathering</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Active
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Estimated time: 2-5 minutes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Instructions Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-32">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Enter Research Topic</p>
                    <p className="text-sm text-gray-600">Provide a clear, specific research title</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Add Context</p>
                    <p className="text-sm text-gray-600">Optional: Provide additional details or focus areas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Select Depth</p>
                    <p className="text-sm text-gray-600">Choose the level of detail for your research</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                    4
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Run Research</p>
                    <p className="text-sm text-gray-600">Click to start the comprehensive analysis</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Research Capabilities</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Web-based information gathering</li>
                  <li>• Multi-source content analysis</li>
                  <li>• Structured report generation</li>
                  <li>• Source citation and verification</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Research Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="space-y-6">
                {/* Research Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Research Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the topic you want to research"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Be specific and clear about what you want to research
                  </p>
                </div>

                {/* Research Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Context
                    <span className="text-gray-400 font-normal"> (Optional)</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide any additional context, specific angles, or focus areas for the research"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    rows={4}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Help guide the research direction with specific requirements or questions
                  </p>
                </div>

                {/* Research Depth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Research Depth
                  </label>
                  <select
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="small">Quick Overview - Essential information and key points</option>
                    <option value="medium">Detailed Analysis - Comprehensive coverage with examples</option>
                    <option value="deep">In-depth Research - Thorough investigation with multiple perspectives</option>
                  </select>
                  <div className="mt-2">
                    {depth === "small" && (
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        Estimated reading time: 2-3 minutes | Quick overview of key information
                      </p>
                    )}
                    {depth === "medium" && (
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        Estimated reading time: 5-7 minutes | Detailed analysis with examples
                      </p>
                    )}
                    {depth === "deep" && (
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        Estimated reading time: 10-15 minutes | Comprehensive in-depth research
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading || !title.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Researching...</span>
                      </div>
                    ) : (
                      'Start Deep Research'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-red-800 font-medium">Research Error</p>
            </div>
            <p className="text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Results Section */}
      {result && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Result Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{result.title}</h2>
                  <p className="text-gray-600 mt-1">Research completed successfully</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Complete
                  </span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-8 py-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Research Content
                </h3>
                <div className="text-gray-700 space-y-4">
                  {formatContent(result.content)}
                </div>
              </div>
            </div>

            {/* Sources Section */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sources and References</h3>
              <div className="grid gap-3">
                {result.sources.map((source, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <a 
                          href={source.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
                        >
                          {source.title}
                        </a>
                        <p className="text-gray-500 text-sm mt-1 break-all">{source.url}</p>
                      </div>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Research generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </p>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => window.print()}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                  >
                    Print Report
                  </button>
                  <button 
                    onClick={() => setResult(null)}
                    className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                  >
                    New Research
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeepResearchAgent;
