import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* App Name */}
          <div className="flex-shrink-0 text-xl font-bold">TechBridge</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <button className="px-4 py-2 rounded hover:bg-gray-800">Login</button>
            <button className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700">
              Sign Up
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-800">Login</button>
          <button className="block w-full text-left px-4 py-2 rounded">
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}
