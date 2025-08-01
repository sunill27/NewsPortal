import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Politics", link: "/politics" },
    { name: "Finance", link: "/finance" },
    { name: "Markets", link: "/markets" },
    { name: "Agriculture", link: "/agriculture" },
    { name: "Energy", link: "/energy" },
    { name: "Weather", link: "/weather" },
    { name: "Corporate", link: "/corporate" },
    { name: "Careers", link: "/careers" },
    { name: "Tech", link: "/tech" },
    { name: "Opinion", link: "/opinion" },
    { name: "Sports", link: "/sports" },
    {
      name: "Other",
      link: "/other",
      children: [
        { name: "Wealth", link: "/other/wealth" },
        { name: "Interview", link: "/other/interview" },
        { name: "Opinion", link: "/other/opinion" },
      ],
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const toggleSubMenu = (name) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kathmandu",
  });

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kathmandu",
  });

  return (
    <header className="sticky top-0 z-50 bg-gray-100 dark:bg-gray-900 border-b dark:border-gray-700 text-gray-900 dark:text-white">
      {/* Header Content */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 py-4 gap-4 relative">
        {/* Logo + Date */}
        <div className="flex flex-col items-start">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="h-16 mb-1" />
          </Link>
          <div className="text-xs pl-2">
            <span className="font-semibold">English Edition</span> |{" "}
            {currentDate} | {currentTime} NST
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-wrap gap-6 text-base font-semibold whitespace-nowrap mt-2 md:mt-0">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                to={item.link}
                className="text-black dark:text-white hover:text-red-600 dark:hover:text-red-600 transition-colors duration-200"
              >
                {item.name}
              </Link>

              {item.children && (
                <div
                  className={`absolute top-full mt-2 w-48 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 shadow-lg rounded-md
      opacity-0 pointer-events-none
      group-hover:opacity-100 group-hover:pointer-events-auto
      transition-opacity duration-200 z-50
      ${item.name === "Other" ? "right-0" : "left-0"}`}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      to={child.link}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="absolute top-4 right-4 md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6 text-black dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-black dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sliding Menu (from right) */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-white/10 backdrop-blur-md z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        {/* Close icon inside panel */}
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMenuOpen(false)} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Nav Items */}
        <div className="flex flex-col px-6 space-y-4 text-white">
          {navItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() =>
                  item.children
                    ? toggleSubMenu(item.name)
                    : setIsMenuOpen(false)
                }
                className="flex justify-between w-full text-left text-white hover:text-red-400 py-2"
              >
                <Link to={item.link}>{item.name}</Link>
                {item.children && (
                  <span>{openMenus[item.name] ? "▲" : "▼"}</span>
                )}
              </button>

              {item.children && openMenus[item.name] && (
                <div className="pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      to={child.link}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-1 text-sm text-white hover:text-red-400"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
