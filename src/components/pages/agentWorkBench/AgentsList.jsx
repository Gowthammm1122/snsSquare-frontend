import React, { useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import agentsData from '../../../../public/data/agentsData'

const AgentsList = () => {
  const { category, categoryId, subcategoryId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const isIndustrySpecific = location.pathname.includes('industry-specific-agents') || category === 'industry-specific-agents'
  const isFoundational = category === 'foundation-agents'

  let displayedAgents = []
  let categoryData = null
  let subcategoryData = null
  let headerTitle = ''
  let headerDescription = ''

  if (isIndustrySpecific && categoryId) {
    categoryData = agentsData.industry?.find(cat => cat.id === categoryId)
    displayedAgents = categoryData?.agents || []
    headerTitle = categoryData?.name || 'Industry Agents'
    headerDescription = categoryData?.description || 'Industry-specific solutions for specialized business processes and workflows.'
  } else if (isFoundational && categoryId && subcategoryId) {
    const foundationalCategory = agentsData.foundational?.find(cat => cat.id === categoryId)
    subcategoryData = foundationalCategory?.subCategories?.find(sub => sub.id === subcategoryId)
    displayedAgents = subcategoryData?.agents || []
    headerTitle = subcategoryData?.name || 'Foundational Agents'
    headerDescription = subcategoryData?.description || 'Task-focused building blocks for extraction, summarization, routing, and orchestration.'
  } else {
    headerTitle = 'Agents'
    headerDescription = 'Browse available AI agents'
  }

  const filteredAgents = displayedAgents
    .filter(agent =>
      agent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.summary?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5)

  const handleAgentDetail = (agentId) => {
    if (isIndustrySpecific) {
      navigate(`/agent-workbench/industry-specific-agents/${categoryId}/agents/${agentId}`)
    } else if (isFoundational) {
      navigate(`/agent-workbench/foundation-agents/${categoryId}/${subcategoryId}/agents/${agentId}`)
    }
  }

  return (
    <div className="p-8 h-[842px] w-[1226px]">
      <div className="flex flex-col gap-[29px] sm:gap-[58px] justify-start items-center w-full">
        <div className="flex flex-col gap-[31px] sm:gap-[62px] justify-start items-center w-full">
          <div className="flex flex-col gap-[16px] sm:gap-[32px] justify-start items-center w-full">
            <div className="flex flex-row gap-[8px] sm:gap-[16px] justify-center items-center w-full">
              <div className="flex flex-col gap-[3px] sm:gap-[6px] justify-start items-start flex-1">
                <h3 className="text-[18px] sm:text-[22px] font-semibold leading-[23px] sm:leading-[28px] text-global-5 font-sora">
                  {headerTitle}
                </h3>
                <p className="text-[14px] sm:text-[16px] font-normal leading-[18px] sm:leading-[21px] text-global-5 font-sora">
                  {headerDescription}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[12px] sm:gap-[24px] w-full">
            {filteredAgents.length > 0 ? (
              <>
                {filteredAgents.map((agent, index) => (
                  <div key={agent.id || index} className="flex flex-row justify-center items-center w-full shadow-[0px_1px_8px_#10182814] sm:shadow-[0px_2px_16px_#10182814] bg-global-2 rounded-[24px] p-[8px] sm:p-[16px]">
                    <div className="flex flex-row justify-center items-center w-full">
                      <div className="w-[53px] h-[29px] sm:w-[106px] sm:h-[58px] bg-global-1 rounded-[8px] flex items-center justify-center">
                        {agent.image && agent.image != '/placeholder.jpg' ? (
                          <img 
                            src={agent.image} 
                            alt={agent.name}
                            className="w-full h-full object-cover rounded-[8px]"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {agent.name?.charAt(0) || 'A'}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-start items-start w-full ml-[6px] sm:ml-[12px]">
                        <div className="flex flex-row justify-between items-center w-full mb-[6px] sm:mb-[12px]">
                          <h4 className="text-[18px] sm:text-[22px] font-semibold leading-[23px] sm:leading-[28px] text-global-5 font-sora">
                            {agent.name}
                          </h4>
                          <button 
                            onClick={() => handleAgentDetail(agent.id)}
                            className="text-[14px] sm:text-[16px] mt-2 pr-5 font-normal leading-[18px] sm:leading-[20px] text-global-7 font-inter text-[#3E57DA] hover:text-[#2E47CA] cursor-pointer"
                          >
                            Read more
                          </button>
                        </div>
                        <p className="text-[14px] sm:text-[16px] font-normal leading-[18px] sm:leading-[20px] text-global-6 font-inter w-full">
                          {agent.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No matching agents found' : 'No agents available'}
                </h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? `No agents found matching "${searchTerm}". Try adjusting your search terms.`
                    : 'Agents for this category are coming soon. Check back later!'
                  }
                </p>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>   
      </div>
    </div>
  )
}

export default AgentsList
