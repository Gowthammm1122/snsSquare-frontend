import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import SEO from '../../common/SEO';
import BlackButton from '../../common/BlackButton';
import { useAuthStore } from '../../../store/store';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login, error, clearError } = useAuthStore();
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const validateForm = () => {
        const errors = {};
        
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
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
        
        // Clear API error when user modifies form
        if (apiError) {
            setApiError('');
            clearError();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setApiError('');

        try {
            const result = await login({
                email: formData.email,
                password: formData.password
            });

            if (result.success) {
                // Get the user role from localStorage after successful login
                const userRole = localStorage.getItem('role');
                
                // Navigate based on user role
                if (userRole === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/agent-workbench');
                }
            } else {
                setApiError(result.error || 'Login failed. Please try again.');
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
                title="Login | SNS Square Agentic AI Platform"
                description="Sign in to your SNS Square account to access our Agentic AI solutions, agent workbench, and digital transformation tools. Secure login for enterprise clients."
                keywords="SNS Square Login, Agentic AI Platform Access, Secure Login, Enterprise AI Solutions, Agent Workbench Login, AI Platform Sign In"
                image="https://www.snssquare.com/images/og/login-og.jpg"
                url="https://www.snssquare.com/login"
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
                            <h3 className="text-xl sm:text-2xl font-semibold">Login to your account</h3>
                            <p className="text-gray-500 mb-4 sm:mb-4 mt-4 sm:mt-4 text-sm sm:text-base">Welcome Back</p>
                            
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
                                <div className="space-y-6 py-4 gap-4 sm:gap-6 flex flex-col">
                                    <TextField
                                        type="email"
                                        name="email"
                                        label="Email ID"
                                        variant="standard"
                                        fullWidth
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
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
                                        label="Password"
                                        variant="standard"
                                        fullWidth
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
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
                                            <span>Logging in...</span>
                                        </div>
                                    ) : (
                                        'Continue'
                                    )}
                                </BlackButton>
                            </form>
                        </div>
                    </div>
                    
                    <div className='justify-center flex mt-6 gap-2 text-sm sm:text-base'>
                        <p className="">Don't have an account? </p>
                        <a href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">Signup</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;