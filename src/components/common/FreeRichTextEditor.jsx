// common/FreeRichTextEditor.jsx
import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import { Extension } from '@tiptap/core'
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Expand,
  Type,
  Undo,
  Redo,
  Code,
  Minimize
} from 'lucide-react'

// Custom extension to handle heading behavior
const HeadingBehavior = Extension.create({
  name: 'headingBehavior',
  
  addKeyboardShortcuts() {
    return {
      'Enter': ({ editor }) => {
        const { state } = editor
        const { selection } = state
        const { $from } = selection
        
        // Check if we're in a heading
        if ($from.parent.type.name.startsWith('heading')) {
          // If at the end of a heading, create a new paragraph
          if ($from.parentOffset === $from.parent.content.size) {
            return editor.chain().focus().splitBlock().setParagraph().run()
          }
          // If in the middle of a heading, allow normal split
          return editor.chain().focus().splitBlock().run()
        }
        
        // Default behavior for non-headings
        return false
      }
    }
  }
})

const FreeRichTextEditor = forwardRef(({ 
  content, 
  onChange, 
  placeholder = "Start writing...",
  onMediaLibraryOpen
}, ref) => {
  const [activeView, setActiveView] = useState('visual')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentFormat, setCurrentFormat] = useState('paragraph')
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4, 5, 6],
        },
      }),
      HeadingBehavior,
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: 'blog-image',
          style: 'max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0;'
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'blog-link',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      CharacterCount.configure({
        limit: 50000,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Whats the heading?'
          }
          return placeholder
        },
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
      updateCurrentFormat(editor)
    },
    onSelectionUpdate: ({ editor }) => {
      updateCurrentFormat(editor)
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none p-4 focus:outline-none min-h-[300px] border-0',
        spellcheck: 'true',
      },
    },
    parseOptions: {
      preserveWhitespace: 'full',
    },
  })

  // Function to update current format based on cursor position
  const updateCurrentFormat = (editor) => {
    if (!editor) return
    
    if (editor.isActive('heading', { level: 2 })) {
      setCurrentFormat('h2')
    } else if (editor.isActive('heading', { level: 3 })) {
      setCurrentFormat('h3')
    } else if (editor.isActive('heading', { level: 4 })) {
      setCurrentFormat('h4')
    } else if (editor.isActive('heading', { level: 5 })) {
      setCurrentFormat('h5')
    } else if (editor.isActive('heading', { level: 6 })) {
      setCurrentFormat('h6')
    } else {
      setCurrentFormat('paragraph')
    }
  }

  // Initialize current format when editor is ready
  useEffect(() => {
    if (editor) {
      updateCurrentFormat(editor)
    }
  }, [editor])

  // Update editor content when content prop changes
  useEffect(() => {
    if (editor && content !== undefined && content !== editor.getHTML()) {
      editor.commands.setContent(content, false)
    }
  }, [content, editor])

  // Expose editor instance through ref
  useImperativeHandle(ref, () => ({
    getEditor: () => editor,
    insertImage: (src, alt = '', caption = '') => {
      if (editor) {
        editor.chain().focus().setImage({ 
          src, 
          alt,
          title: caption 
        }).run()
      }
    },
    insertVideo: (src, type = 'video/mp4') => {
      if (editor) {
        const videoHTML = `
          <div class="video-wrapper" style="margin: 1rem 0;">
            <video controls style="width: 100%; max-width: 600px; border-radius: 8px;">
              <source src="${src}" type="${type}">
              Your browser does not support the video tag.
            </video>
          </div>
        `
        editor.chain().focus().insertContent(videoHTML).run()
      }
    },
    insertLink: (href, text = '') => {
      if (editor) {
        if (text) {
          editor.chain().focus().insertContent(`<a href="${href}" target="_blank">${text}</a>`).run()
        } else {
          editor.chain().focus().setLink({ href }).run()
        }
      }
    },
    focus: () => {
      if (editor) {
        editor.commands.focus()
      }
    }
  }))

  const ToolbarButton = ({ onClick, isActive, children, title, disabled = false }) => (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`p-2 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
      }`}
    >
      {children}
    </button>
  )

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL:', previousUrl || 'https://')
    
    if (url === null || url === '') {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const removeLink = () => {
    editor.chain().focus().unsetLink().run()
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:', 'https://')
    const alt = window.prompt('Enter alt text (optional):', '')
    
    if (url && url !== 'https://') {
      editor.chain().focus().setImage({ 
        src: url,
        alt: alt || '',
        title: alt || ''
      }).run()
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  const insertHorizontalRule = () => {
    editor.chain().focus().setHorizontalRule().run()
  }

  if (!editor) return null

  const editorClasses = isFullscreen 
    ? "fixed inset-0 z-50 bg-white"
    : "bg-white border border-gray-300 rounded-lg overflow-hidden"

  return (
    <div className={editorClasses}>
      {/* Visual/Code Toggle */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex space-x-4">
          <button 
            onClick={() => setActiveView('visual')}
            className={`text-sm font-medium pb-1 transition-colors ${
              activeView === 'visual' 
                ? 'text-gray-900 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Visual
          </button>
          <button 
            onClick={() => setActiveView('code')}
            className={`text-sm font-medium pb-1 transition-colors ${
              activeView === 'code' 
                ? 'text-gray-900 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Code
          </button>
        </div>

        {/* Fullscreen Toggle */}
        <div className="flex items-center space-x-2">
          {isFullscreen && (
            <span className="text-sm text-gray-600">Press Esc to exit fullscreen</span>
          )}
          <ToolbarButton
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize size={16} /> : <Expand size={16} />}
          </ToolbarButton>
        </div>
      </div>

      {activeView === 'visual' ? (
        <>
          {/* Enhanced Toolbar */}
          <div className="border-b border-gray-300 p-3 bg-gray-50 overflow-x-auto">
            <div className="flex flex-wrap items-center gap-1 min-w-max">
              {/* Format Dropdown */}
              <select 
                className="mr-3 p-2 border border-gray-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => {
                  if (e.target.value === 'h2') editor.chain().focus().toggleHeading({ level: 2 }).run()
                  else if (e.target.value === 'h3') editor.chain().focus().toggleHeading({ level: 3 }).run()
                  else if (e.target.value === 'h4') editor.chain().focus().toggleHeading({ level: 4 }).run()
                  else if (e.target.value === 'h5') editor.chain().focus().toggleHeading({ level: 5 }).run()
                  else if (e.target.value === 'h6') editor.chain().focus().toggleHeading({ level: 6 }).run()
                  else editor.chain().focus().setParagraph().run()
                  
                  // Update the current format state
                  setCurrentFormat(e.target.value)
                }}
                value={currentFormat}
              >
                <option value="paragraph">Paragraph</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="h4">Heading 4</option>
                <option value="h5">Heading 5</option>
                <option value="h6">Heading 6</option>
              </select>

              {/* Undo/Redo */}
              <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                title="Undo (Ctrl+Z)"
              >
                <Undo size={16} />
              </ToolbarButton>
              
              <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                title="Redo (Ctrl+Y)"
              >
                <Redo size={16} />
              </ToolbarButton>

              <div className="w-px h-6 bg-gray-300 mx-2" />

              {/* Text Formatting */}
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                title="Bold (Ctrl+B)"
              >
                <Bold size={16} />
              </ToolbarButton>
              
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                title="Italic (Ctrl+I)"
              >
                <Italic size={16} />
              </ToolbarButton>
              
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                isActive={editor.isActive('strike')}
                title="Strikethrough"
              >
                <Type size={16} />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                isActive={editor.isActive('code')}
                title="Inline Code"
              >
                <Code size={16} />
              </ToolbarButton>

              <div className="w-px h-6 bg-gray-300 mx-2" />

              {/* Lists */}
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
                title="Bullet List"
              >
                <List size={16} />
              </ToolbarButton>
              
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive('orderedList')}
                title="Numbered List"
              >
                <ListOrdered size={16} />
              </ToolbarButton>

              <div className="w-px h-6 bg-gray-300 mx-2" />

              {/* Quote & Code Block */}
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editor.isActive('blockquote')}
                title="Quote"
              >
                <Quote size={16} />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                isActive={editor.isActive('codeBlock')}
                title="Code Block"
              >
                <Code size={16} />
              </ToolbarButton>

              <div className="w-px h-6 bg-gray-300 mx-2" />

              {/* Alignment */}
              <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                isActive={editor.isActive({ textAlign: 'left' })}
                title="Align Left"
              >
                <AlignLeft size={16} />
              </ToolbarButton>
              
              <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                isActive={editor.isActive({ textAlign: 'center' })}
                title="Align Center"
              >
                <AlignCenter size={16} />
              </ToolbarButton>
              
              <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                isActive={editor.isActive({ textAlign: 'right' })}
                title="Align Right"
              >
                <AlignRight size={16} />
              </ToolbarButton>

              <div className="w-px h-6 bg-gray-300 mx-2" />

              {/* Link & Image */}
              {editor.isActive('link') ? (
                <ToolbarButton
                  onClick={removeLink}
                  title="Remove Link"
                >
                  <span className="text-red-600">🔗</span>
                </ToolbarButton>
              ) : (
                <ToolbarButton
                  onClick={addLink}
                  title="Add Link"
                >
                  <LinkIcon size={16} />
                </ToolbarButton>
              )}

              <ToolbarButton
                onClick={addImage}
                title="Add Image URL"
              >
                <ImageIcon size={16} />
              </ToolbarButton>

              {/* Media Library Button */}
              {onMediaLibraryOpen && (
                <ToolbarButton
                  onClick={onMediaLibraryOpen}
                  title="Open Media Library"
                >
                  <span className="text-blue-600">📁</span>
                </ToolbarButton>
              )}

              <div className="w-px h-6 bg-gray-300 mx-2" />

              {/* Additional Tools */}
              <ToolbarButton
                onClick={insertHorizontalRule}
                title="Horizontal Line"
              >
                <span>—</span>
              </ToolbarButton>

              {/* Clear Formatting */}
              <ToolbarButton
                onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                title="Clear Formatting"
              >
                <span className="text-red-600">✗</span>
              </ToolbarButton>
            </div>
          </div>

          {/* Editor Content */}
          <div className={`tiptap-editor ${isFullscreen ? 'flex-1 overflow-y-auto' : ''}`}>
            <EditorContent 
              editor={editor} 
              className={isFullscreen ? 'h-full' : 'min-h-[300px]'}
            />
          </div>
        </>
      ) : (
        /* Code View */
        <div className={`${isFullscreen ? 'flex-1 flex flex-col' : ''}`}>
          <div className="p-3 bg-yellow-50 border-b border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>HTML Code Mode:</strong> Edit raw HTML. Switch back to Visual mode to see formatted content.
            </p>
          </div>
          <textarea
            value={content || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter HTML code..."
            className={`w-full p-4 border-0 font-mono text-sm resize-none focus:outline-none bg-gray-50 ${
              isFullscreen ? 'flex-1' : 'min-h-[300px]'
            }`}
            style={{ 
              fontFamily: 'Monaco, "SF Mono", Consolas, "Liberation Mono", Menlo, Courier, monospace',
              lineHeight: '1.5',
              tabSize: 2
            }}
          />
        </div>
      )}
      
      {/* Enhanced Status Bar */}
      <div className="border-t border-gray-300 px-4 py-2 text-sm text-gray-500 bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>
              Words: {editor?.storage?.characterCount?.words?.() || (content ? content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length : 0)}
            </span>
            <span>
              Characters: {editor?.storage?.characterCount?.characters?.() || (content ? content.replace(/<[^>]*>/g, '').length : 0)}
            </span>
            {editor?.storage?.characterCount?.limit && (
              <span className={editor.storage.characterCount.characters() > editor.storage.characterCount.limit * 0.8 ? 'text-orange-600' : ''}>
                Limit: {editor.storage.characterCount.characters()}/{editor.storage.characterCount.limit}
              </span>
            )}
          </div>
          
          {activeView === 'visual' && (
            <div className="flex items-center space-x-4 text-xs">
              <span className="text-gray-400">
                💡 Keyboard shortcuts: Ctrl+B (Bold), Ctrl+I (Italic), Ctrl+K (Link)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Custom Styles */}
      <style jsx>{`
        .tiptap-editor .ProseMirror {
          outline: none;
          padding: 20px;
          line-height: 1.7;
          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          color: #1f2937;
          min-height: ${isFullscreen ? 'calc(100vh - 200px)' : '300px'};
        }
        
        .tiptap-editor .ProseMirror p {
          margin: 0 0 1.25em 0;
        }
        
        .tiptap-editor .ProseMirror h1 {
          font-size: 2.25em;
          font-weight: 700;
          margin: 1.5em 0 0.75em 0;
          line-height: 1.2;
          color: #111827;
        }
        
        .tiptap-editor .ProseMirror h2 {
          font-size: 1.875em;
          font-weight: 700;
          margin: 1.5em 0 0.75em 0;
          line-height: 1.2;
          color: #111827;
        }
        
        .tiptap-editor .ProseMirror h3 {
          font-size: 1.5em;
          font-weight: 600;
          margin: 1.25em 0 0.625em 0;
          line-height: 1.3;
          color: #1f2937;
        }
        
        .tiptap-editor .ProseMirror h4 {
          font-size: 1.25em;
          font-weight: 600;
          margin: 1em 0 0.5em 0;
          line-height: 1.4;
          color: #374151;
        }
        
        .tiptap-editor .ProseMirror h5 {
          font-size: 1.125em;
          font-weight: 600;
          margin: 1em 0 0.5em 0;
          line-height: 1.4;
          color: #374151;
        }
        
        .tiptap-editor .ProseMirror h6 {
          font-size: 1em;
          font-weight: 600;
          margin: 1em 0 0.5em 0;
          line-height: 1.4;
          color: #4b5563;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .tiptap-editor .ProseMirror ul, 
        .tiptap-editor .ProseMirror ol {
          margin: 1.25em 0;
          padding-left: 1.625em;
        }
        
        .tiptap-editor .ProseMirror li {
          margin: 0.5em 0;
        }
        
        .tiptap-editor .ProseMirror blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.25em;
          margin: 1.5em 0;
          font-style: italic;
          color: #4b5563;
          background-color: #f8fafc;
          padding: 1em 1.25em;
          border-radius: 0 6px 6px 0;
        }
        
        .tiptap-editor .ProseMirror code {
          background-color: #f1f5f9;
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-size: 0.875em;
          font-family: Monaco, "SF Mono", Consolas, "Liberation Mono", Menlo, Courier, monospace;
          color: #dc2626;
        }
        
        .tiptap-editor .ProseMirror pre {
          background-color: #1e293b;
          color: #e2e8f0;
          padding: 1.25em;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1.5em 0;
          font-family: Monaco, "SF Mono", Consolas, "Liberation Mono", Menlo, Courier, monospace;
          font-size: 0.875em;
          line-height: 1.5;
        }
        
        .tiptap-editor .ProseMirror pre code {
          background: none;
          padding: 0;
          color: inherit;
        }
        
        .tiptap-editor .ProseMirror a {
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s ease;
        }
        
        .tiptap-editor .ProseMirror a:hover {
          color: #1d4ed8;
        }
        
        .tiptap-editor .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin: 1.5em auto;
          display: block;
        }
        
        .tiptap-editor .ProseMirror hr {
          border: none;
          height: 2px;
          background: linear-gradient(to right, transparent, #d1d5db, transparent);
          margin: 2em 0;
        }
        
        .tiptap-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
          font-style: italic;
        }
        
        .tiptap-editor .ProseMirror:focus {
          box-shadow: inset 0 0 0 2px #3b82f6;
        }

        /* Selection styling */
        .tiptap-editor .ProseMirror ::selection {
          background-color: #bfdbfe;
        }

        /* Video wrapper responsive */
        .tiptap-editor .video-wrapper {
          position: relative;
          max-width: 100%;
        }

        .tiptap-editor .video-wrapper video {
          width: 100%;
          height: auto;
        }
      `}</style>

      {/* Fullscreen Escape Handler */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-40"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsFullscreen(false)
            }
          }}
          tabIndex={-1}
        />
      )}
    </div>
  )
})

FreeRichTextEditor.displayName = 'FreeRichTextEditor'

export default FreeRichTextEditor
