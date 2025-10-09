import React, { useState } from 'react';
import BlackButton from '../../common/BlackButton';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import SEO from '../../common/SEO';
import { useAuthStore } from '../../../store/store';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const { signUp, error, clearError } = useAuthStore();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const errors = {};
    
    // First Name validation
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name validation (optional but if provided should be valid)
    if (formData.lastName.trim() && formData.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    // Re-enter Password validation
    if (!formData.rePassword) {
      errors.rePassword = 'Please confirm your password';
    } else if (formData.password !== formData.rePassword) {
      errors.rePassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear API error and success message when user modifies form
    if (apiError) {
      setApiError('');
      clearError();
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError('');
    setSuccessMessage('');

    try {
      // Prepare signup data according to your API structure
      const signUpData = {
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
        email: formData.email.trim(),
        password: formData.password
      };

      const result = await signUp(signUpData);

      if (result.success) {
        setSuccessMessage(result.message || 'Account created successfully!');
        
        setTimeout(() => {
          navigate('/agent-workbench');
        }, 1500);
      } else {
        setApiError(result.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setApiError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#b0c8f6] via-[#D8E9FC] to-[#d2efff] font-inter relative">
      <SEO 
        title="Sign Up | Join SNS Square Agentic AI Platform"
        description="Create your SNS Square account to access cutting-edge Agentic AI solutions, agent workbench, and digital transformation tools. Start your journey with enterprise AI innovation."
        keywords="SNS Square Signup, Create Account, Agentic AI Platform Registration, Enterprise AI Solutions, Agent Workbench Access, AI Platform Registration"
        image="https://www.snssquare.com/images/og/signup-og.jpg"
        url="https://www.snssquare.com/signup"
      />
      <div className="flex items-center justify-center min-h-screen px-4 w-full bg-gradient-to-t from-transparent to-white relative">
        
        {/* Glass Cube Image - Background Layer */}
        <img
          src="/images/GlassCube.png"
          alt="Glass Cube"
          className="hidden md:block w-1/3 object-cover absolute z-10 overflow-hidden min-h-screen h-1/2 opacity-30"
          style={{ left: '55%' }}
        />
        
        {/* Content Layer - Above Image */}
        <div className="w-full max-w-[600px] relative z-20">
          <div className="flex items-center justify-center mb-6">
            <img
              src="/images/square_logo_black.png"
              alt="SNS Square Logo"
              className="w-[100px] sm:w-[150px]"
            />
          </div>
          <div className="bg-white rounded-md shadow-xl p-4 sm:p-8 w-full max-w-[600px] mx-auto">
            <div className="w-full">
              <h3 className="text-xl sm:text-2xl font-semibold">Sign up</h3>
              <p className="text-gray-500 mb-4 sm:mb-4 mt-4 sm:mt-4 text-sm sm:text-base">Let's get Start</p>

              {/* Success Alert */}
              {successMessage && (
                <Alert severity="success" onClose={() => setSuccessMessage('')} className="mb-4">
                  {successMessage}
                </Alert>
              )}

              {/* Error Alert */}
              {(apiError || error) && (
                <Alert severity="error" onClose={() => {
                  setApiError('');
                  clearError();
                }} className="mb-4">
                  {apiError || error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <div className="py-4 gap-4 flex flex-col">
                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      label="First Name"
                      variant="standard"
                      fullWidth
                      required
                      error={!!formErrors.firstName}
                      helperText={formErrors.firstName}
                      disabled={isLoading}
                      InputLabelProps={{
                        sx: { color: '#6B7280' }
                      }}
                      sx={{
                        '& .MuiInput-underline:before': {
                          borderBottomColor: '#D1D5DB',
                        },
                        '& .MuiInput-underline:hover:before': {
                          borderBottomColor: '#9CA3AF',
                        },
                        '& .MuiInput-underline:after': {
                          borderBottomColor: '#3B82F6',
                        },
                      }}
                    />
                    <TextField
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      label="Last Name"
                      variant="standard"
                      fullWidth
                      error={!!formErrors.lastName}
                      helperText={formErrors.lastName}
                      disabled={isLoading}
                      InputLabelProps={{
                        sx: { color: '#6B7280' }
                      }}
                      sx={{
                        '& .MuiInput-underline:before': {
                          borderBottomColor: '#D1D5DB',
                        },
                        '& .MuiInput-underline:hover:before': {
                          borderBottomColor: '#9CA3AF',
                        },
                        '& .MuiInput-underline:after': {
                          borderBottomColor: '#3B82F6',
                        },
                      }}
                    />
                  </div>

                  <TextField
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    label="Email ID"
                    variant="standard"
                    fullWidth
                    required
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    disabled={isLoading}
                    InputLabelProps={{
                      sx: { color: '#6B7280' }
                    }}
                    sx={{
                      '& .MuiInput-underline:before': {
                        borderBottomColor: '#D1D5DB',
                      },
                      '& .MuiInput-underline:hover:before': {
                        borderBottomColor: '#9CA3AF',
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#3B82F6',
                      },
                    }}
                  />

                  <TextField
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    label="Password"
                    variant="standard"
                    fullWidth
                    required
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    disabled={isLoading}
                    InputLabelProps={{
                      sx: { color: '#6B7280' }
                    }}
                    sx={{
                      '& .MuiInput-underline:before': {
                        borderBottomColor: '#D1D5DB',
                      },
                      '& .MuiInput-underline:hover:before': {
                        borderBottomColor: '#9CA3AF',
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#3B82F6',
                      },
                    }}
                  />

                  <TextField
                    type="password"
                    name="rePassword"
                    value={formData.rePassword}
                    onChange={handleChange}
                    label="Re-enter Password"
                    variant="standard"
                    fullWidth
                    required
                    error={!!formErrors.rePassword}
                    helperText={formErrors.rePassword}
                    disabled={isLoading}
                    InputLabelProps={{
                      sx: { color: '#6B7280' }
                    }}
                    sx={{
                      '& .MuiInput-underline:before': {
                        borderBottomColor: '#D1D5DB',
                      },
                      '& .MuiInput-underline:hover:before': {
                        borderBottomColor: '#9CA3AF',
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#3B82F6',
                      },
                    }}
                  />
                </div>

                <p className="text-gray-500 mt-6 mb-6 text-sm sm:text-base">
                  By continuing, you agree to our{' '}
                  <a href="/terms-of-service" className="text-blue-600 hover:text-blue-800">
                    Terms of Service
                  </a>
                </p>

                <BlackButton 
                  type="submit"
                  className="w-full bg-black"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <CircularProgress size={20} sx={{ color: 'white' }} />
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    'Continue'
                  )}
                </BlackButton>
              </form>
            </div>
          </div>
          <div className="justify-center flex mt-6 gap-2 text-sm sm:text-base">
            <p className="">Already have an account?</p>
            <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;