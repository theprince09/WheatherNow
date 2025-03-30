"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <nav className={`${darkMode ? "bg-black" : "bg-gray-200"} shadow-md fixed top-0 w-full z-50`}>
      <div className="max-w-7xl px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-5">
          <img src="/Images/logo.png" alt="WeatherNow Logo" className="w-12 h-12 rounded-full object-cover shadow-lg" />
          <span className="text-white text-xl font-bold">WeatherNow</span>
        </div>

        <div className="hidden md:flex space-x-10 flex-1 justify-center">
          {["Home", "Forecast", "Maps", "Alerts"].map((label) => (
            <button 
              key={label} 
              className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="hidden md:flex items-center gap-2 bg-gray-300 px-10 py-2 rounded-lg text-lg font-semibold text-black hover:bg-gray-400 transition duration-300"
        >
          <span className="transform transition-transform duration-300 hover:rotate-180">
            {darkMode ? "☀️" : "🌙"}
          </span>
        </button>

        <button className="md:hidden text-white ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className={`md:hidden ${darkMode ? "bg-black" : "bg-gray-200"} shadow-md flex flex-col items-start p-4 space-y-4`}>
          {["Home", "Forecast", "Maps", "Alerts"].map((label) => (
            <button 
              key={label} 
              className="text-white text-lg font-medium hover:text-blue-500 transition duration-300"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="bg-gray-300 px-4 py-2 rounded-lg text-lg font-semibold text-black hover:bg-gray-400 transition duration-300 flex items-center gap-2"
          >
            <span className="transform transition-transform duration-300 hover:rotate-180">
              {darkMode ? "☀️" : "🌙"}
            </span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
