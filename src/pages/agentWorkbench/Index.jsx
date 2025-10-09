import React from "react";
import agentsData from "../../../public/data/agentsData";
import { useParams,useNavigate } from "react-router-dom";
import SEO from "../../components/common/SEO";
import CategoryGrid from "../../components/pages/agentWorkBench/CategoryGrid";

export default function CategoryGridoverall() {
const navigate = useNavigate();
 
 let { category } = useParams();
  let selectedCategory;
if (category === "industry-specific-agents") {
  selectedCategory = { industry: agentsData.industry };
} else if (category === "foundation-agents") {
  selectedCategory = { foundational: agentsData.foundational };
} else {
  selectedCategory = { foundational: agentsData.foundational };
}

    const handleLearnMore = (categoryId) => {
         if(!category){
            category="foundation-agents"
        }
        if(category==="industry-specific-agents") {
            navigate(`/agent-workbench/${category}/${categoryId}/agents`);
            return;
        }
        navigate(`/agent-workbench/${category}/${categoryId}`);
        console.log(`Learning more about category: ${categoryId}`);
    };
  return (
    <div className="min-h-screen bg-white py-8">
      <SEO 
        title="Agentic Workbench | SNS Square AI Agents"
        description="Explore SNS Square's Agentic Workbench with 1500+ AI agents. Discover, customize, and deploy AI solutions for industry, customer, and foundational business needs."
        keywords="SNS Square, Agentic Workbench, AI Agents, Industry Solutions, Customer Solutions, Foundation Agents, AI Automation, Business AI Solutions"
        image="https://www.snssquare.com/images/og/agentic-workbench-og.jpg"
        url="https://www.snssquare.com/agentic-workbench"
      />
      <div className="max-w-7xl mx-auto px-4">
        <CategoryGrid 
          data={selectedCategory} 
          onLearnMore={handleLearnMore}
          showCounts={true}
          showExploreMore={true}
          initialShowCount={6}
        />
      </div>
    </div>
  );
}