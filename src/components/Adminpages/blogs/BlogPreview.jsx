import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Edit, Save, X } from 'lucide-react';

const BlogPreview = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get preview data from sessionStorage
    const previewData = sessionStorage.getItem('blog_preview_data');
    if (previewData) {
      try {
        const data = JSON.parse(previewData);
        console.log('Preview data loaded:', data);
        console.log('Featured image file:', data.featuredImageFile);
        console.log('Feature image:', data.feature_image);
        setBlogData(data);
      } catch (error) {
        console.error('Error parsing preview data:', error);
      }
    }
    setLoading(false);
  }, []);

  const handleClose = () => {
    // Clear preview data and close window
    sessionStorage.removeItem('blog_preview_data');
    // Clean up any object URLs to prevent memory leaks
    if (blogData?.featuredImageFile instanceof File) {
      try {
        URL.revokeObjectURL(URL.createObjectURL(blogData.featuredImageFile));
      } catch (error) {
        console.error('Error revoking object URL:', error);
      }
    }
    window.close();
  };

  const handleEdit = () => {
    // Navigate back to edit page
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No preview data found</h2>
          <p className="text-gray-600 mb-6">Please go back to the blog editor and try again.</p>
          <button
            onClick={() => navigate('/admin/blog/all')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Preview Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleClose}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X size={20} />
              <span>Close Preview</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Eye size={16} />
              <span>Preview Mode</span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Blog Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{blogData.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
            <span>Category: {blogData.category}</span>
            <span>•</span>
            <span>Status: {blogData.status}</span>
            <span>•</span>
            <span>Preview Mode</span>
          </div>
          {blogData.tags && blogData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {blogData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Feature Image */}
        {(() => {
          // Determine which image to show and how to handle it
          let imageSrc = null;
          let imageType = 'none';
          
          // Check for featuredImage blob URL first (from new blog creation)
          if (blogData.featuredImage && typeof blogData.featuredImage === 'string') {
            imageSrc = blogData.featuredImage;
            imageType = 'blob';
          }
          // Check for featuredImageFile (should be File object, but might be serialized)
          else if (blogData.featuredImageFile) {
            if (blogData.featuredImageFile instanceof File) {
              try {
                imageSrc = URL.createObjectURL(blogData.featuredImageFile);
                imageType = 'file';
              } catch (error) {
                console.error('Error creating object URL:', error);
              }
            } else if (typeof blogData.featuredImageFile === 'string') {
              imageSrc = blogData.featuredImageFile;
              imageType = 'url';
            }
          }
          // Check for feature_image (existing blogs)
          else if (blogData.feature_image) {
            imageSrc = blogData.feature_image;
            imageType = 'url';
          }
          
          if (imageSrc) {
            return (
              <div className="mb-8">
                <img
                  src={imageSrc}
                  alt={blogData.title}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    console.error('Error loading image:', {
                      src: imageSrc,
                      type: imageType,
                      error: e
                    });
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully:', {
                      src: imageSrc,
                      type: imageType
                    });
                  }}
                />
              </div>
            );
          }
          return null;
        })()}

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          {blogData.content ? (
            <div 
              dangerouslySetInnerHTML={{ __html: blogData.content }}
              className="blog-content"
            />
          ) : (
            <div className="text-gray-500 italic">
              No content available for preview.
            </div>
          )}
        </div>

        {/* Preview Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-yellow-800">
              <Eye size={20} />
              <span className="font-medium">Preview Mode</span>
            </div>
            <p className="text-yellow-700 text-sm mt-2">
              This is a preview of your blog post. Changes made here are not saved. 
              Use the "Edit" button to make changes to your blog post.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;
