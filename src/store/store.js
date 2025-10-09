import { create } from "zustand";
import { loginUser, signUpUser } from "../api/Service/user";
import { setEncryptedItem, getEncryptedItem, removeEncryptedItem } from "../lib/encryption";

export const useAuthStore = create((set, get) => ({
  token: typeof window !== "undefined" ? getEncryptedItem("token") : null,
  userId: typeof window !== "undefined" ? getEncryptedItem("userId") : null,
  user: typeof window !== "undefined" ? {
    id: getEncryptedItem("userId"),
    name: localStorage.getItem("name"),
    email: localStorage.getItem("userEmail"),
    role: localStorage.getItem("role") // Add role to user object
  } : null,
  error: null,
  isAuthenticated: typeof window !== "undefined" ? !!getEncryptedItem("token") : false,

  login: async (loginData) => {
    try {
      const { token, user, success } = await loginUser(loginData);

      if (success) {
        setEncryptedItem("token", token);
        setEncryptedItem("userId", user.id);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("name", user.name);
        localStorage.setItem("role", user.role); // Store role

        set({
          token,
          userId: user.id,
          user,
          error: null,
          isAuthenticated: true,
        });
      }

      return { success };
    } catch (error) {
      set({ error: error.message || "An error occurred" });
      return { success: false, error: error.message || "An error occurred" };
    }
  },

  signUp: async (signUpData) => {
    try {
      const { message, token, user, success } = await signUpUser(signUpData);
      setEncryptedItem("token", token);
      setEncryptedItem("userId", user.id);
      localStorage.setItem("name", user.name);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("role", user.role); // Store role
      set({ token, userId: user.id, user, error: null, isAuthenticated: true });
      return { success, message };
    } catch (error) {
      set({ error: error.message || "An error occurred" });
      return { success: false, error: error.message || "An error occurred" };
    }
  },

  logout: () => {
    removeEncryptedItem("token");
    removeEncryptedItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("name");
    localStorage.removeItem("role"); // Remove role
    set({ user: null, token: null, userId: null, isAuthenticated: false });
  },

  clearError: () => {
    set({ error: null });
  },

  // Additional auth methods (e.g., Google) can be added here when available
}));