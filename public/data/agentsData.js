export default {
foundational:[
{
  id: "doc-knowledge",
  name: "Document & Knowledge Management",
  description: "Manage documents and knowledge with processing, retrieval, and maintenance.",
  image: "images/document_know.jpg",
  subCategories: [
    {
      id: "document-processing",
      name: "Document Processing",
      description: "Classify, OCR, parse, and extract entities from documents.",
      image: "/undraw_add-document_oqbr.png",
      agents: [
        {
          id: "deep-research-agent",
          name: "Deep Research Agent",
          summary: "Classify and route documents to specialized processing pipelines.",
          image: "/placeholder.jpg",
          solutions: [
            "Multi-label classification",
            "Confidence thresholds & fallback",
            "Confidence thresholds & fallback",
            "Routing to specialized pipelines",
            "Routing to specialized pipelines",
            "Routing to specialized pipelines",
          ],
          useCases: [
            "Legal vs. financial vs. medical sorting",
            "Mailbox triage",
            "Back-office intake automation",
            "Back-office intake automation",
            "Back-office intake automation",
            "Back-office intake automation",
          ]
        },
        {
          id: "ocr-agent",
          name: "OCR (Optical Character Recognition) Agent",
          summary: "High fidelity OCR with layout awareness and language support.",
          image: "/placeholder.jpg",
          solutions: ["Printed & handwritten OCR", "Layout blocks", "Language detection"],
          useCases: ["Scan ingestion", "Forms digitization", "Archival search"]
        },
        {
          id: "handwriting-recognition",
          name: "Handwriting Recognition Agent",
          summary: "Extract handwritten content from notes and forms.",
          image: "/placeholder.jpg",
          solutions: ["Stroke modeling", "Confidence scoring", "Inline corrections"],
          useCases: ["Clinical notes", "Delivery slips", "Service reports"]
        },
        {
          id: "parsing-extraction",
          name: "Document Parsing & Extraction Agent",
          summary: "Parse structured fields and tables into typed JSON.",
          image: "/placeholder.jpg",
          solutions: ["Layout + semantic parsing", "Table extraction", "Schema validation"],
          useCases: ["Invoices", "Contracts", "Receipts"]
        },
        {
          id: "entity-recognition",
          name: "Entity Recognition Agent",
          summary: "Detect and normalize entities like people, orgs, and amounts.",
          image: "/placeholder.jpg",
          solutions: ["NER + normalization", "Deduplication", "Linking to KB"],
          useCases: ["KYC", "Document analytics", "Content tagging"]
        }
      ]
    },
    {
      id: "contract-review",
      name: "Contract/Document Review",
      description: "Automated review of legal and business documents for risks, clauses, and obligations.",
      image: "images/summarization.jpg",
      agents: [
        {
          id: "clause-detection",
          name: "Clause Detection Agent",
          summary: "Identify critical clauses and obligations in contracts.",
          image: "/placeholder.jpg",
          solutions: ["Legal NLP models", "Clause libraries", "Risk scoring"],
          useCases: ["Contract approval workflows", "Compliance validation", "Vendor management"]
        },
        {
          id: "risk-assessment",
          name: "Risk Assessment Agent",
          summary: "Highlight risky terms and missing clauses.",
          image: "/placeholder.jpg",
          solutions: ["Heuristic + ML models", "Legal benchmarks", "Deviation detection"],
          useCases: ["Negotiation support", "Legal compliance", "Procurement reviews"]
        }
      ]
    },
    {
      id: "policy-validation",
      name: "Policy Checking & Validation",
      description: "Validate compliance with internal or external policies.",
      image: "/placeholder.jpg",
      agents: [
        {
          id: "policy-matching",
          name: "Policy Matching Agent",
          summary: "Map documents against corporate or regulatory policies.",
          image: "/placeholder.jpg",
          solutions: ["Policy libraries", "Semantic similarity", "Deviation alerts"],
          useCases: ["HR policy compliance", "Finance audits", "IT governance"]
        },
        {
          id: "regulation-check",
          name: "Regulation Check Agent",
          summary: "Check adherence to industry standards and laws.",
          image: "/placeholder.jpg",
          solutions: ["Rule-based + ML checks", "Cross-reference with standards", "Auto-updated regulation DB"],
          useCases: ["GDPR validation", "HIPAA compliance", "SOX audits"]
        }
      ]
    },
    {
      id: "knowledge-retrieval",
      name: "Knowledge Retrieval & Search",
      description: "Efficient retrieval of knowledge from structured and unstructured sources.",
      image: "/placeholder.jpg",
      agents: [
        {
          id: "semantic-search",
          name: "Semantic Search Agent",
          summary: "Retrieve information using semantic similarity and context.",
          image: "/placeholder.jpg",
          solutions: ["Vector embeddings", "Dense retrieval", "Contextual ranking"],
          useCases: ["Enterprise search", "FAQ retrieval", "Legal discovery"]
        },
        {
          id: "contextual-rag",
          name: "RAG Knowledge Agent",
          summary: "Combine retrieval with generation for contextual answers.",
          image: "/placeholder.jpg",
          solutions: ["Hybrid retrieval", "LLM integration", "Context grounding"],
          useCases: ["Chatbots", "Research assistants", "Decision support"]
        }
      ]
    },
    {
      id: "knowledge-maintenance",
      name: "Knowledge Base Maintenance",
      description: "Keep organizational knowledge bases clean, updated, and structured.",
      image: "/placeholder.jpg",
      agents: [
        {
          id: "content-curation",
          name: "Content Curation Agent",
          summary: "Filter and curate knowledge base entries.",
          image: "/placeholder.jpg",
          solutions: ["Relevance scoring", "Duplication removal", "Update suggestions"],
          useCases: ["Internal wiki upkeep", "Customer support KB", "Research libraries"]
        },
        {
          id: "auto-update",
          name: "Knowledge Update Agent",
          summary: "Automatically ingest and update new content into KBs.",
          image: "/placeholder.jpg",
          solutions: ["Scheduled ingestion", "Version control", "Entity alignment"],
          useCases: ["Technical documentation", "Product updates", "Compliance libraries"]
        }
      ]
    },
    {
      id: "note-summarization",
      name: "Note-Taking & Summarization",
      description: "Generate summaries, notes, and highlights from long content.",
      image: "/placeholder.jpg",
      agents: [
        {
          id: "meeting-summarizer",
          name: "Meeting Summarization Agent",
          summary: "Convert meeting transcripts into structured notes.",
          image: "/placeholder.jpg",
          solutions: ["ASR + NLP", "Key-point extraction", "Action item detection"],
          useCases: ["Business meetings", "Classroom lectures", "Workshops"]
        },
        {
          id: "highlight-extractor",
          name: "Highlight Extraction Agent",
          summary: "Extract key highlights from large documents.",
          image: "/placeholder.jpg",
          solutions: ["Keyword extraction", "Abstractive summarization", "Topic clustering"],
          useCases: ["Research papers", "Books", "Reports"]
        }
      ]
    },
    {
      id: "knowledge-graph",
      name: "Knowledge Graph / Entity Linking",
      description: "Build and maintain knowledge graphs with linked entities and relationships.",
      image: "/placeholder.jpg",
      agents: [
        {
          id: "entity-linking",
          name: "Entity Linking Agent",
          summary: "Link extracted entities to canonical knowledge bases.",
          image: "/placeholder.jpg",
          solutions: ["NER + linking", "Ontology mapping", "Disambiguation"],
          useCases: ["KYC systems", "Research knowledge graphs", "Customer 360"]
        },
        {
          id: "relationship-extraction",
          name: "Relationship Extraction Agent",
          summary: "Identify relationships between entities and build graphs.",
          image: "/placeholder.jpg",
          solutions: ["Relation extraction models", "Graph storage", "Knowledge updates"],
          useCases: ["Fraud detection", "Healthcare graphs", "Supply chain insights"]
        },
      ],
    },
  ],
},

  {
    id: "summarization",
    name: "Summarization & Content Handling",
    description: "Turn long content into concise, actionable briefs.",
    image: "images/summarization.jpg",
    subCategories: [
      {
        id: "content-summarization",
        name: "Content Summarization",
        description: "Extract key insights and create concise summaries from various content types.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "general-text-summarizer",
            name: "General Text Summarization Agent",
            summary: "Create comprehensive summaries of any text content with customizable length and style.",
            image: "/placeholder.jpg",
            solutions: ["Multi-format support", "Customizable length", "Style adaptation"],
            useCases: ["Document summarization", "Content review", "Information extraction"]
          },
          {
            id: "extractive-summarizer",
            name: "Extractive Summarization Agent",
            summary: "Extract key sentences and phrases directly from source content to create summaries.",
            image: "/placeholder.jpg",
            solutions: ["Key sentence extraction", "Phrase identification", "Source preservation"],
            useCases: ["Research papers", "Legal documents", "Technical reports"]
          },
          {
            id: "abstractive-summarizer",
            name: "Abstractive Summarization Agent",
            summary: "Generate new, concise summaries by understanding and rephrasing the original content.",
            image: "/placeholder.jpg",
            solutions: ["Content understanding", "Rephrasing generation", "Coherent summaries"],
            useCases: ["News articles", "Blog posts", "Marketing content"]
          },
          {
            id: "headline-title-generator",
            name: "Headline/Title Generator Agent",
            summary: "Generate compelling headlines and titles that capture the essence of content.",
            image: "/placeholder.jpg",
            solutions: ["SEO optimization", "Engagement focus", "Brand consistency"],
            useCases: ["Article titles", "Email subject lines", "Social media posts"]
          }
        ]
      },
      {
        id: "meeting-minutes-generator",
        name: "Meeting Minutes Generator",
        description: "Automatically generate structured meeting notes and action items.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "meeting-transcriber",
            name: "Meeting Transcriber Agent",
            summary: "Convert meeting audio to structured text with speaker identification.",
            image: "/placeholder.jpg",
            solutions: ["Real-time transcription", "Speaker diarization", "Timestamp alignment"],
            useCases: ["Business meetings", "Conference calls", "Training sessions"]
          },
          {
            id: "action-item-extractor",
            name: "Action Item Extractor Agent",
            summary: "Identify and track action items, deadlines, and responsibilities.",
            image: "/placeholder.jpg",
            solutions: ["Task identification", "Assignee detection", "Deadline extraction"],
            useCases: ["Project management", "Team coordination", "Follow-up tracking"]
          },
          {
            id: "decision-logger",
            name: "Decision Logger Agent",
            summary: "Document key decisions and their rationale from meetings.",
            image: "/placeholder.jpg",
            solutions: ["Decision point detection", "Rationale extraction", "Vote tracking"],
            useCases: ["Board meetings", "Strategy sessions", "Policy discussions"]
          }
        ]
      },
      {
        id: "feedback-categorization",
        name: "Feedback Categorization",
        description: "Organize and analyze feedback from various sources for actionable insights.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "feedback-collector",
            name: "Feedback Collector Agent",
            summary: "Collect and aggregate feedback from multiple sources and channels.",
            image: "/placeholder.jpg",
            solutions: ["Multi-source collection", "Data aggregation", "Feedback consolidation"],
            useCases: ["Customer surveys", "Product feedback", "Service reviews"]
          },
          {
            id: "language-detector",
            name: "Language Detection Agent",
            summary: "Detect and categorize feedback by language for global analysis.",
            image: "/placeholder.jpg",
            solutions: ["Language identification", "Multi-language support", "Regional analysis"],
            useCases: ["International feedback", "Localization analysis", "Global customer insights"]
          },
          {
            id: "sentiment-analyzer",
            name: "Sentiment Analysis Agent",
            summary: "Analyze sentiment and emotional tone in feedback for deeper insights.",
            image: "/placeholder.jpg",
            solutions: ["Sentiment scoring", "Emotion detection", "Trend analysis"],
            useCases: ["Customer satisfaction", "Brand perception", "Product sentiment"]
          }
        ]
      },
      {
        id: "content-generation-text",
        name: "Content Generation (Text)",
        description: "Generate high-quality text content for various purposes and audiences.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "social-media-content-generator",
            name: "Social Media Content Generator Agent",
            summary: "Generate engaging social media posts and content for various platforms.",
            image: "/placeholder.jpg",
            solutions: ["Platform optimization", "Engagement focus", "Trend integration"],
            useCases: ["Social media marketing", "Brand content", "Community engagement"]
          },
          {
            id: "ad-copy-generator",
            name: "Ad Copy Generator Agent",
            summary: "Create compelling advertising copy for various media channels.",
            image: "/placeholder.jpg",
            solutions: ["Persuasive writing", "CTA optimization", "Audience targeting"],
            useCases: ["Digital advertising", "Print ads", "Marketing campaigns"]
          },
          {
            id: "email-marketing-agent",
            name: "Email Marketing Agent",
            summary: "Generate effective email marketing content and campaigns.",
            image: "/placeholder.jpg",
            solutions: ["Campaign creation", "Personalization", "A/B testing"],
            useCases: ["Email marketing", "Newsletter creation", "Lead nurturing"]
          },
          {
            id: "product-description-generator",
            name: "Product Description Generator Agent",
            summary: "Create compelling product descriptions and marketing copy.",
            image: "/placeholder.jpg",
            solutions: ["Feature highlighting", "Benefit focus", "SEO optimization"],
            useCases: ["E-commerce", "Product catalogs", "Marketing materials"]
          }
        ]
      },
      {
        id: "creative-writing-ideation",
        name: "Creative Writing & Ideation",
        description: "Generate creative content and develop innovative ideas.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "ideation-research-agent",
            name: "Ideation & Research Agent",
            summary: "Conduct research and generate creative ideas for content and projects.",
            image: "/placeholder.jpg",
            solutions: ["Market research", "Trend analysis", "Idea generation"],
            useCases: ["Content planning", "Product development", "Creative projects"]
          },
          {
            id: "concept-development-agent",
            name: "Concept Development Agent",
            summary: "Develop and refine creative concepts and ideas into actionable plans.",
            image: "/placeholder.jpg",
            solutions: ["Concept refinement", "Strategy development", "Implementation planning"],
            useCases: ["Campaign development", "Product ideation", "Creative strategy"]
          },
          {
            id: "drafting-agent",
            name: "Drafting Agent",
            summary: "Create initial drafts and rough content for creative projects.",
            image: "/placeholder.jpg",
            solutions: ["Rough drafting", "Content creation", "Structure development"],
            useCases: ["Content creation", "Creative writing", "Project development"]
          },
          {
            id: "editing-agent",
            name: "Editing Agent",
            summary: "Review, refine, and polish creative content for final delivery.",
            image: "/placeholder.jpg",
            solutions: ["Content refinement", "Quality assurance", "Style consistency"],
            useCases: ["Content editing", "Quality control", "Final review"]
          }
        ]
      },
      {
        id: "brainstorming-assistant",
        name: "Brainstorming Assistant",
        description: "Facilitate creative thinking and collaborative idea generation.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "idea-generator-agent",
            name: "Idea Generator Agent",
            summary: "Generate diverse ideas and solutions for creative challenges and problems.",
            image: "/placeholder.jpg",
            solutions: ["Divergent thinking", "Idea exploration", "Creative frameworks"],
            useCases: ["Product development", "Problem solving", "Innovation sessions"]
          },
          {
            id: "problem-reframing-agent",
            name: "Problem Reframing Agent",
            summary: "Reframe problems from different perspectives to unlock new solutions.",
            image: "/placeholder.jpg",
            solutions: ["Perspective shifting", "Problem analysis", "Solution pathways"],
            useCases: ["Strategic planning", "Innovation challenges", "Complex problem solving"]
          },
          {
            id: "mind-mapping-agent",
            name: "Mind Mapping Agent",
            summary: "Create visual mind maps and concept connections for idea organization.",
            image: "/placeholder.jpg",
            solutions: ["Visual mapping", "Concept organization", "Relationship mapping"],
            useCases: ["Project planning", "Knowledge organization", "Learning facilitation"]
          },
          {
            id: "scamper-method-agent",
            name: "SCAMPER Method Agent",
            summary: "Apply SCAMPER technique (Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse) for creative problem solving.",
            image: "/placeholder.jpg",
            solutions: ["SCAMPER framework", "Creative techniques", "Innovation methods"],
            useCases: ["Product innovation", "Process improvement", "Creative problem solving"]
          }
        ]
      }
    ]
  },
  {
    id: "communication-assistance",
    name: "Communication & Assistance",
    description: "Conversational assistance and automation.",
    image: "images/communication.jpg",
    subCategories: [
      {
        id: "live-chat-assistance",
        name: "Live Chat Assistance",
        description: "Real-time conversational support and customer service automation.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "chat-support-bot",
            name: "Live Chat Support Agent",
            summary: "Provide instant customer support with context-aware responses.",
            image: "/placeholder.jpg",
            solutions: ["Real-time messaging", "Context preservation", "Escalation routing"],
            useCases: ["E-commerce support", "Technical assistance", "Product inquiries"]
          },
          {
            id: "conversation-manager",
            name: "Conversation Manager Agent",
            summary: "Orchestrate multi-turn conversations with memory and context.",
            image: "/placeholder.jpg",
            solutions: ["Conversation state tracking", "Intent recognition", "Response generation"],
            useCases: ["Customer onboarding", "Troubleshooting flows", "Appointment booking"]
          }
        ]
      },
      {
        id: "customer-support-faq",
        name: "Customer Support (FAQ Bots)",
        description: "Automated FAQ handling and knowledge-based customer support.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "faq-bot",
            name: "FAQ Bot Agent",
            summary: "Answer common questions using knowledge base and semantic search.",
            image: "/placeholder.jpg",
            solutions: ["Knowledge base integration", "Semantic matching", "Confidence scoring"],
            useCases: ["Product support", "Policy questions", "Service information"]
          },
          {
            id: "support-triage",
            name: "Support Triage Agent",
            summary: "Route customer inquiries to appropriate support channels.",
            image: "/placeholder.jpg",
            solutions: ["Issue classification", "Priority scoring", "Channel routing"],
            useCases: ["Support ticket routing", "Escalation management", "Resource allocation"]
          }
        ]
      },
      {
        id: "conversation-routing",
        name: "Conversation Routing",
        description: "Intelligent routing of conversations to appropriate agents or systems.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "intent-router",
            name: "Intent Router Agent",
            summary: "Route conversations based on user intent and context.",
            image: "/placeholder.jpg",
            solutions: ["Intent classification", "Skill matching", "Load balancing"],
            useCases: ["Call center routing", "Chat distribution", "Support escalation"]
          },
          {
            id: "conversation-analyzer",
            name: "Conversation Analyzer Agent",
            summary: "Analyze conversation patterns for optimal routing decisions.",
            image: "/placeholder.jpg",
            solutions: ["Sentiment analysis", "Complexity assessment", "Agent skill mapping"],
            useCases: ["Quality assurance", "Training optimization", "Performance monitoring"]
          }
        ]
      },
      {
        id: "email-management",
        name: "Email Management",
        description: "Automated email processing, categorization, and response generation.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "email-classifier",
            name: "Email Classification Agent",
            summary: "Categorize and prioritize incoming emails automatically.",
            image: "/placeholder.jpg",
            solutions: ["Email categorization", "Priority scoring", "Spam detection"],
            useCases: ["Customer service", "Sales inquiries", "Support tickets"]
          },
          {
            id: "email-responder",
            name: "Email Response Agent",
            summary: "Generate contextual email responses and follow-ups.",
            image: "/placeholder.jpg",
            solutions: ["Template generation", "Personalization", "Follow-up scheduling"],
            useCases: ["Customer inquiries", "Appointment confirmations", "Status updates"]
          }
        ]
      },
      {
        id: "notification-alerting",
        name: "Notification & Alerting",
        description: "Intelligent notification systems with personalized delivery.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "smart-notifier",
            name: "Smart Notification Agent",
            summary: "Send personalized notifications based on user preferences and context.",
            image: "/placeholder.jpg",
            solutions: ["Preference management", "Timing optimization", "Channel selection"],
            useCases: ["App updates", "Security alerts", "Reminder systems"]
          },
          {
            id: "alert-manager",
            name: "Alert Manager Agent",
            summary: "Manage and prioritize alerts with intelligent filtering.",
            image: "/placeholder.jpg",
            solutions: ["Alert aggregation", "Priority scoring", "Escalation rules"],
            useCases: ["System monitoring", "Security incidents", "Business alerts"]
          }
        ]
      },
      {
        id: "voice-text-transcription",
        name: "Voice-to-Text Transcription",
        description: "Convert speech to text with high accuracy and context awareness.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "speech-transcriber",
            name: "Speech Transcription Agent",
            summary: "Convert audio to text with speaker identification and timestamps.",
            image: "/placeholder.jpg",
            solutions: ["Multi-speaker recognition", "Noise reduction", "Timestamp alignment"],
            useCases: ["Meeting recordings", "Call center analytics", "Accessibility services"]
          },
          {
            id: "voice-command-processor",
            name: "Voice Command Processor",
            summary: "Process voice commands for system control and automation.",
            image: "/placeholder.jpg",
            solutions: ["Command recognition", "Intent extraction", "Action execution"],
            useCases: ["Smart home control", "Voice assistants", "Hands-free operation"]
          }
        ]
      },
      {
        id: "text-speech-conversion",
        name: "Text-to-Speech Conversion",
        description: "Convert text to natural-sounding speech with emotion and context.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "tts-generator",
            name: "Text-to-Speech Agent",
            summary: "Generate natural-sounding speech from text content.",
            image: "/placeholder.jpg",
            solutions: ["Voice synthesis", "Emotion control", "Speed adjustment"],
            useCases: ["Audiobooks", "Accessibility tools", "Voice assistants"]
          },
          {
            id: "voice-personalizer",
            name: "Voice Personalization Agent",
            summary: "Customize voice characteristics for different contexts and users.",
            image: "/placeholder.jpg",
            solutions: ["Voice cloning", "Style adaptation", "Language support"],
            useCases: ["Brand voice", "Personal assistants", "Multilingual content"]
          }
        ]
      },
      {
        id: "translation-localization",
        name: "Translation & Localization",
        description: "Translate content and adapt it for different cultures and regions.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "content-translator",
            name: "Content Translation Agent",
            summary: "Translate text content while preserving meaning and context.",
            image: "/placeholder.jpg",
            solutions: ["Multi-language support", "Context preservation", "Quality assurance"],
            useCases: ["Website localization", "Document translation", "Customer support"]
          },
          {
            id: "cultural-adaptor",
            name: "Cultural Adaptation Agent",
            summary: "Adapt content for cultural relevance and local preferences.",
            image: "/placeholder.jpg",
            solutions: ["Cultural context analysis", "Localization rules", "Sensitivity checking"],
            useCases: ["Marketing campaigns", "Product descriptions", "User interfaces"]
          }
        ]
      }
    ]
  },
  {
    id: "business-intelligence",
    name: "Business Intelligence & Analysis",
    description: "Insights, analytics, and forecasting.",
    image: "images/business_intel.jpg",
    subCategories: [
      {
        id: "market-trends-analysis",
        name: "Market Trends Analysis",
        description: "Analyze market dynamics, trends, and competitive landscape for strategic insights.",
        image: "images/business_intel.jpg",
        agents: [
          {
            id: "trend-analyzer",
            name: "Market Trend Analyzer Agent",
            summary: "Identify and analyze emerging market trends and patterns.",
            image: "/placeholder.jpg",
            solutions: ["Pattern recognition", "Time series analysis", "Trend forecasting"],
            useCases: ["Product strategy", "Market entry decisions", "Investment planning"]
          },
          {
            id: "market-researcher",
            name: "Market Research Agent",
            summary: "Conduct comprehensive market research and competitive analysis.",
            image: "/placeholder.jpg",
            solutions: ["Data aggregation", "Competitive benchmarking", "Market sizing"],
            useCases: ["Business planning", "Strategic positioning", "Opportunity assessment"]
          },
          {
            id: "consumer-behavior-analyzer",
            name: "Consumer Behavior Analyzer Agent",
            summary: "Analyze consumer preferences, behaviors, and purchasing patterns.",
            image: "/placeholder.jpg",
            solutions: ["Behavioral analytics", "Segmentation analysis", "Predictive modeling"],
            useCases: ["Marketing strategy", "Product development", "Customer targeting"]
          }
        ]
      },
      {
        id: "financial-analysis",
        name: "Financial Analysis",
        description: "Comprehensive financial data analysis and performance evaluation.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "financial-analyzer",
            name: "Financial Analyzer Agent",
            summary: "Analyze financial statements and performance metrics.",
            image: "/placeholder.jpg",
            solutions: ["Ratio analysis", "Cash flow modeling", "Valuation metrics"],
            useCases: ["Investment analysis", "Credit assessment", "Performance evaluation"]
          },
          {
            id: "profitability-analyzer",
            name: "Profitability Analyzer Agent",
            summary: "Evaluate business profitability and revenue optimization opportunities.",
            image: "/placeholder.jpg",
            solutions: ["Margin analysis", "Cost optimization", "Revenue modeling"],
            useCases: ["Business optimization", "Pricing strategy", "Cost management"]
          },
          {
            id: "investment-analyzer",
            name: "Investment Analyzer Agent",
            summary: "Analyze investment opportunities and portfolio performance.",
            image: "/placeholder.jpg",
            solutions: ["Risk-return analysis", "Portfolio optimization", "Asset allocation"],
            useCases: ["Investment management", "Asset allocation", "Performance tracking"]
          }
        ]
      },
      {
        id: "risk-assessment",
        name: "Risk Assessment",
        description: "Identify, evaluate, and mitigate business and operational risks.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "risk-analyzer",
            name: "Risk Analyzer Agent",
            summary: "Identify and assess various types of business risks.",
            image: "/placeholder.jpg",
            solutions: ["Risk identification", "Impact assessment", "Probability modeling"],
            useCases: ["Enterprise risk management", "Compliance monitoring", "Strategic planning"]
          },
          {
            id: "credit-risk-assessor",
            name: "Credit Risk Assessor Agent",
            summary: "Evaluate creditworthiness and default risk for lending decisions.",
            image: "/placeholder.jpg",
            solutions: ["Credit scoring", "Default prediction", "Portfolio risk analysis"],
            useCases: ["Lending decisions", "Credit management", "Risk mitigation"]
          },
          {
            id: "operational-risk-manager",
            name: "Operational Risk Manager Agent",
            summary: "Monitor and manage operational risks across business processes.",
            image: "/placeholder.jpg",
            solutions: ["Process monitoring", "Incident tracking", "Risk mitigation"],
            useCases: ["Process optimization", "Compliance management", "Business continuity"]
          }
        ]
      },
      {
        id: "budget-forecasting",
        name: "Budget Forecasting",
        description: "Predict future financial performance and create accurate budget projections.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "budget-forecaster",
            name: "Budget Forecaster Agent",
            summary: "Create accurate budget forecasts based on historical data and trends.",
            image: "/placeholder.jpg",
            solutions: ["Time series forecasting", "Scenario modeling", "Variance analysis"],
            useCases: ["Financial planning", "Budget allocation", "Performance tracking"]
          },
          {
            id: "revenue-predictor",
            name: "Revenue Predictor Agent",
            summary: "Predict future revenue streams and growth opportunities.",
            image: "/placeholder.jpg",
            solutions: ["Revenue modeling", "Growth projection", "Seasonal analysis"],
            useCases: ["Sales planning", "Growth strategy", "Investment decisions"]
          },
          {
            id: "cost-predictor",
            name: "Cost Predictor Agent",
            summary: "Forecast future costs and identify cost optimization opportunities.",
            image: "/placeholder.jpg",
            solutions: ["Cost modeling", "Trend analysis", "Optimization suggestions"],
            useCases: ["Cost management", "Budget planning", "Efficiency improvement"]
          }
        ]
      },
      {
        id: "expense-tracking",
        name: "Expense Tracking",
        description: "Monitor, categorize, and analyze business expenses for optimization.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "expense-analyzer",
            name: "Expense Analyzer Agent",
            summary: "Analyze expense patterns and identify optimization opportunities.",
            image: "/placeholder.jpg",
            solutions: ["Expense categorization", "Pattern recognition", "Anomaly detection"],
            useCases: ["Cost control", "Budget management", "Fraud detection"]
          },
          {
            id: "expense-categorizer",
            name: "Expense Categorizer Agent",
            summary: "Automatically categorize and classify business expenses.",
            image: "/placeholder.jpg",
            solutions: ["ML classification", "Rule-based categorization", "Learning algorithms"],
            useCases: ["Accounting automation", "Tax preparation", "Financial reporting"]
          },
          {
            id: "expense-optimizer",
            name: "Expense Optimizer Agent",
            summary: "Identify cost-saving opportunities and expense reduction strategies.",
            image: "/placeholder.jpg",
            solutions: ["Cost analysis", "Optimization recommendations", "ROI calculation"],
            useCases: ["Cost reduction", "Efficiency improvement", "Budget optimization"]
          }
        ]
      },
      {
        id: "competitive-intelligence",
        name: "Competitive Intelligence",
        description: "Monitor competitors and market dynamics for strategic advantage.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "competitor-monitor",
            name: "Competitor Monitor Agent",
            summary: "Track competitor activities, pricing, and market positioning.",
            image: "/placeholder.jpg",
            solutions: ["Competitive tracking", "Price monitoring", "Activity analysis"],
            useCases: ["Strategic planning", "Pricing strategy", "Market positioning"]
          },
          {
            id: "competitive-analyzer",
            name: "Competitive Analyzer Agent",
            summary: "Analyze competitive landscape and identify strategic opportunities.",
            image: "/placeholder.jpg",
            solutions: ["SWOT analysis", "Gap analysis", "Opportunity identification"],
            useCases: ["Market entry", "Product development", "Strategic positioning"]
          },
          {
            id: "market-intelligence",
            name: "Market Intelligence Agent",
            summary: "Gather and analyze market intelligence for strategic decision-making.",
            image: "/placeholder.jpg",
            solutions: ["Data collection", "Market analysis", "Insight generation"],
            useCases: ["Strategic planning", "Investment decisions", "Business development"]
          }
        ]
      },
      {
        id: "anomaly-detection",
        name: "Anomaly Detection",
        description: "Identify unusual patterns and anomalies in business data and processes.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "anomaly-detector",
            name: "Anomaly Detector Agent",
            summary: "Detect unusual patterns and anomalies in business data.",
            image: "/placeholder.jpg",
            solutions: ["Statistical analysis", "Machine learning models", "Real-time monitoring"],
            useCases: ["Fraud detection", "Quality control", "System monitoring"]
          },
          {
            id: "fraud-detector",
            name: "Fraud Detector Agent",
            summary: "Identify fraudulent activities and suspicious transactions.",
            image: "/placeholder.jpg",
            solutions: ["Pattern recognition", "Risk scoring", "Alert generation"],
            useCases: ["Financial fraud", "Insurance fraud", "Cybersecurity"]
          },
          {
            id: "performance-monitor",
            name: "Performance Monitor Agent",
            summary: "Monitor system and business performance for anomalies.",
            image: "/placeholder.jpg",
            solutions: ["Performance tracking", "Threshold monitoring", "Alert systems"],
            useCases: ["IT monitoring", "Business operations", "Quality assurance"]
          }
        ]
      },
      {
        id: "sentiment-analysis",
        name: "Sentiment Analysis",
        description: "Analyze customer sentiment and market perception for business insights.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "sentiment-analyzer",
            name: "Sentiment Analyzer Agent",
            summary: "Analyze customer sentiment from various data sources.",
            image: "/placeholder.jpg",
            solutions: ["Text analysis", "Emotion detection", "Trend tracking"],
            useCases: ["Customer feedback", "Brand monitoring", "Product development"]
          },
          {
            id: "social-media-analyzer",
            name: "Social Media Analyzer Agent",
            summary: "Monitor and analyze social media sentiment and trends.",
            image: "/placeholder.jpg",
            solutions: ["Social listening", "Trend analysis", "Influencer tracking"],
            useCases: ["Brand reputation", "Marketing campaigns", "Crisis management"]
          },
          {
            id: "market-sentiment-tracker",
            name: "Market Sentiment Tracker Agent",
            summary: "Track market sentiment and investor confidence indicators.",
            image: "/placeholder.jpg",
            solutions: ["Market analysis", "Sentiment indicators", "Confidence tracking"],
            useCases: ["Investment decisions", "Market timing", "Risk assessment"]
          }
        ]
      }
    ]
  },
  {
    id: "compliance-security",
    name: "Compliance & Security",
    description: "Ensure regulatory adherence, risk management, and system protection.",
    image: "images/compilance.jpg",
    subCategories: [
      {
        id: "compliance-monitoring",
        name: "Compliance Monitoring",
        description: "Monitor and ensure adherence to regulatory requirements and industry standards.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "regulatory-monitor",
            name: "Regulatory Monitor Agent",
            summary: "Monitor compliance with regulatory requirements and standards.",
            image: "/placeholder.jpg",
            solutions: ["Regulation tracking", "Compliance assessment", "Audit preparation"],
            useCases: ["Financial compliance", "Healthcare regulations", "Data protection laws"]
          },
          {
            id: "policy-enforcer",
            name: "Policy Enforcer Agent",
            summary: "Enforce organizational policies and procedures automatically.",
            image: "/placeholder.jpg",
            solutions: ["Policy validation", "Violation detection", "Corrective actions"],
            useCases: ["HR policies", "IT security policies", "Business procedures"]
          },
          {
            id: "audit-assistant",
            name: "Audit Assistant Agent",
            summary: "Prepare and support audit processes with automated documentation.",
            image: "/placeholder.jpg",
            solutions: ["Audit trail generation", "Evidence collection", "Report preparation"],
            useCases: ["Internal audits", "External audits", "Compliance reviews"]
          }
        ]
      },
      {
        id: "cybersecurity-monitoring",
        name: "Cybersecurity Monitoring",
        description: "Monitor and protect against cybersecurity threats and vulnerabilities.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "threat-detector",
            name: "Threat Detector Agent",
            summary: "Detect and analyze cybersecurity threats in real-time.",
            image: "/placeholder.jpg",
            solutions: ["Threat intelligence", "Anomaly detection", "Incident response"],
            useCases: ["Network security", "Endpoint protection", "Cloud security"]
          },
          {
            id: "vulnerability-scanner",
            name: "Vulnerability Scanner Agent",
            summary: "Scan systems and applications for security vulnerabilities.",
            image: "/placeholder.jpg",
            solutions: ["Vulnerability assessment", "Risk scoring", "Remediation guidance"],
            useCases: ["Application security", "Infrastructure security", "Compliance scanning"]
          },
          {
            id: "security-analyzer",
            name: "Security Analyzer Agent",
            summary: "Analyze security logs and events for potential threats.",
            image: "/placeholder.jpg",
            solutions: ["Log analysis", "Event correlation", "Threat hunting"],
            useCases: ["SIEM operations", "Incident investigation", "Security monitoring"]
          }
        ]
      },
      {
        id: "data-privacy-pii",
        name: "Data Privacy (PII Redaction)",
        description: "Protect personal and sensitive information through automated redaction and privacy controls.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "pii-detector",
            name: "PII Detector Agent",
            summary: "Identify and locate personally identifiable information in documents and data.",
            image: "/placeholder.jpg",
            solutions: ["PII recognition", "Pattern matching", "Confidence scoring"],
            useCases: ["Document processing", "Data classification", "Privacy compliance"]
          },
          {
            id: "data-redactor",
            name: "Data Redactor Agent",
            summary: "Automatically redact sensitive information from documents and communications.",
            image: "/placeholder.jpg",
            solutions: ["Selective redaction", "Format preservation", "Audit trails"],
            useCases: ["Legal documents", "Healthcare records", "Financial data"]
          },
          {
            id: "privacy-validator",
            name: "Privacy Validator Agent",
            summary: "Validate data handling practices for privacy compliance.",
            image: "/placeholder.jpg",
            solutions: ["Privacy assessment", "Consent verification", "Data flow tracking"],
            useCases: ["GDPR compliance", "CCPA compliance", "Data governance"]
          }
        ]
      },
      {
        id: "policy-checking-validation",
        name: "Policy Checking & Validation",
        description: "Validate content and processes against established policies and standards.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "content-validator",
            name: "Content Validator Agent",
            summary: "Validate content against organizational policies and guidelines.",
            image: "/placeholder.jpg",
            solutions: ["Policy matching", "Content analysis", "Compliance checking"],
            useCases: ["Marketing content", "Internal communications", "External publications"]
          },
          {
            id: "process-validator",
            name: "Process Validator Agent",
            summary: "Validate business processes against compliance requirements.",
            image: "/placeholder.jpg",
            solutions: ["Process analysis", "Compliance mapping", "Gap identification"],
            useCases: ["Workflow validation", "Procedure compliance", "Quality assurance"]
          }
        ]
      }
    ]
  },
  {
    id: "data-management",
    name: "Data Management",
    description: "Organize, store, retrieve, and optimize data for efficiency and insights.",
    image: "images/data_work.jpg",
    subCategories: [
      {
        id: "data-cleaning-preprocessing",
        name: "Data Cleaning & Preprocessing",
        description: "Clean, validate, and prepare data for analysis and processing.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "data-cleaner",
            name: "Data Cleaner Agent",
            summary: "Clean and validate data by removing duplicates, errors, and inconsistencies.",
            image: "/placeholder.jpg",
            solutions: ["Duplicate removal", "Error correction", "Data validation"],
            useCases: ["Data preparation", "Analytics pipelines", "Machine learning"]
          },
          {
            id: "data-transformer",
            name: "Data Transformer Agent",
            summary: "Transform and normalize data for consistent processing and analysis.",
            image: "/placeholder.jpg",
            solutions: ["Data normalization", "Format conversion", "Schema mapping"],
            useCases: ["ETL processes", "Data integration", "Analytics preparation"]
          },
          {
            id: "data-validator",
            name: "Data Validator Agent",
            summary: "Validate data quality and integrity across different sources and formats.",
            image: "/placeholder.jpg",
            solutions: ["Quality assessment", "Integrity checking", "Anomaly detection"],
            useCases: ["Data governance", "Quality assurance", "Compliance monitoring"]
          }
        ]
      },
      {
        id: "spreadsheet-analysis",
        name: "Spreadsheet Analysis",
        description: "Analyze and process spreadsheet data for insights and automation.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "excel-analyzer",
            name: "Excel Analyzer Agent",
            summary: "Analyze Excel spreadsheets and extract insights from tabular data.",
            image: "/placeholder.jpg",
            solutions: ["Formula analysis", "Data extraction", "Pattern recognition"],
            useCases: ["Financial analysis", "Business reporting", "Data processing"]
          },
          {
            id: "spreadsheet-automator",
            name: "Spreadsheet Automator Agent",
            summary: "Automate spreadsheet operations and data processing workflows.",
            image: "/placeholder.jpg",
            solutions: ["Workflow automation", "Data manipulation", "Report generation"],
            useCases: ["Financial modeling", "Inventory management", "Sales tracking"]
          }
        ]
      },
      {
        id: "database-querying-management",
        name: "Database Querying & Management",
        description: "Query, manage, and optimize database operations and data retrieval.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "query-optimizer",
            name: "Query Optimizer Agent",
            summary: "Optimize database queries for improved performance and efficiency.",
            image: "/placeholder.jpg",
            solutions: ["Query analysis", "Performance tuning", "Index optimization"],
            useCases: ["Database administration", "Performance monitoring", "System optimization"]
          },
          {
            id: "data-retriever",
            name: "Data Retriever Agent",
            summary: "Retrieve and extract data from various database systems and sources.",
            image: "/placeholder.jpg",
            solutions: ["Multi-source queries", "Data extraction", "Format conversion"],
            useCases: ["Data integration", "Reporting", "Analytics"]
          },
          {
            id: "database-manager",
            name: "Database Manager Agent",
            summary: "Manage database operations, maintenance, and administration tasks.",
            image: "/placeholder.jpg",
            solutions: ["Schema management", "Backup automation", "Performance monitoring"],
            useCases: ["Database administration", "System maintenance", "Data governance"]
          }
        ]
      },
      {
        id: "web-scraping-extraction",
        name: "Web Scraping & Extraction",
        description: "Extract and collect data from web sources and online platforms.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "web-scraper",
            name: "Web Scraper Agent",
            summary: "Extract structured data from websites and web applications.",
            image: "/placeholder.jpg",
            solutions: ["HTML parsing", "Data extraction", "Rate limiting"],
            useCases: ["Market research", "Price monitoring", "Content aggregation"]
          },
          {
            id: "api-extractor",
            name: "API Extractor Agent",
            summary: "Extract data from APIs and web services efficiently.",
            image: "/placeholder.jpg",
            solutions: ["API integration", "Data transformation", "Authentication handling"],
            useCases: ["Data integration", "Third-party services", "Real-time data"]
          }
        ]
      },
      {
        id: "invoice-processing",
        name: "Invoice Processing",
        description: "Process and extract data from invoices and financial documents.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "invoice-extractor",
            name: "Invoice Extractor Agent",
            summary: "Extract key information from invoices and financial documents.",
            image: "/placeholder.jpg",
            solutions: ["OCR processing", "Field extraction", "Data validation"],
            useCases: ["Accounts payable", "Expense management", "Financial reporting"]
          },
          {
            id: "invoice-validator",
            name: "Invoice Validator Agent",
            summary: "Validate invoice data and detect discrepancies or errors.",
            image: "/placeholder.jpg",
            solutions: ["Data validation", "Error detection", "Compliance checking"],
            useCases: ["Fraud detection", "Quality control", "Compliance monitoring"]
          }
        ]
      },
      {
        id: "file-conversion-formatting",
        name: "File Conversion & Formatting",
        description: "Convert and format files between different formats and standards.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "format-converter",
            name: "Format Converter Agent",
            summary: "Convert files between different formats while preserving data integrity.",
            image: "/placeholder.jpg",
            solutions: ["Multi-format support", "Data preservation", "Batch processing"],
            useCases: ["Document conversion", "Data migration", "System integration"]
          },
          {
            id: "data-formatter",
            name: "Data Formatter Agent",
            summary: "Format and structure data according to specific requirements and standards.",
            image: "/placeholder.jpg",
            solutions: ["Custom formatting", "Standard compliance", "Validation"],
            useCases: ["Data preparation", "System integration", "Reporting"]
          }
        ]
      },
      {
        id: "data-visualization",
        name: "Data Visualization",
        description: "Create compelling visualizations and charts from data insights.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "chart-generator",
            name: "Chart Generator Agent",
            summary: "Generate charts and graphs from data for better understanding and presentation.",
            image: "/placeholder.jpg",
            solutions: ["Chart selection", "Data mapping", "Visual optimization"],
            useCases: ["Business reporting", "Analytics presentation", "Data storytelling"]
          },
          {
            id: "dashboard-creator",
            name: "Dashboard Creator Agent",
            summary: "Create interactive dashboards and data visualizations.",
            image: "/placeholder.jpg",
            solutions: ["Dashboard design", "Interactive elements", "Real-time updates"],
            useCases: ["Business intelligence", "Performance monitoring", "Analytics platforms"]
          }
        ]
      }
    ]
  },
  {
    id: "developer-support",
    name: "Developer Support",
    description: "Tools, automation, and guidance for building and maintaining applications.",
    image: "/undraw_instant-support_oav0.png",
    subCategories: [
      {
        id: "code-review-debugging",
        name: "Code Review & Debugging",
        description: "Review code quality, identify bugs, and provide debugging assistance.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "code-reviewer",
            name: "Code Reviewer Agent",
            summary: "Review code for quality, best practices, and potential issues.",
            image: "/placeholder.jpg",
            solutions: ["Code analysis", "Best practice checking", "Security scanning"],
            useCases: ["Code quality assurance", "Security review", "Team collaboration"]
          },
          {
            id: "bug-detector",
            name: "Bug Detector Agent",
            summary: "Identify and analyze bugs and issues in code and applications.",
            image: "/placeholder.jpg",
            solutions: ["Static analysis", "Error detection", "Issue classification"],
            useCases: ["Debugging", "Quality assurance", "Code maintenance"]
          },
          {
            id: "debug-assistant",
            name: "Debug Assistant Agent",
            summary: "Provide debugging guidance and troubleshooting assistance.",
            image: "/placeholder.jpg",
            solutions: ["Error analysis", "Solution suggestions", "Debugging workflows"],
            useCases: ["Problem solving", "Development support", "Learning assistance"]
          }
        ]
      },
      {
        id: "testing-qa-bots",
        name: "Testing & QA Bots",
        description: "Automate testing processes and quality assurance workflows.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "test-automator",
            name: "Test Automator Agent",
            summary: "Automate test case generation and execution for applications.",
            image: "/placeholder.jpg",
            solutions: ["Test generation", "Automated execution", "Result analysis"],
            useCases: ["Regression testing", "Continuous integration", "Quality assurance"]
          },
          {
            id: "qa-analyzer",
            name: "QA Analyzer Agent",
            summary: "Analyze test results and provide quality insights and recommendations.",
            image: "/placeholder.jpg",
            solutions: ["Result analysis", "Quality metrics", "Improvement suggestions"],
            useCases: ["Quality monitoring", "Release management", "Process improvement"]
          }
        ]
      },
      {
        id: "devops-monitoring",
        name: "DevOps Monitoring",
        description: "Monitor and manage DevOps processes, infrastructure, and deployments.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "infrastructure-monitor",
            name: "Infrastructure Monitor Agent",
            summary: "Monitor infrastructure performance, health, and resource utilization.",
            image: "/placeholder.jpg",
            solutions: ["Performance monitoring", "Resource tracking", "Alert management"],
            useCases: ["System monitoring", "Capacity planning", "Performance optimization"]
          },
          {
            id: "deployment-manager",
            name: "Deployment Manager Agent",
            summary: "Manage and automate deployment processes and release management.",
            image: "/placeholder.jpg",
            solutions: ["Deployment automation", "Release management", "Rollback handling"],
            useCases: ["Continuous deployment", "Release coordination", "Environment management"]
          }
        ]
      },
      {
        id: "workflow-automation",
        name: "Workflow Automation",
        description: "Automate development workflows and repetitive tasks.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "workflow-automator",
            name: "Workflow Automator Agent",
            summary: "Automate development workflows and process optimization.",
            image: "/placeholder.jpg",
            solutions: ["Process automation", "Workflow optimization", "Task scheduling"],
            useCases: ["Development efficiency", "Process improvement", "Time optimization"]
          },
          {
            id: "task-automator",
            name: "Task Automator Agent",
            summary: "Automate repetitive development tasks and operations.",
            image: "/placeholder.jpg",
            solutions: ["Task automation", "Script generation", "Process streamlining"],
            useCases: ["Build automation", "Deployment scripts", "Maintenance tasks"]
          }
        ]
      },
      {
        id: "integration-api-agents",
        name: "Integration & API Agents",
        description: "Manage API integrations and system connectivity.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "api-manager",
            name: "API Manager Agent",
            summary: "Manage API development, documentation, and integration processes.",
            image: "/placeholder.jpg",
            solutions: ["API design", "Documentation generation", "Integration testing"],
            useCases: ["API development", "System integration", "Third-party services"]
          },
          {
            id: "integration-specialist",
            name: "Integration Specialist Agent",
            summary: "Handle system integrations and data flow between applications.",
            image: "/placeholder.jpg",
            solutions: ["System integration", "Data mapping", "Error handling"],
            useCases: ["Enterprise integration", "Data synchronization", "Service connectivity"]
          }
        ]
      }
    ]
  },
  {
    id: "work-management",
    name: "Work Management",
    description: "Plan, track, and optimize tasks, workflows, and team collaboration.",
    image: "/undraw_hr-presentation_uunk.png",
    subCategories: [
      {
        id: "task-project-management",
        name: "Task & Project Management",
        description: "Manage tasks, projects, and team collaboration efficiently.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "project-manager",
            name: "Project Manager Agent",
            summary: "Manage project timelines, resources, and deliverables.",
            image: "/placeholder.jpg",
            solutions: ["Timeline management", "Resource allocation", "Progress tracking"],
            useCases: ["Project planning", "Team coordination", "Delivery management"]
          },
          {
            id: "task-organizer",
            name: "Task Organizer Agent",
            summary: "Organize and prioritize tasks for optimal productivity.",
            image: "/placeholder.jpg",
            solutions: ["Task prioritization", "Workflow optimization", "Deadline management"],
            useCases: ["Personal productivity", "Team coordination", "Workflow management"]
          },
          {
            id: "collaboration-facilitator",
            name: "Collaboration Facilitator Agent",
            summary: "Facilitate team collaboration and communication workflows.",
            image: "/placeholder.jpg",
            solutions: ["Communication management", "Team coordination", "Information sharing"],
            useCases: ["Team collaboration", "Remote work", "Project coordination"]
          }
        ]
      },
      {
        id: "calendar-scheduling",
        name: "Calendar & Scheduling",
        description: "Manage calendars, appointments, and scheduling optimization.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "calendar-manager",
            name: "Calendar Manager Agent",
            summary: "Manage and optimize calendar scheduling and time management.",
            image: "/placeholder.jpg",
            solutions: ["Schedule optimization", "Conflict resolution", "Time blocking"],
            useCases: ["Personal scheduling", "Meeting coordination", "Time management"]
          },
          {
            id: "appointment-scheduler",
            name: "Appointment Scheduler Agent",
            summary: "Automate appointment scheduling and booking processes.",
            image: "/placeholder.jpg",
            solutions: ["Automated booking", "Availability management", "Reminder systems"],
            useCases: ["Customer appointments", "Service booking", "Meeting scheduling"]
          }
        ]
      },
      {
        id: "presentation-building",
        name: "Presentation Building",
        description: "Create and optimize presentations and visual content.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "presentation-creator",
            name: "Presentation Creator Agent",
            summary: "Create compelling presentations from content and data.",
            image: "/placeholder.jpg",
            solutions: ["Content organization", "Visual design", "Storytelling"],
            useCases: ["Business presentations", "Educational content", "Sales pitches"]
          },
          {
            id: "slide-optimizer",
            name: "Slide Optimizer Agent",
            summary: "Optimize presentation slides for clarity and impact.",
            image: "/placeholder.jpg",
            solutions: ["Content optimization", "Visual enhancement", "Message clarity"],
            useCases: ["Presentation improvement", "Content refinement", "Audience engagement"]
          }
        ]
      },
      {
        id: "research-assistance",
        name: "Research Assistance",
        description: "Assist with research tasks, data collection, and information gathering.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "research-assistant",
            name: "Research Assistant Agent",
            summary: "Conduct comprehensive research and information gathering.",
            image: "/placeholder.jpg",
            solutions: ["Information gathering", "Source validation", "Data synthesis"],
            useCases: ["Market research", "Academic research", "Competitive analysis"]
          },
          {
            id: "data-collector",
            name: "Data Collector Agent",
            summary: "Collect and organize research data from various sources.",
            image: "/placeholder.jpg",
            solutions: ["Data collection", "Source tracking", "Information organization"],
            useCases: ["Research projects", "Data analysis", "Report preparation"]
          }
        ]
      }
    ]
  },
  {
    id: "social-media",
    name: "Social & Media",
    description: "Create, manage, and analyze social interactions and media content.",
    image: "/undraw_tweetstorm_wq1q.png",
    subCategories: [
      {
        id: "social-media-analytics",
        name: "Social Media Analytics",
        description: "Analyze social media performance, trends, and audience engagement.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "social-analytics",
            name: "Social Analytics Agent",
            summary: "Analyze social media performance and engagement metrics.",
            image: "/placeholder.jpg",
            solutions: ["Performance tracking", "Engagement analysis", "Trend monitoring"],
            useCases: ["Social media marketing", "Brand monitoring", "Campaign analysis"]
          },
          {
            id: "audience-analyzer",
            name: "Audience Analyzer Agent",
            summary: "Analyze audience demographics, behavior, and preferences.",
            image: "/placeholder.jpg",
            solutions: ["Demographic analysis", "Behavior tracking", "Preference mapping"],
            useCases: ["Audience targeting", "Content strategy", "Market research"]
          },
          {
            id: "trend-tracker",
            name: "Trend Tracker Agent",
            summary: "Track and analyze social media trends and viral content.",
            image: "/placeholder.jpg",
            solutions: ["Trend detection", "Viral analysis", "Content monitoring"],
            useCases: ["Trend analysis", "Content strategy", "Viral marketing"]
          }
        ]
      },
      {
        id: "social-media-content-creation",
        name: "Social Media Content Creation",
        description: "Create engaging social media content and manage content strategies.",
        image: "/placeholder.jpg",
        agents: [
          {
            id: "content-creator",
            name: "Content Creator Agent",
            summary: "Create engaging social media content for various platforms.",
            image: "/placeholder.jpg",
            solutions: ["Content generation", "Platform optimization", "Engagement focus"],
            useCases: ["Social media marketing", "Brand content", "Campaign creation"]
          },
          {
            id: "content-scheduler",
            name: "Content Scheduler Agent",
            summary: "Schedule and optimize content posting for maximum engagement.",
            image: "/placeholder.jpg",
            solutions: ["Optimal timing", "Platform scheduling", "Engagement optimization"],
            useCases: ["Content management", "Social media strategy", "Audience engagement"]
          },
          {
            id: "hashtag-optimizer",
            name: "Hashtag Optimizer Agent",
            summary: "Optimize hashtag strategies for better reach and engagement.",
            image: "/placeholder.jpg",
            solutions: ["Hashtag research", "Trend analysis", "Reach optimization"],
            useCases: ["Social media marketing", "Content discovery", "Audience growth"]
          }
        ]
      }
    ]
  }
],
industry:[
  {
    id: "hr",
    name: "Human Resources",
    description:
      "Streamline HR processes with intelligent automation and compliance.",
    image: "/industry/hr.png",
    agents: [
      {
        id: "talent-acquisition",
        name: "Talent Acquisition & Recruitment",
        summary:
          "Automate candidate sourcing, screening, and interview coordination.",
        image: "/placeholder.jpg",
        solutions: [
          "AI-powered candidate matching",
          "Resume parsing",
          "Interview scheduling",
        ],
        useCases: [
          "Campus hiring",
          "Lateral recruitment",
          "High-volume hiring",
        ],
      },
      {
        id: "employee-onboarding",
        name: "Employee Onboarding & Training",
        summary:
          "Digitize onboarding workflows and deliver personalized training paths.",
        image: "/placeholder.jpg",
        solutions: [
          "Automated document collection",
          "Role-based learning modules",
          "Virtual orientation",
        ],
        useCases: [
          "New hire onboarding",
          "Cross-functional training",
          "Remote employee integration",
        ],
      },
      {
        id: "employee-engagement",
        name: "Employee Engagement & Experience",
        summary:
          "Monitor and enhance employee satisfaction, culture, and feedback.",
        image: "/placeholder.jpg",
        solutions: [
          "Pulse surveys",
          "Sentiment analysis",
          "Engagement analytics",
        ],
        useCases: [
          "Culture assessment",
          "Feedback loops",
          "Employee wellness programs",
        ],
      },
      {
        id: "performance-management",
        name: "Performance Management",
        summary:
          "Enable transparent goal setting, reviews, and career progression.",
        image: "/placeholder.jpg",
        solutions: [
          "OKR tracking",
          "360-degree feedback",
          "Performance scoring",
        ],
        useCases: [
          "Quarterly reviews",
          "Promotion assessments",
          "Skill gap analysis",
        ],
      },
      {
        id: "hr-operations",
        name: "HR Operations & Compliance",
        summary: "Simplify HR administrative tasks while ensuring compliance.",
        image: "/placeholder.jpg",
        solutions: [
          "Policy automation",
          "Document management",
          "Payroll integration",
        ],
        useCases: [
          "Leave management",
          "Labor law compliance",
          "Payroll validation",
        ],
      },
      {
        id: "employee-development",
        name: "Employee Development & Retention",
        summary: "Personalize development journeys and retention strategies.",
        image: "/placeholder.jpg",
        solutions: [
          "Skill gap analysis",
          "Learning paths",
          "Career progression insights",
        ],
        useCases: [
          "Upskilling programs",
          "Leadership training",
          "High-potential employee retention",
        ],
      },
      {
        id: "offboarding",
        name: "Offboarding & Alumni Management",
        summary: "Standardize exit processes and build strong alumni networks.",
        image: "/placeholder.jpg",
        solutions: [
          "Exit interview automation",
          "Knowledge transfer",
          "Alumni engagement portals",
        ],
        useCases: [
          "Voluntary resignations",
          "Retirement workflows",
          "Alumni networking",
        ],
      },
      {
        id: "workforce-planning",
        name: "Workforce Planning & Strategy",
        summary: "Forecast workforce needs and optimize staffing strategies.",
        image: "/placeholder.jpg",
        solutions: [
          "Demand forecasting",
          "Skill inventory analysis",
          "Scenario planning",
        ],
        useCases: [
          "Strategic hiring plans",
          "Succession planning",
          "Mergers & acquisitions staffing",
        ],
      },
      {
        id: "compliance-policy",
        name: "Compliance, Risk & Policy Management",
        summary:
          "Ensure adherence to HR policies, labor laws, and mitigate risks.",
        image: "/placeholder.jpg",
        solutions: ["Policy libraries", "Risk scoring", "Regulation alignment"],
        useCases: [
          "GDPR compliance",
          "Equal employment audits",
          "Workplace safety",
        ],
      },
      {
        id: "hr-analytics",
        name: "HR Analytics & Reporting",
        summary: "Analyze workforce trends and provide actionable HR insights.",
        image: "/placeholder.jpg",
        solutions: [
          "Predictive analytics",
          "Dashboard visualization",
          "Attrition forecasting",
        ],
        useCases: [
          "Attrition analysis",
          "Hiring funnel optimization",
          "Workforce productivity tracking",
        ],
      },
    ],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description:
      "Optimized workflows for property management, sales, leasing, and compliance.",
    image: "/industry/Realestate.png",
    agents: [
      {
        id: "property-selling",
        name: "Property Selling Workflow",
        summary: "Automate the process of listing and selling properties.",
        image: "/Realestate.png",
        solutions: [
          "Property listing optimization",
          "Buyer matching",
          "Contract generation",
        ],
        useCases: [
          "Residential sales",
          "Commercial sales",
          "Auction preparation",
        ],
      },
      {
        id: "property-purchase",
        name: "Property Purchase Workflow",
        summary:
          "Facilitate property purchase processes with due diligence and financing.",
        image: "/eSTATE.png",
        solutions: [
          "Purchase agreement automation",
          "Financing coordination",
          "Due diligence checks",
        ],
        useCases: [
          "Home buying",
          "Commercial acquisitions",
          "Investment purchases",
        ],
      },
      {
        id: "rental-renewal",
        name: "Rental Renewal Workflow",
        summary: "Automate lease renewals and tenant communications.",
        image: "/Real.png",
        solutions: [
          "Renewal reminders",
          "Lease updates",
          "Tenant negotiations",
        ],
        useCases: [
          "Residential renewals",
          "Commercial lease extensions",
          "Rent adjustments",
        ],
      },
      {
        id: "buyer-assistance",
        name: "Buyer Assistance Workflow",
        summary: "Support buyers through the property purchase process.",
        image: "/undraw_coming-home_jmbc.png",
        solutions: [
          "Property recommendations",
          "Negotiation support",
          "Closing assistance",
        ],
        useCases: [
          "First-time buyers",
          "Investment purchases",
          "Relocation support",
        ],
      },
      {
        id: "tenant-management",
        name: "Tenant Management Workflow",
        summary: "Streamline tenant relations and property management tasks.",
        image: "/placeholder.jpg",
        solutions: [
          "Tenant communication",
          "Issue tracking",
          "Payment monitoring",
        ],
        useCases: [
          "Multi-unit management",
          "Tenant retention",
          "Property operations",
        ],
      },
      {
        id: "project-development",
        name: "Project Development Workflow",
        summary:
          "Manage real estate development projects from planning to completion.",
        image: "/placeholder.jpg",
        solutions: ["Project planning", "Budget tracking", "Permit management"],
        useCases: [
          "Residential developments",
          "Commercial projects",
          "Mixed-use developments",
        ],
      },
      {
        id: "property-leasing",
        name: "Property Leasing Workflow",
        summary:
          "Streamline leasing processes for residential and commercial properties.",
        image: "/placeholder.jpg",
        solutions: [
          "Lease agreement automation",
          "Tenant screening",
          "Payment tracking",
        ],
        useCases: ["Rental agreements", "Commercial leasing", "Lease renewals"],
      },
      {
        id: "property-maintenance",
        name: "Property Maintenance Workflow",
        summary: "Manage maintenance requests and service schedules.",
        image: "/placeholder.jpg",
        solutions: [
          "Request tracking",
          "Vendor coordination",
          "Maintenance scheduling",
        ],
        useCases: [
          "Residential repairs",
          "Commercial upkeep",
          "Preventive maintenance",
        ],
      },

      {
        id: "mortgage",
        name: "Mortgage Workflow",
        summary: "Automate mortgage application and approval processes.",
        image: "/placeholder.jpg",
        solutions: [
          "Document verification",
          "Credit assessment",
          "Loan processing",
        ],
        useCases: ["Home mortgages", "Commercial loans", "Refinancing"],
      },
      {
        id: "due-diligence",
        name: "Due Diligence Workflow",
        summary: "Conduct thorough due diligence for property transactions.",
        image: "/placeholder.jpg",
        solutions: [
          "Title checks",
          "Property valuation",
          "Compliance verification",
        ],
        useCases: [
          "Property purchases",
          "Investment analysis",
          "Legal compliance",
        ],
      },
      {
        id: "rental-acquisition",
        name: "Rental Acquisition Workflow",
        summary: "Simplify the process of acquiring rental properties.",
        image: "/placeholder.jpg",
        solutions: [
          "Market analysis",
          "Property evaluation",
          "Acquisition planning",
        ],
        useCases: [
          "Rental portfolio expansion",
          "Investment properties",
          "Multi-unit acquisitions",
        ],
      },

      {
        id: "complaint-maintenance",
        name: "Complaint & Maintenance Workflow",
        summary:
          "Handle tenant complaints and maintenance requests efficiently.",
        image: "/placeholder.jpg",
        solutions: [
          "Complaint logging",
          "Priority assignment",
          "Resolution tracking",
        ],
        useCases: ["Tenant issues", "Property repairs", "Service coordination"],
      },

      {
        id: "seller-assistance",
        name: "Seller Assistance Workflow",
        summary: "Assist sellers in marketing and closing property sales.",
        image: "/placeholder.jpg",
        solutions: [
          "Market analysis",
          "Listing optimization",
          "Buyer coordination",
        ],
        useCases: ["Home sales", "Commercial sales", "Quick sales"],
      },
      {
        id: "rental",
        name: "Rental Workflow",
        summary: "Manage the end-to-end rental process for properties.",
        image: "/placeholder.jpg",
        solutions: ["Tenant onboarding", "Rent collection", "Lease management"],
        useCases: [
          "Residential rentals",
          "Commercial rentals",
          "Short-term leases",
        ],
      },

      {
        id: "maintenance",
        name: "Maintenance Workflow",
        summary: "Coordinate and track property maintenance activities.",
        image: "/placeholder.jpg",
        solutions: [
          "Maintenance scheduling",
          "Vendor management",
          "Cost tracking",
        ],
        useCases: [
          "Routine maintenance",
          "Emergency repairs",
          "Property upkeep",
        ],
      },
      {
        id: "financial-reporting",
        name: "Financial Reporting Workflow",
        summary: "Generate financial reports for property portfolios.",
        image: "/placeholder.jpg",
        solutions: ["Income tracking", "Expense reporting", "Tax preparation"],
        useCases: ["Portfolio analysis", "Investor reports", "Tax compliance"],
      },

      {
        id: "construction",
        name: "Construction Workflow",
        summary: "Oversee construction processes for real estate projects.",
        image: "/placeholder.jpg",
        solutions: [
          "Construction scheduling",
          "Contractor coordination",
          "Progress tracking",
        ],
        useCases: ["New builds", "Renovations", "Infrastructure projects"],
      },
      {
        id: "marketing-sales",
        name: "Marketing & Sales Workflow",
        summary:
          "Promote properties and drive sales through targeted marketing.",
        image: "/placeholder.jpg",
        solutions: ["Marketing campaigns", "Lead generation", "Sales tracking"],
        useCases: ["Property listings", "Open houses", "Online marketing"],
      },
      {
        id: "property-acquisition",
        name: "Property Acquisition Workflow",
        summary: "Streamline the acquisition of new properties.",
        image: "/placeholder.jpg",
        solutions: [
          "Market analysis",
          "Negotiation support",
          "Acquisition planning",
        ],
        useCases: [
          "Investment properties",
          "Portfolio expansion",
          "Distressed assets",
        ],
      },
      {
        id: "property-flipping",
        name: "Property Flipping Workflow",
        summary:
          "Manage the process of buying, renovating, and selling properties.",
        image: "/placeholder.jpg",
        solutions: [
          "Renovation planning",
          "Budget management",
          "Sales strategy",
        ],
        useCases: [
          "Fix-and-flip projects",
          "Investment properties",
          "Quick turnarounds",
        ],
      },
      {
        id: "rental-income",
        name: "Rental Income Workflow",
        summary: "Optimize and track rental income streams.",
        image: "/placeholder.jpg",
        solutions: [
          "Rent collection",
          "Income forecasting",
          "Delinquency tracking",
        ],
        useCases: [
          "Rental portfolios",
          "Property management",
          "Cash flow analysis",
        ],
      },
      {
        id: "mortgage-processing",
        name: "Mortgage Processing Workflow",
        summary: "Automate mortgage processing and documentation.",
        image: "/placeholder.jpg",
        solutions: [
          "Application processing",
          "Document verification",
          "Approval tracking",
        ],
        useCases: ["Home loans", "Commercial mortgages", "Refinancing"],
      },
      {
        id: "refinancing",
        name: "Refinancing Workflow",
        summary: "Manage property refinancing processes.",
        image: "/placeholder.jpg",
        solutions: [
          "Loan comparison",
          "Application automation",
          "Approval coordination",
        ],
        useCases: [
          "Mortgage refinancing",
          "Loan restructuring",
          "Rate optimization",
        ],
      },
      {
        id: "property-sale-legal",
        name: "Property Sale Legal Workflow",
        summary: "Handle legal aspects of property sales.",
        image: "/placeholder.jpg",
        solutions: [
          "Contract review",
          "Compliance checks",
          "Closing documentation",
        ],
        useCases: ["Residential sales", "Commercial sales", "Legal compliance"],
      },
      {
        id: "dispute-resolution",
        name: "Dispute Resolution Workflow",
        summary: "Resolve disputes related to property transactions.",
        image: "/placeholder.jpg",
        solutions: [
          "Dispute logging",
          "Mediation support",
          "Resolution tracking",
        ],
        useCases: [
          "Tenant disputes",
          "Contract disagreements",
          "Legal resolutions",
        ],
      },
      {
        id: "property-insurance",
        name: "Property Insurance Workflow",
        summary: "Manage property insurance processes and documentation.",
        image: "/placeholder.jpg",
        solutions: [
          "Policy comparison",
          "Application automation",
          "Claims support",
        ],
        useCases: [
          "Home insurance",
          "Commercial insurance",
          "Rental property coverage",
        ],
      },
      {
        id: "claim-settlement",
        name: "Claim Settlement Workflow",
        summary: "Streamline insurance claim settlements for properties.",
        image: "/placeholder.jpg",
        solutions: [
          "Claim documentation",
          "Assessment support",
          "Settlement tracking",
        ],
        useCases: ["Damage claims", "Liability claims", "Insurance payouts"],
      },
      {
        id: "surveying",
        name: "Surveying Workflow",
        summary: "Coordinate property surveying and assessments.",
        image: "/placeholder.jpg",
        solutions: [
          "Survey scheduling",
          "Data collection",
          "Report generation",
        ],
        useCases: ["Land surveys", "Property assessments", "Boundary disputes"],
      },
      {
        id: "property-registration",
        name: "Property Registration Workflow",
        summary: "Automate property registration and documentation.",
        image: "/placeholder.jpg",
        solutions: [
          "Document preparation",
          "Registration tracking",
          "Compliance checks",
        ],
        useCases: [
          "New property registrations",
          "Title transfers",
          "Legal documentation",
        ],
      },
      {
        id: "zoning-approval",
        name: "Zoning Approval Workflow",
        summary: "Manage zoning and land use approvals for properties.",
        image: "/placeholder.jpg",
        solutions: [
          "Application preparation",
          "Compliance verification",
          "Approval tracking",
        ],
        useCases: [
          "Development projects",
          "Land use changes",
          "Zoning compliance",
        ],
      },
      {
        id: "taxation",
        name: "Taxation Workflow",
        summary: "Handle property tax calculations and compliance.",
        image: "/placeholder.jpg",
        solutions: [
          "Tax assessment",
          "Payment tracking",
          "Compliance reporting",
        ],
        useCases: [
          "Property tax filings",
          "Tax exemptions",
          "Assessment disputes",
        ],
      },
      {
        id: "property-marketing",
        name: "Property Marketing Workflow",
        summary: "Create and manage marketing campaigns for properties.",
        image: "/placeholder.jpg",
        solutions: [
          "Campaign creation",
          "Lead tracking",
          "Analytics reporting",
        ],
        useCases: [
          "Property listings",
          "Social media marketing",
          "Open house promotions",
        ],
      },
      {
        id: "property-inspection",
        name: "Property Inspection Workflow",
        summary: "Coordinate and document property inspections.",
        image: "/placeholder.jpg",
        solutions: [
          "Inspection scheduling",
          "Report generation",
          "Compliance checks",
        ],
        useCases: [
          "Pre-sale inspections",
          "Rental inspections",
          "Safety compliance",
        ],
      },
    ],
  },
{
  id: "retail",
  name: "Retail",
  description: "Automation and optimization for retail operations, sales, and customer engagement.",
  image: "/industry/Ecommerce&retail.png",
  agents: [
    {
      id: "ownership-strategy",
      name: "Ownership & Business Strategy Workflow",
      summary: "Support store owners in planning, licensing, compliance, and strategy execution.",
      image: "/placeholder.jpg",
      solutions: ["Business planning", "Licensing", "Compliance monitoring", "Strategy execution", "Performance review"],
      useCases: ["Franchise setup", "Business performance tracking", "Strategic expansion"],
    },
    {
      id: "end-users",
      name: "End Users Workflow",
      summary: "Enhance customer experience from product search to purchase and feedback.",
      image: "/placeholder.jpg",
      solutions: ["Product search", "Recommendations", "Price comparison", "Checkout", "Feedback collection"],
      useCases: ["Online shopping", "In-store browsing", "Customer satisfaction tracking"],
    },
    {
      id: "store-operations",
      name: "Store Operations Workflow",
      summary: "Streamline store operations including staff scheduling, inventory review, and audits.",
      image: "/placeholder.jpg",
      solutions: ["Staff scheduling", "Sales monitoring", "Inventory review", "Store audits", "Reporting"],
      useCases: ["Daily store management", "Operational efficiency", "Store performance tracking"],
    },
    {
      id: "customer-interaction-sales",
      name: "Customer Interaction & Sales Workflow",
      summary: "Assist sales associates with product assistance, billing, and checkout.",
      image: "/placeholder.jpg",
      solutions: ["Greeting customers", "Product assistance", "Billing", "Payment processing", "Checkout"],
      useCases: ["Point-of-sale assistance", "Customer service", "Sales conversion"],
    },
    {
      id: "product-display",
      name: "Product Display & In-Store Experience Workflow",
      summary: "Support merchandisers in market research, planograms, promotions, and store walkthroughs.",
      image: "/placeholder.jpg",
      solutions: ["Market research", "Planogram design", "Product display setup", "Promotion setup", "Store walkthrough"],
      useCases: ["Visual merchandising", "Promotion execution", "Customer engagement in-store"],
    },
    {
      id: "stock-inventory",
      name: "Stock & Inventory Management Workflow",
      summary: "Automate inventory management from stock checks to audits.",
      image: "/placeholder.jpg",
      solutions: ["Stock checks", "Reorders", "Goods receipt", "Stock placement", "Inventory audit"],
      useCases: ["Inventory control", "Stock replenishment", "Warehouse management"],
    },
    {
      id: "procurement-distribution",
      name: "Procurement & Distribution Workflow",
      summary: "Manage supplier selection, order placement, shipping, tracking, and delivery confirmation.",
      image: "/placeholder.jpg",
      solutions: ["Supplier selection", "Order placement", "Shipping", "Tracking", "Delivery confirmation"],
      useCases: ["Supply chain management", "Procurement automation", "On-time delivery assurance"],
    },
    {
      id: "digital-retail",
      name: "Digital Retail & Omnichannel Workflow",
      summary: "Streamline online retail operations including listings, pricing, marketing, and fulfillment.",
      image: "/placeholder.jpg",
      solutions: ["Product listing", "Pricing", "Online marketing", "Order fulfillment", "Returns management"],
      useCases: ["E-commerce operations", "Omnichannel sales", "Customer retention online"],
    },
    {
      id: "promotion-customer-engagement",
      name: "Promotion & Customer Engagement Workflow",
      summary: "Support marketing teams in campaigns, content, ad placement, and performance tracking.",
      image: "/placeholder.jpg",
      solutions: ["Campaign planning", "Content creation", "Ad placement", "Customer engagement", "Performance tracking"],
      useCases: ["Marketing campaign automation", "Brand engagement", "Promotion ROI tracking"],
    },
    {
      id: "financial-management",
      name: "Financial Management Workflow",
      summary: "Assist finance teams in budgeting, expense tracking, payroll, tax filing, and reporting.",
      image: "/placeholder.jpg",
      solutions: ["Budget planning", "Expense tracking", "Payroll", "Tax filing", "Financial reporting"],
      useCases: ["Retail finance management", "Cost tracking", "Profitability analysis"],
    },
    {
      id: "retail-technology-systems",
      name: "Retail Technology & Systems Workflow",
      summary: "Manage POS systems, data backup, troubleshooting, and security monitoring.",
      image: "/placeholder.jpg",
      solutions: ["System setup", "POS integration", "Data backup", "Troubleshooting", "Security monitoring"],
      useCases: ["Retail IT operations", "POS efficiency", "System reliability"],
    },
    {
      id: "sourcing-wholesale",
      name: "Sourcing & Wholesale Supply Workflow",
      summary: "Manage product sourcing, pricing negotiation, shipment, delivery, and invoicing.",
      image: "/placeholder.jpg",
      solutions: ["Product sourcing", "Pricing negotiation", "Shipment management", "Delivery tracking", "Invoicing"],
      useCases: ["Supplier coordination", "Wholesale supply management", "Inventory replenishment"],
    },
    {
      id: "policy-compliance-taxation",
      name: "Policy, Compliance & Taxation Workflow",
      summary: "Support regulatory compliance, license applications, audits, and certifications.",
      image: "/placeholder.jpg",
      solutions: ["License application", "Policy review", "Tax compliance", "Audit", "Certification"],
      useCases: ["Regulatory adherence", "Tax compliance", "Business certification"],
    },
    {
      id: "storage-fulfillment",
      name: "Storage & Fulfillment Workflow",
      summary: "Automate warehouse operations from receiving goods to dispatch.",
      image: "/placeholder.jpg",
      solutions: ["Receiving goods", "Storage allocation", "Order picking", "Packing", "Dispatch"],
      useCases: ["Warehouse automation", "Inventory fulfillment", "Dispatch efficiency"],
    },
    {
      id: "after-sales-support",
      name: "After-Sales Support Workflow",
      summary: "Handle customer queries, issue resolution, escalations, and feedback collection.",
      image: "/placeholder.jpg",
      solutions: ["Query intake", "Issue categorization", "Resolution", "Escalation management", "Feedback collection"],
      useCases: ["Customer support", "Issue tracking", "Service improvement"],
    },
    {
      id: "workforce-recruitment-training",
      name: "Workforce Recruitment & Training Workflow",
      summary: "Support HR in job posting, screening, hiring, and training.",
      image: "/placeholder.jpg",
      solutions: ["Job posting", "Candidate screening", "Interview assistance", "Hiring", "Training & development"],
      useCases: ["Retail workforce management", "Employee onboarding", "Skill development"],
    }
  ]
}
,
{
  id: "media-entertainment",
  name: "Media & Entertainment",
  description: "Automation and optimization for content creation, distribution, audience engagement, and monetization.",
  image: "/industry/Media.png",
  agents: [
    {
      id: "content-creation-curation",
      name: "Content Creation & Curation Workflow",
      summary: "Support creators in script writing, editing, tagging, and publishing content.",
      image: "/placeholder.jpg",
      solutions: ["Script writing", "Content editing", "Tagging", "Publishing"],
      useCases: ["Video production", "Article creation", "Podcast editing"],
    },
    {
      id: "content-recommendation-personalization",
      name: "Content Recommendation & Personalization Workflow",
      summary: "Provide viewers with personalized content recommendations based on preferences.",
      image: "/placeholder.jpg",
      solutions: ["User profile analysis", "Preference matching", "Dynamic recommendations"],
      useCases: ["Streaming personalization", "News feed optimization", "Audience engagement"],
    },
    {
      id: "content-moderation-compliance",
      name: "Content Moderation & Compliance Workflow",
      summary: "Ensure uploaded content adheres to platform policies and compliance standards.",
      image: "/placeholder.jpg",
      solutions: ["Content upload", "Automated scanning", "Compliance check", "Publish or reject"],
      useCases: ["User-generated content moderation", "Policy enforcement", "Safe platform experience"],
    },
    {
      id: "audience-engagement-interaction",
      name: "Audience Engagement & Interaction Workflow",
      summary: "Enhance viewer engagement through chatbots, gamification, and feedback collection.",
      image: "/placeholder.jpg",
      solutions: ["User login tracking", "Chatbot interaction", "Gamified engagement", "Feedback collection"],
      useCases: ["Subscriber interaction", "Fan engagement", "Community building"],
    },
    {
      id: "licensing-rights-management",
      name: "Licensing & Rights Management Workflow",
      summary: "Manage rights registration, usage tracking, and royalty distribution.",
      image: "/placeholder.jpg",
      solutions: ["Rights registration", "Usage tracking", "Royalty calculation and distribution"],
      useCases: ["Content licensing", "Royalty management", "Intellectual property tracking"],
    },
    {
      id: "advertising-campaign-management",
      name: "Advertising & Campaign Management Workflow",
      summary: "Enable targeted advertising and track campaign performance for marketers.",
      image: "/placeholder.jpg",
      solutions: ["Audience segmentation", "Ad targeting", "Performance tracking"],
      useCases: ["Digital ad campaigns", "Video monetization", "Marketing ROI optimization"],
    },
    {
      id: "revenue-analytics-forecasting",
      name: "Revenue Analytics & Forecasting Workflow",
      summary: "Collect data, analyze trends, predict churn, and generate revenue forecasts.",
      image: "/placeholder.jpg",
      solutions: ["Data collection", "Trend analysis", "Churn prediction", "Forecast report generation"],
      useCases: ["Subscription analytics", "Revenue prediction", "Business performance insights"],
    }
  ]
}
,
{
  id: "legal",
  name: "Legal",
  description: "Compliance and document management for legal processes.",
  image: "/industry/Legal.png",
  agents: [
    {
      id: "civil-law-client-intake",
      name: "Civil Law Client Intake & Case Management",
      summary: "Manage client onboarding, case creation, document collection, and progress tracking.",
      image: "/placeholder.jpg",
      solutions: ["Client onboarding", "Case type identification", "Conflict of interest check", "Document collection", "Case timeline generation", "Task assignment", "Client portal setup", "Progress tracking"],
      useCases: ["Property disputes", "Family law cases", "Consumer disputes", "Contract disputes"],
    },
    {
      id: "civil-law-property-dispute",
      name: "Property & Land Dispute Management",
      summary: "Streamline dispute intake, title verification, evidence collection, and court filings.",
      image: "/placeholder.jpg",
      solutions: ["Dispute intake", "Title verification", "Partition analysis", "Evidence collection", "Precedent search", "Draft petition", "Court filing", "Mediation/Negotiation", "Hearing management", "Judgment recording"],
      useCases: ["Land disputes", "Property claims", "Partition litigation"],
    },
    {
      id: "civil-law-family-matters",
      name: "Family & Succession Matters",
      summary: "Handle case intake, document collection, mediation, court filings, and order issuance.",
      image: "/placeholder.jpg",
      solutions: ["Case intake", "Marriage/Divorce paperwork collection", "Custody/Inheritance documentation", "Mediation scheduling", "Agreement drafting", "Court filing", "Hearing management", "Order issuance", "Archival"],
      useCases: ["Divorce cases", "Custody disputes", "Inheritance matters"],
    },
    {
      id: "civil-law-contractual-consumer",
      name: "Contractual & Consumer Disputes",
      summary: "Manage complaints, contract review, evidence gathering, and dispute resolution.",
      image: "/placeholder.jpg",
      solutions: ["Complaint intake", "Contract review", "Evidence gathering", "Filing", "Counter-party notification", "Negotiation support", "Resolution suggestion", "Settlement agreement drafting", "Case closure"],
      useCases: ["Contract disputes", "Consumer claims", "Arbitration cases"],
    },
    {
      id: "criminal-law-intake-defense",
      name: "Criminal Case Intake & Defense",
      summary: "Automate client intake, offense classification, bail applications, evidence collection, and defense strategy generation.",
      image: "/placeholder.jpg",
      solutions: ["Client intake", "FIR/Charge-sheet review", "Offense classification", "Bail application drafting", "Evidence collection", "Witness identification", "Defense strategy generation", "Court filing", "Hearing management", "Appeal planning"],
      useCases: ["Criminal defense", "Court representation", "Appeals management"],
    },
    {
      id: "criminal-law-bail-remand",
      name: "Bail & Remand Proceedings",
      summary: "Manage arrest notification, bail applications, risk assessment, court filings, and order tracking.",
      image: "/placeholder.jpg",
      solutions: ["Arrest notification", "Bail application drafting", "Risk assessment", "Argument preparation", "Court filing", "Hearing scheduling", "Court argument summary", "Bail order tracking"],
      useCases: ["Bail applications", "Remand proceedings", "Court compliance tracking"],
    },
    {
      id: "corporate-law-contract-lifecycle",
      name: "Contract Lifecycle Management",
      summary: "Oversee contract requests, clause suggestions, negotiation, approvals, and obligations.",
      image: "/placeholder.jpg",
      solutions: ["Contract request intake", "Template selection", "Clause suggestion", "Risk clause detection", "Negotiation support", "Approval routing", "E-signature tracking", "Obligation monitoring", "Renewal alerts", "Archival"],
      useCases: ["Corporate contracts", "M&A agreements", "Compliance tracking"],
    },
    {
      id: "corporate-law-ma",
      name: "Mergers & Acquisitions (M&A) Workflow",
      summary: "Manage deal intake, due diligence, agreement drafting, regulator filing, and transaction closing.",
      image: "/placeholder.jpg",
      solutions: ["Deal intake", "Due diligence", "Risk & liability analysis", "Drafting agreements", "Approval routing", "Regulator filing", "Transaction closing", "Compliance certification"],
      useCases: ["Corporate acquisitions", "M&A transactions", "Regulatory compliance"],
    },
    {
      id: "paralegal-document-management",
      name: "Document Management Workflow",
      summary: "Handle intake, indexing, version control, secure storage, audit logging, and sharing.",
      image: "/placeholder.jpg",
      solutions: ["Document intake", "Metadata tagging", "Indexing", "Version control", "Secure storage", "Retrieval", "Audit logging", "Document sharing", "Access control", "Archival"],
      useCases: ["Legal document organization", "Case file management", "Knowledge sharing"],
    },
    {
      id: "paralegal-research-support",
      name: "Research Support Workflow",
      summary: "Support legal queries, database searches, statute extraction, precedent highlighting, and draft compilation.",
      image: "/placeholder.jpg",
      solutions: ["Legal query assignment", "Database search", "Statute extraction", "Precedent highlighting", "Legal note creation", "Draft compilation", "Attorney review prep", "Knowledge library update"],
      useCases: ["Legal research", "Case preparation", "Precedent analysis"],
    },
    {
      id: "compliance-officers",
      name: "Regulatory Compliance & Monitoring Workflow",
      summary: "Detect regulation updates, assess compliance risk, and manage audits and remediation.",
      image: "/placeholder.jpg",
      solutions: ["Regulation update detection", "Policy mapping", "Compliance risk analysis", "Internal control check", "Audit report drafting", "Violation flagging", "Remediation suggestion", "Compliance dashboard update", "Regulator communication", "Compliance certification"],
      useCases: ["Corporate compliance", "Regulatory monitoring", "Internal audits"],
    },
    {
      id: "judges-mediators",
      name: "Case Adjudication & Dispute Resolution Workflow",
      summary: "Support case assignment, document review, evidence summarization, and decision drafting.",
      image: "/placeholder.jpg",
      solutions: ["Case assignment", "Document review", "Evidence summarization", "Precedent analysis", "Hearing scheduling", "Argument summarization", "Neutral evaluation", "Decision drafting", "Order issuance", "Appeal management"],
      useCases: ["Court adjudication", "Mediation", "Dispute resolution"],
    },
    {
      id: "billing-finance",
      name: "Legal Billing & Time Tracking Workflow",
      summary: "Manage activity logging, time capture, invoice drafting, expense reconciliation, and reporting.",
      image: "/placeholder.jpg",
      solutions: ["Activity logging", "Time capture", "Rate validation", "Billable hour allocation", "Invoice drafting", "Expense reconciliation", "Client approval routing", "Payment tracking", "Dispute resolution", "Billing analytics reporting"],
      useCases: ["Law firm billing", "Time tracking", "Financial reporting"],
    },
    {
      id: "legal-it-knowledge-management",
      name: "Knowledge Base & Legal Tech Management Workflow",
      summary: "Manage legal document collection, metadata structuring, AI model prep, and chatbot support.",
      image: "/placeholder.jpg",
      solutions: ["Legal document collection", "Metadata structuring", "AI model training data prep", "Search indexing", "Knowledge graph linking", "Update & maintenance", "User access management", "Legal chatbot support", "Analytics reporting", "Continuous improvement"],
      useCases: ["Legal tech management", "Knowledge base upkeep", "AI-assisted legal research"]
    }
  ]
}
,
{
  id: "healthcare",
  name: "Healthcare",
  description: "PHI-aware agents with clinical context and auditability.",
  image: "/industry/Healthcare.png",
  agents: [
    {
      id: "primary-care",
      name: "Primary Care Workflow",
      summary: "Manage patient registration, exams, diagnosis, treatment, and follow-up.",
      image: "/placeholder.jpg",
      solutions: ["Patient registration", "History review", "Examination", "Diagnosis", "Treatment planning", "Medication prescription", "Patient education", "Follow-up scheduling"],
      useCases: ["Routine checkups", "Chronic disease management", "Preventive screenings"],
    },
    {
      id: "specialist-consultation",
      name: "Specialist Consultation Workflow",
      summary: "Coordinate referrals, assessments, diagnostics, and treatment recommendations.",
      image: "/placeholder.jpg",
      solutions: ["Referral review", "Patient history analysis", "Specialized assessment", "Advanced diagnostics", "Treatment recommendation", "Progress monitoring", "Outcome evaluation"],
      useCases: ["Specialist consultations", "Interdisciplinary care", "Complex case management"],
    },
    {
      id: "diagnosis-treatment",
      name: "Diagnosis & Treatment Workflow",
      summary: "Streamline symptom assessment, test ordering, diagnosis, and treatment protocols.",
      image: "/placeholder.jpg",
      solutions: ["Symptom assessment", "Test ordering", "Result analysis", "Diagnosis formulation", "Treatment protocol selection", "Medication management", "Outcome assessment"],
      useCases: ["Patient treatment plans", "Clinical decision support", "Monitoring treatment effectiveness"],
    },
    {
      id: "patient-education",
      name: "Patient Education Workflow",
      summary: "Provide educational resources, verify comprehension, and plan adherence.",
      image: "/placeholder.jpg",
      solutions: ["Learning needs assessment", "Content preparation", "Education delivery", "Comprehension testing", "Follow-up education"],
      useCases: ["Patient education", "Health literacy improvement", "Behavioral adherence"],
    },
    {
      id: "primary-care-delivery",
      name: "Primary Care Delivery Workflow",
      summary: "Manage intake, health assessment, care planning, treatment, and documentation.",
      image: "/placeholder.jpg",
      solutions: ["Patient intake", "Health assessment", "Vital signs collection", "Care planning", "Treatment implementation", "Counseling", "Documentation", "Care coordination"],
      useCases: ["Routine care delivery", "Patient monitoring", "Coordinated care plans"],
    },
    {
      id: "chronic-disease-management",
      name: "Chronic Disease Management Workflow",
      summary: "Support ongoing assessment, education, monitoring, and outcome tracking for chronic conditions.",
      image: "/placeholder.jpg",
      solutions: ["Disease status assessment", "Risk evaluation", "Medication review", "Lifestyle assessment", "Care plan adjustment", "Self-management education", "Progress monitoring", "Complication prevention", "Outcome tracking"],
      useCases: ["Diabetes management", "Cardiac care", "Long-term condition monitoring"],
    },
    {
      id: "preventive-care",
      name: "Preventive Care Workflow",
      summary: "Enable risk screening, immunization, lifestyle counseling, and wellness planning.",
      image: "/placeholder.jpg",
      solutions: ["Risk screening", "Health maintenance review", "Immunization assessment", "Lifestyle counseling", "Preventive service planning", "Screening schedule development", "Wellness planning", "Follow-up coordination"],
      useCases: ["Preventive health checkups", "Vaccination tracking", "Wellness programs"],
    },
    {
      id: "patient-counseling",
      name: "Patient Counseling Workflow",
      summary: "Conduct counseling sessions, goal setting, strategy development, and progress evaluation.",
      image: "/placeholder.jpg",
      solutions: ["Needs assessment", "Session planning", "Rapport building", "Information gathering", "Problem exploration", "Goal setting", "Strategy development", "Action planning", "Progress evaluation"],
      useCases: ["Mental health counseling", "Lifestyle coaching", "Behavior change support"],
    },
    {
      id: "operations-management",
      name: "Operations Management Workflow",
      summary: "Optimize resource allocation, staff coordination, process efficiency, and continuous improvement.",
      image: "/placeholder.jpg",
      solutions: ["Operational planning", "Resource allocation", "Staff coordination", "Process optimization", "Performance monitoring", "Quality assurance", "Efficiency analysis", "Problem resolution", "Continuous improvement"],
      useCases: ["Hospital operations", "Clinic workflow optimization", "Process improvement initiatives"],
    },
    {
      id: "financial-oversight",
      name: "Financial Oversight Workflow",
      summary: "Manage budgets, revenue, costs, reporting, ROI analysis, and compliance.",
      image: "/placeholder.jpg",
      solutions: ["Budget planning", "Revenue analysis", "Cost management", "Financial reporting", "Expense monitoring", "ROI analysis", "Forecasting", "Audit coordination", "Compliance monitoring"],
      useCases: ["Hospital finance management", "Cost tracking", "Revenue optimization"],
    },
    {
      id: "compliance-monitoring",
      name: "Compliance Monitoring Workflow",
      summary: "Ensure regulatory compliance through audits, gap analysis, and continuous monitoring.",
      image: "/placeholder.jpg",
      solutions: ["Regulatory assessment", "Policy review", "Compliance auditing", "Gap analysis", "Corrective action planning", "Training coordination", "Documentation management", "Reporting preparation", "Continuous monitoring"],
      useCases: ["Healthcare regulations adherence", "Patient safety compliance", "Internal audits"],
    },
    {
      id: "resource-planning",
      name: "Resource Planning Workflow",
      summary: "Plan and optimize healthcare resources, staffing, and capacity.",
      image: "/placeholder.jpg",
      solutions: ["Demand forecasting", "Capacity planning", "Resource assessment", "Allocation strategy", "Scheduling optimization", "Utilization monitoring", "Efficiency improvement", "Cost optimization", "Performance tracking"],
      useCases: ["Staffing optimization", "Resource allocation", "Operational efficiency"],
    },
    {
      id: "laboratory-testing",
      name: "Laboratory Testing Workflow",
      summary: "Manage sample collection, processing, analysis, quality control, and reporting.",
      image: "/placeholder.jpg",
      solutions: ["Sample collection", "Processing", "Test preparation", "Analysis execution", "Quality control", "Result validation", "Data recording", "Report generation", "Result communication"],
      useCases: ["Lab diagnostics", "Quality assurance", "Clinical testing workflow"],
    },
    {
      id: "diagnostic-imaging",
      name: "Diagnostic Imaging Workflow",
      summary: "Handle imaging from patient prep to result documentation and communication.",
      image: "/placeholder.jpg",
      solutions: ["Patient preparation", "Equipment setup", "Image acquisition", "Image processing", "Quality assessment", "Image analysis", "Result documentation", "Report preparation", "Communication to radiologist"],
      useCases: ["Radiology workflow", "Imaging diagnostics", "Patient result delivery"],
    },
    {
      id: "equipment-operation",
      name: "Equipment Operation Workflow",
      summary: "Maintain, monitor, and operate medical equipment efficiently.",
      image: "/placeholder.jpg",
      solutions: ["Equipment inspection", "Calibration", "Maintenance scheduling", "Operation monitoring", "Troubleshooting", "Repair coordination", "Documentation", "Performance tracking", "Replacement planning"],
      useCases: ["Medical device management", "Operational readiness", "Preventive maintenance"],
    },
    {
      id: "quality-control",
      name: "Quality Control Workflow",
      summary: "Ensure quality across clinical processes through monitoring, analysis, and improvement.",
      image: "/placeholder.jpg",
      solutions: ["QC planning", "Sample preparation", "Control testing", "Result analysis", "Trend monitoring", "Deviation investigation", "Corrective action", "Documentation", "Continuous improvement"],
      useCases: ["Laboratory QC", "Clinical process validation", "Continuous quality improvement"],
    },
    {
      id: "patient-care-assistance",
      name: "Patient Care Assistance Workflow",
      summary: "Support direct patient care including reception, personal care, and vital signs monitoring.",
      image: "/placeholder.jpg",
      solutions: ["Patient reception", "Basic assessment", "Comfort measures", "Mobility assistance", "Personal care", "Vital signs monitoring", "Communication support", "Safety monitoring", "Documentation"],
      useCases: ["Nursing support", "Patient mobility assistance", "Inpatient care"],
    }
  ]
}
,
  {
    id: "agriculture",
    name: "Agriculture",
    description: "Smart solutions for farming and agricultural management.",
    image: "/industry/Agriculture.png",
    agents: [
      {
        id: "crop-production-agent",
        name: "Crop Production Agent",
        summary: "AI-driven workflow for managing crop lifecycle from land preparation to sale.",
        image: "/placeholder.jpg",
        solutions: [
      "Soil Analysis Agent",
      "Seed Selection Agent",
      "Sowing Scheduler Agent",
      "Irrigation Optimizer Agent",
      "Fertilizer Recommendation Agent",
      "Pest Detection Agent",
      "Harvest Planning Agent",
      "Storage Assistant Agent",
      "Market Linkage Agent"
    ],
    "useCases": [
      "Precision farming",
      "Smart irrigation",
      "Fertilizer optimization",
      "Pest management",
      "Harvest timing decisions",
      "Post-harvest logistics",
      "Farmer-market connections"
    ]
  },
  {
    "id": "farm-maintenance-agent",
    "name": "Farm Maintenance Agent",
    "summary": "Automates soil testing, equipment upkeep, labor scheduling, and compliance tracking.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Soil Testing Agent",
      "Equipment Maintenance Agent",
      "Labor Scheduling Agent",
      "Farm Records Agent",
      "Compliance Assistant Agent"
    ],
    "useCases": [
      "Soil health monitoring",
      "Predictive equipment maintenance",
      "Labor planning",
      "Digital farm logs",
      "Regulatory compliance support"
    ]
  },
  {
    "id": "sustainable-farming-agent",
    "name": "Sustainable Farming Agent",
    "summary": "Supports eco-friendly practices with certification, rotation planning, and resource optimization.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Certification Coordinator Agent",
      "Rotation Planner Agent",
      "Resource Optimizer Agent",
      "Sustainability Tracker Agent"
    ],
    "useCases": [
      "Sustainable agriculture adoption",
      "Organic farming certification",
      "Efficient resource management",
      "Carbon footprint monitoring"
    ]
  },
  {
    "id": "labor-management-agent",
    "name": "Labor Management Agent",
    "summary": "Streamlines agricultural labor assignment, tracking, and wage processing.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Job Assignment Agent",
      "Task Tracking Agent",
      "Attendance Agent",
      "Wage Processing Agent"
    ],
    "useCases": [
      "Labor assignment",
      "Work progress monitoring",
      "Attendance tracking",
      "Wage calculation & payment"
    ]
  },
  {
    "id": "skill-development-agent",
    "name": "Skill Development Agent",
    "summary": "Facilitates agricultural workforce training and certification.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Training Needs Agent",
      "Training Content Agent",
      "Performance Evaluation Agent",
      "Certification Agent"
    ],
    "useCases": [
      "Skill gap analysis",
      "Training content delivery",
      "Performance assessment",
      "Certification issuance"
    ]
  },
  {
    "id": "seed-fertilizer-distribution-agent",
    "name": "Seed & Fertilizer Distribution Agent",
    "summary": "Manages agri-input distribution from demand collection to billing.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Demand Collection Agent",
      "Inventory Tracking Agent",
      "Pricing Agent",
      "Delivery Scheduler Agent",
      "Billing Agent"
    ],
    "useCases": [
      "Input demand forecasting",
      "Stock management",
      "Dynamic pricing",
      "Delivery logistics",
      "Automated billing"
    ]
  },
  {
    "id": "advisory-agent",
    "name": "Advisory Agent",
    "summary": "Delivers personalized product recommendations and collects farmer feedback.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Recommendation Agent",
      "Usage Guide Agent",
      "Feedback Collector Agent"
    ],
    "useCases": [
      "Product recommendations",
      "Usage guidelines",
      "Farmer feedback management"
    ]
  },
  {
    "id": "water-management-agent",
    "name": "Water Management Agent",
    "summary": "Optimizes irrigation with requirement analysis, scheduling, and monitoring.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Requirement Analyzer Agent",
      "Scheduling Agent",
      "Distribution Agent",
      "Monitoring Agent",
      "Reporting Agent"
    ],
    "useCases": [
      "Smart irrigation",
      "Water scheduling",
      "Distribution management",
      "Real-time monitoring",
      "Usage reporting"
    ]
  },
  {
    "id": "infrastructure-maintenance-agent",
    "name": "Infrastructure Maintenance Agent",
    "summary": "Automates inspection, repair, and compliance of irrigation infrastructure.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Inspection Agent",
      "Repair Assignment Agent",
      "Quality Check Agent",
      "Documentation Agent"
    ],
    "useCases": [
      "Pipeline inspection",
      "Repair tracking",
      "Quality verification",
      "Digital documentation"
    ]
  },
  {
    "id": "crop-research-agent",
    "name": "Crop Research Agent",
    "summary": "Supports agronomists with data-driven crop field research and publication.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Field Study Agent",
      "Data Collection Agent",
      "Data Analysis Agent",
      "Recommendation Agent",
      "Publication Agent"
    ],
    "useCases": [
      "Field surveys",
      "Data-driven research",
      "Agronomy recommendations",
      "Research publication support"
    ]
  },
  {
    "id": "experiment-agent",
    "name": "Experiment Agent",
    "summary": "Enables agricultural experimentation from hypothesis to knowledge sharing.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Hypothesis Agent",
      "Experiment Setup Agent",
      "Monitoring Agent",
      "Result Analyzer Agent",
      "Knowledge Sharing Agent"
    ],
    "useCases": [
      "Experimental design",
      "Research monitoring",
      "Result analysis",
      "Knowledge dissemination"
    ]
  },
  {
    "id": "policy-implementation-agent",
    "name": "Policy Implementation Agent",
    "summary": "Automates agricultural policy drafting, enforcement, and monitoring.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Drafting Agent",
      "Approval Agent",
      "Communication Agent",
      "Enforcement Agent",
      "Monitoring Agent",
      "Reporting Agent"
    ],
    "useCases": [
      "Policy automation",
      "Regulatory approvals",
      "Policy enforcement",
      "Compliance reporting"
    ]
  },
  {
    "id": "subsidy-agent",
    "name": "Subsidy Agent",
    "summary": "Manages subsidy applications, approvals, disbursement, and auditing.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Application Intake Agent",
      "Verification Agent",
      "Approval Agent",
      "Disbursement Agent",
      "Audit Agent"
    ],
    "useCases": [
      "Subsidy applications",
      "Eligibility verification",
      "Approval workflow",
      "Fund disbursement",
      "Auditing & transparency"
    ]
  },
  {
    "id": "collective-marketing-agent",
    "name": "Collective Marketing Agent",
    "summary": "Enables farmer cooperatives to aggregate produce and negotiate prices.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Aggregation Agent",
      "Price Negotiator Agent",
      "Bulk Sale Agent",
      "Revenue Distribution Agent"
    ],
    "useCases": [
      "Collective aggregation",
      "Bulk sales",
      "Revenue distribution",
      "Price negotiations"
    ]
  },
  {
    "id": "training-support-agent",
    "name": "Training & Support Agent",
    "summary": "Delivers structured training programs and feedback for farmers.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Training Needs Agent",
      "Program Design Agent",
      "Implementation Agent",
      "Feedback Agent"
    ],
    "useCases": [
      "Farmer skill building",
      "Program development",
      "Training execution",
      "Feedback collection"
    ]
  },
  {
    "id": "procurement-agent",
    "name": "Procurement Agent",
    "summary": "Automates trader procurement process from farmer outreach to payment.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Outreach Agent",
      "Price Negotiator Agent",
      "Purchase Agent",
      "Logistics Agent",
      "Payment Agent"
    ],
    "useCases": [
      "Farmer engagement",
      "Price negotiations",
      "Purchase processing",
      "Logistics coordination",
      "Trader payment automation"
    ]
  },
  {
    "id": "distribution-agent",
    "name": "Distribution Agent",
    "summary": "Optimizes product sorting, allocation, transport, and buyer delivery.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Sorting Agent",
      "Allocation Agent",
      "Transport Agent",
      "Delivery Agent"
    ],
    "useCases": [
      "Product distribution",
      "Buyer delivery",
      "Transport logistics",
      "Allocation optimization"
    ]
  },
  {
    "id": "processing-agent",
    "name": "Processing Agent",
    "summary": "Streamlines food processing from procurement to distribution.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Procurement Agent",
      "Cleaning Agent",
      "Processing Agent",
      "Packaging Agent",
      "Quality Testing Agent",
      "Distribution Agent"
    ],
    "useCases": [
      "Raw material procurement",
      "Food processing automation",
      "Packaging optimization",
      "Quality testing",
      "Distribution support"
    ]
  },
  {
    "id": "compliance-agent",
    "name": "Compliance Agent",
    "summary": "Ensures safety, certification, and reporting in food supply chain.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Safety Check Agent",
      "Certification Agent",
      "Documentation Agent",
      "Reporting Agent"
    ],
    "useCases": [
      "Food safety compliance",
      "Certification management",
      "Documentation automation",
      "Regulatory reporting"
    ]
  },
  {
    "id": "export-agent",
    "name": "Export Agent",
    "summary": "Manages agricultural exports from market research to payment.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Market Research Agent",
      "Buyer Identification Agent",
      "Pricing Agent",
      "Quality Assurance Agent",
      "Documentation Agent",
      "Shipping Agent",
      "Payment Agent"
    ],
    "useCases": [
      "Export planning",
      "Market identification",
      "Pricing strategy",
      "Export quality compliance",
      "Shipping logistics",
      "Payment processing"
    ]
  },
  {
    "id": "import-agent",
    "name": "Import Agent",
    "summary": "Automates agricultural imports from supplier search to delivery.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Supplier Search Agent",
      "Negotiation Agent",
      "Compliance Agent",
      "Customs Clearance Agent",
      "Delivery Agent"
    ],
    "useCases": [
      "Supplier identification",
      "Import negotiations",
      "Regulatory compliance",
      "Customs processing",
      "Delivery tracking"
    ]
  },
  {
    "id": "technology-deployment-agent",
    "name": "Technology Deployment Agent",
    "summary": "Supports agri-tech solutions from analysis to deployment and support.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Requirement Analysis Agent",
      "Solution Design Agent",
      "Development Agent",
      "Testing Agent",
      "Deployment Agent",
      "Support Agent"
    ],
    "useCases": [
      "Agri-tech development",
      "Solution deployment",
      "Testing & validation",
      "Tech support"
    ]
  },
  {
    "id": "data-analytics-agent",
    "name": "Data Analytics Agent",
    "summary": "Enables data-driven agriculture insights and decision-making.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Data Collection Agent",
      "Preprocessing Agent",
      "Model Training Agent",
      "Insights Agent",
      "Decision Support Agent"
    ],
    "useCases": [
      "Agricultural data collection",
      "Data preprocessing",
      "AI model training",
      "Insights generation",
      "Decision support"
    ]
  },
  {
    "id": "agri-loan-agent",
    "name": "Agri-Loan Agent",
    "summary": "Simplifies agri-loan workflows from application to repayment monitoring.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Loan Application Agent",
      "Credit Check Agent",
      "Appraisal Agent",
      "Approval Agent",
      "Disbursement Agent",
      "Repayment Monitoring Agent"
    ],
    "useCases": [
      "Loan processing",
      "Credit checks",
      "Loan approval",
      "Fund disbursement",
      "Repayment monitoring"
    ]
  },
  {
    "id": "insurance-agent",
    "name": "Insurance Agent",
    "summary": "Automates agricultural insurance applications, risk assessment, and claims.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Application Agent",
      "Risk Assessment Agent",
      "Policy Issuance Agent",
      "Claim Request Agent",
      "Claim Settlement Agent"
    ],
    "useCases": [
      "Insurance applications",
      "Risk assessment",
      "Policy issuance",
      "Claims processing",
      "Settlement workflow"
    ]
  },
  {
    "id": "retail-agent",
    "name": "Retail Agent",
    "summary": "Optimizes agri-retail workflows from procurement to customer service.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Procurement Agent",
      "Inventory Manager Agent",
      "Pricing Agent",
      "Sales Agent",
      "Customer Service Agent"
    ],
    "useCases": [
      "Retail procurement",
      "Inventory management",
      "Pricing optimization",
      "Retail sales",
      "Customer support"
    ]
  },
  {
    "id": "wholesale-agent",
    "name": "Wholesale Agent",
    "summary": "Automates wholesale distribution and payment collection for agri-products.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Bulk Purchase Agent",
      "Distribution Agent",
      "Payment Collection Agent",
      "Reporting Agent"
    ],
    "useCases": [
      "Wholesale purchases",
      "Distribution logistics",
      "Payment collection",
      "Reporting automation"
    ]
  },
  {
    "id": "supply-chain-agent",
    "name": "Supply Chain Agent",
    "summary": "Manages agricultural supply chains with transport, tracking, and delivery.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Order Receipt Agent",
      "Route Planning Agent",
      "Transport Agent",
      "Tracking Agent",
      "Delivery Agent",
      "Proof of Delivery Agent"
    ],
    "useCases": [
      "Order management",
      "Transport planning",
      "Delivery tracking",
      "Proof of delivery"
    ]
  },
  {
    "id": "cold-chain-agent",
    "name": "Cold Chain Agent",
    "summary": "Ensures temperature-controlled logistics for agri-products.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Requirement Gathering Agent",
      "Temperature Monitoring Agent",
      "Delivery Agent",
      "Compliance Check Agent"
    ],
    "useCases": [
      "Cold chain logistics",
      "Temperature monitoring",
      "Perishable goods delivery",
      "Compliance verification"
    ]
  },
  {
    "id": "food-purchase-agent",
    "name": "Food Purchase Agent",
    "summary": "Helps consumers purchase food products with comparison and feedback loops.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Need Identification Agent",
      "Product Search Agent",
      "Price Comparison Agent",
      "Purchase Agent",
      "Payment Agent",
      "Feedback Agent"
    ],
    "useCases": [
      "Food purchase automation",
      "Product search",
      "Price comparison",
      "Customer feedback"
    ]
  },
  {
    "id": "consumer-awareness-agent",
    "name": "Consumer Awareness Agent",
    "summary": "Drives consumer awareness with quality checks and campaigns.",
    "image": "/placeholder.jpg",
    "solutions": [
      "Information Agent",
      "Quality Check Agent",
      "Awareness Campaign Agent",
      "Participation Agent"
    ],
    "useCases": [
      "Consumer education",
      "Product quality awareness",
      "Awareness campaigns",
      "Consumer participation"
    ]
  }
    ],
  },
{
  id: "manufacturing",
  name: "Manufacturing",
  description: "Automation and optimization for manufacturing processes.",
  image: "/industry/Manufacturing.png",
  agents: [
    {
      id: "rnd-innovation",
      name: "R&D & Innovation Workflow",
      summary: "Support material research, prototyping, and scaling innovations into manufacturing.",
      image: "/industry/Manufacturing.png",
      solutions: ["Research automation", "Prototype generation", "Testing & validation", "Scale-up management"],
      useCases: ["Material development", "New product innovation", "Chemical formulations"],
    },
    {
      id: "design",
      name: "Design Workflow",
      summary: "Streamline product design from concept to validation.",
      image: "/industry/Manufacturing.png",
      solutions: ["Concept ideation", "CAD automation", "Simulation & validation"],
      useCases: ["Industrial design", "Product development", "Design optimization"],
    },
    {
      id: "planning",
      name: "Planning Workflow",
      summary: "Optimize production planning and scheduling.",
      image: "/industry/Manufacturing.png",
      solutions: ["Demand forecasting", "Capacity planning", "Resource allocation", "Scheduling"],
      useCases: ["Production scheduling", "Capacity optimization", "Resource planning"],
    },
    {
      id: "procurement",
      name: "Procurement Workflow",
      summary: "Automate raw material and supplier procurement processes.",
      image: "/industry/Manufacturing.png",
      solutions: ["Vendor sourcing", "Quotation analysis", "Purchase order automation", "Invoice processing"],
      useCases: ["Supplier management", "Material sourcing", "Cost optimization"],
    },
    {
      id: "production",
      name: "Production Workflow",
      summary: "Enable seamless shop floor production operations.",
      image: "/industry/Manufacturing.png",
      solutions: ["Work order assignment", "Machine setup guidance", "Process monitoring", "Shift reporting"],
      useCases: ["Assembly line execution", "Machine operations", "Production tracking"],
    },
    {
      id: "quality",
      name: "Quality Workflow",
      summary: "Ensure product quality through inspection and compliance.",
      image: "/industry/Manufacturing.png",
      solutions: ["Inspection planning", "Defect logging", "Root cause analysis", "Compliance reporting"],
      useCases: ["Quality assurance", "Defect reduction", "Regulatory compliance"],
    },
    {
      id: "inventory",
      name: "Inventory Workflow",
      summary: "Automate inventory and warehouse management.",
      image: "/industry/Manufacturing.png",
      solutions: ["Stock tracking", "Replenishment planning", "Barcode/label management", "Inventory auditing"],
      useCases: ["Warehouse optimization", "Stock visibility", "Demand-driven replenishment"],
    },
    {
      id: "maintenance",
      name: "Maintenance Workflow",
      summary: "Enable predictive and preventive maintenance for equipment.",
      image: "/industry/Manufacturing.png",
      solutions: ["Condition monitoring", "Preventive maintenance", "Breakdown handling", "Spare parts management"],
      useCases: ["Equipment uptime", "Predictive maintenance", "Failure reduction"],
    },
    {
      id: "logistics",
      name: "Logistics Workflow",
      summary: "Optimize shipping and delivery coordination.",
      image: "/industry/Manufacturing.png",
      solutions: ["Shipment scheduling", "Route optimization", "Delivery tracking", "Returns handling"],
      useCases: ["Global shipments", "Distribution optimization", "Returns management"],
    },
    {
      id: "sales-aftermarket",
      name: "Sales & Aftermarket Workflow",
      summary: "Support customer orders, after-sales, and warranty handling.",
      image: "/industry/Manufacturing.png",
      solutions: ["Quotation generation", "Order confirmation", "After-sales support", "Warranty handling"],
      useCases: ["Customer orders", "After-sales engagement", "Service management"],
    },
    {
      id: "continuous-improvement",
      name: "Continuous Improvement Workflow",
      summary: "Drive continuous improvement through KPI monitoring and bottleneck detection.",
      image: "/industry/Manufacturing.png",
      solutions: ["KPI tracking", "Bottleneck detection", "Improvement planning", "Performance reporting"],
      useCases: ["Lean manufacturing", "Process optimization", "Operational efficiency"],
    },
    {
      id: "engineering",
      name: "Engineering Workflow",
      summary: "Optimize manufacturing process engineering and change management.",
      image: "/industry/Manufacturing.png",
      solutions: ["Process design", "Engineering simulation", "Tooling management", "Change management"],
      useCases: ["Process optimization", "Tooling automation", "Engineering change requests"],
    },
    {
      id: "safety-compliance",
      name: "Safety & Compliance Workflow",
      summary: "Ensure workplace safety and regulatory compliance.",
      image: "/industry/Manufacturing.png",
      solutions: ["Risk assessment", "Safety training", "Incident reporting", "Audit management"],
      useCases: ["Workplace safety", "Compliance audits", "Environmental protection"],
    },
    {
      id: "workforce-management",
      name: "Workforce Management Workflow",
      summary: "Plan and manage workforce scheduling, performance, and engagement.",
      image: "/industry/Manufacturing.png",
      solutions: ["Recruitment automation", "Training & development", "Shift scheduling", "Performance tracking"],
      useCases: ["Workforce optimization", "Employee engagement", "HR efficiency"],
    },
    {
      id: "it-systems",
      name: "IT & Systems Workflow",
      summary: "Automate IT infrastructure and cybersecurity for manufacturing systems.",
      image: "/industry/Manufacturing.png",
      solutions: ["System integration", "Cybersecurity", "Data governance", "System monitoring"],
      useCases: ["Smart factory IT", "Cybersecurity compliance", "System reliability"],
    },
    {
      id: "supply-chain",
      name: "Supply Chain Workflow",
      summary: "End-to-end supply chain coordination and optimization.",
      image: "/industry/Manufacturing.png",
      solutions: ["Demand planning", "Supplier collaboration", "Inventory replenishment", "Logistics coordination"],
      useCases: ["Global supply chains", "Supplier visibility", "Resilient operations"],
    },
    {
      id: "customer-support",
      name: "Customer Support Workflow",
      summary: "Handle customer inquiries, issues, and feedback collection.",
      image: "/industry/Manufacturing.png",
      solutions: ["Inquiry handling", "Order tracking", "Issue resolution", "Feedback collection"],
      useCases: ["Customer satisfaction", "Aftermarket support", "Issue management"],
    },
    {
      id: "financial-management",
      name: "Financial Management Workflow",
      summary: "Manage cost efficiency and profitability across operations.",
      image: "/industry/Manufacturing.png",
      solutions: ["Budgeting automation", "Cost tracking", "Variance analysis", "Profitability reporting"],
      useCases: ["Cost reduction", "Financial planning", "Profitability optimization"],
    },
    {
      id: "sustainability-esg",
      name: "Sustainability & ESG Workflow",
      summary: "Support sustainable manufacturing practices and ESG compliance.",
      image: "/industry/Manufacturing.png",
      solutions: ["Carbon footprint tracking", "Waste management", "Energy optimization", "Sustainability reporting"],
      useCases: ["Green manufacturing", "ESG compliance", "Energy-efficient operations"],
    }
  ]
}
,
  {
    id: "banking",
    name: "Banking",
    description: "Secure and compliant agents for banking operations.",
    image: "/industry/Banking.png",
    agents: [
  {
    "id": "retail-banker-onboarding",
    "name": "Retail Banker - Account Opening & KYC",
    "summary": "Streamline customer onboarding, KYC, and account creation with compliance.",
    "image": "/placeholder.jpg",
    "solutions": ["Identity verification", "Risk scoring", "KYC/AML checks"],
    "useCases": ["Customer onboarding", "Regulatory compliance", "Account setup"]
  },
  {
    "id": "retail-banker-loans",
    "name": "Retail Banker - Loan Processing",
    "summary": "Automate loan application review, credit checks, and disbursals.",
    "image": "/placeholder.jpg",
    "solutions": ["Credit scoring", "Risk analysis", "Document verification"],
    "useCases": ["Loan approval", "Credit assessment", "Repayment tracking"]
  },
  {
    "id": "corporate-banker-trade-finance",
    "name": "Corporate Banker - Trade Finance",
    "summary": "Digitize trade finance approvals with fraud checks and compliance.",
    "image": "/placeholder.jpg",
    "solutions": ["Document validation", "Fraud detection", "Compliance monitoring"],
    "useCases": ["LC processing", "Invoice validation", "Transaction settlement"]
  },
  {
    "id": "corporate-banker-treasury",
    "name": "Corporate Banker - Treasury Services",
    "summary": "Optimize liquidity, risk, and investment decisions for corporates.",
    "image": "/placeholder.jpg",
    "solutions": ["Cash flow forecasting", "FX/derivatives risk", "Investment recommendations"],
    "useCases": ["Liquidity analysis", "Treasury planning", "Financial reporting"]
  },
  {
    "id": "compliance-fraud-monitoring",
    "name": "Compliance Officer - Fraud & Risk Monitoring",
    "summary": "Monitor transactions and detect suspicious patterns in real time.",
    "image": "/placeholder.jpg",
    "solutions": ["Transaction monitoring", "Pattern recognition", "Fraud detection"],
    "useCases": ["AML monitoring", "Suspicious activity reports", "Regulatory filing"]
  },
  {
    "id": "compliance-regulatory",
    "name": "Compliance Officer - Regulatory Compliance",
    "summary": "Ensure adherence to financial regulations and automate reporting.",
    "image": "/placeholder.jpg",
    "solutions": ["Rule mapping", "Breach detection", "Audit trail creation"],
    "useCases": ["Regulatory checks", "Automated reporting", "Audit readiness"]
  },
  {
    "id": "customer-support-service",
    "name": "Customer Support - Service Requests",
    "summary": "Resolve banking service requests efficiently with automation.",
    "image": "/placeholder.jpg",
    "solutions": ["Query intake", "Knowledge base responses", "Escalation management"],
    "useCases": ["Balance queries", "Loan/card service", "Transaction help"]
  },
  {
    "id": "relationship-wealth",
    "name": "Relationship Manager - Wealth Management",
    "summary": "Provide tailored wealth management with AI-driven recommendations.",
    "image": "/placeholder.jpg",
    "solutions": ["Risk profiling", "Portfolio analysis", "Product matching"],
    "useCases": ["Investment advice", "Portfolio monitoring", "Rebalancing"]
  }
],
  },
  {
    id: "fintech",
    name: "Fintech",
    description: "Innovative solutions for financial technology applications.",
    image: "/industry/Fintech.png",
    agents: [
  {
    "id": "digital-payments",
    "name": "Digital Payments",
    "summary": "Enable instant, secure payments across multiple channels with fraud prevention.",
    "image": "/placeholder.jpg",
    "solutions": ["Payment initiation", "Authentication", "Fraud detection", "Authorization"],
    "useCases": ["Instant payments", "Cross-channel transactions", "Secure settlements"]
  },
  {
    "id": "personal-lending",
    "name": "Personal Lending",
    "summary": "Provide fast, automated loan approvals with integrated risk assessments.",
    "image": "/placeholder.jpg",
    "solutions": ["Loan application processing", "Credit scoring", "Risk analysis"],
    "useCases": ["Instant loan approvals", "Disbursement automation", "Consumer lending"]
  },
  {
    "id": "investment-management",
    "name": "Investment Management",
    "summary": "Automate investment decisions, portfolio construction, and performance tracking.",
    "image": "/placeholder.jpg",
    "solutions": ["Risk profiling", "Portfolio building", "Rebalancing"],
    "useCases": ["Wealth management", "Goal-based investing", "Portfolio monitoring"]
  },
  {
    "id": "insurance-services",
    "name": "Insurance Services",
    "summary": "Streamline insurance applications, underwriting, and claims management.",
    "image": "/placeholder.jpg",
    "solutions": ["Risk assessment", "Policy generation", "Claims automation"],
    "useCases": ["Policy issuance", "Claims processing", "Medical evaluation support"]
  },
  {
    "id": "buy-now-pay-later",
    "name": "Buy Now Pay Later",
    "summary": "Offer instant credit decisions and flexible installment plans for e-commerce.",
    "image": "/placeholder.jpg",
    "solutions": ["Instant credit check", "Payment splitting", "Collection management"],
    "useCases": ["E-commerce checkout financing", "Installment payments", "Default recovery"]
  },
  {
    "id": "crypto-trading",
    "name": "Cryptocurrency Trading",
    "summary": "Enable secure crypto trading with liquidity checks and portfolio management.",
    "image": "/placeholder.jpg",
    "solutions": ["Market analysis", "Liquidity validation", "Trade execution"],
    "useCases": ["Crypto trading", "Exchange settlements", "Wallet updates"]
  },
  {
    "id": "personal-finance",
    "name": "Personal Finance Management",
    "summary": "Automate budgeting, expense tracking, and financial goal setting.",
    "image": "/placeholder.jpg",
    "solutions": ["Transaction categorization", "Spending analysis", "Recommendations"],
    "useCases": ["Budget automation", "Financial planning", "Expense insights"]
  },
  {
    "id": "credit-score-monitoring",
    "name": "Credit Score Monitoring",
    "summary": "Monitor and improve credit health with automated insights and alerts.",
    "image": "/placeholder.jpg",
    "solutions": ["Score analysis", "Improvement recommendations", "Dispute management"],
    "useCases": ["Credit monitoring", "Risk factor identification", "Credit dispute support"]
  },
  {
    "id": "merchant-payments",
    "name": "Merchant Payment Processing",
    "summary": "Securely process business transactions with validation and risk checks.",
    "image": "/placeholder.jpg",
    "solutions": ["Merchant validation", "Customer authentication", "Risk assessment"],
    "useCases": ["Merchant settlements", "Payment processing", "Business transactions"]
  },
  {
    "id": "business-lending",
    "name": "Business Lending",
    "summary": "Automate underwriting and approval for business loans.",
    "image": "/placeholder.jpg",
    "solutions": ["Financial statement analysis", "Cash flow assessment", "Loan structuring"],
    "useCases": ["SME lending", "Credit evaluation", "Business loan disbursals"]
  },
  {
    "id": "invoice-financing",
    "name": "Invoice Financing",
    "summary": "Convert invoices into instant cash flow with automated verification.",
    "image": "/placeholder.jpg",
    "solutions": ["Invoice validation", "Credit checking", "Advance calculation"],
    "useCases": ["Invoice funding", "Working capital optimization", "Collections management"]
  },
  {
    "id": "payroll-management",
    "name": "Payroll Management",
    "summary": "Automate payroll calculations, compliance, and employee payments.",
    "image": "/placeholder.jpg",
    "solutions": ["Tax withholding", "Benefits administration", "Payment processing"],
    "useCases": ["Payroll automation", "Compliance reporting", "Employee salary disbursal"]
  },
  {
    "id": "fraud-detection",
    "name": "Fraud Detection",
    "summary": "Detect and prevent fraudulent activities in real time.",
    "image": "/placeholder.jpg",
    "solutions": ["Transaction monitoring", "Pattern recognition", "Risk scoring"],
    "useCases": ["Fraud alerts", "Transaction risk detection", "Case resolution"]
  },
  {
    "id": "aml-kyc",
    "name": "AML/KYC Compliance",
    "summary": "Ensure compliance with AML and KYC regulations using automation.",
    "image": "/placeholder.jpg",
    "solutions": ["Sanctions screening", "Document verification", "Ongoing monitoring"],
    "useCases": ["KYC checks", "AML compliance", "Suspicious activity reporting"]
  },
  {
    "id": "crypto-custody",
    "name": "Cryptocurrency Custody",
    "summary": "Securely store and manage digital assets with multi-layer security.",
    "image": "/placeholder.jpg",
    "solutions": ["Cold storage", "Multi-sig authorization", "Transaction monitoring"],
    "useCases": ["Crypto custody", "Asset security", "Regulated audits"]
  }
    ],
  },
]
}


