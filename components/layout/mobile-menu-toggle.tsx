"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export function MobileMenuToggle() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (mobileMenu) {
      if (!isMobileMenuOpen) {
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("animate-in", "slide-in-from-top-2", "duration-300");
      } else {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("animate-in", "slide-in-from-top-2", "duration-300");
      }
    }
  };

  return (
    <button 
      className="lg:hidden p-2 rounded-md hover:bg-muted transition-smooth"
      onClick={toggleMobileMenu}
      aria-label="Toggle mobile menu"
      aria-expanded={isMobileMenuOpen}
    >
      {isMobileMenuOpen ? (
        <X className="h-6 w-6 transition-transform duration-300 rotate-180" />
      ) : (
        <Menu className="h-6 w-6 transition-transform duration-300 hover:rotate-180" />
      )}
    </button>
  );
}
