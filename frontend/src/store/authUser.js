import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
export const useAuthUserStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingAuth: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials, {
        withCredentials: true,
      });
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Login successful");
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your credentials and try again.";
      set({ user: null, isLoggingIn: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      set({ user: null, isLoggingOut: false });
    }
  },
  authcheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authcheck", {
        withCredentials: true,
        // Don't throw error for 401 responses
        validateStatus: (status) => status < 500,
      });

      if (response.status === 200 && response.data.user) {
        set({ user: response.data.user, isCheckingAuth: false });
      } else {
        // If not authenticated, just set user to null without showing error
        set({ user: null, isCheckingAuth: false });
      }
    } catch (error) {
      console.error("Auth check error:", error);
      // Only show error for unexpected errors, not for 401
      if (error.response?.status !== 401) {
        toast.error("Authentication check failed. Please try again.");
      }
      set({ user: null, isCheckingAuth: false });
    }
  },
}));
