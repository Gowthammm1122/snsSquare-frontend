import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { useAuthStore } from "../../store/store"; 


const LoginModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  // Clean up success screen when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowSuccessScreen(false);
      setStatus("");
      setSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null; // Don't render if modal is closed

  // Success Screen
  if (showSuccessScreen) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 relative text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Welcome Back!
          </h2>
          
          <p className="text-gray-600 text-lg">
            Login successful! Redirecting to your workspace.
          </p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("Logging in...");
    setSuccess(false);

    try {
      const { success, error } = await login(formData);

      if (success) {
        setSuccess(true);
        setStatus("Login Successful!");
        setFormData({ email: "", password: "" });

        // Show success screen with big tick icon
        setShowSuccessScreen(true);
        setTimeout(() => {
          setShowSuccessScreen(false);
          setStatus("");
          setSuccess(false);
          onClose();
          // Navigate to media entertainment page after successful login
          navigate('/media-entertainment');
        }, 3000);
      } else {
        setStatus(error || "Login failed. Please try again.");
        setSuccess(false);
      }
    } catch (err) {
      console.error(err);
      setStatus("Login failed. Please try again.");
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {status && (
          <div className="text-center mt-4 text-sm">
            {success ? (
              <p className="text-green-600 font-medium flex items-center justify-center gap-2">
                ✅ {status}
              </p>
            ) : (
              <p className="text-gray-600">{status}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
