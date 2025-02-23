import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import {useAuthStore} from './useAuthStore'

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      console.log("Error in getUsers", error.message);
      toast.error(error.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("Error in getMessage: ", error.message);
      toast.error(error.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { messages, selectedUser } = get();

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      ); 

      set({messages: [...messages, res.data]})
    } catch (error) {
        console.log("Error in sendMessage", error.message);
        toast.error(error.message);
    }
  },

  subscribeToMessages: () => {
    const {selectedUser} = get();
    
    if(!selectedUser) return

    const socket = useAuthStore.getState().socket;

    //listen for new message 
    socket.on("newMessage", (newMessage) => {
        if(senderId !== selectedUser._id) return

        set({
          messages: [...get().messages, newMessage]
        })
    })
  },

  unsubscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    //stop listning to newMessage
    socket.off("newMessage")
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
