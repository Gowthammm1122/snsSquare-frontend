import { useState } from "react";

function CsvExcelConverter() {
  const [file, setFile] = useState(null);
  const [targetFormat, setTargetFormat] = useState("excel");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleConvert = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("target_format", targetFormat);
      const response = await fetch(
        "http://127.0.0.1:8000/csv_excel_converter/convert",
        { method: "POST", body: formData }
      );
      if (!response.ok) throw new Error(`Conversion failed: ${response.statusText}`);
      const blob = await response.blob();
      const filename =
        file.name.split(".")[0] + (targetFormat === "excel" ? ".xlsx" : ".csv");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-44 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
          CSV ↔ Excel Converter
          <span className="block text-sm font-normal text-gray-500 mt-1">
            Convert .csv and .xlsx files with one click
          </span>
        </h1>
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
            {error}
          </div>
        )}
        <div className="bg-white shadow-xl rounded-xl p-6 border border-blue-100">
          <div className="mb-6">
            <label
              htmlFor="file-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select file
            </label>
            <div className="flex items-center gap-3">
              <input
                id="file-input"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-200 rounded-md p-1"
                aria-label="Upload CSV or Excel file"
              />
            </div>
            {file && (
              <p className="mt-2 text-sm text-gray-600">Selected: {file.name}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">Supported: .csv, .xlsx, .xls</p>
          </div>
          <div className="mb-6">
            <p className="block text-sm font-medium text-gray-700 mb-2">Target format</p>
            <div className="inline-flex rounded-md shadow-sm border border-gray-200 overflow-hidden" role="group">
              <button
                type="button"
                onClick={() => setTargetFormat("excel")}
                className={`px-4 py-2 text-sm font-medium ${
                  targetFormat === "excel"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                aria-pressed={targetFormat === "excel"}
              >
                Convert to Excel (.xlsx)
              </button>
              <button
                type="button"
                onClick={() => setTargetFormat("csv")}
                className={`px-4 py-2 text-sm font-medium border-l border-gray-200 ${
                  targetFormat === "csv"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                aria-pressed={targetFormat === "csv"}
              >
                Convert to CSV (.csv)
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Your file is processed locally by the server and downloaded to your device.
            </p>
            <button
              onClick={handleConvert}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
              {loading && (
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {loading ? "Converting..." : "Convert & Download"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CsvExcelConverter;