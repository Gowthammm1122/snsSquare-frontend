import { useState } from "react";
import axios from "axios";

function InputSourceCard() {
  const [textInput, setTextInput] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [minClusterSize, setMinClusterSize] = useState(3);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.6);
  const [enableRefinement, setEnableRefinement] = useState(true);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (selectedFile.size > maxSize) {
        setError('File size exceeds 10MB limit. Please choose a smaller file.');
        return;
      }
      
      setFile(selectedFile);
      setTextInput(""); // Clear text input when file is selected
      setError(null);
    }
  };

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
    if (e.target.value.trim()) {
      setFile(null); // Clear file when text is entered
    }
  };

  const resetForm = () => {
    setTextInput("");
    setFile(null);
    setResult(null);
    setError(null);
    setMinClusterSize(3);
    setConfidenceThreshold(0.6);
    setEnableRefinement(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!textInput.trim() && !file) {
      setError('Please provide either text input or select a file');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('action', 'generate');
      formData.append('min_cluster_size', minClusterSize.toString());
      formData.append('confidence_threshold', confidenceThreshold.toString());
      formData.append('enable_refinement', enableRefinement.toString());
      
      if (textInput.trim()) {
        formData.append('content', textInput);
      } else if (file) {
        formData.append('file', file);
      }

      const response = await axios.post('http://127.0.0.1:8000/faq_agent/faq', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 120000, // 2 minutes timeout for large files
      });

      setResult(response.data);
    } catch (err) {
      console.error('FAQ generation error:', err);
      setError(err.response?.data?.detail || err.message || 'An error occurred while generating FAQs');
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
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
      >
        {/* Active Agent Badge */}
        <span className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full mb-6">
          Active Agent
        </span>

        {/* Title */}
        <h2 className="text-2xl font-bold text-blue-700 mb-6">FAQ Generator</h2>

        {/* Text Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text Input
          </label>
          <textarea
            value={textInput}
            onChange={handleTextChange}
            placeholder="Paste your text here (support tickets, documentation, etc.)"
            rows={5}
            className="w-full px-4 py-3 border rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            File Upload
          </label>
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
          >
            <svg
              className="w-10 h-10 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="text-blue-600 font-medium">Choose a file</span>
            <span className="text-sm text-gray-500">
              or drag and drop (TXT, PDF, DOCX, CSV, JSON – max 10MB)
            </span>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".txt,.pdf,.docx,.csv,.json"
            />
          </label>
          {file && (
            <p className="mt-2 text-sm text-gray-600">
              Selected file: <span className="font-semibold">{file.name}</span> ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        {/* Advanced Settings */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Advanced Settings (Optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Min Cluster Size
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={minClusterSize}
                onChange={(e) => setMinClusterSize(parseInt(e.target.value) || 3)}
                className="w-full px-3 py-2 border rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Confidence Threshold
              </label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value) || 0.6)}
                className="w-full px-3 py-2 border rounded text-sm"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={enableRefinement}
                  onChange={(e) => setEnableRefinement(e.target.checked)}
                  className="text-blue-600"
                />
                <span className="text-xs font-medium text-gray-600">Enable Answer Refinement</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition disabled:cursor-not-allowed"
          >
            {loading ? 'Generating FAQs...' : 'Generate FAQs'}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
          >
            Reset
          </button>
        </div>
      </form>
      </main>

      {/* Result Section */}
      {loading && <p className="text-center mt-4">Generating FAQs...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}
      {result && (
        <div className="mt-8 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Generated FAQs</h3>
          
          {result.status === 'error' && result.message && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">Error: {result.message}</p>
            </div>
          )}
          
          {result.summary && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Processing Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium">Documents:</span> {result.summary.total_documents}
                </div>
                <div>
                  <span className="font-medium">Segments:</span> {result.summary.total_segments}
                </div>
                <div>
                  <span className="font-medium">Clusters:</span> {result.summary.clusters_formed}
                </div>
                <div>
                  <span className="font-medium">FAQs:</span> {result.summary.faqs_generated}
                </div>
                <div className="col-span-2 md:col-span-4">
                  <span className="font-medium">Processing Time:</span> {result.summary.processing_time_seconds?.toFixed(2)}s
                </div>
                {result.summary.warnings && result.summary.warnings.length > 0 && (
                  <div className="col-span-2 md:col-span-4">
                    <span className="font-medium text-yellow-700">Warnings:</span>
                    <ul className="list-disc list-inside text-yellow-700 mt-1">
                      {result.summary.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {result.faqs && result.faqs.length > 0 ? (
            <div className="space-y-4">
              {result.faqs.map((faq, index) => (
                <div key={faq.id || index} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <h4 className="font-semibold text-blue-700 mb-2">Q: {faq.question}</h4>
                  <p className="text-gray-700 mb-2">A: {faq.answer}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>Confidence: {(faq.confidence * 100)?.toFixed(1)}%</span>
                    {faq.cluster_id && <span>Cluster: {faq.cluster_id}</span>}
                    {faq.source_references && faq.source_references.length > 0 && (
                      <span>Sources: {faq.source_references.join(', ')}</span>
                    )}
                  </div>
                  {faq.metadata && Object.keys(faq.metadata).length > 0 && (
                    <div className="mt-2 text-xs text-gray-400">
                      Metadata: {JSON.stringify(faq.metadata, null, 2)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : result.status === 'success' && (
            <div className="text-center py-8 text-gray-500">
              <p>No FAQs were generated from the provided content.</p>
              <p className="text-sm mt-2">Try providing more detailed content or check the processing summary above.</p>
            </div>
          )}
          
          {result.message && result.status === 'success' && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">{result.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default InputSourceCard;