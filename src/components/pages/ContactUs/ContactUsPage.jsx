import React, { useState, useMemo } from 'react';
import countryList from 'react-select-country-list';
import SEO from '../../common/SEO';
import BlackButton from '../../common/BlackButton';
import Footer from './Footer';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import { submitContactForm } from '../../../api/Service/contact';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyEmail: '',
    companyName: '',
    country: '',
    industry: '',
    projectBudget: '',
    currency: 'USD',
    message: '',
    consent: false
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Get all countries from the library
  const countries = useMemo(() => countryList().getData(), []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = 'Company email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
      newErrors.companyEmail = 'Please enter a valid email address';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }

    if (!formData.projectBudget) {
      newErrors.projectBudget = 'Project budget is required';
    } else if (isNaN(formData.projectBudget) || parseFloat(formData.projectBudget) < 0) {
      newErrors.projectBudget = 'Please enter a valid budget amount';
    }

    if (!formData.currency) {
      newErrors.currency = 'Currency is required';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must consent to receive communications';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    setLoading(true);

    try {
      console.log('Submitting form data:', formData);
      const response = await submitContactForm(formData);
      
      setSnackbar({
        open: true,
        message: response.message || 'Thank you! We will get back to you soon.',
        severity: 'success'
      });

      // Reset form
      setFormData({
        name: '',
        companyEmail: '',
        companyName: '',
        country: '',
        industry: '',
        projectBudget: '',
        currency: 'USD',
        message: '',
        consent: false
      });
      setErrors({});

    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Something went wrong. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const textFieldStyles = {
    '& .MuiInput-underline:before': {
      borderBottomColor: '#D1D5DB',
      borderBottomWidth: '2px',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: '#9CA3AF',
      borderBottomWidth: '2px',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#3B82F6',
      borderBottomWidth: '2px',
    },
  };

  const labelStyles = {
    color: '#6B7280',
    fontSize: '1rem',
  };

  return (
    <div className="bg-gradient-to-r from-[#b0c8f6] via-[#D8E9FC] to-[#d2efff] font-inter ">
      <SEO 
        title="Contact Us | SNS Square"
        description="Connect with SNS Square experts to explore your business use case, learn about our Agentic AI platform, and schedule a consultation to drive innovation and value."
        keywords="SNS Square Contact, Agentic AI Consultation, Business Use Cases, AI Experts, Schedule Meeting, AI Solutions"
        image="https://www.snssquare.com/images/og/contact-us-og.jpg"
        url="https://www.snssquare.com/contact-us"
      />
      <div className="bg-fill p-6 bg-gradient-to-t from-transparent to-white h-[100%]">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto mt-24 pb-8 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Content */}
            <div className="relative space-y-6">
              {/* Background image shifted down */}
              <img
                src="/images/GlassCube.png"
                alt="Glass Cube"
                className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 mt-10 w-40vh h-auto"
              />

              <h3 className="text-black leading-tight relative z-10">
                Connect with our experts to explore your use case in detail
              </h3>
              <p className="text-gray-600 leading-relaxed mt-4 relative z-10">
                Schedule a consultation to explore how our Agent Platform will drives the value and innovation you need.
              </p>
            </div>

            {/* Right Content - Contact Form */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200">
              <form onSubmit={handleSubmit} className="p-6 gap-8 flex flex-col">
                {/* Name Field */}
                <TextField
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  label="Name"
                  variant="standard"
                  fullWidth
                  required
                  error={!!errors.name}
                  helperText={errors.name}
                  disabled={loading}
                  InputLabelProps={{
                    sx: labelStyles
                  }}
                  sx={textFieldStyles}
                />

                {/* Company Email */}
                <TextField
                  type="email"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  label="Company Email"
                  variant="standard"
                  fullWidth
                  required
                  error={!!errors.companyEmail}
                  helperText={errors.companyEmail}
                  disabled={loading}
                  InputLabelProps={{
                    sx: labelStyles
                  }}
                  sx={textFieldStyles}
                />

                {/* Company Name and Country Row */}
                <div className="grid grid-cols-2 gap-8">
                  <TextField
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    label="Company Name"
                    variant="standard"
                    fullWidth
                    required
                    error={!!errors.companyName}
                    helperText={errors.companyName}
                    disabled={loading}
                    InputLabelProps={{
                      sx: labelStyles
                    }}
                    sx={textFieldStyles}
                  />
                  <TextField
                    select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    label="Country"
                    variant="standard"
                    fullWidth
                    required
                    error={!!errors.country}
                    helperText={errors.country}
                    disabled={loading}
                    InputLabelProps={{
                      sx: labelStyles
                    }}
                    sx={textFieldStyles}
                  >
                    <MenuItem value="">Select Country</MenuItem>
                    {countries.map((country) => (
                      <MenuItem key={country.value} value={country.value}>
                        {country.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                {/* Industry and Project Budget Row */}
                <div className="grid grid-cols-2 gap-8">
                  <TextField
                    select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    label="Industry"
                    variant="standard"
                    fullWidth
                    required
                    error={!!errors.industry}
                    helperText={errors.industry}
                    disabled={loading}
                    InputLabelProps={{
                      sx: labelStyles
                    }}
                    sx={textFieldStyles}
                  >
                    <MenuItem value="">Select Industry</MenuItem>
                    <MenuItem value="Supply Chain">Supply Chain</MenuItem>
                    <MenuItem value="Information Technology">Information Technology</MenuItem>
                    <MenuItem value="Health Care">Health Care</MenuItem>
                    <MenuItem value="Human Resource">Human Resource</MenuItem>
                    <MenuItem value="Insurance">Insurance</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </TextField>
                  <div className="flex gap-2">
                    <TextField
                      select
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      label="Currency"
                      variant="standard"
                      disabled={loading}
                      InputLabelProps={{
                        sx: labelStyles
                      }}
                      sx={{
                        ...textFieldStyles,
                        minWidth: '100px',
                        '& .MuiInput-underline:before': {
                          borderBottomColor: '#D1D5DB',
                          borderBottomWidth: '2px',
                        },
                        '& .MuiInput-underline:hover:before': {
                          borderBottomColor: '#9CA3AF',
                          borderBottomWidth: '2px',
                        },
                        '& .MuiInput-underline:after': {
                          borderBottomColor: '#3B82F6',
                          borderBottomWidth: '2px',
                        },
                      }}
                    >
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="EUR">EUR</MenuItem>
                      <MenuItem value="GBP">GBP</MenuItem>
                      <MenuItem value="INR">INR</MenuItem>
                      <MenuItem value="CAD">CAD</MenuItem>
                      <MenuItem value="AUD">AUD</MenuItem>
                      <MenuItem value="JPY">JPY</MenuItem>
                      <MenuItem value="CNY">CNY</MenuItem>
                    </TextField>
                    <TextField
                      type="number"
                      name="projectBudget"
                      value={formData.projectBudget}
                      onChange={handleInputChange}
                      label="Project Budget"
                      variant="standard"
                      fullWidth
                      required
                      error={!!errors.projectBudget}
                      helperText={errors.projectBudget}
                      disabled={loading}
                      inputProps={{
                        min: 0,
                        step: 1000
                      }}
                      InputLabelProps={{
                        sx: labelStyles
                      }}
                      sx={textFieldStyles}
                    />
                  </div>
                </div>

                {/* Message Field */}
                <TextField
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  label="Your challenges / Goals"
                  variant="standard"
                  fullWidth
                  multiline
                  rows={4}
                  disabled={loading}
                  InputLabelProps={{
                    sx: labelStyles
                  }}
                  sx={textFieldStyles}
                />

                {/* Consent Checkbox */}
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="consent"
                        checked={formData.consent}
                        onChange={handleInputChange}
                        disabled={loading}
                        sx={{
                          color: '#D1D5DB',
                          '&.Mui-checked': {
                            color: '#3B82F6',
                          },
                        }}
                      />
                    }
                    label={
                      <span className="text-sm text-gray-700 leading-relaxed">
                        By submitting, I consent to receive relevant email communication from SNS Square in accordance with the Privacy Policy and understand I can opt out at any time.*
                      </span>
                    }
                    sx={{ alignItems: 'flex-start', marginLeft: '-9px' }}
                  />
                  {errors.consent && (
                    <p className="text-red-600 text-xs mt-1 ml-8">{errors.consent}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="">
                  <BlackButton 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                      position: 'relative',
                      opacity: loading ? 0.7 : 1 
                    }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress 
                          size={20} 
                          sx={{ 
                            color: 'white',
                            marginRight: '8px'
                          }} 
                        />
                        Submitting...
                      </>
                    ) : (
                      'Submit'
                    )}
                  </BlackButton>
                </div>
              </form>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Snackbar for notifications */}
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default ContactUsPage;