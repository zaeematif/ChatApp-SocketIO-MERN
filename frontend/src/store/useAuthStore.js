import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogginIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in check auth:", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const response = await axiosInstance.post("/auth/signup", data);
      toast.success("Account created successfully");

      set({ authUser: response.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLogginIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);

      set({ authUser: response.data });

      toast.success("Logged In Successfully");
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      set({ isLogginIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged Out Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.put(
        "/auth/update-profile",
        data,
        { withCredentials: true }
      );
      set({ authUser: res.data });
      toast.success("Profile Updated Succesfully");
    } catch (error) {
      toast.error("Error");
      console.log("updateProfile error:", error.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
