import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
export const useAuthUserStore = create((set) => ({
    user:null,
    issiginedup: false,
    ischecking: false,
    signup: async (credentials) => {
        set({ issiginedup: true});
        try {
            const response = await axios.post("/api/v1/auth/signup", credentials);
            set({ user: response.data.user , issiginedup: true });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
            set({ issiginedup: false , user: null });
        }
    },
    login: async (credentials) => {
        set({isloginin: true});
        try {
            const response = await axios.post("/api/v1/auth/login", credentials);
            set({ user: response.data.user  , isloginin: false });
            toast.success("Login successful");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
            set({ user: null , isloginin: false });
        }
    },
    logout: async ()=>{
        set({isloginout: true});
        try {
            await axios.post("/api/v1/auth/logout", );
            set({ user: null, isloginout: false });
            toast.success("Logout successful");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
            set({ user: null, isloginout: false });
        }
    },
    authcheck: async ()=>{
        set({ ischecking: true });
        try {
            const response = await axios.get("/api/v1/auth/authcheck");
            set({ user: response.data.user, ischecking: false });
        } catch (error) {
            toast.error(error.response?.data?.message || "Authentication check failed");
            set({ user: null, ischecking: false });
        }
    },
}));

