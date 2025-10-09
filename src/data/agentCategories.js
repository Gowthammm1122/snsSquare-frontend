export const agentCategories = {
    "document-processing": {
        id: "document-processing",
        name: "Document Processing",
        description: "AI agents specialized in document processing, contract review, and policy validation",
        icon: "",
        color: "blue",
        agents: [
             {
                id: "deep-research-agent",
                name: "Deep Research Agent",
                description: "Classify and route documents to specialized processing pipelines.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Multi-label classification",
                    "Confidence scoring",
                    "Automatic routing",
                    "Batch processing"
                ],
                useCases: [
                    "Legal document sorting",
                    "Financial report categorization",
                    "Medical record classification",
                    "Email triage automation"
                ],
                status: "available"
            },
            {
                id: "contract-reviewer",
                name: "Contract/Document Review Agent",
                description: "Analyze and review contracts and legal documents for compliance and risk assessment.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Contract analysis",
                    "Risk assessment",
                    "Compliance checking",
                    "Legal validation"
                ],
                useCases: [
                    "Contract review",
                    "Legal compliance",
                    "Document validation",
                    "Risk management"
                ],
                status: "available"
            },
            {
                id: "policy-validator",
                name: "Policy & Compliance Validation Agent",
                description: "Validate documents against organizational policies and regulatory requirements.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Policy validation",
                    "Compliance checking",
                    "Regulatory analysis",
                    "Document scoring"
                ],
                useCases: [
                    "Policy compliance",
                    "Regulatory validation",
                    "Document audit",
                    "Compliance reporting"
                ],
                status: "available"
            }
        ]
    },
    "knowledge-management": {
        id: "knowledge-management",
        name: "Knowledge Management",
        description: "AI agents for knowledge retrieval, search, and knowledge base maintenance",
        icon: "",
        color: "purple",
        agents: [
            {
                id: "knowledge-retriever",
                name: "Knowledge Search & Retrieval Agent",
                description: "Search and retrieve relevant information from knowledge bases and documents.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Semantic search",
                    "Information retrieval",
                    "Context understanding",
                    "Source ranking"
                ],
                useCases: [
                    "Knowledge discovery",
                    "Research assistance",
                    "Information lookup",
                    "Content recommendation"
                ],
                status: "available"
            },
            {
                id: "knowledge-manager",
                name: "Knowledge Base Management Agent",
                description: "Maintain and organize knowledge bases with automated categorization.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Content organization",
                    "Automated categorization",
                    "Duplicate detection",
                    "Content updates"
                ],
                useCases: [
                    "Knowledge base maintenance",
                    "Content organization",
                    "Information architecture",
                    "Data curation"
                ],
                status: "available"
            },
            {
                id: "training-content",
                name: "Training Content Development Agent",
                description: "Create and develop training materials and educational content.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Content generation",
                    "Learning objectives",
                    "Assessment creation",
                    "Multi-format output"
                ],
                useCases: [
                    "Training development",
                    "Educational content",
                    "Skill assessment",
                    "Learning paths"
                ],
                status: "available"
            },
            {
                id: "expertise-locator",
                name: "Expertise Location Agent",
                description: "Identify and locate subject matter experts within the organization.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Expert identification",
                    "Skill mapping",
                    "Network analysis",
                    "Recommendation engine"
                ],
                useCases: [
                    "Expert finding",
                    "Knowledge networks",
                    "Skill matching",
                    "Team formation"
                ],
                status: "available"
            }
        ]
    },
    "content-handling": {
        id: "content-handling",
        name: "Content Handling & Summarization",
        description: "AI agents for content processing, summarization, and communication",
        icon: "",
        color: "green",
        agents: [
            {
                id: "email-summarizer-agent",
                name: "Email Summarization Agent",
                description: "Create comprehensive summaries of long emails and content.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Extractive summarization",
                    "Abstractive summarization",
                    "Key point extraction",
                    "Multi-document synthesis"
                ],
                useCases: [
                    "Document summarization",
                    "Research synthesis",
                    "Executive summaries",
                    "Content digests"
                ],
                status: "available"
            },
            {
                id: "meeting-processor",
                name: "Meeting Recording Processing Agent",
                description: "Process meeting recordings and generate actionable insights.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Transcription processing",
                    "Action item extraction",
                    "Key decision tracking",
                    "Follow-up generation"
                ],
                useCases: [
                    "Meeting minutes",
                    "Action tracking",
                    "Decision logging",
                    "Follow-up management"
                ],
                status: "available"
            },
            {
                id: "multilingual-processor",
                name: "Multi-language Content Processing Agent",
                description: "Process and translate content across multiple languages.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Language detection",
                    "Translation services",
                    "Cultural adaptation",
                    "Quality assessment"
                ],
                useCases: [
                    "Document translation",
                    "Multilingual support",
                    "Global communication",
                    "Localization"
                ],
                status: "available"
            },
            {
                id: "report-generator",
                name: "Report Generation Agent",
                description: "Generate comprehensive reports from data and analysis.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Automated reporting",
                    "Data visualization",
                    "Narrative generation",
                    "Template customization"
                ],
                useCases: [
                    "Business reports",
                    "Performance dashboards",
                    "Analysis summaries",
                    "Executive briefings"
                ],
                status: "available"
            },
            {
                id: "content-creator",
                name: "Content Creation & Writing Agent",
                description: "Create high-quality written content for various purposes.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Content generation",
                    "Style adaptation",
                    "SEO optimization",
                    "Quality assurance"
                ],
                useCases: [
                    "Marketing content",
                    "Technical documentation",
                    "Blog writing",
                    "Copywriting"
                ],
                status: "available"
            }
        ]
    },
    "communication-assistance": {
        id: "communication-assistance",
        name: "Communication & Assistance",
        description: "AI agents for customer support, communication, and user assistance",
        icon: "",
        color: "indigo",
        agents: [
            {
                id: "multilanguage-chatbot",
                name: "Multilanguage Chatbot",
                description: "Provide intelligent customer support and issue resolution in multiple languages.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Issue classification",
                    "Solution recommendation",
                    "Escalation management",
                    "Customer history"
                ],
                useCases: [
                    "Help desk support",
                    "Issue resolution",
                    "Customer service",
                    "Technical support"
                ],
                status: "available"
            },
            {
                id: "virtual-assistant",
                name: "Virtual Assistant Agent",
                description: "Personal productivity assistant for scheduling and task management.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Schedule management",
                    "Task prioritization",
                    "Reminder systems",
                    "Communication coordination"
                ],
                useCases: [
                    "Personal assistance",
                    "Executive support",
                    "Schedule coordination",
                    "Task management"
                ],
                status: "available"
            },
            {
                id: "hr-assistant",
                name: "HR Assistant Agent",
                description: "Assist with human resources tasks and employee queries.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Policy information",
                    "Benefits guidance",
                    "Process assistance",
                    "Employee support"
                ],
                useCases: [
                    "Employee onboarding",
                    "Benefits inquiries",
                    "Policy guidance",
                    "HR processes"
                ],
                status: "available"
            },
            {
                id: "email-assistant",
                name: "Email Management & Response Agent",
                description: "Manage email communications with intelligent responses and organization.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Email classification",
                    "Response generation",
                    "Priority scoring",
                    "Template management"
                ],
                useCases: [
                    "Email automation",
                    "Response management",
                    "Communication organization",
                    "Follow-up tracking"
                ],
                status: "available"
            },
            {
                id: "onboarding-guide",
                name: "User Onboarding & Guide Agent",
                description: "Guide new users through onboarding processes and system navigation.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Step-by-step guidance",
                    "Progress tracking",
                    "Interactive tutorials",
                    "Help documentation"
                ],
                useCases: [
                    "User onboarding",
                    "System training",
                    "Feature introduction",
                    "Help guidance"
                ],
                status: "available"
            },
            {
                id: "feedback-collector",
                name: "Feedback Collection & Analysis Agent",
                description: "Collect, analyze, and process user feedback and reviews.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Feedback aggregation",
                    "Sentiment analysis",
                    "Trend identification",
                    "Response generation"
                ],
                useCases: [
                    "Customer feedback",
                    "Product reviews",
                    "Service evaluation",
                    "Improvement insights"
                ],
                status: "available"
            },
            {
                id: "sales-support",
                name: "Sales Support Agent",
                description: "Support sales teams with lead qualification and customer interactions.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Lead scoring",
                    "Customer profiling",
                    "Sales enablement",
                    "Opportunity tracking"
                ],
                useCases: [
                    "Lead qualification",
                    "Sales assistance",
                    "Customer engagement",
                    "Pipeline management"
                ],
                status: "available"
            },
            {
                id: "appointment-scheduler",
                name: "Appointment Booking Agent",
                description: "Automate appointment scheduling and calendar management.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Availability checking",
                    "Booking automation",
                    "Reminder notifications",
                    "Rescheduling management"
                ],
                useCases: [
                    "Meeting scheduling",
                    "Service bookings",
                    "Calendar coordination",
                    "Appointment management"
                ],
                status: "available"
            }
        ]
    },
    "business-intelligence": {
        id: "business-intelligence",
        name: "Business Intelligence & Analysis",
        description: "AI agents for analytics, forecasting, and business intelligence",
        icon: "",
        color: "orange",
        agents: [
            {
                id: "analytics-reporter",
                name: "Analytics & Reporting Agent",
                description: "Generate comprehensive analytics reports and business insights.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Data analysis",
                    "Report generation",
                    "Trend identification",
                    "Performance metrics"
                ],
                useCases: [
                    "Business reporting",
                    "Performance analysis",
                    "Data insights",
                    "KPI tracking"
                ],
                status: "available"
            },
            {
                id: "market-analyzer",
                name: "Market Analysis Agent",
                description: "Analyze market trends, competition, and business opportunities.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Market research",
                    "Competitive analysis",
                    "Trend forecasting",
                    "Opportunity identification"
                ],
                useCases: [
                    "Market intelligence",
                    "Competitive research",
                    "Business strategy",
                    "Market positioning"
                ],
                status: "available"
            },
            {
                id: "financial-analyzer",
                name: "Financial Analysis Agent",
                description: "Perform financial analysis, forecasting, and risk assessment.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Financial modeling",
                    "Risk assessment",
                    "Performance analysis",
                    "Forecasting"
                ],
                useCases: [
                    "Financial planning",
                    "Investment analysis",
                    "Budget forecasting",
                    "Risk management"
                ],
                status: "available"
            },
            {
                id: "inventory-optimizer",
                name: "Inventory Optimization Agent",
                description: "Optimize inventory levels and supply chain operations.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Demand forecasting",
                    "Inventory optimization",
                    "Supply chain analysis",
                    "Cost optimization"
                ],
                useCases: [
                    "Inventory management",
                    "Supply chain optimization",
                    "Demand planning",
                    "Cost reduction"
                ],
                status: "available"
            },
            {
                id: "performance-monitor",
                name: "Performance Monitoring Agent",
                description: "Monitor and analyze business performance metrics and KPIs.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "KPI tracking",
                    "Performance dashboards",
                    "Alert systems",
                    "Trend analysis"
                ],
                useCases: [
                    "Performance tracking",
                    "Goal monitoring",
                    "Business intelligence",
                    "Operational insights"
                ],
                status: "available"
            },
            {
                id: "customer-analytics",
                name: "Customer Analytics Agent",
                description: "Analyze customer behavior, preferences, and lifecycle patterns.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Customer segmentation",
                    "Behavior analysis",
                    "Churn prediction",
                    "Lifetime value"
                ],
                useCases: [
                    "Customer insights",
                    "Retention strategies",
                    "Personalization",
                    "Marketing optimization"
                ],
                status: "available"
            },
            {
                id: "fraud-detector",
                name: "Fraud Detection Agent",
                description: "Detect and prevent fraudulent activities and anomalies.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Anomaly detection",
                    "Pattern recognition",
                    "Risk scoring",
                    "Real-time monitoring"
                ],
                useCases: [
                    "Fraud prevention",
                    "Risk assessment",
                    "Security monitoring",
                    "Compliance checking"
                ],
                status: "available"
            },
            {
                id: "predictive-analyst",
                name: "Predictive Analytics Agent",
                description: "Perform predictive analysis and forecasting for business planning.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Machine learning models",
                    "Forecasting algorithms",
                    "Trend prediction",
                    "Scenario modeling"
                ],
                useCases: [
                    "Business forecasting",
                    "Demand prediction",
                    "Risk modeling",
                    "Strategic planning"
                ],
                status: "available"
            }
        ]
    },
    "compliance-security": {
        id: "compliance-security",
        name: "Compliance, Security & Privacy",
        description: "AI agents for compliance monitoring, cybersecurity, and data privacy protection",
        icon: "",
        color: "red",
        agents: [
            {
                id: "compliance-monitor",
                name: "Compliance Monitoring Agent",
                description: "Monitor and ensure compliance with regulations and internal policies.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Regulatory compliance",
                    "Policy enforcement",
                    "Audit trail",
                    "Violation detection"
                ],
                useCases: [
                    "GDPR compliance",
                    "Financial regulations",
                    "Industry standards",
                    "Internal policy enforcement"
                ],
                status: "available"
            },
            {
                id: "cybersecurity-monitor",
                name: "Cybersecurity Monitoring Agent",
                description: "Monitor and detect cybersecurity threats and vulnerabilities.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Threat detection",
                    "Vulnerability assessment",
                    "Security monitoring",
                    "Incident response"
                ],
                useCases: [
                    "Network security",
                    "Malware detection",
                    "Intrusion prevention",
                    "Security auditing"
                ],
                status: "available"
            },
            {
                id: "pii-redactor",
                name: "Data Privacy (PII Redaction) Agent",
                description: "Identify and redact personally identifiable information from documents.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "PII detection",
                    "Automated redaction",
                    "Data masking",
                    "Privacy compliance"
                ],
                useCases: [
                    "Document sanitization",
                    "Data anonymization",
                    "Privacy protection",
                    "GDPR compliance"
                ],
                status: "available"
            }
        ]
    },
    "data-processing": {
        id: "data-processing",
        name: "Data Handling & Processing",
        description: "AI agents for data cleaning, analysis, and processing automation",
        icon: "",
        color: "cyan",
        agents: [
            {
                id: "data-cleaner",
                name: "Data Cleaning & Preprocessing Agent",
                description: "Clean, validate, and preprocess data for analysis and machine learning.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Data validation",
                    "Duplicate removal",
                    "Missing value handling",
                    "Format standardization"
                ],
                useCases: [
                    "Dataset preparation",
                    "Data quality improvement",
                    "ETL processes",
                    "ML data preprocessing"
                ],
                status: "available"
            },
            {
                id: "spreadsheet-analyzer",
                name: "Spreadsheet Analysis Agent",
                description: "Analyze and process spreadsheet data with automated insights.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Formula validation",
                    "Data analysis",
                    "Chart generation",
                    "Error detection"
                ],
                useCases: [
                    "Financial analysis",
                    "Report generation",
                    "Data validation",
                    "Business intelligence"
                ],
                status: "available"
            },
            {
                id: "database-manager",
                name: "Database Querying & Management Agent",
                description: "Automate database operations and complex query generation.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Query optimization",
                    "Schema analysis",
                    "Performance monitoring",
                    "Automated reporting"
                ],
                useCases: [
                    "Data extraction",
                    "Report automation",
                    "Database optimization",
                    "Analytics queries"
                ],
                status: "available"
            },
            {
                id: "web-scraper",
                name: "Web Scraping & Extraction Agent",
                description: "Extract structured data from websites and web applications.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Intelligent scraping",
                    "Data extraction",
                    "Anti-bot handling",
                    "Scheduled collection"
                ],
                useCases: [
                    "Market research",
                    "Price monitoring",
                    "Lead generation",
                    "Content aggregation"
                ],
                status: "available"
            },
            {
                id: "invoice-processor",
                name: "Invoice Processing Agent",
                description: "Automate invoice processing, data extraction, and validation.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "OCR processing",
                    "Data extraction",
                    "Validation rules",
                    "ERP integration"
                ],
                useCases: [
                    "Accounts payable",
                    "Expense management",
                    "Financial processing",
                    "Audit preparation"
                ],
                status: "available"
            },
            {
                id: "file-converter",
                name: "File Conversion & Formatting Agent",
                description: "Convert files between formats and standardize document formatting.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Multi-format support",
                    "Batch processing",
                    "Quality preservation",
                    "Automated workflows"
                ],
                useCases: [
                    "Document conversion",
                    "Format standardization",
                    "Legacy file migration",
                    "Publishing workflows"
                ],
                status: "available"
            },
            {
                id: "data-visualizer",
                name: "Data Visualization Agent",
                description: "Create interactive charts, graphs, and dashboards from data.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Interactive charts",
                    "Custom dashboards",
                    "Real-time updates",
                    "Export capabilities"
                ],
                useCases: [
                    "Business dashboards",
                    "Performance monitoring",
                    "Research visualization",
                    "Analytics reporting"
                ],
                status: "available"
            }
        ]
    },
    "developer-assistance": {
        id: "developer-assistance",
        name: "Developer & Technical Assistance",
        description: "AI agents for development support, testing, and technical automation",
        icon: "",
        color: "slate",
        agents: [
            {
                id: "code-reviewer",
                name: "Code Review & Debugging Agent",
                description: "Analyze code quality, identify bugs, and suggest improvements.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Static analysis",
                    "Bug detection",
                    "Performance optimization",
                    "Security scanning"
                ],
                useCases: [
                    "Code quality assurance",
                    "Security auditing",
                    "Performance optimization",
                    "Technical debt analysis"
                ],
                status: "available"
            },
            {
                id: "testing-qa",
                name: "Testing & QA Agent",
                description: "Automate testing processes and quality assurance workflows.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Test automation",
                    "Regression testing",
                    "Performance testing",
                    "Bug tracking"
                ],
                useCases: [
                    "Automated testing",
                    "Quality assurance",
                    "Continuous integration",
                    "Performance monitoring"
                ],
                status: "available"
            },
            {
                id: "devops-monitor",
                name: "DevOps Monitoring Agent",
                description: "Monitor development operations and infrastructure performance.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Infrastructure monitoring",
                    "Performance tracking",
                    "Alert management",
                    "Deployment monitoring"
                ],
                useCases: [
                    "System monitoring",
                    "Performance optimization",
                    "Incident management",
                    "Capacity planning"
                ],
                status: "available"
            },
            {
                id: "workflow-automator",
                name: "Workflow Automation Agent",
                description: "Automate development workflows and repetitive tasks.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Process automation",
                    "Task scheduling",
                    "Workflow orchestration",
                    "Integration management"
                ],
                useCases: [
                    "CI/CD pipelines",
                    "Deployment automation",
                    "Task automation",
                    "Process optimization"
                ],
                status: "available"
            },
            {
                id: "api-integrator",
                name: "Integration & API Agent",
                description: "Manage API integrations and system connectivity.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "API management",
                    "Integration testing",
                    "Data mapping",
                    "Error handling"
                ],
                useCases: [
                    "System integration",
                    "API development",
                    "Data synchronization",
                    "Service orchestration"
                ],
                status: "available"
            }
        ]
    },
    "productivity-workflow": {
        id: "productivity-workflow",
        name: "Productivity & Workflow",
        description: "AI agents for task management, scheduling, and productivity enhancement",
        icon: "",
        color: "yellow",
        agents: [
            {
                id: "task-manager",
                name: "Task & Project Management Agent",
                description: "Manage tasks, projects, and team productivity workflows.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Task tracking",
                    "Project planning",
                    "Resource allocation",
                    "Progress monitoring"
                ],
                useCases: [
                    "Project management",
                    "Team coordination",
                    "Deadline tracking",
                    "Resource planning"
                ],
                status: "available"
            },
            {
                id: "calendar-scheduler",
                name: "Calendar & Scheduling Agent",
                description: "Intelligent calendar management and meeting scheduling.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Smart scheduling",
                    "Conflict resolution",
                    "Meeting optimization",
                    "Availability management"
                ],
                useCases: [
                    "Meeting scheduling",
                    "Calendar optimization",
                    "Resource booking",
                    "Time management"
                ],
                status: "available"
            },
            {
                id: "presentation-builder",
                name: "Presentation Building Agent",
                description: "Create professional presentations with automated design and content.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Template generation",
                    "Content organization",
                    "Design automation",
                    "Multi-format export"
                ],
                useCases: [
                    "Business presentations",
                    "Sales pitches",
                    "Training materials",
                    "Report presentations"
                ],
                status: "available"
            },
            {
                id: "research-assistant",
                name: "Research Assistance Agent",
                description: "Assist with research tasks, data gathering, and analysis.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Information gathering",
                    "Source verification",
                    "Data analysis",
                    "Report generation"
                ],
                useCases: [
                    "Academic research",
                    "Market research",
                    "Competitive analysis",
                    "Due diligence"
                ],
                status: "available"
            }
        ]
    },
    "media-social": {
        id: "media-social",
        name: "Media & Social",
        description: "AI agents for social media management and analytics",
        icon: "📱",
        color: "pink",
        agents: [
            {
                id: "social-analytics",
                name: "Social Media Analytics Agent",
                description: "Analyze social media performance and audience engagement.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Engagement analysis",
                    "Audience insights",
                    "Performance tracking",
                    "Trend identification"
                ],
                useCases: [
                    "Social media optimization",
                    "Campaign analysis",
                    "Audience research",
                    "Content strategy"
                ],
                status: "available"
            },
            {
                id: "social-content-creator",
                name: "Social Media Content Creation Agent",
                description: "Create engaging social media content for various platforms.",
                image: "../../public/images/icons/squares.png",
                features: [
                    "Platform optimization",
                    "Content generation",
                    "Visual creation",
                    "Hashtag optimization"
                ],
                useCases: [
                    "Content marketing",
                    "Brand awareness",
                    "Community engagement",
                    "Social campaigns"
                ],
                status: "available"
            }
        ]
    }
};

export const getCategoryById = (categoryId) => {
    return agentCategories[categoryId] || null;
};

export const getAllCategories = () => {
    return Object.values(agentCategories);
};

export const getAgentById = (categoryId, agentId) => {
    const category = getCategoryById(categoryId);
    if (!category) return null;

    return category.agents.find(agent => agent.id === agentId) || null;
};

export const searchAgents = (query) => {
    const results = [];
    Object.values(agentCategories).forEach(category => {
        category.agents.forEach(agent => {
            if (
                agent.name.toLowerCase().includes(query.toLowerCase()) ||
                agent.description.toLowerCase().includes(query.toLowerCase()) ||
                agent.features?.some(feature => feature.toLowerCase().includes(query.toLowerCase())) ||
                agent.useCases?.some(useCase => useCase.toLowerCase().includes(query.toLowerCase()))
            ) {
                results.push({
                    ...agent,
                    categoryId: category.id,
                    categoryName: category.name
                });
            }
        });
    });
    return results;
};
