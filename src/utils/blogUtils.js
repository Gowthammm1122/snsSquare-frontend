// Blog data imports
import supplyChainData from '../data/Blog/supplyChain.json';
import itData from '../data/Blog/it.json';
import healthCareData from '../data/Blog/healthCare.json';
import insuranceData from '../data/Blog/insuranc.json';

// Blog data mapping
export const blogDataMap = {
  'supply-chain-1': supplyChainData,
  'information-technology-1': itData,
  'healthcare-1': healthCareData,
  'human-resource-1': itData, // Using IT data as placeholder
  'insurance-1': insuranceData
};

// Category mapping
export const categoryMap = {
  'Supply Chain': 'supply-chain-1',
  'Information Technology': 'information-technology-1',
  'Healthcare': 'healthcare-1',
  'Human Resource': 'human-resource-1',
  'Insurance': 'insurance-1'
};

// Get all blogs with processed data
export const getAllBlogs = () => {
  const blogs = [];
  
  Object.entries(blogDataMap).forEach(([id, data]) => {
    const category = Object.keys(categoryMap).find(key => categoryMap[key] === id);
    const blog = {
      id,
      title: data.title,
      description: data.introduction?.context || data.introduction?.overview || "Lorem ipsum dolor sit amet consectetur. In a posuere elit in in congue mi.",
      category: category || 'General',
      date: "Sep 10, 2025",
      readTime: "4 min read",
      content: data,
      image: null // No image provided, will use fallback design
    };
    blogs.push(blog);
  });

  return blogs;
};

// Get blog by ID
export const getBlogById = (id) => {
  const blogData = blogDataMap[id];
  if (!blogData) return null;

  const category = Object.keys(categoryMap).find(key => categoryMap[key] === id);
  
  return {
    id,
    title: blogData.title,
    description: blogData.introduction?.context || blogData.introduction?.overview || "Lorem ipsum dolor sit amet consectetur. In a posuere elit in in congue mi.",
    category: category || 'General',
    date: "April 1, 2025",
    updatedDate: "April 24, 2025",
    readTime: "7min reading",
    content: blogData,
    image: null
  };
};

// Get blogs by category
export const getBlogsByCategory = (category) => {
  const allBlogs = getAllBlogs();
  if (category === 'All') return allBlogs;
  return allBlogs.filter(blog => blog.category === category);
};

// Search blogs
export const searchBlogs = (searchTerm, blogs = getAllBlogs()) => {
  if (!searchTerm) return blogs;
  
  const term = searchTerm.toLowerCase();
  return blogs.filter(blog => 
    blog.title.toLowerCase().includes(term) ||
    blog.description.toLowerCase().includes(term) ||
    blog.category.toLowerCase().includes(term)
  );
};

// Get navigation anchors for blog content
export const getNavigationAnchors = (content) => {
  const anchors = [];
  
  if (content.challenge) {
    anchors.push({ id: 'challenge', title: 'Challenge' });
  }
  if (content.smart_supply_chain || content.what_is_agentic_ai || content.how_ai_transforms_risk_assessment) {
    anchors.push({ id: 'solution', title: 'Solution' });
  }
  if (content.benefits || content.benefits_for_organizations) {
    anchors.push({ id: 'benefits', title: 'Benefits' });
  }
  if (content.industry_examples || content.key_applications) {
    anchors.push({ id: 'examples', title: 'Examples' });
  }
  if (content.road_ahead || content.the_road_ahead) {
    anchors.push({ id: 'future', title: 'Future' });
  }
  
  return anchors;
};
