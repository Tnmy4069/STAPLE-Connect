"use client"; // Required for interactive navbar

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons for menu toggle

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header id="Home" className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl shadow-lg p-4 mx-4 mt-4">
      <div className="flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold">STAPLE Industry Connect</h1>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex space-x-6">
          <Link href="#Home" className="text-white hover:text-blue-400 transition duration-300">Add Company</Link>
          <Link href="#Companies" className="text-white hover:text-blue-400 transition duration-300">Listed Companies</Link>
        
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
          {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Navbar (Dropdown) */}
      {isOpen && (
        <nav className="mt-4 space-y-3 md:hidden text-center">
          <Link href="#Home" className="block text-white hover:text-blue-400 transition duration-300">Add Company</Link>
          <Link href="#Companies" className="block text-white hover:text-blue-400 transition duration-300">Listed Company </Link>
          
        </nav>
      )}
    </header>
  );
}
