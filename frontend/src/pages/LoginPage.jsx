import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handelSignup = (e) => {
    e.preventDefault();
    console.log("User logged in with:", { email, password });
  };
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="Logo" className="w-52" />
        </Link>
      </header>
      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 arounded-lg shadow-md">
          <h1 className="text-crnter text-white text-2xl font-bold mb-4">
            Log In
          </h1>
          <form className="space-y-6" onSubmit={handelSignup}>
            <div>
              <label
                className="text-sm font-medium text-gray-300 block"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring-2"
                placeholder="name@email.com"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                className="text-sm font-medium text-gray-300 block"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring-2"
                placeholder="********"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Log In
            </button>
          </form>
          <p className="text-sm text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-red-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage