import React from "react";
import { useParams } from "react-router-dom";
import MultiLanguageChat from "./agents/multiLanguageBot";
import IdeaRefinementUI from "./agents/ideaRefinement";
import AgentDisplay from "./AgentDisplay";
import AgentWorkingPage from "./agents/deepResearch";
import ImageGenerator from "./agents/imageGeneration";
import EntityExtractor from "./agents/entityExtractor";
import AutomatedLinter from "./agents/automatedLinter";
import TestCaseGenerationAgent from "./agents/testCaseGeneration";
import DataGenerationPage from "./agents/dataGenerator";
import DocumentSummarizerAgent from "./agents/documentSummarizer";
import HealthcareAppointmentClassifier from "./agents/healthcareAppointmentClassifier";
import CsvExcelConverter from "./agents/csvExcelConverter"; 
import TripPlanningSystem from "./agents/tripPlanningAgent";
// import DataGenerationPage from "./agents/dataGenerator";

import EmailThreadSummariser from "./agents/emailthreadsummarizer";
import InputSourceCard from "./agents/faqagent";
import StorylineGenerator from "./agents/storytelling";
import HeadlineGenerator from "./agents/headlinegenerator";
const AgentRouter = () => {
  const { agentId } = useParams();

  // Map known agent ids to components
  const agentIdToComponent = {
    "multilanguage-chatbot": <MultiLanguageChat />,
    "idea-refinement-agent": <IdeaRefinementUI />,
    // If there is a deep research agent id, map it here
    "deep-research-agent": <AgentWorkingPage />,
    "logic-validation-agent": <AgentWorkingPage />,
    "email-summarizer-agent": <EmailThreadSummariser />,
    "general-query-agent": <AgentWorkingPage />,
    "data-management": <AgentWorkingPage />,
    "image-generation-agent": <ImageGenerator />,
    "entity-extraction-agent": <EntityExtractor />,
    "automated-linter-agent": <AutomatedLinter />,
    "testcase-generation-agent": <TestCaseGenerationAgent/>,
    "data-generation-agent": <DataGenerationPage />,
    // "data-management": <AgentWorkingPage />,
    "healthcare-appoinment-classifier": <HealthcareAppointmentClassifier />,
    // "document-summarizer-agent": <DocumentSummarizerAgent/>,
    "trip-planning-agent": <TripPlanningSystem />,
    "csv-to-excel-agent": <CsvExcelConverter />,
    // "data-query-agent": <DataQuery/>,
    // "data-generation-agent": <DataGenerationPage />,
    
    "developer-support": <InputSourceCard />,
    "social-media": <StorylineGenerator />,
    "work-management": <HeadlineGenerator />,
  };

  return agentIdToComponent[agentId] || <AgentDisplay />;
};

export default AgentRouter;


