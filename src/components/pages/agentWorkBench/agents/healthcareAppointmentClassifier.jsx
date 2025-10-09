import React, { useState } from "react";
import { Upload, FileText, Clock, User, AlertCircle, CheckCircle } from "lucide-react";

const API_BASE = "http://127.0.0.1:8000/healthcare_text_classifier_agent";

export default function HealthcareAppointmentClassifier() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // 🔧 Parser for backend response
  function parseResults(rawData) {
    return (Array.isArray(rawData) ? rawData : []).map((item, idx) => {
      let parsed = {};
      try {
        // Remove ```json ... ``` wrapper
        const clean = item.classification.replace(/```json|```/g, "").trim();
        parsed = JSON.parse(clean);
      } catch (e) {
        console.error("Failed to parse classification JSON:", e);
      }
      return {
        request_id: idx + 1,
        request_text: item.message,
        detected_type: parsed.category || "Unknown",
        urgency_level: parsed.urgency || "N/A",
        assigned_department: parsed.assigned_department || "N/A",
        confidence: parsed.confidence || 70, // fallback
        status: "Pending",
        keywords: parsed.keywords || [],
      };
    });
  }

  // ✅ Manual classify
  async function classifyManual() {
    setLoading(true);
    try {
      const resp = await fetch(`${API_BASE}/classify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [text] }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.detail || "Classification failed");
      setResults(parseResults(data));
    } catch (e) {
      alert(e.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  // ✅ File classify
  async function classifyFile(file) {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const resp = await fetch(`${API_BASE}/classify_file`, {
        method: "POST",
        body: form,
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.detail || "File classification failed");
      setResults(parseResults(data));
    } catch (e) {
      alert(e.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case "high":
      case "urgent":
      case "emergency":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
      case "routine":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    if (
      status?.toLowerCase().includes("completed") ||
      status?.toLowerCase().includes("processed")
    ) {
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
    return <Clock className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Healthcare Appointment Classifier
          </h1>
          <p className="text-gray-600 text-lg">
            Intelligent classification of appointment requests using AI
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Text Input */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Manual Classification
                </h2>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Appointment Request Text
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                  placeholder={`Enter appointment request text here...\n\nExamples:\n• "Need urgent blood test for diabetes screening"\n• "Cardiologist consultation for chest pain"\n• "Routine dental cleaning appointment"`}
                />
              </div>

              <button
                onClick={classifyManual}
                disabled={loading || !text.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl px-6 py-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Classifying...
                  </span>
                ) : (
                  "Classify Request"
                )}
              </button>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Bulk Classification
                </h2>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 hover:bg-purple-50 transition-all duration-200">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Upload a file with multiple requests
                </p>

                <label className="inline-flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-xl px-6 py-3 cursor-pointer hover:bg-gray-50 hover:border-purple-400 transition-all duration-200 shadow-sm hover:shadow-md">
                  <Upload className="w-4 h-4" />
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    accept=".csv,.xlsx,.xls,.json"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) classifyFile(f);
                    }}
                  />
                </label>

                <p className="text-xs text-gray-500 mt-3">
                  Supports CSV, XLSX, XLS, and JSON files
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Classification Results
            </h2>
            {results.length > 0 && (
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {results.length} {results.length === 1 ? "result" : "results"}
              </span>
            )}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No results yet</p>
              <p className="text-gray-400 text-sm">
                Enter text or upload a file to get started
              </p>
            </div>
          ) : (
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-medium text-gray-700">ID</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Type</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Urgency</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Department</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Confidence</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Keywords</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-700">Request Text</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, index) => (
                      <tr
                        key={r.request_id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-25"
                        }`}
                      >
                        <td className="py-4 px-4 font-mono text-xs">{r.request_id}</td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full border border-blue-200">
                            <User className="w-3 h-3" />
                            {r.detected_type}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border ${getUrgencyColor(
                              r.urgency_level
                            )}`}
                          >
                            <AlertCircle className="w-3 h-3" />
                            {r.urgency_level}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-medium text-gray-700">{r.assigned_department}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-12 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${r.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium">{r.confidence}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            {getStatusIcon(r.status)}
                            <span className="text-xs">{r.status}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {Array.isArray(r.keywords) &&
                              r.keywords.slice(0, 3).map((keyword, i) => (
                                <span
                                  key={i}
                                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded border"
                                >
                                  {keyword}
                                </span>
                              ))}
                            {Array.isArray(r.keywords) && r.keywords.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{r.keywords.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 max-w-xs">
                          <div className="text-xs text-gray-600 leading-relaxed break-words">
                            {r.request_text.length > 100
                              ? `${r.request_text.substring(0, 100)}...`
                              : r.request_text}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
