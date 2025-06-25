import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthUserStore } from "./store/AuthUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";

const App = () => {
  const {user , ischecking , authcheck}=useAuthUserStore();
  console.log("User in App component:", user);
  console.log("Is checking authentication:", ischecking);
  useEffect (() => {
    authcheck();
  }, [authcheck]);
  if (ischecking) {
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
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={!user ? <LoginPage/> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!user ? <SignUpPage/> : <Navigate to={"/"} />} />
      </Routes>
      <Footer/>
      <Toaster/>
    </>
  );
}

export default App