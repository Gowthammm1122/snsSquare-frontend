import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./BlackButton.jsx";
import { useAuthStore } from "../../store/store";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown } from "react-icons/md";

// Animated Hamburger Icon Component
const HamburgerIcon = ({ isOpen, className, ...props }) => (
  <svg
    className={`pointer-events-none transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] ${className}`}
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] ${isOpen
        ? 'translate-x-0 translate-y-0 rotate-[315deg]'
        : '-translate-y-[7px]'
        }`}
    />
    <path
      d="M4 12H20"
      className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] ${isOpen ? 'rotate-45' : 'rotate-0'
        }`}
    />
    <path
      d="M4 12H20"
      className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] ${isOpen
        ? 'translate-y-0 rotate-[135deg]'
        : 'translate-y-[7px]'
        }`}
    />
  </svg>
);

// Animated Arrow Component for Navigation
const AnimatedArrow = ({ isHovered, className, ...props }) => (
  <div className={`relative inline-flex items-center transition-all duration-300 ease-in-out ${className}`}>
    <MdOutlineKeyboardArrowRight
      className={`absolute transition-all duration-300 ease-in-out ${isHovered
        ? 'opacity-0 rotate-90 scale-0'
        : 'opacity-100 rotate-0 scale-100'
        }`}
      size={16}
      {...props}
    />
    <MdOutlineKeyboardArrowDown
      className={`absolute transition-all duration-300 ease-in-out ${isHovered
        ? 'opacity-100 rotate-0 scale-100'
        : 'opacity-0 -rotate-90 scale-0'
        }`}
      size={16}
      {...props}
    />
  </div>
);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const menuRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  // Check if user is admin
  const isAdmin = user?.role === 'admin' || user?.isAdmin;

  // Dropdown content for each navigation item
  const dropdownContent = {
    'agentic-workbench': [
      { label: 'Foundation Agents', href: '/agent-workbench/ai-agents', icon: '/icons/newicons/foundatioagent.svg'},
      { label: 'Industry Solutions', href: '/agent-workbench/workflow-builder', icon: '/icons/newicons/industrysol.svg' },
      { label: 'Customer Solutions', href: '/agent-workbench/marketplace', icon: '/icons/newicons/customersol.svg' }
    ],
    'use-cases': [
      { label: 'Supply Chain', href: '/usecase?category=supply-chain', icon: '/icons/newicons/supplychain.svg' },
      { label: 'Information Technology', href: '/usecase?category=information-technology', icon: '/icons/newicons/IT.svg' },
      { label: 'Healthcare', href: '/usecase?category=healthcare', icon: '/icons/newicons/healthcare.svg' },
      { label: 'Human Resource', href: '/usecase?category=human-resource', icon: '/icons/newicons/humanresource.svg' },
      { label: 'Insurance', href: '/usecase?category=insurance', icon: '/icons/newicons/insurance.svg' }
    ],
    'our-products': [
      { label: 'Square Bridge', href: '/products/square-bridge' },
      { label: 'Medmatch', href: '/products/medmatch' },
      { label: 'Hyrdragon', href: '/products/hyrdragon' },
      { label: 'MiLAi', href: '/products/milai' },
      { label: 'OKRion', href: '/products/okrion' }
    ],
    'about-us': [
      { label: 'Life at SNS Square', href: '/life-at-sns' },
      { label: 'About SNS Square', href: '/about-us' },
    ],
  };

  const linkClasses = ({ isActive }) =>
    `text-small font-normal font-inter cursor-pointer transition-colors duration-300
     ${isActive ? "text-blue-600" : "text-black hover:text-blue-600"}`;

  // Function to handle navigation link clicks
  const handleNavClick = () => {
    closeMenu();
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to open menu with animation
  const openMenu = () => {
    setMenuOpen(true);
    setIsAnimating(true);
  };

  // Function to close menu with animation
  const closeMenu = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setMenuOpen(false);
    }, 140); // Match the transition duration
  };

  // Function to handle logo click - navigate to home
  const handleLogoClick = () => {
    navigate('/');
    closeMenu(); // Close mobile menu if open
    // Scroll to top when navigating to home
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to handle contact button click
  const handleContactClick = () => {
    navigate('/contact-us');
    closeMenu();
  };

  // Function to handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
    closeMenu();
  };

  // Function to navigate to agent workbench
  const handleAgentWorkbenchClick = () => {
    navigate('/media-entertainment');
    closeMenu();
  };

  // Function to navigate to CMS portal
  const handleCmsPortalClick = () => {
    navigate('/admin');
    setShowUserMenu(false);
    closeMenu();
  };

  // Function to handle dropdown hover
  const handleDropdownHover = (dropdownKey) => {
    // Clear any existing timeout
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setHoveredDropdown(dropdownKey);
  };

  // Function to handle dropdown leave with delay
  const handleDropdownLeave = () => {
    // Clear any existing timeout
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    // Set a new timeout
    dropdownTimeoutRef.current = setTimeout(() => {
      setHoveredDropdown(null);
      dropdownTimeoutRef.current = null;
    }, 150);
  };

  // Function to handle dropdown item click
  const handleDropdownItemClick = (href) => {
    navigate(href);
    setHoveredDropdown(null);
    closeMenu();
  };

  // Dropdown component
  const DropdownMenu = ({ items, isVisible, dropdownKey }) => {
    if (!isVisible || !items) return null;

    return (
      <div
        className="absolute top-full left-0 mt-0 w-92 bg-white rounded-xl shadow-lg border border-gray-100 py-3 z-50 animate-in slide-in-from-top-2 fade-in-0 duration-200"
        onMouseEnter={() => handleDropdownHover(dropdownKey)}
        onMouseLeave={handleDropdownLeave}
      >
        <div className="flex flex-col gap-2">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleDropdownItemClick(item.href)}
              className="group flex items-center gap-3 w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg  flex items-center justify-center  transition-colors duration-200">
                <img src={item.icon || "/images/home/OCS-icon.png"} alt={`${item.label} Icon`} className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-medium text-gray-900">
                  {item.label}
                </span>
                {/* <span className="text-sm text-gray-500">
                  Foundational Agents
                </span> */}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Function to handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Function to handle clicks outside the user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.relative')) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="w-full bg-white p-4 fixed top-0 left-0 z-100 backdrop-blur-md shadow-sm">
      <div className="w-[90%] max-w-[1440px] mx-auto relative flex items-center justify-between">
        {/* Logo - left corner */}
        <div
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200"
          onClick={handleLogoClick}
        >
          <img
            src="/images/square_logo_black.png"
            alt="SNS Square Logo"
            className="w-[60px] h-[42px] sm:w-[80px] sm:h-[55px] md:w-[96px] md:h-[66px]"
          />
        </div>

        {/* Nav - center (show from lg and up; compact spacing at lg to avoid overlap) */}
        <nav className="hidden lg:flex flex-row items-center gap-3 lg:gap-4 xl:gap-6 absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <div
            className="relative group"
            onMouseEnter={() => handleDropdownHover('agentic-workbench')}
            onMouseLeave={handleDropdownLeave}
          >
            <div
              className="flex items-center cursor-pointer"
            >
              <NavLink
                to="/agent-workbench"
                className={({ isActive }) => {
                  const isAgentWorkbenchActive = isActive || window.location.pathname === '/media-entertainment';
                  return `text-small font-normal font-inter cursor-pointer transition-colors duration-300
                  ${isAgentWorkbenchActive ? "text-blue-600" : "text-black hover:text-blue-600"}`;
                }}
                onClick={handleNavClick}
              >
                Agentic Workbench
              </NavLink>
              <AnimatedArrow
                isHovered={hoveredDropdown === 'agentic-workbench'}
                className="text-gray-400 hover:text-gray-600 ml-1"
              />
            </div>
            <DropdownMenu
              items={dropdownContent['agentic-workbench']}
              isVisible={hoveredDropdown === 'agentic-workbench'}
              dropdownKey="agentic-workbench"
            />
          </div>

          <div
            className="relative group"
            onMouseEnter={() => handleDropdownHover('use-cases')}
            onMouseLeave={handleDropdownLeave}
          >
            <div
              className="flex items-center cursor-pointer"
            >
              <NavLink
                to="/usecase"
                className={linkClasses}
                onClick={handleNavClick}
              >
                Use Cases
              </NavLink>
              <AnimatedArrow
                isHovered={hoveredDropdown === 'use-cases'}
                className="text-gray-400 hover:text-gray-600 ml-1"
              />
            </div>
            <DropdownMenu
              items={dropdownContent['use-cases']}
              isVisible={hoveredDropdown === 'use-cases'}
              dropdownKey="use-cases"
            />
          </div>

          <div
            className="relative group"
            onMouseEnter={() => handleDropdownHover('our-products')}
            onMouseLeave={handleDropdownLeave}
          >
            <div
              className="flex items-center cursor-pointer"
            >
              <span className="text-small font-normal font-inter cursor-pointer transition-colors duration-300 text-black hover:text-blue-600">
                Our Products
              </span>
              <AnimatedArrow
                isHovered={hoveredDropdown === 'our-products'}
                className="text-gray-400 hover:text-gray-600 ml-1"
              />
            </div>
            <DropdownMenu
              items={dropdownContent['our-products']}
              isVisible={hoveredDropdown === 'our-products'}
              dropdownKey="our-products"
            />
          </div>

          <div
            className="relative group"
            onMouseEnter={() => handleDropdownHover('about-us')}
            onMouseLeave={handleDropdownLeave}
          >
            <div
              className="flex items-center cursor-pointer"
            >
              <span className="text-small font-normal font-inter cursor-pointer transition-colors duration-300 text-black hover:text-blue-600">
                Who we are
              </span>
              <AnimatedArrow
                isHovered={hoveredDropdown === 'about-us'}
                className="text-gray-400 hover:text-gray-600 ml-1"
              />
            </div>
            <DropdownMenu
              items={dropdownContent['about-us']}
              isVisible={hoveredDropdown === 'about-us'}
              dropdownKey="about-us"
            />
          </div>

          <div className="relative group">
            <NavLink
              to="/careers"
              className={linkClasses}
              onClick={handleNavClick}
            >
              Careers
            </NavLink>
          </div>

          <div className="relative group">
            <NavLink
              to="/resources"
              className={linkClasses}
              onClick={handleNavClick}
            >
              Blogs
            </NavLink>
          </div>
        </nav>

        {/* Authentication/User Menu - right corner (visible from lg; compact at lg) */}
        <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="text-small font-normal font-inter text-gray-700">{user?.name || 'User'}</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 fade-in-0 duration-200">
                  {/* Show CMS Portal only for admin users */}
                  {isAdmin && (
                    <button
                      onClick={handleCmsPortalClick}
                      className="w-full text-left px-4 py-2 text-small font-normal font-inter text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      CMS Portal
                    </button>
                  )}
                  <button
                    onClick={handleAgentWorkbenchClick}
                    className="w-full text-left px-4 py-2 text-small font-normal font-inter text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                  >
                    Agent Workbench
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-small font-normal font-inter text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button
                variant="secondary"
                size="small"
                className="rounded px-6 py-2 text-sm font-bold font-manrope bg-black text-white hover:bg-gray-800 transition-colors"
                onClick={() => navigate("/signup")}
              >
                Sign In
              </Button>
              <Button
                variant="secondary"
                size="small"
                className="rounded px-6 py-2 text-sm font-bold font-manrope bg-white text-black border border-black transition-colors lg:px-4 lg:py-2 lg:text-xs xl:px-6 xl:text-sm"
                onClick={handleContactClick}
              >
                Contact Us
              </Button>
            </>
          )}
        </div>

        {/* Hamburger Menu Icon (visible below lg; hidden from 1024px and up) */}
        <button
          className="block lg:hidden p-2 ml-auto hover:bg-gray-100 rounded-lg transition-colors duration-200"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => menuOpen ? closeMenu() : openMenu()}
        >
          <HamburgerIcon isOpen={menuOpen} className="text-black" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className={`lg:hidden mt-4 bg-white rounded-lg p-4 flex flex-col gap-4 shadow-lg border border-gray-200 animate-in slide-in-from-top-2 fade-in-0 duration-300 ease-out`}
        >
          <nav className="flex flex-col gap-2">
            <NavLink
              to="/agent-workbench"
              className={({ isActive }) => {
                const isAgentWorkbenchActive = isActive || window.location.pathname === '/media-entertainment';
                return `text-small font-normal font-inter cursor-pointer transition-all duration-200 rounded-md px-3 py-2 hover:bg-gray-100
                        ${isAgentWorkbenchActive ? "text-blue-600 bg-blue-50" : "text-black hover:text-blue-600"}`;
              }}
              onClick={handleNavClick}
            >
              Agentic Workbench
            </NavLink>
            <NavLink to="/usecase" className={({ isActive }) =>
              `text-small font-normal font-inter cursor-pointer transition-all duration-200 rounded-md px-3 py-2 hover:bg-gray-100
               ${isActive ? "text-blue-600 bg-blue-50" : "text-black hover:text-blue-600"}`
            } onClick={handleNavClick}>
              Use Cases
            </NavLink>
            
            {/* Our Products Section */}
            <div className="space-y-1">
              <div className="text-small font-normal font-inter text-gray-700 px-3 py-2">
                Our Products
              </div>
              <div className="ml-4 space-y-1">
                <button
                  onClick={() => handleDropdownItemClick('/products/square-bridge')}
                  className="w-full text-left text-small font-normal font-inter text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 transition-colors duration-200"
                >
                  Square Bridge
                </button>
                <button
                  onClick={() => handleDropdownItemClick('/products/medmatch')}
                  className="w-full text-left text-small font-normal font-inter text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 transition-colors duration-200"
                >
                  Medmatch
                </button>
                <button
                  onClick={() => handleDropdownItemClick('/products/hyrdragon')}
                  className="w-full text-left text-small font-normal font-inter text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 transition-colors duration-200"
                >
                  Hyrdragon
                </button>
                <button
                  onClick={() => handleDropdownItemClick('/products/milai')}
                  className="w-full text-left text-small font-normal font-inter text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 transition-colors duration-200"
                >
                  MiLAi
                </button>
                <button
                  onClick={() => handleDropdownItemClick('/products/okrion')}
                  className="w-full text-left text-small font-normal font-inter text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2 transition-colors duration-200"
                >
                  OKRion
                </button>
              </div>
            </div>

            {/* About Us Section */}
            <div className="space-y-1">
              <div className="text-small font-normal font-inter text-gray-700 px-3 py-2">
                Who we are
              </div>
              <div className="ml-4 space-y-1">
                <NavLink to="/life-at-sns" className={({ isActive }) =>
                  `text-small font-normal font-inter cursor-pointer transition-all duration-200 rounded-md px-3 py-2 hover:bg-gray-100
                   ${isActive ? "text-blue-600 bg-blue-50" : "text-black hover:text-blue-600"}`
                } onClick={handleNavClick}>
                  Life at SNS Square
                </NavLink>
                <NavLink to="/about-us" className={({ isActive }) =>
                  `text-small font-normal font-inter cursor-pointer transition-all duration-200 rounded-md px-3 py-2 hover:bg-gray-100
                   ${isActive ? "text-blue-600 bg-blue-50" : "text-black hover:text-blue-600"}`
                } onClick={handleNavClick}>
                  About SNS Square
                </NavLink>
              </div>
            </div>
            <NavLink to="/careers" className={({ isActive }) =>
              `text-small font-normal font-inter cursor-pointer transition-all duration-200 rounded-md px-3 py-2 hover:bg-gray-100
               ${isActive ? "text-blue-600 bg-blue-50" : "text-black hover:text-blue-600"}`
            } onClick={handleNavClick}>
              Careers
            </NavLink>
            <NavLink to="/resources" className={({ isActive }) =>
              `text-small font-normal font-inter cursor-pointer transition-all duration-200 rounded-md px-3 py-2 hover:bg-gray-100
               ${isActive ? "text-blue-600 bg-blue-50" : "text-black hover:text-blue-600"}`
            } onClick={handleNavClick}>
              Blogs
            </NavLink>
          </nav>
          {isAuthenticated ? (
            <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
              {/* Show CMS Portal only for admin users in mobile menu */}
              {isAdmin && (
                <button
                  onClick={handleCmsPortalClick}
                  className="w-full text-left px-4 py-2 text-small font-normal font-inter text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  CMS Portal
                </button>
              )}
              <button
                onClick={handleAgentWorkbenchClick}
                className="w-full text-left px-4 py-2 text-small font-normal font-inter text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                Agent Workbench
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-small font-normal font-inter text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
              <Button
                variant="secondary"
                size="small"
                className="w-full rounded-lg px-6 py-2 text-sm font-bold font-manrope bg-black text-white hover:bg-gray-800 transition-all duration-200 hover:scale-[1.02]"
                onClick={() => {
                  navigate("/signup");
                  closeMenu();
                }}
              >
                Sign In
              </Button>
              <Button
                variant="secondary"
                size="small"
                className="w-full rounded-lg px-6 py-2 text-sm font-bold font-manrope bg-white text-black border border-black hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02]"
                onClick={() => {
                  handleContactClick();
                  closeMenu();
                }}
              >
                Contact Us
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;