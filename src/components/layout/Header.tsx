import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoDark from "@/assets/logo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-sm border-b border-border">
      <nav className="px-4 md:px-8 mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center w-fit">
            <img loading="lazy" src={logoDark} alt="Jude Iria" className="w-[7rem] rounded-full object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.href ? "text-accent" : "text-foreground hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="hero" size="lg" asChild>
              <a href="https://calendly.com/judeiria/business_consultation/judeiria/business_consultation" target="_blank" rel="noopener noreferrer">
                Book a Clarity Session
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden min-h-screen bg-background border-b border-border"
          >
            <div className="px-4 py-4 space-y-4 flex flex-col h-[80vh] justify-between">
              <div className="h-full w-fit">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block py-2 text-base font-medium transition-colors ${
                      location.pathname === link.href ? "text-accent" : "text-foreground hover:text-accent"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex h-full justify-end w-full flex-col">
                <Button variant="hero" className="w-full" asChild>
                  <a
                    href="https://calendly.com/judeiria/business_consultation/judeiria/business_consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a Clarity Session
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
