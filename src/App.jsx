import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AdminSidebar from "./components/common/AdminSidebar";
import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isContactUsPage = location.pathname === "/contact-us" || 
                          location.pathname === "/login" || 
                          location.pathname === "/signup";
  
  // Check if current path is an admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Only show Navbar if NOT an admin route */}
      {!isAdminRoute && <Navbar />}
      
      {/* Admin Layout with Sidebar */}
      {isAdminRoute ? (
        <div className="flex flex-1">
          <AdminSidebar />
          {/* Add left margin to account for fixed sidebar width on desktop only */}
          <main className="flex-1 bg-gray-50 lg:ml-64 overflow-auto">
            <AppRoutes />
          </main>
        </div>
      ) : (
        <main className="">
          <AppRoutes />
        </main>
      )}
      
      {/* Only show Footer if NOT contact/login/signup pages AND NOT admin route */}
      {!isContactUsPage && !isAdminRoute && <Footer />}
    </div>
  );
}

export default App;