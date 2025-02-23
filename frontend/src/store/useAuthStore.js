import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from 'socket.io-client'

const BASE_URL = "http://localhost:3000/"

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLogginIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      //to go online
      get().connectSocket();
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
      //to go online
      get().connectSocket();
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
      //to go online
      get().connectSocket();
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
      //after logout disconnect from the socket
      get().disconnectSocket()
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.put("/auth/update-profile", data, {
        withCredentials: true,
      });
      set({ authUser: res.data });
      toast.success("Profile Updated Succesfully");
    } catch (error) {
      toast.error("Error");
      console.log("updateProfile error:", error.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const {authUser} = get()

    //if not logged in OR already has a socket connection
    if(!authUser || get().socket?.connected) return 

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id
      }
    })
    //creates base connection with the server
    socket.connect()

    //update socket state
    set({socket: socket})

    //listen for online users list
    socket.on("getOnlineUsers", (userIds) => {
      set({onlineUsers: userIds})
    })
  },

  disconnectSocket: () => {
    //ONLY if connected then disconnect
    if(get().socket?.connected) get().socket.disconnect()
  },
}));
