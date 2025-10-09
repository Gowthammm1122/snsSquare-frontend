import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import SEO from '../../components/common/SEO';
import BlogCard from '../../components/common/BlogCard';
import FeaturedBlogCard from '../../components/common/FeaturedBlogCard';
import HorizontalBlogCard from '../../components/common/HorizontalBlogCard';
import BlackButton from '../../components/common/BlackButton';

// Import blog data
import { fetchBlogs } from '../../api/Service/blog';

const BlogGrid = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const categories = [
    'All',
    'Information Technology',
    'Supply Chain',
    'Healthcare',
    'Human Resource',
    'Insurance'
  ];

  // Fetch from backend
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchBlogs();
        const list = res?.data || [];
        const mapped = list.map((b, idx) => ({
          id: b.slug,
          title: b.title,
          description: b.content ? b.content.substring(0, 150) + "..." : 
                       (b.introduction?.context ? b.introduction.context.substring(0, 150) + "..." : 
                        "Discover the latest insights and innovations in this field."),
          category: b.category || 'General',
          date: new Date(b.published_at || b.publishedAt || Date.now()).toLocaleDateString(),
          readTime: '5 min read',
          content: b,
          image: b.feature_image || b.image || null,
          featured: idx === 0,
        }));
        setAllBlogs(mapped);
        if (mapped.length > 0) {
          setFeaturedBlog(mapped[0]);
          setLatestBlogs(mapped.slice(1, 4));
        }
      } catch (e) {
        console.error('Failed to fetch blogs', e);
        setAllBlogs([]);
      }
    };
    load();
  }, []);

  // Filter blogs based on category and search term
  useEffect(() => {
    let filtered = allBlogs;

    // Filter by selected category
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);
  }, [selectedCategory, searchTerm, allBlogs]);

  // Update featured and latest blogs based on selected category
  useEffect(() => {
    let categoryBlogs = allBlogs;
    
    // Filter by selected category for featured and latest
    if (selectedCategory && selectedCategory !== 'All') {
      categoryBlogs = allBlogs.filter(blog => blog.category === selectedCategory);
    }

    // Set featured blog (first blog marked as featured or first blog from the category)
    if (categoryBlogs.length > 0) {
      const featuredBlogFromCategory = categoryBlogs.find(blog => blog.featured) || categoryBlogs[0];
      setFeaturedBlog(featuredBlogFromCategory);
      
      // Set latest blogs (exclude the featured one)
      const latestBlogsFromCategory = categoryBlogs.filter(blog => blog.id !== featuredBlogFromCategory.id).slice(0, 3);
      setLatestBlogs(latestBlogsFromCategory);
    } else {
      setFeaturedBlog(null);
      setLatestBlogs([]);
    }
  }, [selectedCategory, allBlogs]);

  const handleBlogClick = (blog) => {
    navigate(`/resources/blog/${blog.id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const displayedBlogs = showMore ? filteredBlogs : filteredBlogs.slice(0, 6);

  return (
    <div className="mt-20">
      <SEO 
        title="Blog | Insights from SNS Square Agentic AI"
        description="Stay updated with SNS Square's blog on Agentic AI, business automation, digital transformation, and industry insights to help your organization grow smarter."
        keywords="SNS Square Blog, Agentic AI, Business Automation, AI Insights, Digital Transformation, AI Use Cases, Enterprise AI, Industry Trends"
        image="https://www.snssquare.com/images/og/blog-og.jpg"
        url="https://www.snssquare.com/blog"
      />
      {/* Header Section */}
      <div className="relative w-full py-8 md:py-12 px-4 xs:px-5 sm:px-6 lg:px-8">
        {/* Horizontal gradient with the same colors as HeroSection */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#d3e0fa] to-[#e1f4ff]" />

        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-white" />

        <div className="relative max-w-[1480px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-6 lg:mb-0">
              <h1 className="font-manrope font-bold text-[32px] md:text-[40px] lg:text-[48px] leading-tight text-black mb-4">
                Blogs
              </h1>
            </div>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search By Topic"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-80 px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom border like in HeroSection */}
        <div className="absolute bottom-0 left-0 right-0 max-w-[1480px] mx-auto border-b border-gray-300" />
      </div>

      {/* Main Content Section */}
      <div className="">
        <div className="px-4 xs:px-5 sm:px-6 lg:px-8 py-8">
          <div className="max-w-[1480px] mx-auto">

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <BlackButton
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'black' : 'black-outline'}
                size="medium"
                className="transition-colors duration-200"
              >
                {category}
              </BlackButton>
            ))}
          </div>

          {/* Featured and Latest Section - Only show for All category */}
          {selectedCategory === 'All' && (
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 mb-16">
              {/* Featured Blog - 4/7 width (reduced from 3/5) */}
              <div className="lg:col-span-4 flex">
                {featuredBlog ? (
                  <FeaturedBlogCard
                    title={featuredBlog.title}
                    description={featuredBlog.description}
                    image={featuredBlog.image}
                    onClick={() => handleBlogClick(featuredBlog)}
                    badge="Featured"
                    date={featuredBlog.date}
                    readTime={featuredBlog.readTime}
                    className="w-full"
                  />
                ) : (
                  <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center w-full flex items-center justify-center">
                    <p className="text-gray-500">No featured blog available</p>
                  </div>
                )}
              </div>

              {/* Latest Blogs - 3/7 width with horizontal layout */}
              <div className="lg:col-span-3 flex flex-col gap-4">
                {latestBlogs.length > 0 ? (
                  latestBlogs.map((blog) => (
                    <HorizontalBlogCard
                      key={blog.id}
                      title={blog.title}
                      description={blog.description}
                      image={blog.image}
                      onClick={() => handleBlogClick(blog)}
                      badge="Latest"
                      date={blog.date}
                      readTime={blog.readTime}
                      className="w-full"
                    />
                  ))
                ) : (
                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <p className="text-gray-500 text-sm">No latest blogs available</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* All Articles Section */}
          <div className="mb-8">
            <h2 className="font-manrope font-bold text-[28px] md:text-[32px] lg:text-[36px] leading-tight text-black ">
              {selectedCategory === 'All' || !selectedCategory ? 'All Blogs' : `${selectedCategory} Articles`}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-6">
              {displayedBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
                  onClick={() => handleBlogClick(blog)}
                  date={blog.date}
                  readTime={blog.readTime}
                  className="h-full"
                />
              ))}
            </div>
          </div>

          {/* Show More Button */}
          {filteredBlogs.length > 6 && (
            <div className="text-center">
              <BlackButton
                onClick={() => setShowMore(!showMore)}
                variant="black-outline"
              >
                {showMore ? 'Show Less' : 'Show More'}
              </BlackButton>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogGrid;
