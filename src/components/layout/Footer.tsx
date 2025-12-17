import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import logoDark from "@/assets/logo-dark.jpg";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img src={logoDark} alt="Jude Iria" className="h-12 w-12 rounded-full object-cover" />
              <span className="ml-3 font-heading text-xl font-semibold">Jude Iria</span>
            </Link>
            <p className="text-primary-foreground/80 max-w-sm leading-relaxed">
              Business Consultant, Career Coach, and Brand & Growth Strategist helping people turn skills into income and confusion into clear
              direction.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/60 text-sm">
          <p>© {new Date().getFullYear()} Jude Iria. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
