// common/BlogSEOAnalyzer.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { ChevronDown, AlertCircle, CheckCircle, Info, ExternalLink, Edit2, Plus, X, Save } from 'lucide-react'

const BlogSEOAnalyzer = ({ content, title, onTitleChange }) => {
  const [seoData, setSeoData] = useState({
    score: 0,
    basicChecks: [],
    additionalChecks: [],
    titleReadability: [],
    contentReadability: [],
    preview: {
      title: '',
      description: '',
      url: ''
    }
  })
  
  const [keywords, setKeywords] = useState({
    primary: '',
    secondary: [],
    semantic: []
  })
  
  const [editMode, setEditMode] = useState({
    snippet: false,
    title: '',
    description: '',
    url: ''
  })
  
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    additional: false,
    titleReadability: false,
    contentReadability: false
  })

  // Enhanced utility functions [web:221][web:225][web:227]
  const stripHtml = useCallback((html) => {
    if (!html) return ''
    return html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/&[a-z]+;/gi, ' ')  // Remove HTML entities
      .replace(/\s+/g, ' ')
      .trim()
  }, [])

  const countSentences = useCallback((text) => {
    if (!text) return 0
    const sentences = text
      .split(/[.!?]+/)
      .filter(sentence => sentence.trim().length > 3)
    return Math.max(1, sentences.length)
  }, [])

  // Professional syllable counting with enhanced accuracy
  const countSyllables = useCallback((word) => {
    if (!word || typeof word !== 'string') return 0
    
    word = word.toLowerCase().replace(/[^a-z]/g, '')
    if (word.length <= 3) return 1
    
    // Enhanced syllable patterns
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    word = word.replace(/^y/, '')
    
    const vowelGroups = word.match(/[aeiouy]{1,2}/g) || []
    let syllableCount = vowelGroups.length
    
    // Advanced rules for accuracy
    if (word.match(/[^aeiouy]le$/)) syllableCount += 1
    if (word.match(/^[^aeiouy]*y[^aeiouy]*$/)) syllableCount += 1
    if (word.endsWith('e') && syllableCount > 1) syllableCount -= 1
    
    return Math.max(1, syllableCount)
  }, [])

  // Enhanced Flesch Reading Ease with professional accuracy
  const calculateFleschReadingEase = useCallback((text) => {
    if (!text) return 0
    
    const words = text.split(/\s+/).filter(word => word.length > 0)
    const sentences = countSentences(text)
    
    if (words.length === 0 || sentences === 0) return 0
    
    const syllables = words.reduce((total, word) => total + countSyllables(word), 0)
    const avgSentenceLength = words.length / sentences
    const avgSyllablesPerWord = syllables / words.length
    
    const score = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord)
    return Math.max(0, Math.min(100, Math.round(score * 10) / 10))
  }, [countSentences, countSyllables])

  const getReadabilityLevel = useCallback((score) => {
    if (score >= 90) return { level: 'Very Easy', grade: '5th grade', status: 'good' }
    if (score >= 80) return { level: 'Easy', grade: '6th grade', status: 'good' }
    if (score >= 70) return { level: 'Fairly Easy', grade: '7th grade', status: 'good' }
    if (score >= 60) return { level: 'Standard', grade: '8th-9th grade', status: 'warning' }
    if (score >= 50) return { level: 'Fairly Difficult', grade: '10th-12th grade', status: 'warning' }
    if (score >= 30) return { level: 'Difficult', grade: 'College level', status: 'error' }
    return { level: 'Very Difficult', grade: 'Graduate level', status: 'error' }
  }, [])

  // Professional meta description generation [web:209][web:226][web:236]
  const generateMetaDescription = useCallback((title, content, primaryKeyword, secondaryKeywords) => {
    if (!title && !content) return 'Add content to generate meta description'
    
    const text = stripHtml(content)
    const words = text.split(/\s+/).filter(word => word.length > 0)
    
    // Strategy 1: Keyword-rich sentences (primary + secondary)
    let description = ''
    const allKeywords = [primaryKeyword, ...secondaryKeywords].filter(Boolean)
    
    if (allKeywords.length > 0) {
      const sentences = text.split(/[.!?]+/)
      const keywordSentence = sentences.find(sentence => {
        const lowerSentence = sentence.toLowerCase()
        return allKeywords.some(keyword => 
          lowerSentence.includes(keyword.toLowerCase()) && sentence.trim().length > 30
        )
      })
      
      if (keywordSentence) {
        description = keywordSentence.trim()
        if (description.length > 155) {
          description = description.substring(0, 152) + '...'
        }
      }
    }
    
    // Strategy 2: Smart excerpt with keyword integration
    if (!description && words.length > 0) {
      const excerpt = words.slice(0, 25).join(' ')
      if (primaryKeyword && !excerpt.toLowerCase().includes(primaryKeyword.toLowerCase())) {
        description = `${primaryKeyword} - ${excerpt}`
      } else {
        description = excerpt
      }
      
      if (description.length > 155) {
        description = description.substring(0, 152) + '...'
      }
    }
    
    return description || 'Professional content and insights on SNS iHub Workplace.'
  }, [stripHtml])

  // Enhanced URL generation
  const generateUrl = useCallback((title) => {
    if (!title) return 'sns-ihub.com/blog/your-blog-post'
    
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 60) // Limit URL length
    
    return `sns-ihub.com/blog/${slug}`
  }, [])

  // Keyword analysis with semantic understanding [web:221][web:224][web:227]
  const analyzeKeywordRelevance = useCallback((text, primaryKeyword, secondaryKeywords) => {
    if (!text || !primaryKeyword) return { density: 0, distribution: 0, semanticScore: 0 }
    
    const lowerText = text.toLowerCase()
    const words = text.split(/\s+/).filter(word => word.length > 0)
    const wordCount = words.length
    
    // Primary keyword analysis
    const primaryCount = (lowerText.match(new RegExp(primaryKeyword.toLowerCase().replace(/\s+/g, '\\s+'), 'g')) || []).length
    const primaryDensity = wordCount > 0 ? (primaryCount / wordCount) * 100 : 0
    
    // Secondary keywords analysis
    const secondaryCount = secondaryKeywords.reduce((total, keyword) => {
      const count = (lowerText.match(new RegExp(keyword.toLowerCase().replace(/\s+/g, '\\s+'), 'g')) || []).length
      return total + count
    }, 0)
    
    // Distribution analysis (keyword placement throughout content)
    const paragraphs = text.split(/\n\s*\n/)
    const distribution = paragraphs.filter(para => 
      para.toLowerCase().includes(primaryKeyword.toLowerCase())
    ).length / Math.max(1, paragraphs.length)
    
    // Semantic score based on related terms
    const semanticTerms = [
      ...secondaryKeywords,
      // Common semantic variations (simplified)
    ]
    const semanticCount = semanticTerms.reduce((total, term) => {
      const count = (lowerText.match(new RegExp(term.toLowerCase().replace(/\s+/g, '\\s+'), 'g')) || []).length
      return total + count
    }, 0)
    
    const semanticScore = Math.min(100, (semanticCount / Math.max(1, wordCount)) * 1000)
    
    return {
      density: primaryDensity,
      distribution: distribution * 100,
      semanticScore,
      primaryCount,
      secondaryCount
    }
  }, [])

  // Comprehensive content analysis
  const contentAnalysis = useMemo(() => {
    const textContent = stripHtml(content)
    const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length
    const sentenceCount = countSentences(textContent)
    const readabilityScore = calculateFleschReadingEase(textContent)
    const readability = getReadabilityLevel(readabilityScore)
    const keywordAnalysis = analyzeKeywordRelevance(textContent, keywords.primary, keywords.secondary)
    
    return {
      textContent,
      wordCount,
      sentenceCount,
      readabilityScore,
      readability,
      keywordAnalysis
    }
  }, [content, stripHtml, countSentences, calculateFleschReadingEase, getReadabilityLevel, analyzeKeywordRelevance, keywords])

  // Enhanced SEO analysis with professional scoring
  const analyzeCompleteSEO = useCallback(() => {
    const { textContent, wordCount, sentenceCount, readabilityScore, readability, keywordAnalysis } = contentAnalysis

    let totalScore = 0
    const basicChecks = []
    const additionalChecks = []
    const titleReadabilityChecks = []
    const contentReadabilityChecks = []

    // === PROFESSIONAL SEO SCORING ===
    
    // 1. Primary Keyword in Title (25 points)
    const titleHasKeyword = keywords.primary && title && 
      title.toLowerCase().includes(keywords.primary.toLowerCase())
    const titleKeywordPosition = keywords.primary && title ? 
      title.toLowerCase().indexOf(keywords.primary.toLowerCase()) : -1
    
    basicChecks.push({
      text: !keywords.primary ? 'Add a primary focus keyword' :
            titleKeywordPosition === 0 ? `Perfect! Primary keyword "${keywords.primary}" at title start` :
            titleHasKeyword ? `Good! Primary keyword "${keywords.primary}" found in title` :
            `Add primary keyword "${keywords.primary}" to title`,
      status: !keywords.primary ? 'error' :
              titleKeywordPosition === 0 ? 'good' :
              titleHasKeyword ? 'good' : 'error',
      icon: (!keywords.primary || !titleHasKeyword) ? AlertCircle : CheckCircle
    })
    if (titleKeywordPosition === 0) totalScore += 25
    else if (titleHasKeyword) totalScore += 20

    // 2. Keyword Density & Distribution (20 points) [web:221][web:224]
    if (keywords.primary && textContent) {
      const { density, distribution, primaryCount } = keywordAnalysis
      const idealDensity = density >= 0.5 && density <= 2.5
      const goodDistribution = distribution >= 30
      
      basicChecks.push({
        text: `Keyword analysis: ${primaryCount} mentions, ${density.toFixed(1)}% density, ${distribution.toFixed(0)}% distribution`,
        status: idealDensity && goodDistribution ? 'good' : 
                idealDensity || goodDistribution ? 'warning' : 'error',
        icon: idealDensity && goodDistribution ? CheckCircle : AlertCircle
      })
      
      if (idealDensity && goodDistribution) totalScore += 20
      else if (idealDensity || goodDistribution) totalScore += 12
    }

    // 3. Secondary Keywords Usage (15 points) [web:221][web:233]
    if (keywords.secondary.length > 0) {
      const secondaryUsage = keywords.secondary.filter(keyword =>
        textContent.toLowerCase().includes(keyword.toLowerCase())
      ).length
      const usageRatio = secondaryUsage / keywords.secondary.length
      
      basicChecks.push({
        text: `Secondary keywords: ${secondaryUsage}/${keywords.secondary.length} used effectively`,
        status: usageRatio >= 0.7 ? 'good' : usageRatio >= 0.4 ? 'warning' : 'error',
        icon: usageRatio >= 0.7 ? CheckCircle : AlertCircle
      })
      
      if (usageRatio >= 0.7) totalScore += 15
      else if (usageRatio >= 0.4) totalScore += 10
    }

    // 4. Content Quality & Length (20 points)
    const qualityScore = 
      wordCount >= 800 && wordCount <= 2500 ? 20 :
      wordCount >= 500 && wordCount < 800 ? 15 :
      wordCount >= 300 && wordCount < 500 ? 10 :
      wordCount > 2500 ? 12 : 0
    
    basicChecks.push({
      text: `Content quality: ${wordCount} words ${
        wordCount >= 800 && wordCount <= 2500 ? '(Excellent depth)' :
        wordCount >= 500 ? '(Good length)' :
        wordCount >= 300 ? '(Adequate, but could be longer)' :
        wordCount > 2500 ? '(Very comprehensive, consider breaking up)' :
        '(Too short for SEO effectiveness)'
      }`,
      status: qualityScore >= 15 ? 'good' : qualityScore >= 10 ? 'warning' : 'error',
      icon: qualityScore >= 15 ? CheckCircle : AlertCircle
    })
    totalScore += qualityScore

    // 5. Meta Description Quality (10 points) [web:226][web:236]
    const metaDescription = generateMetaDescription(title, content, keywords.primary, keywords.secondary)
    const metaLength = metaDescription.length
    const hasKeywordInMeta = keywords.primary && 
      metaDescription.toLowerCase().includes(keywords.primary.toLowerCase())
    const idealLength = metaLength >= 120 && metaLength <= 158 // Updated 2025 standards
    
    basicChecks.push({
      text: `Meta description: ${metaLength} chars, ${hasKeywordInMeta ? 'includes' : 'missing'} primary keyword`,
      status: hasKeywordInMeta && idealLength ? 'good' : 
              hasKeywordInMeta || idealLength ? 'warning' : 'error',
      icon: hasKeywordInMeta && idealLength ? CheckCircle : AlertCircle
    })
    if (hasKeywordInMeta && idealLength) totalScore += 10
    else if (hasKeywordInMeta || idealLength) totalScore += 6

    // 6. URL Optimization (10 points)
    const urlSlug = generateUrl(title)
    const urlHasKeyword = keywords.primary && 
      urlSlug.toLowerCase().includes(keywords.primary.toLowerCase().replace(/\s+/g, '-'))
    
    basicChecks.push({
      text: urlHasKeyword ? 'URL slug includes primary keyword' : 'Add primary keyword to URL slug',
      status: urlHasKeyword ? 'good' : 'error',
      icon: urlHasKeyword ? CheckCircle : AlertCircle
    })
    if (urlHasKeyword) totalScore += 10

    // === TECHNICAL SEO ANALYSIS ===
    
    // Heading Structure Analysis
    const h1Count = (content?.match(/<h1[^>]*>/gi) || []).length
    const h2Count = (content?.match(/<h2[^>]*>/gi) || []).length
    const h3Count = (content?.match(/<h3[^>]*>/gi) || []).length
    
    additionalChecks.push({
      text: h1Count === 1 ? 'Perfect H1 structure (exactly 1 H1)' : 
            h1Count === 0 ? 'Missing H1 heading' :
            `Too many H1 tags (${h1Count} found)`,
      status: h1Count === 1 ? 'good' : 'error',
      icon: h1Count === 1 ? CheckCircle : AlertCircle
    })

    additionalChecks.push({
      text: h2Count >= 2 ? `Excellent structure (${h2Count} H2 headings)` :
            h2Count === 1 ? `Good structure (1 H2, consider more)` :
            'Add H2 headings for better organization',
      status: h2Count >= 2 ? 'good' : h2Count === 1 ? 'warning' : 'error',
      icon: h2Count >= 2 ? CheckCircle : AlertCircle
    })

    // Advanced Link Analysis
    const linkRegex = /<a[^>]*href\s*=\s*["']([^"']*)["'][^>]*>/gi
    const allLinks = [...(content?.matchAll(linkRegex) || [])]
    const externalLinks = allLinks.filter(match => 
      match[1].startsWith('http') && !match[1].includes('sns-ihub.com')
    ).length
    const internalLinks = allLinks.length - externalLinks

    additionalChecks.push({
      text: allLinks.length >= 3 ? 
        `Strong link profile: ${allLinks.length} total (${internalLinks} internal, ${externalLinks} external)` :
        `Weak link profile: ${allLinks.length} total links (add more)`,
      status: allLinks.length >= 3 ? 'good' : 'error',
      icon: allLinks.length >= 3 ? CheckCircle : AlertCircle
    })

    // Image SEO Analysis
    const imageCount = (content?.match(/<img[^>]*>/gi) || []).length
    const imagesWithAlt = (content?.match(/<img[^>]*alt\s*=\s*["'][^"']*["'][^>]*>/gi) || []).length
    
    if (imageCount > 0) {
      additionalChecks.push({
        text: imagesWithAlt === imageCount ? 
          `Perfect! All ${imageCount} images have alt text` : 
          `${imagesWithAlt}/${imageCount} images have alt text`,
        status: imagesWithAlt === imageCount ? 'good' : 'error',
        icon: imagesWithAlt === imageCount ? CheckCircle : AlertCircle
      })
    }

    // === TITLE OPTIMIZATION ===
    
    if (title) {
      const titleLength = title.length
      const titleWords = title.split(/\s+/).length
      
      // Title length analysis [web:226][web:231]
      titleReadabilityChecks.push({
        text: titleLength >= 50 && titleLength <= 60 ? 
          `Perfect title length (${titleLength} characters)` : 
          titleLength < 50 ? `Title too short (${titleLength} chars, aim for 50-60)` :
          titleLength <= 70 ? `Title acceptable (${titleLength} chars, but 50-60 is ideal)` :
          `Title too long (${titleLength} chars, may be truncated)`,
        status: titleLength >= 50 && titleLength <= 60 ? 'good' :
                titleLength >= 40 && titleLength <= 70 ? 'warning' : 'error',
        icon: titleLength >= 50 && titleLength <= 60 ? CheckCircle : AlertCircle
      })

      // Power words and numbers analysis
      const hasNumbers = /\d/.test(title)
      const powerWords = /\b(best|top|ultimate|complete|guide|essential|proven|expert|advanced|professional|master|comprehensive)\b/i.test(title)
      const actionWords = /\b(how|why|what|when|where|learn|discover|build|create|improve)\b/i.test(title)
      
      titleReadabilityChecks.push({
        text: (hasNumbers && powerWords) ? 'Excellent! Title has numbers and power words' :
              hasNumbers ? 'Good! Title contains numbers' :
              powerWords ? 'Good! Title contains power words' :
              'Add numbers or power words to improve CTR',
        status: (hasNumbers && powerWords) ? 'good' : 
                (hasNumbers || powerWords) ? 'warning' : 'error',
        icon: (hasNumbers || powerWords) ? CheckCircle : AlertCircle
      })
    }

    // === CONTENT READABILITY ===
    
    if (textContent) {
      const avgSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0
      
      contentReadabilityChecks.push({
        text: `Readability: ${readability.level} (${readabilityScore.toFixed(1)} Flesch score, ${readability.grade})`,
        status: readability.status,
        icon: readability.status === 'good' ? CheckCircle : AlertCircle
      })

      contentReadabilityChecks.push({
        text: avgSentenceLength <= 20 ? 
          `Sentence length excellent (avg ${avgSentenceLength.toFixed(1)} words)` : 
          `Sentences too long (avg ${avgSentenceLength.toFixed(1)} words)`,
        status: avgSentenceLength <= 20 ? 'good' : 'error',
        icon: avgSentenceLength <= 20 ? CheckCircle : AlertCircle
      })

      // Transition words analysis
      const transitionWords = /\b(however|therefore|furthermore|moreover|additionally|consequently|meanwhile|nonetheless|nevertheless|thus|hence|accordingly|for example|in addition|as a result)\b/gi
      const transitionCount = (textContent.match(transitionWords) || []).length
      const transitionRatio = transitionCount / Math.max(1, sentenceCount)
      
      contentReadabilityChecks.push({
        text: transitionRatio >= 0.1 ? 
          `Excellent flow (${transitionCount} transition words)` : 
          `Add transition words for better flow (${transitionCount} found)`,
        status: transitionRatio >= 0.1 ? 'good' : 'warning',
        icon: transitionRatio >= 0.1 ? CheckCircle : AlertCircle
      })
    }

    // Generate enhanced preview
    const preview = {
      title: title || 'Your Professional Blog Post Title',
      description: generateMetaDescription(title, content, keywords.primary, keywords.secondary),
      url: generateUrl(title)
    }

    setSeoData({
      score: Math.min(100, totalScore),
      basicChecks,
      additionalChecks,
      titleReadability: titleReadabilityChecks,
      contentReadability: contentReadabilityChecks,
      preview
    })
  }, [contentAnalysis, title, keywords, content, generateMetaDescription, generateUrl])

  // Debounced analysis for performance
  useEffect(() => {
    const timeoutId = setTimeout(analyzeCompleteSEO, 300)
    return () => clearTimeout(timeoutId)
  }, [analyzeCompleteSEO])

  // Keyword management functions
  const addSecondaryKeyword = useCallback((keyword) => {
    if (keyword.trim() && !keywords.secondary.includes(keyword.trim())) {
      setKeywords(prev => ({
        ...prev,
        secondary: [...prev.secondary, keyword.trim()]
      }))
    }
  }, [keywords.secondary])

  const removeSecondaryKeyword = useCallback((index) => {
    setKeywords(prev => ({
      ...prev,
      secondary: prev.secondary.filter((_, i) => i !== index)
    }))
  }, [])

  // Snippet editing functions
  const startEditingSnippet = useCallback(() => {
    setEditMode({
      snippet: true,
      title: seoData.preview.title,
      description: seoData.preview.description,
      url: seoData.preview.url
    })
  }, [seoData.preview])

  const saveSnippetEdits = useCallback(() => {
    setSeoData(prev => ({
      ...prev,
      preview: {
        title: editMode.title,
        description: editMode.description,
        url: editMode.url
      }
    }))
    setEditMode({ snippet: false, title: '', description: '', url: '' })
    
    // Update the actual title if changed
    if (onTitleChange && editMode.title !== title) {
      onTitleChange(editMode.title)
    }
  }, [editMode, title, onTitleChange])

  const cancelSnippetEdits = useCallback(() => {
    setEditMode({ snippet: false, title: '', description: '', url: '' })
  }, [])

  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }, [])

  const getErrorCount = useCallback((checks) => {
    return checks.filter(check => check.status === 'error').length
  }, [])

  const getScoreColor = useCallback((score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }, [])

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-300 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-gray-700">Professional SEO Analyzer</h4>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(seoData.score)} bg-white border`}>
            {seoData.score}/100
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Enhanced Preview Section with Editing */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-sm font-medium text-gray-700">Search Preview</h5>
            {!editMode.snippet ? (
              <button 
                onClick={startEditingSnippet}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
              >
                <Edit2 size={14} />
                <span>Edit</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button 
                  onClick={saveSnippetEdits}
                  className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm"
                >
                  <Save size={14} />
                  <span>Save</span>
                </button>
                <button 
                  onClick={cancelSnippetEdits}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm"
                >
                  <X size={14} />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            {editMode.snippet ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={editMode.title}
                    onChange={(e) => setEditMode(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    maxLength={70}
                  />
                  <div className="text-xs text-gray-500 mt-1">{editMode.title.length}/70 characters</div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="text"
                    value={editMode.url}
                    onChange={(e) => setEditMode(prev => ({ ...prev, url: e.target.value }))}
                    className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editMode.description}
                    onChange={(e) => setEditMode(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    rows={3}
                    maxLength={160}
                  />
                  <div className="text-xs text-gray-500 mt-1">{editMode.description.length}/160 characters</div>
                </div>
              </div>
            ) : (
              <>
                <div className="text-blue-700 text-lg font-medium mb-1 hover:underline cursor-pointer">
                  {seoData.preview.title}
                </div>
                <div className="text-green-700 text-sm mb-2 flex items-center">
                  <ExternalLink size={12} className="mr-1" />
                  {seoData.preview.url}
                </div>
                <div className="text-gray-700 text-sm">
                  {seoData.preview.description}
                </div>
                <div className="mt-3 text-xs text-gray-500 border-t pt-2">
                  Meta description: {seoData.preview.description.length}/160 characters
                </div>
              </>
            )}
          </div>
        </div>

        {/* Enhanced Multi-Keyword System */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Focus Keyword
            </label>
            <input
              type="text"
              placeholder="e.g., React Hooks"
              value={keywords.primary}
              onChange={(e) => setKeywords(prev => ({ ...prev, primary: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Secondary Keywords ({keywords.secondary.length}/5)
              </label>
            </div>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add secondary keyword..."
                  className="flex-1 p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim() && keywords.secondary.length < 5) {
                      addSecondaryKeyword(e.target.value)
                      e.target.value = ''
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = e.target.parentElement.querySelector('input')
                    if (input.value.trim() && keywords.secondary.length < 5) {
                      addSecondaryKeyword(input.value)
                      input.value = ''
                    }
                  }}
                  className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  disabled={keywords.secondary.length >= 5}
                >
                  <Plus size={16} />
                </button>
              </div>
              {keywords.secondary.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {keywords.secondary.map((keyword, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {keyword}
                      <button
                        onClick={() => removeSecondaryKeyword(index)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced SEO Analysis Sections */}
        {[
          { key: 'basic', label: 'Core SEO', checks: seoData.basicChecks },
          { key: 'additional', label: 'Technical SEO', checks: seoData.additionalChecks },
          { key: 'titleReadability', label: 'Title Optimization', checks: seoData.titleReadability },
          { key: 'contentReadability', label: 'Content Quality', checks: seoData.contentReadability }
        ].map(section => (
          <div key={section.key}>
            <div 
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => toggleSection(section.key)}
            >
              <div className="flex items-center space-x-3">
                <span className="font-medium text-gray-900">{section.label}</span>
                {section.checks.length > 0 && (
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    getErrorCount(section.checks) === 0 ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {getErrorCount(section.checks) === 0 ? 'Perfect' : `${getErrorCount(section.checks)} Issues`}
                  </span>
                )}
              </div>
              <ChevronDown 
                size={18} 
                className={`transform transition-transform text-gray-400 ${
                  expandedSections[section.key] ? 'rotate-180' : ''
                }`}
              />
            </div>
            
            {expandedSections[section.key] && (
              <div className="mt-2 space-y-1 pl-3">
                {section.checks.map((check, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <check.icon 
                      size={16} 
                      className={`mt-0.5 flex-shrink-0 ${
                        check.status === 'good' ? 'text-green-500' : 
                        check.status === 'warning' ? 'text-amber-500' : 'text-red-500'
                      }`} 
                    />
                    <span className="text-sm text-gray-700 flex-1 leading-relaxed">{check.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Professional Summary */}
        {seoData.score > 0 && (
          <div className={`p-4 rounded-lg border-l-4 ${
            seoData.score >= 80 ? 'bg-green-50 border-green-400' :
            seoData.score >= 60 ? 'bg-yellow-50 border-yellow-400' :
            'bg-red-50 border-red-400'
          }`}>
            <h4 className={`font-medium mb-2 ${
              seoData.score >= 80 ? 'text-green-800' :
              seoData.score >= 60 ? 'text-yellow-800' :
              'text-red-800'
            }`}>
              SEO Analysis Summary
            </h4>
            <p className={`text-sm ${
              seoData.score >= 80 ? 'text-green-700' :
              seoData.score >= 60 ? 'text-yellow-700' :
              'text-red-700'
            }`}>
              {seoData.score >= 80 ? 'Excellent! Your content is well-optimized for search engines.' :
               seoData.score >= 60 ? 'Good foundation. Address the highlighted issues for better performance.' :
               'Needs improvement. Focus on the critical issues for better SEO results.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogSEOAnalyzer
