import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Politics", link: "/politics" },
  { name: "Finance", link: "/finance" },
  { name: "Markets", link: "/markets" },
  { name: "Agriculture", link: "/agriculture" },
  { name: "Wealth", link: "/wealth" },
  { name: "Sports", link: "/sports" },
  { name: "Opinion", link: "/opinion" },
  { name: "Careers", link: "/careers" },
  { name: "Tech", link: "/tech" },
  { name: "AI", link: "/ai" },
  { name: "Other", link: "/other" },
];

const MenuToggle = ({ onClick, isOpen }) => {
  const location = useLocation();

  useEffect(() => {
    onClick(false); // Close menu on route change
  }, []);

  return (
    <>
      {/* Minimal Hamburger Icon */}
      <div className="md:hidden">
        {!isOpen && (
          <svg
            onClick={() => onClick(true)}
            className="cursor-pointer text-gray-700 dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>

      {/* Slide-in Menu Panel */}
      {isOpen && (
        <div className="fixed top-0 right-0 h-full w-2/5 bg-white/70 dark:bg-gray-900/80 backdrop-blur-md z-50 shadow-lg p-4 transition-transform duration-300 ease-in-out overflow-y-auto">
          {/* Minimal Close Icon */}
          <div className="flex justify-end mb-4">
            <svg
              onClick={() => onClick(false)}
              className="cursor-pointer text-black dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <ul className="flex flex-col gap-5 text-lg">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.link}
                  onClick={() => onClick(false)}
                  className="text-blue-700 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MenuToggle;
