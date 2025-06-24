import { useState } from "react";
import {ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";


const Authscreen = () => {
const [email, setEmail] = useState("");

const handleEmailChange = (e) => {
setEmail(e.target.value);
};
return (
<div className="hero-bg relative">
{/* Navbar */}
<header className="w-full max-w-6xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 pb-10">
    <img src="/netflix-logo.png" alt="Logo" className="w-24 md:w-52" />
    <Link to={"/login"} className="text-white bg-red-600 py-1 px-2 rounded ">
    Sign In
    </Link>
</header>
{/* HERO secation */}
<div className="flex flex-col items-center justify-center text-center py-40 max-w-6xl mx-auto text-white px-4 sm:px-6">
    <h1 className="text-4xl md:text-6xl font-bold mb-4">
    Unlimited movies, TV shows, and more.
    </h1>
    <h2 className="text-xl mb-4">Watch anywhere. Cancel anytime.</h2>
    <h3 className="mb-4">
    Ready to watch? Enter your email to create or restart your membership.
    </h3>
    <form
    className="flex flex-col sm:flex-row gap-4 w-full md:w-1/2"
    onSubmit={handleEmailChange}
    >
    <input
        type="email"
        className="p-2 rounded flex-1 bg-black/60 border border-gray-700"
        placeholder="name@email.com"
        id="email"
        value={email}
        onChange={(e) => {
        setEmail(e.target.value);
        }}
    />
    <button className="bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center ">
        Get Started
        <ChevronRight className="size-8 md:size-10" />
    </button>
    </form>
</div>
{/* SEPARATOR */}
<div className="w-full h-[2px] bg-[#232323] " aria-hidden="true" />
{/* 1st section */}

<div className="py-10 bg-black text-white">
    <div className="flex max-w-6xl mx-auto justify-center items-center md:flex-row flex-col px-4 md:px-2 ">
    {/* left said */}
    <div className="flex-1 text-center md:text-left">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
        Enjoy on your TV.
        </h2>
        <p className="text-lg mb-4">
        Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
        players, and more.
        </p>
    </div>
    {/* Right said */}
    <div className="flex-1 text-center md:text-left relative ">
        <img src="/tv.png" alt="TV" className="mt-4 z-20 relative" />
        <video
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10 "
        autoPlay={true}
        playsInline
        muted
        loop
        >
        <source src="/hero-vid.m4v" type="video/mp4" />
        </video>
    </div>
    </div>
</div>
{/* Separator */}
<div className="w-full h-[2px] bg-[#232323] " aria-hidden="true" />
{/* 2nd section */}
<div className="py-10 bg-black text-white">
    <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
    {/* left side */}
    <div className="flex-1 relative">
        <div className="relative">
        <img
            src="/stranger-things-lg.png"
            alt="Stranger Things img"
            className="mt-4"
        />

        <div
            className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24
                            border border-slate-500 rounded-md px-2"
        >
            <img
            src="/stranger-things-sm.png"
            alt="image"
            className="h-full"
            />
            <div className=" flex justify-between items-center w-full">
            <div className="flex flex-col gap-0">
                <span className="text-md lg:text-lg font-bold">
                Stranger Things
                </span>
                <span className="text-sm text-blue-500">Downloading...</span>
            </div>

            <img src="/download-icon.gif" alt="" className="h-12" />
            </div>
        </div>
        </div>
    </div>
    {/* right side */}

    <div className="flex-1 md:text-left text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
        Download your shows to watch offline
        </h2>
        <p className="text-lg md:text-xl">
        Save your favorites easily and always have something to watch.
        </p>
    </div>
    </div>
</div>
{/* Separator */}
<div className="w-full h-[2px] bg-[#232323] " aria-hidden="true" />
{/* 3rd section */}
<div className="py-10 bg-black text-white">
    <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
    {/* left side */}
    <div className="flex-1 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
        watch everywhere.
        </h2>
        <p className="text-lg md:text-xl">
        Stream unlimited movies and TV shows on your phone, tablet, laptop,
        and TV without paying more.
        </p>
    </div>
    {/* right side */}
    <div className="flex-1 relative">
        <img src="/device-pile.png" alt="Kids img" className="mt-4 relative z-20" />
        <video
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10 "
        autoPlay={true}
        playsInline
        muted
        loop
        >
        <source src="/hero-vid.m4v" type="video/mp4" />
        </video>
    </div>
    </div>
</div>
{/* Footer */}
<div />
</div>
);}

export default Authscreen;