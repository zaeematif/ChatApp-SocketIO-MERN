import "./App.css";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignupPage from './components/SignupPage'
import LoginPage from './components/LoginPage'
import SettingsPage from './components/SettingsPage'
import ProfilePage from './components/ProfilePage'
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import {Loader} from 'lucide-react'
import {Toaster} from 'react-hot-toast'

function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(()=> {
    checkAuth();
  }, [checkAuth])

  console.log({authUser});
  
  if(isCheckingAuth && !authUser){
    return <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/"/>} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login"/>} />
      </Routes>

      <Toaster/>
    </div>
  );
}

export default App;
