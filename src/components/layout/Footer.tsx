import { useState } from "react";
import { Link } from "react-router-dom";
import logoDark from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate subscription logic
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setEmail("");
    alert("Subscribed successfully!");
  };

  const footerLinks = {
    "Quick Links": [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact Us", href: "/contact" },
    ],
    "Social Media": [
      { label: "LinkedIn", href: "https://linkedin.com/in/jude-iria" },
      { label: "Twitter", href: "https://x.com/CoachJude_XER" },
      { label: "Instagram", href: "https://instagram.com/jude_iria" },
      { label: "Facebook", href: "https://facebook.com/JudeIria" },
      { label: "YouTube", href: "https://www.youtube.com/@jude_iria" },
    ],
    "Affiliated Brands": [
      { label: "Xifin Enterprise", href: "https://xifinenterprise.com/" },
      { label: "Eleazar Alliance", href: "https://eleazer-alliance.vercel.app/" },
      { label: "J.I Global Consultancy", href: "#" },
    ],
    FAQ: [
      { label: "Frequently Asked Questions", href: "/about#faq" },
      { label: "Support", href: "/contact" },
      { label: "Contact Us", href: "/contact" },
    ],
  };

  return (
    <footer className="bg-background/95 w-full overflow-hidden mt-8 md:mt-12">
      {/* Newsletter */}
      <div className="border-b border-secondary md:px-8 px-4">
        <div className="container-custom py-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold">Join our Newsletter</h3>
              <p className="text-sm max-w-md mx-auto lg:mx-0">Be the first to receive updates when they roll out.</p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full max-w-xl gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit" size="lg" variant="hero" className="w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom pt-4 pb-12 px-4 md:px-8">
        <div className="grid gap-10 justify-between grid-cols-2 sm:grid-cols-2 items-start md:grid-cols-3 lg:grid-cols-6">
          {/* Logo & Social */}
          <div className="col-span-2 w-full space-y-4">
            <img loading="lazy" src={logoDark} alt="Jude Iria" className="w-28 h-fit max-w-full object-contain" />
            <p className="font-normal text-base text-foreground mt-4">
              Business Consultant, Career Coach, and Brand & Growth Strategist helping people turn skills into income and confusion into clear
              direction.
            </p>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="w-full md:ml-8 col-span-1">
              <h4 className="font-semibold text-base mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("http") ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.href} className="text-sm hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-secondary">
        <div className="container-custom py-4 text-center">
          <p className="text-xs">© {new Date().getFullYear()} Jude Iria. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
