import React, { useState } from 'react';

// Inline LoadingSpinner Component
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Main Spinner */}
      <div className="relative mb-8">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="w-full max-w-md">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">
            Creating Realistic Images...
          </h3>
          
          <div className="space-y-3">
            {/* Step 1 */}
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg animate-pulse">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <div className="flex-1">
                <div className="text-sm font-medium text-blue-900">Enhancing your prompt</div>
                <div className="text-xs text-blue-700">AI is optimizing for photorealistic quality</div>
              </div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg animate-pulse" style={{animationDelay: '0.5s'}}>
              <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
              <div className="flex-1">
                <div className="text-sm font-medium text-purple-900">Analyzing realistic style</div>
                <div className="text-xs text-purple-700">Determining optimal photographic approach</div>
              </div>
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg animate-pulse" style={{animationDelay: '1s'}}>
              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex-1">
                <div className="text-sm font-medium text-green-900">Generating realistic images</div>
                <div className="text-xs text-green-700">Creating high-quality photorealistic variations</div>
              </div>
              <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 h-full rounded-full animate-pulse transform origin-left">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30" style={{
              animation: 'slide 2s ease-in-out infinite'
            }}></div>
          </div>
        </div>

        {/* Estimated Time */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Estimated time: 15-45 seconds for realistic quality
        </p>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

// Main ImageGenerator Component
export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [imageType, setImageType] = useState('avatar');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [currentView, setCurrentView] = useState('generator');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style,
          type: imageType,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        const images = result.images.map((url, index) => ({
          url,
          id: `img-${Date.now()}-${index}`,
        }));
        
        setGeneratedImages(images);
        setEnhancedPrompt(result.enhanced_prompt);
        setSuggestions(result.suggestions);
      } else {
        setError(result.error || 'Failed to generate images');
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError('Failed to connect to the image generation service');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (imageUrl) => {
    try {
      if (imageUrl.startsWith('data:image')) {
        // Handle base64 data URLs from Stable Diffusion
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `ai-generated-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Handle regular URLs (placeholders)
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `generated-image-${Date.now()}.png`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Download error:', error);
      // Fallback: open in new tab
      window.open(imageUrl, '_blank');
    }
  };

  const handleImagePreview = (image) => {
    setSelectedImage(image);
    setCurrentView('preview');
  };

  const handleBackToGenerator = () => {
    setCurrentView('generator');
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 pt-44">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            AI Image Generation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create professional avatars, illustrations, and visuals
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Navigation Header */}
          {currentView === 'preview' && (
            <div className="mb-6">
              <button
                onClick={handleBackToGenerator}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Generator
              </button>
            </div>
          )}

          {/* Preview View */}
          {currentView === 'preview' && selectedImage && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Image Preview</h2>
                <p className="text-gray-600">Full resolution view</p>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="relative max-w-2xl">
                  <img
                    src={selectedImage.url}
                    alt="Generated image preview"
                    className="w-full rounded-lg shadow-lg"
                  />
                  
                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(selectedImage.url)}
                    className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download
                  </button>
                </div>
              </div>

              {/* Enhanced Prompt in Preview */}
              {enhancedPrompt && (
                <div className="bg-blue-50 rounded-xl p-4 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Enhanced Prompt Used:</h4>
                  <p className="text-blue-800 text-sm">{enhancedPrompt}</p>
                </div>
              )}

              {/* Back Button */}
              <div className="text-center">
                <button
                  onClick={handleBackToGenerator}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 mx-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to All Images
                </button>
              </div>
            </div>
          )}

          {/* Generator View */}
          {currentView === 'generator' && (
            <>
              {/* Input Section */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="space-y-6">
                  {/* Main Prompt Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Describe your image
                    </label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g., Professional headshot of a business person, Beautiful portrait of a woman with natural lighting..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24"
                    />
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Image Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <svg className="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Image Type
                      </label>
                      <select
                        value={imageType}
                        onChange={(e) => setImageType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="avatar">Avatar/Profile</option>
                        <option value="illustration">Illustration</option>
                        <option value="photo">Photo</option>
                      </select>
                    </div>

                    {/* Style */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <svg className="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                        </svg>
                        Style
                      </label>
                      <select
                        value={style}
                        onChange={(e) => setStyle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="realistic">Realistic</option>
                        <option value="professional">Professional</option>
                        <option value="artistic">Artistic</option>
                        <option value="portrait">Portrait</option>
                      </select>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Generating Realistic Images...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Generate Realistic Images
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <LoadingSpinner />
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
                  <div className="flex items-center gap-2 text-red-800">
                    <span className="font-medium">Error:</span>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Results Section */}
              {generatedImages.length > 0 && (
                <div className="space-y-8">
                  {/* Enhanced Prompt */}
                  {enhancedPrompt && (
                    <div className="bg-blue-50 rounded-2xl p-6">
                      <h3 className="font-semibold text-blue-900 mb-2">Enhanced Prompt:</h3>
                      <p className="text-blue-800">{enhancedPrompt}</p>
                    </div>
                  )}

                  {/* Generated Images */}
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Generated Realistic Images
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {generatedImages.map((image) => (
                        <div key={image.id} className="relative group bg-gray-100 rounded-lg overflow-hidden aspect-square cursor-pointer">
                          <img
                            src={image.url}
                            alt="Generated image"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onClick={() => handleImagePreview(image)}
                          />
                          
                          {/* Overlay Controls */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleImagePreview(image);
                                }}
                                className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                                title="View fullscreen"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDownload(image.url);
                                }}
                                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                                title="Download image"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          {/* Quality Badge */}
                          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            HD
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="bg-green-50 rounded-2xl p-6">
                      {/* Suggestions section commented out as in original */}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <footer className="text-center mt-16 text-gray-500">
          <p>Powered by Next.js, Python, LangGraph & Stable Diffusion XL</p>
        </footer>
      </div>
    </div>
  );
}