import axiosInstance from "./axiosInstance";

export const submitContactForm = async (formData) => {
  try {
    const response = await axiosInstance.post("/enquiry", formData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred while submitting your enquiry";
    throw new Error(errorMessage);
  }
};