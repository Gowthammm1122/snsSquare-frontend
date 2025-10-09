import axiosInstance from "./axiosInstance";
import { getEncryptedItem } from "../../lib/encryption";

// Existing loginUser function
export const loginUser = async (loginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", loginData);
    const payload = response.data || {};
    const data = payload.data || {};
    const userFromData = data.user || {};
    const token = data.token || payload.accessToken;
    const user = Object.keys(userFromData).length
      ? userFromData
      : {
          email: payload.email,
          id: payload.user_id,
          name: payload.name,
          phone: payload.phone,
        };
    const success = typeof payload.success === "boolean" ? payload.success : true;

    return { token, user, success };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

export const signUpUser = async (signUpData) => {
  try {
    const response = await axiosInstance.post("/auth/create-user", signUpData);
    const payload = response.data || {};
    const data = payload.data || {};

    const token = data.token || payload.accessToken;
    const user = data.user || {
      email: payload.email,
      id: payload.user_id,
      name: payload.name,
      phone: payload.phone,
    };
    const success = typeof payload.success === "boolean" ? payload.success : true;
    const message = payload.message;

    return { message, token, user, success };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

export const getUserDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/auth/user/list-user-details/${id}`);

    return {
      message: response.data.message,
      userDetail: response.data.userDetail,
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

export const logoutUser = async (userId) => {
  try {
    // If userId is not provided, try to get it from localStorage
    const actualUserId = userId || getEncryptedItem("userId");
    
    const response = await axiosInstance.post("/auth/user/logout", {
      user_id: actualUserId,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};