import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaYoutube, FaLinkedin , FaInstagram } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate()
  
  return (
    <div >
      <footer className="bg-white mx-auto  p-8 rounded-md shadow ">
        <div className=" px-6 pb-10 grid grid-cols-1 md:grid-cols-5 gap-10  ">
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
            <ul className="space-y-2 text-gray-600 mt-4">
              {[
                { path: "/about-us", label: "About Us" },
                { path: "/life-at-sns", label: "Life at SNS Square" },
                { path: "/resources", label: "Resources" },
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
            <p className="text-gray-600 text-small mt-4 mb-6">
              BLOCK-L, Embassy Tech Village, Outer Ring Rd, Devarabisanahalli,
              Bellandur, Bengaluru, Karnataka 560103
            </p>

            <h7 className="text-black mb-2">Email</h7>
            <p className="text-gray-600 text-small mt-4">
              info@snssquare.com
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="max-w-7xl mx-auto border-t border-gray-200 px-6 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-black text-small">
            © 2025 SNS Square. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://www.linkedin.com/company/snssquare/"
              target="_blank"
              className="text-black hover:text-blue-600 transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
            <a href="https://www.youtube.com/@snssquare"
              target="_blank"
              className="text-black hover:text-red-500 transition-colors"
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
      </footer>
    </div>
  );
};

export default Footer;