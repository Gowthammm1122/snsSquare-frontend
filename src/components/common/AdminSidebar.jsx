import { Home, MessageSquare, Newspaper, UsersRound, Globe, ChevronDown, ChevronRight, Plus, FileText, Users, List, Menu, X } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

// Navigation items data
const items = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { 
    href: "/admin/blog", 
    label: "Blogs", 
    icon: MessageSquare,
    hasSubmenu: true,
    submenu: [
      { href: "/admin/blog/all", label: "All Blogs", icon: List },
      { href: "/admin/blog/new", label: "Add Blog", icon: Plus },
    ]
  },
  { href: "/admin/usecase", label: "UseCases", icon: Newspaper },
  { 
    href: "/admin/jobopenings", 
    label: "Jobs", 
    icon: UsersRound,
    hasSubmenu: true,
    submenu: [
      { href: "/admin/jobopenings", label: "Job Openings", icon: UsersRound },
      { href: "/admin/jobopenings/newJob", label: "Add New Job", icon: Plus },
      { href: "/admin/jobopenings/applications", label: "Applications", icon: FileText },
    ]
  },
]

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [expandedMenus, setExpandedMenus] = useState({
    "/admin/jobopenings": true, // Keep job openings expanded by default
    "/admin/blog": true // Keep blogs expanded by default
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMenu = (href) => {
    setExpandedMenus(prev => ({
      ...prev,
      [href]: !prev[href]
    }))
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const isActiveSubmenu = (submenu) => {
    return submenu.some(item => location.pathname === item.href)
  }

  // Close mobile menu when route changes
  useEffect(() => {
    closeMobileMenu()
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const SidebarContent = ({ isMobile = false }) => (
    <>
      {/* Logo area */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/square_logo.png"
              alt="SNS Square Logo"
              className="w-[60px] h-[42px] sm:w-[80px] sm:h-[55px] md:w-[96px] md:h-[66px]"
            />
          </div>
          {/* Close button for mobile */}
          {isMobile && (
            <button
              onClick={closeMobileMenu}
              className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-4 flex-1 overflow-y-auto">
        <ul className="flex flex-col">
          {items.map((item) => {
            const { href, label, icon: Icon, hasSubmenu, submenu } = item
            const isActive = location.pathname === href
            const isExpanded = expandedMenus[href]
            const hasActiveSubmenu = hasSubmenu && isActiveSubmenu(submenu)
            
            return (
              <li key={href}>
                {hasSubmenu ? (
                  <>
                    {/* Main menu item with dropdown */}
                    <button
                      onClick={() => toggleMenu(href)}
                      className="w-full relative block text-[18px] font-medium"
                    >
                      <div
                        className={`flex items-center gap-4 px-6 py-4 transition-colors ${
                          isActive || hasActiveSubmenu ? "text-white" : "text-white/90 hover:text-white"
                        }`}
                      >
                        {/* Active background gradient bar behind the row */}
                        {(isActive || hasActiveSubmenu) && (
                          <span aria-hidden="true" className="sidebar-active absolute inset-y-0 left-0 right-0" />
                        )}

                        {/* Icon */}
                        <Icon size={22} className="relative z-[1] drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />

                        {/* Label */}
                        <span className="relative z-[1] flex-1 text-left">{label}</span>
                        
                        {/* Dropdown arrow */}
                        {isExpanded ? (
                          <ChevronDown size={16} className="relative z-[1]" />
                        ) : (
                          <ChevronRight size={16} className="relative z-[1]" />
                        )}
                      </div>
                    </button>
                    
                    {/* Submenu */}
                    {isExpanded && (
                      <ul className="bg-white/5">
                        {submenu.map((subItem) => {
                          const isSubActive = location.pathname === subItem.href
                          const SubIcon = subItem.icon
                          
                          return (
                            <li key={subItem.href}>
                              <button 
                                onClick={() => {
                                  navigate(subItem.href)
                                  if (isMobile) closeMobileMenu()
                                }}
                                className="relative block text-[16px] font-medium w-full text-left"
                              >
                                <div
                                  className={`flex items-center gap-3 pl-12 pr-6 py-3 transition-colors ${
                                    isSubActive ? "text-white bg-white/10" : "text-white/80 hover:text-white hover:bg-white/5"
                                  }`}
                                >
                                  {/* Sub icon */}
                                  <SubIcon size={18} className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
                                  
                                  {/* Sub label */}
                                  <span>{subItem.label}</span>
                                </div>
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <button 
                    onClick={() => {
                      navigate(href)
                      if (isMobile) closeMobileMenu()
                    }}
                    className="relative block text-[18px] font-medium w-full text-left"
                  >
                    <div
                      className={`flex items-center gap-4 px-6 py-4 transition-colors ${
                        isActive ? "text-white" : "text-white/90 hover:text-white"
                      }`}
                    >
                      {/* Active background gradient bar behind the row */}
                      {isActive && (
                        <span aria-hidden="true" className="sidebar-active absolute inset-y-0 left-0 right-0" />
                      )}

                      {/* Icon */}
                      <Icon size={22} className="relative z-[1] drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />

                      {/* Label */}
                      <span className="relative z-[1]">{label}</span>
                    </div>
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Back to Website Button */}
      <div className="p-6 border-t border-brand-navy/40">
        <button 
          onClick={() => {
            navigate("/")
            if (isMobile) closeMobileMenu()
          }}
          className="flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white transition-colors rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 w-full text-left"
        >
          <Globe size={20} />
          <span className="font-medium">Back to Website</span>
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button - Fixed at top */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-[#011337] text-white rounded-lg shadow-lg border border-white/20 hover:bg-[#0a1e4a] transition-colors"
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Desktop Sidebar - Hidden on mobile */}
      <aside
        className="hidden lg:flex h-screen w-64 shrink-0 border-r bg-[#011337] text-brand-white border-brand-navy/40 flex-col fixed left-0 top-0 z-40"
        aria-label="Main sidebar"
      >
        <SidebarContent />
      </aside>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-[#011337] text-brand-white border-r border-brand-navy/40 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile sidebar"
      >
        <SidebarContent isMobile={true} />
      </aside>
    </>
  )
}

export default Sidebar
