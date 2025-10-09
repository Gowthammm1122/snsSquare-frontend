import { useState, useEffect } from 'react';

const AutomatedLinter = () => {
  const [activeTab, setActiveTab] = useState('code');
  const [code, setCode] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [language, setLanguage] = useState('python');
  const [selectedRules, setSelectedRules] = useState([]);
  const [includeFixSuggestions, setIncludeFixSuggestions] = useState(true);
  const [detailedReport, setDetailedReport] = useState(true);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [supportedRules, setSupportedRules] = useState(null);

  const fetchSupportedRules = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/automated-linter/supported-rules');
      if (response.ok) {
        const data = await response.json();
        setSupportedRules(data);
      }
    } catch (error) {
      console.error('Failed to fetch supported rules:', error);
    }
  };

  // Fetch supported rules on component mount
  useEffect(() => {
    fetchSupportedRules();
  }, []);

  const handleLint = async () => {
    if (activeTab === 'code' && !code.trim()) {
      alert('Please enter some code to lint');
      return;
    }

    if (activeTab === 'file' && !selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      let response;

      if (activeTab === 'code') {
        response = await fetch('http://127.0.0.1:8000/automated-linter/lint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: code,
            language: language,
            rules: selectedRules.length > 0 ? selectedRules : null,
            fix_suggestions: includeFixSuggestions,
            detailed_report: detailedReport,
          }),
        });
      } else {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('language', language);
        formData.append('rules', JSON.stringify(selectedRules.length > 0 ? selectedRules : null));
        formData.append('fix_suggestions', includeFixSuggestions.toString());
        formData.append('detailed_report', detailedReport.toString());

        response = await fetch('http://127.0.0.1:8000/automated-linter/upload-lint', {
          method: 'POST',
          body: formData,
        });
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        language: language,
        total_issues: 0,
        issues: [],
        severity_breakdown: { error: 0, warning: 0, info: 0 },
        code_quality_score: 0,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedExtensions = ['.py', '.js', '.ts', '.java', '.cpp', '.c', '.php', '.rb', '.go'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        alert(`Unsupported file type. Please upload one of: ${allowedExtensions.join(', ')}`);
        return;
      }

      setSelectedFile(file);
    }
  };

  const toggleRule = (rule) => {
    setSelectedRules(prev =>
      prev.includes(rule)
        ? prev.filter(r => r !== rule)
        : [...prev, rule]
    );
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'error':
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getFixSuggestions = (issue) => {
    const suggestions = [];

    // Based on issue type
    switch (issue.type?.toLowerCase()) {
      case 'syntax_error':
        suggestions.push("Check for missing brackets, parentheses, or semicolons");
        suggestions.push("Verify variable names are spelled correctly");
        suggestions.push("Ensure proper indentation and code structure");
        break;

      case 'unused_import':
        suggestions.push("Remove the unused import statement");
        suggestions.push("If the import is needed later, consider adding a comment explaining its purpose");
        break;

      case 'style':
        if (issue.rule?.includes('line-length')) {
          suggestions.push("Break long lines into multiple lines for better readability");
          suggestions.push("Use line continuation characters if necessary");
          suggestions.push("Consider extracting complex expressions into variables");
        }
        break;

      case 'missing_docstring':
        suggestions.push("Add a docstring to document the function's purpose, parameters, and return value");
        suggestions.push('Use triple quotes: """Function description"""');
        break;

      case 'debug_code':
        suggestions.push("Remove console.log statements before production deployment");
        suggestions.push("Use proper logging frameworks instead");
        break;

      case 'security':
        suggestions.push("Review input validation and sanitization");
        suggestions.push("Consider using parameterized queries for database operations");
        suggestions.push("Implement proper authentication and authorization");
        break;

      case 'performance':
        suggestions.push("Consider optimizing loops and data structures");
        suggestions.push("Use more efficient algorithms when possible");
        suggestions.push("Profile the code to identify bottlenecks");
        break;

      default:
        suggestions.push("Review the code around the highlighted line");
        suggestions.push("Check for common programming errors");
        suggestions.push("Consider consulting language-specific best practices");
    }

    // Add rule-specific suggestions
    if (issue.rule?.includes('syntax')) {
      suggestions.push("Run the code to see the exact error message");
    }

    return suggestions;
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto pt-44">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Automated Linter
          </h1>
          <p className="text-gray-600">
            Analyze your code for quality issues, style violations, and potential improvements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Code Analysis Input</h2>

            {/* Tab Selection */}
            <div className="flex mb-4 border-b">
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-2 font-medium ${
                  activeTab === 'code'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Code Input
              </button>
              <button
                onClick={() => setActiveTab('file')}
                className={`px-4 py-2 font-medium ml-4 ${
                  activeTab === 'file'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                File Upload
              </button>
            </div>

            {/* Input Content */}
            {activeTab === 'code' ? (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source Code
                </label>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste your source code here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-64 font-mono text-sm"
                />
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Source File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".py,.js,.ts,.java,.cpp,.c,.php,.rb,.go"
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-gray-600 mb-2">
                      {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Supported: .py, .js, .ts, .java, .cpp, .c, .php, .rb, .go
                    </p>
                  </label>
                </div>
              </div>
            )}

            {/* Configuration Options */}
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Configuration</h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="java">Java</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Analysis Depth
                  </label>
                  <select
                    value={detailedReport ? 'detailed' : 'basic'}
                    onChange={(e) => setDetailedReport(e.target.value === 'detailed')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="basic">Basic Analysis</option>
                    <option value="detailed">Detailed Analysis</option>
                  </select>
                </div>
              </div>

              {/* Rules Selection */}
              {supportedRules && supportedRules[language] && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Linting Rules (Optional)
                  </label>
                  <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
                    {supportedRules[language].map((rule) => (
                      <label key={rule} className="flex items-center text-sm mb-1">
                        <input
                          type="checkbox"
                          checked={selectedRules.includes(rule)}
                          onChange={() => toggleRule(rule)}
                          className="mr-2"
                        />
                        {rule.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeFixSuggestions}
                    onChange={(e) => setIncludeFixSuggestions(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Include fix suggestions</span>
                </label>
              </div>
            </div>

            {/* Lint Button */}
            <button
              onClick={handleLint}
              disabled={loading}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              )}
              {loading ? 'Analyzing Code...' : 'Analyze Code'}
            </button>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Analysis Results</h2>

            {!result ? (
              <div className="text-center text-gray-500 py-12">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <p>Enter code and click "Analyze Code" to see results</p>
              </div>
            ) : result.success ? (
              <div className="space-y-4">
                {/* Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-blue-800">Analysis Summary</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div className="bg-white rounded-md p-4 border border-blue-100">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{result.total_issues}</div>
                      <div className="text-sm text-gray-600">Total Issues Found</div>
                    </div>
                    <div className="bg-white rounded-md p-4 border border-blue-100">
                      <div className="text-2xl font-bold text-green-600 mb-2">{result.code_quality_score?.toFixed(1) || 'N/A'}</div>
                      <div className="text-sm text-gray-600 mb-2">Quality Score /10</div>
                      {result.code_quality_score && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${result.code_quality_score * 10}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-md p-4 border border-blue-100">
                    <h4 className="font-medium text-gray-800 mb-3">Issues Breakdown:</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center justify-center p-2 bg-red-50 rounded-md">
                        <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <div className="font-semibold text-red-600">{result.severity_breakdown?.error || 0}</div>
                          <div className="text-xs text-gray-600">Errors</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center p-2 bg-yellow-50 rounded-md">
                        <svg className="w-4 h-4 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <div>
                          <div className="font-semibold text-yellow-600">{result.severity_breakdown?.warning || 0}</div>
                          <div className="text-xs text-gray-600">Warnings</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center p-2 bg-blue-50 rounded-md">
                        <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <div className="font-semibold text-blue-600">{result.severity_breakdown?.info || 0}</div>
                          <div className="text-xs text-gray-600">Info</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issues List */}
                {result.issues?.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-100 rounded-full p-2 mr-3">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">Detailed Issues</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto space-y-3">
                      {result.issues.map((issue, index) => (
                        <div
                          key={index}
                          className={`border-l-4 rounded-r-md p-4 shadow-sm ${getSeverityColor(issue.severity)}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {getSeverityIcon(issue.severity)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold text-sm text-gray-800 capitalize">
                                  {issue.type.replace('-', ' ')}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    issue.severity === 'error' ? 'bg-red-100 text-red-700' :
                                    issue.severity === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-blue-100 text-blue-700'
                                  }`}>
                                    {issue.severity}
                                  </span>
                                  {issue.line > 0 && (
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                      Line {issue.line}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 mb-3 leading-relaxed">{issue.message}</p>

                              {/* Fix Suggestions */}
                              {(() => {
                                const suggestions = getFixSuggestions(issue);
                                return suggestions.length > 0 ? (
                                  <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-md">
                                    <div className="flex items-center mb-2">
                                      <div className="bg-green-100 rounded-full p-1 mr-2">
                                        <span className="text-green-600 text-xs font-bold">💡</span>
                                      </div>
                                      <span className="text-sm font-medium text-green-800">How to fix:</span>
                                    </div>
                                    <ul className="text-sm text-green-700 space-y-1">
                                      {suggestions.slice(0, 3).map((suggestion, idx) => (
                                        <li key={idx} className="flex items-start">
                                          <span className="text-green-500 mr-2">•</span>
                                          <span>{suggestion}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ) : null;
                              })()}

                              {/* Code Snippet */}
                              {issue.codeSnippet && (
                                <div className="mb-3">
                                  <div className="bg-gray-900 text-gray-100 rounded-md p-3 font-mono text-xs overflow-x-auto border border-gray-700">
                                    <div className="text-gray-400 text-xs mb-2">Code Context:</div>
                                    <pre className="whitespace-pre-wrap">
                                      {issue.codeSnippet.split('\n').map((line, idx) => (
                                        <div
                                          key={idx}
                                          className={`${
                                            line.includes('→')
                                              ? 'bg-red-900 bg-opacity-50 text-red-200 font-bold border-l-2 border-red-500 pl-2'
                                              : 'text-gray-300'
                                          }`}
                                        >
                                          {line}
                                        </div>
                                      ))}
                                    </pre>
                                  </div>
                                  {issue.column && issue.column > 0 && (
                                    <div className="text-xs text-red-400 mt-1 flex items-center">
                                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                      Error at column {issue.column}
                                    </div>
                                  )}
                                </div>
                              )}

                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500 font-medium">Rule: {issue.rule}</span>
                                {issue.rule.includes('llm') || issue.rule.includes('ai') ? (
                                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-medium">
                                    AI Detected
                                  </span>
                                ) : (
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                                    Static Analysis
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed Analysis */}
                {result.summary && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 rounded-full p-2 mr-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-blue-800">AI Analysis Summary</h3>
                    </div>
                    <p className="text-blue-700 text-sm mb-4 leading-relaxed">{result.summary}</p>

                    {/* Analysis Breakdown */}
                    {(result.llm_error_count || result.llm_warning_count || result.llm_info_count) && (
                      <div className="bg-white rounded-md p-3 mb-4 border border-blue-100">
                        <h4 className="font-medium text-blue-800 mb-2 text-sm">Analysis Breakdown:</h4>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          {result.llm_error_count && result.llm_error_count > 0 && (
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-gray-700">{result.llm_error_count} AI-detected errors</span>
                            </div>
                          )}
                          {result.llm_warning_count && result.llm_warning_count > 0 && (
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                              </svg>
                              <span className="text-gray-700">{result.llm_warning_count} AI-detected warnings</span>
                            </div>
                          )}
                          {result.llm_info_count && result.llm_info_count > 0 && (
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-gray-700">{result.llm_info_count} AI suggestions</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {result.recommendations && result.recommendations.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                          <div className="bg-green-100 rounded-full p-1 mr-2">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          </div>
                          Key Recommendations:
                        </h4>
                        <div className="space-y-2">
                          {result.recommendations.map((rec, index) => (
                            <div key={index} className="bg-white border border-green-100 rounded-md p-3 shadow-sm">
                              <div className="flex items-start">
                                <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                                  <span className="text-green-600 font-semibold text-xs">{index + 1}</span>
                                </div>
                                <p className="text-green-700 text-sm leading-relaxed">{rec}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {result.critical_issues && result.critical_issues.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-red-800 mb-3 flex items-center">
                          <div className="bg-red-100 rounded-full p-1 mr-2">
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                          </div>
                          Critical Issues:
                        </h4>
                        <div className="space-y-2">
                          {result.critical_issues.map((issue, index) => (
                            <div key={index} className="bg-red-50 border border-red-200 rounded-md p-3">
                              <div className="flex items-start">
                                <svg className="w-4 h-4 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-700 text-sm leading-relaxed">{issue}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Refactoring Suggestions */}
                {result.refactoring_suggestions && result.refactoring_suggestions.length > 0 && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-100 rounded-full p-2 mr-3">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-purple-800">Refactoring Suggestions</h3>
                    </div>
                    <div className="space-y-3">
                      {result.refactoring_suggestions.map((suggestion, index) => (
                        <div key={index} className="bg-white border border-purple-100 rounded-md p-4 shadow-sm">
                          <div className="flex items-start">
                            <div className="bg-purple-100 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                              <span className="text-purple-600 font-semibold text-xs">{index + 1}</span>
                            </div>
                            <p className="text-purple-700 text-sm leading-relaxed">{suggestion}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Best Practices */}
                {result.best_practices && result.best_practices.length > 0 && (
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="bg-emerald-100 rounded-full p-2 mr-3">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-emerald-800">Best Practices</h3>
                    </div>
                    <div className="space-y-3">
                      {result.best_practices.map((practice, index) => (
                        <div key={index} className="bg-white border border-emerald-100 rounded-md p-4 shadow-sm">
                          <div className="flex items-start">
                            <div className="bg-emerald-100 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                              <span className="text-emerald-600 font-semibold text-xs">✓</span>
                            </div>
                            <p className="text-emerald-700 text-sm leading-relaxed">{practice}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-600 font-medium mb-2">Analysis Failed</p>
                <p className="text-gray-600 text-sm">{result.error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomatedLinter;