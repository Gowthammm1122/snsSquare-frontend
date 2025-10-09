// common/BlogSidebar.jsx
import React, { useState } from 'react'
import { 
  ChevronDown, 
  Eye, 
  Calendar, 
  Upload, 
  Plus, 
  X, 
  Edit,
  Trash2,
  Check,
  Clock,
  Globe
} from 'lucide-react'

const BlogSidebar = ({ 
  formData,
  onPublish, 
  onSaveDraft, 
  onPreview,
  onFormDataChange,
  onNotification
}) => {
  const [expandedSections, setExpandedSections] = useState({
    publish: true,
    featuredImage: true,
    categories: true,
    tags: true
  })

  const [editingVisibility, setEditingVisibility] = useState(false)
  const [editingPublishDate, setEditingPublishDate] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [newTag, setNewTag] = useState('')
  const [showAddCategory, setShowAddCategory] = useState(false)

  // Default categories (you can load these from your backend)
  const [availableCategories, setAvailableCategories] = useState([
    { id: 1, name: 'Information Technology'},
    { id: 2, name: 'Supply Chain'},
    { id: 3, name: 'Healthcare'},
    { id: 4, name: 'Human Resource'},
    { id: 5, name: 'Insurance'},
  ])

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        onNotification('error', 'Image size must be less than 10MB')
        return
      }

      // Store the file for upload
      onFormDataChange('featuredImageFile', file)
      onFormDataChange('featuredImage', URL.createObjectURL(file))
      onNotification('success', 'Featured image selected!')
    }
  }

  const removeFeaturedImage = () => {
    onFormDataChange('featuredImage', null)
    onFormDataChange('featuredImageFile', null)
    onNotification('info', 'Featured image removed')
  }

  const handleCategoryChange = (categoryName) => {
    onFormDataChange('category', categoryName)
  }

  const addNewCategory = () => {
    if (!newCategory.trim()) {
      onNotification('error', 'Category name cannot be empty')
      return
    }

    if (availableCategories.some(cat => cat.name.toLowerCase() === newCategory.toLowerCase())) {
      onNotification('error', 'Category already exists')
      return
    }

    const newCat = {
      id: Date.now(),
      name: newCategory.trim(),
      count: 0
    }

    setAvailableCategories(prev => [...prev, newCat])
    onFormDataChange('category', newCategory.trim())
    setNewCategory('')
    setShowAddCategory(false)
    onNotification('success', `Category "${newCat.name}" added successfully!`)
  }

  const deleteCategory = (categoryId, categoryName) => {
    if (categoryName === 'Uncategorized') {
      onNotification('error', 'Cannot delete Uncategorized category')
      return
    }

    if (formData.category === categoryName) {
      onNotification('error', 'Cannot delete category that is currently selected')
      return
    }

    setAvailableCategories(prev => prev.filter(cat => cat.id !== categoryId))
    onNotification('success', `Category "${categoryName}" deleted`)
  }

  const addTag = () => {
    if (!newTag.trim()) return

    const tagToAdd = newTag.trim()
    if (formData.tags && formData.tags.includes(tagToAdd)) {
      onNotification('error', 'Tag already exists')
      return
    }

    onFormDataChange('tags', [...(formData.tags || []), tagToAdd])
    setNewTag('')
    onNotification('success', `Tag "${tagToAdd}" added`)
  }

  const removeTag = (tagToRemove) => {
    onFormDataChange('tags', (formData.tags || []).filter(tag => tag !== tagToRemove))
  }

  // These functions are no longer needed with the new structure

  const getStatusIcon = () => {
    switch (formData.status) {
      case 'published': return <Check size={16} className="text-green-600" />
      case 'draft': return <Edit size={16} className="text-yellow-600" />
      case 'unpublished': return <Clock size={16} className="text-red-600" />
      default: return <Clock size={16} className="text-gray-600" />
    }
  }

  return (
    <div className="w-full space-y-4">
      {/* Publish Section */}
      {/* <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <h3 className="font-semibold text-gray-900">Publish</h3>
          </div>
          <button 
            onClick={() => toggleSection('publish')}
            className="text-gray-500 hover:text-gray-700"
          >
            <ChevronDown 
              size={20} 
              className={`transform transition-transform ${expandedSections.publish ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
        
        {expandedSections.publish && (
          <div className="p-4 space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Save Draft</span>
                <button 
                  onClick={() => onSaveDraft()}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Save Draft
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Preview</span>
                <button 
                  onClick={onPreview}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Preview
                </button>
              </div>
              
              <hr className="border-gray-200" />
              
              <div className="flex justify-between items-center">
                <span className="flex items-center text-gray-600">
                  <Eye size={16} className="mr-2" />
                  Visibility:
                </span>
                <div className="flex items-center space-x-2">
                  {editingVisibility ? (
                    <select
                      value="public"
                      disabled
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                      autoFocus
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="password">Password Protected</option>
                    </select>
                  ) : (
                    <>
                      <span className="text-blue-600 font-medium capitalize flex items-center">
                        <Globe size={14} className="mr-1" />
                        Public
                      </span>
                      <button 
                        onClick={() => setEditingVisibility(true)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  Publish:
                </span>
                <div className="flex items-center space-x-2">
                  {editingPublishDate ? (
                    <input
                      type="datetime-local"
                      value=""
                      disabled
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                      autoFocus
                    />
                  ) : (
                    <>
                      <span className="font-medium">
                        immediately
                      </span>
                      <button 
                        onClick={() => setEditingPublishDate(true)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <button 
              onClick={onPublish}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              {formData.status === 'published' ? 'Update' : 'Publish'}
            </button>
          </div>
        )}
      </div> */}

      {/* Featured Image Section */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-700">Featured Image</h4>
          <button 
            onClick={() => toggleSection('featuredImage')}
            className="text-gray-500 hover:text-gray-700"
          >
            <ChevronDown 
              size={20} 
              className={`transform transition-transform ${expandedSections.featuredImage ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
        
        {expandedSections.featuredImage && (
          <div className="p-4">
            {!formData.featuredImage ? (
              <div>
                <input
                  id="featured-image-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <button 
                  onClick={() => document.getElementById('featured-image-input').click()}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload featured image</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative">
                  <img 
                    src={formData.featuredImage} 
                    alt="Featured" 
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                  <button
                    onClick={removeFeaturedImage}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium">Featured Image</p>
                  <p>Image selected for upload</p>
                </div>
                <button 
                  onClick={() => document.getElementById('featured-image-input').click()}
                  className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Change Image
                </button>
                <input
                  id="featured-image-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-700">Categories</h4>
          <button 
            onClick={() => toggleSection('categories')}
            className="text-gray-500 hover:text-gray-700"
          >
            <ChevronDown 
              size={20} 
              className={`transform transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
        
        {expandedSections.categories && (
          <div className="p-4">
            <div className="flex space-x-4 text-sm mb-4">
              <button className="font-medium ">
                All Categories
              </button>
            </div>
            
            <div className="max-h-40 overflow-y-auto space-y-2 mb-4">
              {availableCategories.map(category => (
                <div key={category.id} className="flex items-center justify-between group">
                  <label className="flex items-center space-x-2 text-sm flex-1">
                    <input
                      type="radio"
                      name="category"
                      checked={formData.category === category.name}
                      onChange={() => handleCategoryChange(category.name)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{category.name}</span>
                  </label>
                  {category.name !== 'Uncategorized' && (
                    <button
                      onClick={() => deleteCategory(category.id, category.name)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                      title="Delete category"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            {showAddCategory ? (
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category name"
                  className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && addNewCategory()}
                  autoFocus
                />
                <button
                  onClick={addNewCategory}
                  className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowAddCategory(false)
                    setNewCategory('')
                  }}
                  className="px-3 py-2 text-gray-600 border border-gray-300 rounded text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowAddCategory(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
              >
                <Plus size={14} />
                <span>Add Category</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tags Section */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-700">Tags</h4>
          <button 
            onClick={() => toggleSection('tags')}
            className="text-gray-500 hover:text-gray-700"
          >
            <ChevronDown 
              size={20} 
              className={`transform transition-transform ${expandedSections.tags ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
        
        {expandedSections.tags && (
          <div className="p-4 space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add new tag"
                className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <button
                onClick={addTag}
                className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                disabled={!newTag.trim()}
              >
                Add
              </button>
            </div>
            
            <p className="text-xs text-gray-500">Separate tags with commas or press Enter</p>
            
            {formData.tags && formData.tags.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Current tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        )}
      </div>

      {/* Post Statistics */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-700">Post Statistics</h4>
        <div className="space-y-1 text-sm text-gray-600 mt-4">
          <div className="flex justify-between">
            <span>Word count:</span>
            <span>{formData.content ? formData.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length : 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Characters:</span>
            <span>{formData.content ? formData.content.replace(/<[^>]*>/g, '').length : 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Category:</span>
            <span>{formData.category ? 1 : 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Tags:</span>
            <span>{formData.tags ? formData.tags.length : 0}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar
