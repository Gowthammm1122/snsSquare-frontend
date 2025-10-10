// src/components/Footer.jsx
import { FaYoutube , FaLinkedin, FaInstagram} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import BlackButton from "./BlackButton";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isCareersPage = location.pathname === '/careers';
  return (
    <footer id="footer" className="bg-gradient-to-r from-[#b3cbf7] via-[#D8E9FC] to-[#d2efff] font-inter px-8">
      {/* Top CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        {isCareersPage ? (
          // Careers Page CTA
          <>
            <h3 className=" mb-4 text-gray-900">
              Can't find what you're looking for?
            </h3>
            <p className="text-gray-600 mb-6 max-w-3xl mx-auto mt-10">
              Register on our Candidate Portal and get notified when new roles that match your skills open up.
            </p>
            <BlackButton >
              Register Here
            </BlackButton>
          </>
        ) : (
          // Default CTA
          <>
            <h3 className=" mb-4 text-gray-900">
              Let's Build Your Agentic Future
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto mt-12">
             Step beyond automation. Empower your business with Agentic AI that thinks, acts, and grows, transforming ideas into outcomes at the speed of intelligence. The future isn’t coming. It’s agentic.
            </p>
            <button onClick={() => navigate("/contact-us")}>
              <BlackButton className="rounded-[4px] px-6 py-[12px] lg:py-[14px] xl:py-[16px] text-lg font-medium font-manrope text-white w-fit mx-auto lg:mx-0 mt-[16px] lg:mt-[20px]">
                Contact US
              </BlackButton>
            </button>
          </>
        )}
      </div>

      {/* Footer Links */}
      <div className="bg-white  mx-auto mb-6 p-8 rounded-lg shadow">
        <div className=" px-6 pb-10 grid grid-cols-1 md:grid-cols-6 gap-10  ">
          {/* Logo */}
          <div>
            <img
              src="/images/square_logo_black.png"
              alt="SNS Square"
              className="w-46 mb-6"
            />
          </div>

          {/* Agentic Workbench */}
          <div className="">
            <h7 className="text-black mb-6">Agentic Workbench</h7>
            <ul className="space-y-2 text-gray-600 mt-4">
              <li>
                <button
                  onClick={() => {
                    navigate("/agent-workbench/foundation-agents")
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="hover:text-blue-400 transition-colors text-small text-left"
                >
                  Foundation Agent
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/agent-workbench/industry-specific-agents")
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="hover:text-blue-400 transition-colors text-small text-left"
                >
                  Industrial Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/agent-workbench?type=customer")
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="hover:text-blue-400 transition-colors text-small text-left"
                >
                  Customer Solutions
                </button>
              </li>
            </ul>
          </div>

          {/* Our Product */}
          <div>
            <h7 className="text-black mb-6">Our Product</h7>
            <ul className="space-y-2 text-gray-600 mt-4">
              <li>
                <button
                  onClick={() => {
                    navigate("/products/square-bridge")
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="hover:text-blue-400 transition-colors text-small text-left"
                >
                  Square Bridge
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/products/medmatch")
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="hover:text-blue-400 transition-colors text-small text-left"
                >
                  Medmatch
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/products/hyrdragon")
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="hover:text-blue-400 transition-colors text-small text-left"
                >
                  Hyrdragon
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/products/milai")
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="hover:text-blue-400 transition-colors text-small text-left"
                >
                  MiLAi
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/products/okrion")
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="hover:text-blue-400 transition-colors text-small text-left"
                >
                  OKRion
                </button>
              </li>
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h7 className="text-black mb-6">Use Case</h7>
            <ul className="space-y-2 text-gray-600 mt-4">
              {[
                { path: "supply-chain", label: "Supply Chain" },
                { path: "information-technology", label: "Information Technology" },
                { path: "healthcare", label: "Healthcare" },
                { path: "human-resource", label: "Human Resources" },
                { path: "insurance", label: "Insurance" }
              ].map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => {
                      navigate(`/usecase?category=${item.path}`)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="hover:text-blue-400 transition-colors text-small text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h7 className="text-black mb-6">Company</h7>
            <ul className="space-y-2 text-gray-600 mt-4 label">
              {[
                { path: "/about-us", label: "About Us" },
                { path: "/life-at-sns", label: "Life at SNS Square" },
                { path: "/resources", label: "Blog" },
                { path: "/contact-us", label: "Contact Us" },
                { path: "/privacy-policy", label: "Privacy policy" },
                { path: "/terms-of-service", label: "Terms of Service" }
              ].map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => {
                      navigate(item.path)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="hover:text-blue-400 transition-colors text-small text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h7 className="text-black mb-6">Address</h7>
            <p className="text-gray-600 label mt-4 mb-6">
              BLOCK-L, Embassy Tech Village, Outer Ring Rd, Devarabisanahalli,
              Bellandur, Bengaluru, Karnataka 560103
            </p>

            <h7 className="text-black mb-2">Email</h7>
            <p className="text-gray-600 label mt-4">
              info@snssquare.com
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="max-w-7xl mx-auto border-t border-gray-200 px-6 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-black label">
            © 2025 SNS Square. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-black">
            <a href="https://www.linkedin.com/company/snssquare/"
              target="_blank"
            >
              <FaLinkedin size={20} />
            </a>
            <a href="https://www.youtube.com/@snssquare"
              target="_blank"
            >
              <FaYoutube size={20} />
            </a>
            <a href="https://www.instagram.com/squaresns/?hl=en"
              target="_blank"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
