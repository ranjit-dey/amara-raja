import React, { useState, useRef, useEffect } from "react";
import { Download } from "lucide-react";
import gsap from "gsap";

const NAV_LINKS = [
  { name: "Explore Report", href: "#" },
  { name: "Strategy", href: "#" },
  { name: "Governance", href: "#" },
  { name: "Financials", href: "#" },
  { name: "Reports", href: "#" },
  { name: "Shareholders", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const line1 = useRef(null);
  const line2 = useRef(null);
  const navContainer = useRef(null);

  // Toggle Animation Logic
  useEffect(() => {
    let ctx = gsap.context(() => {
      if (isOpen) {
        // Open Animation
        gsap.to(line1.current, { y: 4, rotate: 45, duration: 0.3 });
        gsap.to(line2.current, { y: -4, rotate: -45, duration: 0.3 });
        gsap.fromTo(menuRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" }
        );
        gsap.from(".mobile-link", {
          y: 20,
          opacity: 0,
          stagger: 0.05,
          delay: 0.2
        });
      } else {
        // Close Animation
        gsap.to(line1.current, { y: 0, rotate: 0, duration: 0.3 });
        gsap.to(line2.current, { y: 0, rotate: 0, duration: 0.3 });
        gsap.to(menuRef.current, { height: 0, opacity: 0, duration: 0.4, ease: "power3.in" });
      }
    }, navContainer);

    return () => ctx.revert();
  }, [isOpen]);

  return (
    <nav ref={navContainer} className="sticky top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between relative z-50 bg-white/10">

        {/* Logo */}
        <div className="font-semibold text-lg text-gray-900">
          <img src="/logo.png" width={180} alt="Logo" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600">
          {NAV_LINKS.map(link => (
            <button key={link.name} className="hover:text-blue cursor-pointer transition-colors">
              {link.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:flex gap-2 items-center bg-blue text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer">
            <Download size={16} />
            <span>Report</span>
          </button>

          {/* Animated Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-[6px] focus:outline-none"
          >
            <span ref={line1} className="w-6 h-[2px] bg-gray-900 block rounded-full" />
            <span ref={line2} className="w-6 h-[2px] bg-gray-900 block rounded-full" />
          </button>
        </div>
      </div>

      {/* Mobile Menu - Drops down directly below navbar */}
      <div
        ref={menuRef}
        className="lg:hidden overflow-hidden bg-white/90 backdrop-blur-2xl border-b border-gray-200 w-full"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-6 pt-4 pb-8 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mobile-link text-lg font-semibold text-gray-800 hover:text-blue-600"
            >
              {link.name}
            </a>
          ))}

          <div className="mobile-link pt-4 border-t border-gray-100">
            <button className="w-full flex gap-3 items-center justify-center bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200">
              <Download size={20} />
              <span>Download Full Report</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
