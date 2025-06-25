import { useState } from "react";
import { Link } from "react-router-dom"

const SignUpPage = () => {
  const {searchParams} = new URL(document.location);
  const emailValue = searchParams.get("email");

  const [email, setEmail] = useState(emailValue || "");
  const [password,setPassword]= useState("");
  const [username,setUsername]= useState("");


  const handelSignup =(e)=>{
    e.preventDefault();
    
    console.log("User signed up with:", { email, password, username });
  }
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
            Sign Up
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
                htmlFor="username"
              >
                User Name
              </label>
              <input
                type="username"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring-2"
                placeholder="your_username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <div></div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to={"/Login"} className="text-red-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage