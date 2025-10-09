import React, { useState } from "react";

const IdeaRefinementUI = () => {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [refinedIdea, setRefinedIdea] = useState(null);
  const [error, setError] = useState(null);

  const handleRefine = async () => {
    if (!idea.trim()) return;

    setLoading(true);
    setError(null);
    setRefinedIdea(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/idea-refinement/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      if (!response.ok) {
        throw new Error("Failed to refine idea. Try again.");
      }

      const data = await response.json();
      setRefinedIdea(data.refined_idea);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-6 pt-44">
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-xl w-full border border-blue-100 ">
        <h1 className="text-3xl font-extrabold mb-6 text-blue-700 text-center">
          💡 Idea Refinement Agent
        </h1>

        <label className="block mb-2 text-gray-700 font-medium" htmlFor="idea-input">
          Enter your raw idea:
        </label>
        <textarea
          id="idea-input"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Type your idea here..."
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300 mb-4 resize-none text-lg"
          rows={4}
        />

        <button
          onClick={handleRefine}
          disabled={loading || !idea.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 text-lg flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Refining...
            </>
          ) : (
            "Refine Idea"
          )}
        </button>

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center font-medium">
            {error}
          </div>
        )}

        {refinedIdea && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-inner">
            <h2 className="font-bold text-blue-800 mb-3 text-xl flex items-center">
              <span className="mr-2">✨</span> Refined Idea
            </h2>
            <pre className="text-gray-900 whitespace-pre-wrap text-lg font-mono">{refinedIdea}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaRefinementUI;