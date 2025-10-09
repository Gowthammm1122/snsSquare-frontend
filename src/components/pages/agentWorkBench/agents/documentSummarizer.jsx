import { useState } from "react";

function DocumentSummarizerAgent() {
  const [file, setFile] = useState(null);
  const [summaryType, setSummaryType] = useState("executive");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError("");
    }
  };

  const runSummarizer = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("summary_type", summaryType);

      const response = await fetch("http://127.0.0.1:8000/document_summarizer/summarize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to summarize document");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getSummaryTypeLabel = (type) => {
    switch (type) {
      case "executive": return "Executive Summary (2-3 sentences)";
      case "abstract": return "Abstract (1-2 paragraphs)";
      case "bullet_points": return "Key Takeaways (5-7 bullets)";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Document Summarizer Agent</h1>
          <p className="text-gray-600">
            Upload documents and get AI-powered Summaries. Supports PDF, DOCX, and TXT files.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Document (PDF, DOCX, TXT)
            </label>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {file && (
              <p className="mt-2 text-sm text-green-600">
                ✓ Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          {/* Summary Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Summary Type
            </label>
            <select
              value={summaryType}
              onChange={(e) => setSummaryType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="executive">Executive Summary</option>
              <option value="abstract">Abstract</option>
              <option value="bullet_points">Key Takeaways</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              {getSummaryTypeLabel(summaryType)}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={runSummarizer}
            disabled={!file || loading}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? "Processing..." : "Generate Summary"}
          </button>

          {/* Error */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Summary Result</h3>
                <div className="flex gap-3 text-sm text-gray-600">
                  <span>{result.word_count} words</span>
                  <span>{result.processing_time.toFixed(2)}s</span>
                  {result.cached && <span className="text-green-600">Cached</span>}
                </div>
              </div>

              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {result.summary_type.replace("_", " ").toUpperCase()}
                </span>
                <span className="ml-2 text-sm text-gray-600">
                  from {result.filename}
                </span>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {result.content}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DocumentSummarizerAgent;
