import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useAuthUserStore } from "./store/authUser";

const App = () => {
  const { user, isChecking, authcheck } = useAuthUserStore();
  
  useEffect(() => {
    // Only run authcheck if we don't have a user yet
    if (!user) {
      authcheck().catch(console.error);
    }
  }, [authcheck, user]);
  
  // Only show loading if we're actively checking and have no user
  if (isChecking && !user) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black ">
          <Loader className="size-10 text-red-500 animate-spin " />
        </div>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
