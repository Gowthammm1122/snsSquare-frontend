import { useState } from "react";

function TestCaseGenerationAgent() {
	const [userInput, setUserInput] = useState("");
	const [output, setOutput] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const cleanOutput = (raw) => {
		// Remove markdown code blocks at the beginning and end
		let cleaned = raw.replace(/^```markdown\n/, "").replace(/```$/, "");
		// Remove all backslashes
		cleaned = cleaned.replace(/\\/g, "");
		return cleaned;
	};

	const runAgent = async () => {
		setLoading(true);
		setError("");
		setOutput("");
		
		const trimmedInput = userInput.trim();
		if (
			trimmedInput === "" ||
			trimmedInput === "''" ||
			/^\.*$/.test(trimmedInput)
		) {
			setLoading(false);
			setError("Please provide requirements or user stories.");
			return;
		}

		try {
			const formData = new FormData();
			formData.append("user_input", userInput);
			
			const response = await fetch("http://127.0.0.1:8000/test_case_generation_agent/run", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error(`Server error: ${response.status}`);
			}

			const data = await response.json();
			let rawOutput = "";

			if (data.error) {
				setError(data.error);
			} else if (data.test_cases) {
				rawOutput = typeof data.test_cases === "string" ? data.test_cases : JSON.stringify(data.test_cases, null, 2);
			} else if (data.output) {
				rawOutput = typeof data.output === "string" ? data.output : JSON.stringify(data.output, null, 2);
			} else {
				rawOutput = JSON.stringify(data, null, 2);
			}

			setOutput(cleanOutput(rawOutput));
		} catch (err) {
			setError(err.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	const downloadOutput = (format) => {
		if (!output) return;
		
		const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `test_cases.${format}`;
		link.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-100 to-blue-50 p-8 pt-44">
			<div className="w-full max-w-3xl">
				<div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
					<div className="flex items-center mb-6 gap-3">
						<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
							<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">
							Test Case Generation Agent
						</h1>
					</div>

					<div className="mb-6">
						<label htmlFor="userInput" className="block text-sm font-semibold text-gray-700 mb-2">
							Paste Requirements or User Stories
						</label>
						<textarea
							id="userInput"
							value={userInput}
							onChange={(e) => setUserInput(e.target.value)}
							placeholder="Paste requirements or user stories here..."
							className="w-full h-40 p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none text-base bg-gray-50"
						/>
					</div>

					<div className="flex flex-wrap gap-3 mb-6 justify-end">
						<button
							onClick={runAgent}
							disabled={loading}
							className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200 flex items-center gap-2"
						>
							{loading ? (
								<>
									<svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
									</svg>
									Generating...
								</>
							) : (
								<>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
									</svg>
									Generate
								</>
							)}
						</button>
					</div>

					{error && (
						<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
							<div className="flex items-center gap-2">
								<svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<p className="text-red-700 font-medium">{error}</p>
							</div>
						</div>
					)}

					{output && (
						<div className="w-full p-6 border rounded-xl shadow-sm bg-gray-50">
							<div className="flex items-center gap-2 mb-4">
								<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<h2 className="text-lg font-semibold text-blue-700">Generated Test Cases</h2>
							</div>
							
							<div className="bg-white border rounded-lg p-4 mb-4 max-h-96 overflow-y-auto">
								<pre className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">{output}</pre>
							</div>
							
							<div className="flex gap-3 justify-end">
								<button
									onClick={() => downloadOutput("md")}
									className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-xl shadow hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
								>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
									</svg>
									Download as MD
								</button>
								<button
									onClick={() => downloadOutput("txt")}
									className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-xl shadow hover:bg-yellow-600 transition-colors duration-200 flex items-center gap-2"
								>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
									</svg>
									Download as TXT
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default TestCaseGenerationAgent;