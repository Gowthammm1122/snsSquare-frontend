import { Home, MessageSquare, Newspaper, UsersRound, Globe, ChevronDown, ChevronRight, Plus, FileText, Users, List } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"

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
  const [expandedMenus, setExpandedMenus] = useState({
    "/admin/jobopenings": true, // Keep job openings expanded by default
    "/admin/blog": true // Keep blogs expanded by default
  })

  const toggleMenu = (href) => {
    setExpandedMenus(prev => ({
      ...prev,
      [href]: !prev[href]
    }))
  }

  const isActiveSubmenu = (submenu) => {
    return submenu.some(item => location.pathname === item.href)
  }

  return (
    <aside
      className="h-screen w-64 shrink-0 border-r bg-[#011337] text-brand-white border-brand-navy/40 flex flex-col fixed left-0 top-0"
      aria-label="Main sidebar"
    >
      {/* Logo area */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <img
            src="/images/square_logo.png"
            alt="SNS Square Logo"
            className="w-[60px] h-[42px] sm:w-[80px] sm:h-[55px] md:w-[96px] md:h-[66px]"
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-4 flex-1">
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
                              <Link to={subItem.href} className="relative block text-[16px] font-medium">
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
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link to={href} className="relative block text-[18px] font-medium">
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
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Back to Website Button */}
      <div className="p-6 border-t border-brand-navy/40">
        <Link 
          to="/" 
          className="flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white transition-colors rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10"
        >
          <Globe size={20} />
          <span className="font-medium">Back to Website</span>
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
