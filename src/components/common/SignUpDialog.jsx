import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { useAuthStore } from "../../store/store";

const disposableDomains = [
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "yopmail.com",
  "mailinator.com",
];

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .test("not-temp-mail", "Disposable emails are not allowed", (value) => {
      if (!value) return false;
      const domain = value.split("@")[1]?.toLowerCase();
      return !disposableDomains.includes(domain);
    })
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/.*[0-9].*/, "Password must contain at least 1 number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords must match")
    .required("Please confirm your password"),
});

const SignUpModal = ({ isOpen, onClose }) => {
  const signUp = useAuthStore((state) => state.signUp);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // State to track which errors should be shown
  const [visibleErrors, setVisibleErrors] = useState({});
  const [errorTimeouts, setErrorTimeouts] = useState({});
  
  // State for success screen
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const formik = useFormik({
    initialValues: { name: "", email: "", phone: "", password: "", confirmPassword: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setStatus, setFieldError }) => {
      setStatus({ success: false, message: "Saving..." });

      try {
        const { success, message, error } = await signUp(values);

        if (success) {
          // Show success screen with big tick icon
          setShowSuccessScreen(true);
          setTimeout(() => {
            setShowSuccessScreen(false);
            onClose();
            resetForm();
            // Navigate to media entertainment page after successful signup
            navigate('/media-entertainment');
          }, 3000);
          return;
        }

        // Handle specific error cases
        const errMsg = (error || message || "Something went wrong").toLowerCase();

        if (errMsg.includes("email already exists") || errMsg.includes("user with this email already exists")) {
          setStatus({ 
            success: false, 
            message: "You already signed up, thank you!",
            isAlreadySignedUp: true 
          });
        } else if (errMsg.includes("email") && !errMsg.includes("phone")) {
          setFieldError("email", error || message);
          showErrorTemporarily("email");
        } else if (errMsg.includes("phone") && !errMsg.includes("email")) {
          setFieldError("phone", error || message);
          showErrorTemporarily("phone");
        } else {
          setStatus({ success: false, message: error || message || "Something went wrong" });
        }

      } catch (err) {
        console.error(err);
        setStatus({ success: false, message: "Failed to Sign Up. Please try again." });
      } finally {
        setSubmitting(false);
      }
    },
    validate: (values) => {
      // Clear existing timeouts when validation runs
      Object.values(errorTimeouts).forEach(clearTimeout);
      setErrorTimeouts({});
      
      // Run default validation
      const errors = {};
      try {
        validationSchema.validateSync(values, { abortEarly: false });
      } catch (err) {
        err.inner.forEach(error => {
          errors[error.path] = error.message;
        });
      }
      
      // Show errors temporarily for fields that have errors
      Object.keys(errors).forEach(field => {
        showErrorTemporarily(field);
      });
      
      return errors;
    }
  });

  // Function to show error temporarily for 5 seconds
  const showErrorTemporarily = (fieldName) => {
    // Clear existing timeout for this field
    if (errorTimeouts[fieldName]) {
      clearTimeout(errorTimeouts[fieldName]);
    }
    
    // Show the error
    setVisibleErrors(prev => ({ ...prev, [fieldName]: true }));
    
    // Set timeout to hide the error after 5 seconds
    const timeout = setTimeout(() => {
      setVisibleErrors(prev => ({ ...prev, [fieldName]: false }));
      setErrorTimeouts(prev => {
        const newTimeouts = { ...prev };
        delete newTimeouts[fieldName];
        return newTimeouts;
      });
    }, 5000);
    
    setErrorTimeouts(prev => ({ ...prev, [fieldName]: timeout }));
  };

  // Function to handle field focus
  const handleFieldFocus = (fieldName) => {
    // Clear any existing error for this field when user focuses
    if (visibleErrors[fieldName]) {
      setVisibleErrors(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  // Clean up timeouts when modal closes
  useEffect(() => {
    if (!isOpen) {
      Object.values(errorTimeouts).forEach(clearTimeout);
      if (Object.keys(errorTimeouts).length > 0) {
        setErrorTimeouts({});
      }
      setVisibleErrors({});
      setShowSuccessScreen(false);
    }
    // Only run this when open/close toggles to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

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
            Thank You!
          </h2>
          
          <p className="text-gray-600 text-lg">
            Sign up successful! Welcome to our platform.
          </p>
        </div>
      </div>
    );
  }

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
          Sign Up
        </h2>

        {/* Status Message */}
        {formik.status?.message && (
          <div className={`mb-4 p-3 rounded-lg text-center ${
            formik.status.success 
              ? 'bg-green-100 text-green-700' 
              : formik.status.isAlreadySignedUp
              ? 'bg-blue-100 text-blue-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {formik.status.message}
          </div>
        )}

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {/* Name */}
          <Input
            label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => handleFieldFocus("name")}
          />
          {formik.touched.name && formik.errors.name && visibleErrors.name && (
            <p className="text-red-600 text-sm">{formik.errors.name}</p>
          )}

          {/* Email */}
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => handleFieldFocus("email")}
          />
          {formik.touched.email && formik.errors.email && visibleErrors.email && (
            <p className="text-red-600 text-sm">{formik.errors.email}</p>
          )}

          {/* Phone */}
          <Input
            label="Phone"
            name="phone"
            type="text"
            placeholder="Enter your phone number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => handleFieldFocus("phone")}
          />
          {formik.touched.phone && formik.errors.phone && visibleErrors.phone && (
            <p className="text-red-600 text-sm">{formik.errors.phone}</p>
          )}

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={() => handleFieldFocus("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {formik.touched.password && formik.errors.password && visibleErrors.password && (
            <p className="text-red-600 text-sm">{formik.errors.password}</p>
          )}

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={() => handleFieldFocus("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showConfirmPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && visibleErrors.confirmPassword && (
            <p className="text-red-600 text-sm">{formik.errors.confirmPassword}</p>
          )}

          {/* Submit Button */}
          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Submitting..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;