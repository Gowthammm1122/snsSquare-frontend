// common/MediaLibrary.jsx
import React, { useState } from 'react'
import { X, Search, Grid, List, Trash2, Edit2, Download, Eye } from 'lucide-react'

const MediaLibrary = ({ 
  mediaLibrary, 
  onMediaSelect, 
  onClose, 
  onMediaUpdate, 
  onNotification 
}) => {
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all') // 'all', 'image', 'video', 'document'
  const [selectedMedia, setSelectedMedia] = useState(null)

  const filteredMedia = mediaLibrary.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = 
      filterType === 'all' ||
      (filterType === 'image' && file.type.startsWith('image/')) ||
      (filterType === 'video' && file.type.startsWith('video/')) ||
      (filterType === 'document' && !file.type.startsWith('image/') && !file.type.startsWith('video/'))
    
    return matchesSearch && matchesFilter
  })

  const deleteMedia = (mediaId) => {
    if (confirm('Are you sure you want to delete this media file?')) {
      const updatedLibrary = mediaLibrary.filter(file => file.id !== mediaId)
      onMediaUpdate(updatedLibrary)
      sessionStorage.setItem('media_library', JSON.stringify(updatedLibrary))
      onNotification('success', 'Media file deleted')
    }
  }

  const updateMediaInfo = (mediaId, updates) => {
    const updatedLibrary = mediaLibrary.map(file => 
      file.id === mediaId ? { ...file, ...updates } : file
    )
    onMediaUpdate(updatedLibrary)
    sessionStorage.setItem('media_library', JSON.stringify(updatedLibrary))
    setSelectedMedia(null)
    onNotification('success', 'Media info updated')
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️'
    if (type.startsWith('video/')) return '🎥'
    if (type.includes('pdf')) return '📄'
    if (type.includes('word')) return '📝'
    return '📁'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-3/4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Media Library</h2>
            <p className="text-sm text-gray-500">{filteredMedia.length} files</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Controls */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Files</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Media Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredMedia.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📁</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No media files found</h3>
              <p className="text-gray-500">Upload some files to get started</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredMedia.map(file => (
                <div key={file.id} className="group relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-blue-300 transition-colors">
                  {file.type.startsWith('image/') ? (
                    <img 
                      src={file.url} 
                      alt={file.name}
                      className="w-full h-32 object-cover"
                    />
                  ) : (
                    <div className="w-full h-32 flex items-center justify-center bg-gray-100">
                      <span className="text-3xl">{getFileIcon(file.type)}</span>
                    </div>
                  )}
                  
                  <div className="p-2">
                    <p className="text-xs font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-2 transition-opacity">
                    <button
                      onClick={() => onMediaSelect(file)}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      title="Insert"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => setSelectedMedia(file)}
                      className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteMedia(file.id)}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredMedia.map(file => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getFileIcon(file.type)}</span>
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onMediaSelect(file)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                      title="Insert"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => setSelectedMedia(file)}
                      className="p-2 text-green-600 hover:bg-green-100 rounded"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteMedia(file.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-between">
          <p className="text-sm text-gray-500">
            Total: {mediaLibrary.length} files ({formatFileSize(mediaLibrary.reduce((total, file) => total + file.size, 0))})
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Edit Media Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Media</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                <input
                  type="text"
                  value={selectedMedia.alt || ''}
                  onChange={(e) => setSelectedMedia(prev => ({ ...prev, alt: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  placeholder="Describe this image..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                <textarea
                  value={selectedMedia.caption || ''}
                  onChange={(e) => setSelectedMedia(prev => ({ ...prev, caption: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  rows={3}
                  placeholder="Add a caption..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setSelectedMedia(null)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => updateMediaInfo(selectedMedia.id, { alt: selectedMedia.alt, caption: selectedMedia.caption })}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MediaLibrary
