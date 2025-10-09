import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import JodDecriptionHero from './JodDecriptionHero';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { AiOutlineCloudUpload, AiOutlineFilePdf, AiOutlineFileWord, AiOutlineFile } from 'react-icons/ai';
import { MdClose, MdCheck } from 'react-icons/md';
import SEO from "../../common/SEO";

// Toast Component
const Toast = ({ show, message, type = 'success', onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // Auto close after 4 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in-0 duration-300">
      <div className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border max-w-md ${
        type === 'success' 
          ? 'bg-green-50 border-green-200 text-green-800' 
          : 'bg-red-50 border-red-200 text-red-800'
      }`}>
        <div className="flex-shrink-0">
          {type === 'success' ? (
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <MdCheck className="w-4 h-4 text-green-600" />
            </div>
          ) : (
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
              <MdClose className="w-4 h-4 text-red-600" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-black hover:bg-opacity-5 rounded transition-colors"
        >
          <MdClose className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Material-UI FormField component
const FormField = ({
  label,
  value,
  onChange,
  type = "text",
  isDropdown = false,
  placeholder = "",
  maxLength,
  required = false,
}) => {
  
  // Dropdown options based on field type
  const getDropdownOptions = () => {
    if (label.includes("Gender")) {
      return ["Male", "Female", "Other", "Prefer not to say"];
    } else if (label.includes("Experience")) {
      return ["0-1 years", "1-2 years", "2-3 years", "3-5 years", "5-8 years", "8+ years"];
    } else if (label.includes("Notice Period")) {
      return ["Immediate", "15 days", "1 month", "2 months", "3 months"];
    } else if (label.includes("CTC")) {
      return ["0-3 LPA", "3-5 LPA", "5-8 LPA", "8-12 LPA", "12-15 LPA", "15-20 LPA", "20+ LPA"];
    } else if (label.includes("Prefered Location")) {
      return ["Chennai", "Coimbatore", "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Remote"];
    }
    return [];
  };
  
  const handleFieldInputChange = (e) => {
    let inputValue = e.target.value;
    
    // Apply specific validations based on field type or label
    if (type === "email") {
      inputValue = inputValue.toLowerCase();
    } else if (label.includes("Contact")) {
      inputValue = inputValue.replace(/[^0-9]/g, '');
      if (maxLength && inputValue.length > maxLength) {
        inputValue = inputValue.slice(0, maxLength);
      }
    } else if (label.includes("Name") || label.includes("Location")) {
      inputValue = inputValue.replace(/[^a-zA-Z\s]/g, '');
    } else if (label.includes("Year of Graduation")) {
      inputValue = inputValue.replace(/[^0-9]/g, '');
      if (inputValue.length > 4) {
        inputValue = inputValue.slice(0, 4);
      }
    }
    
    onChange(inputValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {isDropdown ? (
        <TextField
          select
          label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          variant="standard"
          fullWidth
          required={required}
          placeholder={placeholder}
        >
          {getDropdownOptions().map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <TextField
          label={label}
          value={value}
          onChange={handleFieldInputChange}
          type={type}
          variant="standard"
          fullWidth
          required={required}
          placeholder={placeholder}
          inputProps={{ maxLength }}
        />
      )}
    </Box>
  );
};

// Modern Resume Upload Component
const ResumeUpload = ({ uploadedFiles, setUploadedFiles }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 KB';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Get file icon based on extension
  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return <AiOutlineFilePdf className="w-5 h-5 text-red-600" />;
      case 'doc':
      case 'docx':
        return <AiOutlineFileWord className="w-5 h-5 text-blue-600" />;
      default:
        return <AiOutlineFile className="w-5 h-5 text-gray-600" />;
    }
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      const validTypes = ['.doc', '.docx', '.pdf'];
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      return validTypes.includes(extension) && file.size <= 10 * 1024 * 1024; // 10MB limit
    });

    if (validFiles.length > 0) {
      const fileObjects = validFiles.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: file.size,
        file: file,
        uploaded: false
      }));
      
      setUploadedFiles(prev => [...prev, ...fileObjects]);
      
      // Simulate upload
      fileObjects.forEach(fileObj => {
        setTimeout(() => {
          setUploadedFiles(prev => 
            prev.map(f => f.id === fileObj.id ? { ...f, uploaded: true } : f)
          );
        }, 1000);
      });
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  return (
    <div className="w-full">
      <SEO 
        title="Job Application | SNS Square"
        description="Apply for the UI/UX Designer position at SNS Square. This role involves experience in manual and automation testing, knowledge of Java Programming, MySQL/PgSQL, Selenium, and Jmeter, and more."
        keywords="SNS Square, Job Application, UI/UX Designer, Manual Testing, Automation Testing, Java Programming, MySQL/PgSQL, Selenium, Jmeter"
        image="https://www.snssquare.com/images/og/job-application-og.jpg"
        url="https://www.snssquare.com/careers/job-application"
      />
      {/* Upload Area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-4 sm:p-6 text-center transition-all duration-300 ease-in-out cursor-pointer
          ${isDragging 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
          }
        `}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".doc,.docx,.pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="flex flex-col items-center space-y-2 sm:space-y-3">
          <div className={`
            w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors duration-300
            ${isDragging ? 'bg-blue-100' : 'bg-gray-100'}
          `}>
            <AiOutlineCloudUpload className={`w-5 h-5 sm:w-6 sm:h-6 ${isDragging ? 'text-blue-600' : 'text-gray-600'}`} />
          </div>
          
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-900 mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              DOC, DOCX, PDF (max 2MB)
            </p>
          </div>
        </div>
      </div>

      {/* Uploaded Files Display */}
      {uploadedFiles.length > 0 && (
        <div className="mt-3 sm:mt-4 space-y-2">
          {uploadedFiles.map((file) => (
            <div 
              key={file.id} 
              className="flex items-center justify-between p-2.5 sm:p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center space-x-2.5 sm:space-x-3 flex-1 min-w-0">
                {getFileIcon(file.name)}
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                {file.uploaded && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <MdCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs hidden sm:inline">Uploaded</span>
                  </div>
                )}
                
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Remove file"
                >
                  <MdClose className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 hover:text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const JobApplication = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    gender: "",
    currentLocation: "",
    preferredLocation: "",
    yearOfGraduation: "",
    experienceYears: "",
    noticePeriod: "",
    currentCTC: "",
    expectedCTC: "",
    skillSet: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [consentChecked, setConsentChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  const handleSubmit = async () => {
    if (!consentChecked) {
      showToast("Please agree to the terms and conditions before submitting.", "error");
      return;
    }

    if (uploadedFiles.length === 0) {
      showToast("Please upload your resume before submitting.", "error");
      return;
    }

    // Validate required fields
    const requiredFields = [
      { field: 'firstName', label: 'First Name' },
      { field: 'email', label: 'Email ID' },
      { field: 'contact', label: 'Contact' },
      { field: 'gender', label: 'Gender' },
      { field: 'currentLocation', label: 'Current Location' },
      { field: 'yearOfGraduation', label: 'Year of Graduation' },
      { field: 'experienceYears', label: 'Experience in Years' },
      { field: 'noticePeriod', label: 'Notice Period' },
      { field: 'skillSet', label: 'Skill Set' }
    ];

    for (const { field, label } of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        showToast(`Please fill in the ${label} field.`, "error");
        return;
      }
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle form submission logic here
      console.log("Form submitted:", formData);
      console.log("Uploaded files:", uploadedFiles);
      
      showToast("Application submitted successfully! We'll get back to you soon.", "success");
      
      // Optional: Reset form after successful submission
      // setFormData({...initial state});
      // setUploadedFiles([]);
      // setConsentChecked(false);
      
    } catch (error) {
      showToast("Failed to submit application. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* JobDescription Hero Section */}
      <JodDecriptionHero currentPage="application" jobTitle="UI/UX Designer" />

      <div className="w-full max-w-[1440px] mx-auto pt-6 sm:pt-8 px-4 sm:px-4 lg:px-8">
        <div className="w-full h-px bg-black opacity-10 mb-8 sm:mb-12"/>
      </div>

      {/* Application Form with Scrollable Layout */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-4 lg:px-8 py-3 sm:py-4 pb-12 sm:pb-20">
        
        {/* Two Column Layout: Scrollable Left + Sticky Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative">
          
          {/* Left Column - Scrollable Content (2/3 width) */}
          <div className="lg:col-span-2">
            
            {/* Personal Details Section */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h4 className="text-lg lg:text-base font-medium text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Personal Details
                </h4>
              </div>

              <div className="gap-4 flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    label="First Name"
                    value={formData.firstName}
                    onChange={(value) => handleInputChange("firstName", value)}
                    placeholder="Enter your first name"
                    maxLength={50}
                    required={true}
                  />
                  <FormField
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(value) => handleInputChange("lastName", value)}
                    placeholder="Enter your last name"
                    maxLength={50}
                  />
                </div>

                <FormField
                  label="Email ID"
                  value={formData.email}
                  onChange={(value) => handleInputChange("email", value)}
                  type="email"
                  placeholder="Enter your email address"
                  required={true}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    label="Contact"
                    value={formData.contact}
                    onChange={(value) => handleInputChange("contact", value)}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    required={true}
                  />
                  <FormField
                    label="Gender"
                    value={formData.gender}
                    onChange={(value) => handleInputChange("gender", value)}
                    isDropdown={true}
                    placeholder="Select Gender"
                    required={true}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    label="Current Location"
                    value={formData.currentLocation}
                    onChange={(value) => handleInputChange("currentLocation", value)}
                    placeholder="Enter your current city"
                    required={true}
                  />
                  <FormField
                    label="Prefered Location"
                    value={formData.preferredLocation}
                    onChange={(value) => handleInputChange("preferredLocation", value)}
                    isDropdown={true}
                    placeholder="Select Preferred Location"
                  />
                </div>
              </div>
            </div>

            {/* Education & Experience Section */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h4 className="text-lg lg:text-base font-medium text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Education & Experience
                </h4>
              </div>

              <div className="gap-4 flex flex-col">
                <FormField
                  label="Year of Graduation"
                  value={formData.yearOfGraduation}
                  onChange={(value) => handleInputChange("yearOfGraduation", value)}
                  placeholder="YYYY (e.g., 2020)"
                  maxLength={4}
                  required={true}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    label="Experience in Years"
                    value={formData.experienceYears}
                    onChange={(value) => handleInputChange("experienceYears", value)}
                    isDropdown={true}
                    placeholder="Select Experience"
                    required={true}
                  />
                  <FormField
                    label="Notice Period"
                    value={formData.noticePeriod}
                    onChange={(value) => handleInputChange("noticePeriod", value)}
                    isDropdown={true}
                    placeholder="Select Notice Period"
                    required={true}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    label="Current CTC (In Lakhs Annum)"
                    value={formData.currentCTC}
                    onChange={(value) => handleInputChange("currentCTC", value)}
                    isDropdown={true}
                    placeholder="Select Current CTC"
                  />
                  <FormField
                    label="Expected CTC (In Lakhs Annum)"
                    value={formData.expectedCTC}
                    onChange={(value) => handleInputChange("expectedCTC", value)}
                    isDropdown={true}
                    placeholder="Select Expected CTC"
                  />
                </div>
              </div>
            </div>

            {/* Skills & Expertise Section */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h4 className="text-lg lg:text-base font-medium text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Skills & Expertise
                </h4>
              </div>

              <FormField
                label="Skill Set"
                value={formData.skillSet}
                onChange={(value) => handleInputChange("skillSet", value)}
                placeholder="Enter your skills (e.g., React, JavaScript, Python)"
                required={true}
              />
            </div>
          </div>

          {/* Vertical Divider Line */}
          <div className="hidden lg:block absolute left-[66.666%] top-0 bottom-0 w-px bg-gray-300 opacity-30"></div>

          {/* Right Column - Sticky Resume Upload & Apply Button (1/3 width) */}
          <div className="lg:col-span-1 lg:sticky lg:top-28 lg:h-fit lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto mt-8 lg:mt-0">
            <div className="lg:pl-8 space-y-6">
              
              {/* Resume Section Header */}
              <div>
                <h4 className="text-lg lg:text-base font-medium text-gray-900 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Resume*
                </h4>
                
                {/* Resume Upload Component */}
                <ResumeUpload 
                  uploadedFiles={uploadedFiles}
                  setUploadedFiles={setUploadedFiles}
                />
              </div>

              {/* Consent Checkbox Section */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-700 leading-5 cursor-pointer" style={{ fontFamily: 'Inter, sans-serif' }}>
                    I agree to the{' '}
                    <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/terms-of-service" className="text-blue-600 hover:text-blue-800 underline">
                      Privacy Policy
                    </a>
                    , and consent to the processing of my personal data for recruitment purposes.
                  </label>
                </div>
              </div>

              {/* Apply Button */}
              <div className="pt-3 lg:sticky lg:bottom-0 bg-white pb-3">
                <button 
                  onClick={handleSubmit}
                  disabled={!consentChecked || isSubmitting}
                  className={`w-full px-8 py-3 rounded text-base font-medium transition-colors flex items-center justify-center gap-2 ${
                    consentChecked && !isSubmitting
                      ? 'bg-gray-900 text-white hover:bg-gray-800' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {isSubmitting && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast 
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  );
};

export default JobApplication;
