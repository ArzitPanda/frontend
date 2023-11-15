import { useRouter } from "next/router";
import React, { useState } from "react";

const Navbar = ({ Name }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("authorization");
    router.push("/login");
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Left-side profile photo */}
          <img
            src="your-profile-photo.jpg" // Replace with your actual profile photo URL
            alt="Profile"
            className="h-8 w-8 rounded-full mr-2"
          />
          <span className="text-white">{Name}</span>
        </div>

        {/* Hamburger menu for mobile screens */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Right-side dropdown for larger screens */}
        <div
          className={`lg:flex lg:items-center ${menuOpen ? "flex" : "hidden"}`}
        >
          <div className="lg:flex lg:ml-4">
            <div className="relative">
              <button
                className="text-white focus:outline-none"
                onClick={toggleMenu}
              >
                My Task
              </button>
            </div>
            <div className="relative ml-4">
              <button
                className="text-white focus:outline-none"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
