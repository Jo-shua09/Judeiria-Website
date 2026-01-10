import { useState, useEffect } from "react";
import logo from "../assets/logo-light.jpg";

const Loader = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="fixed inset-0 z-50 w-full flex items-center justify-center bg-background">
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-white/20 to-transparent blur-xl animate-pulse-slow" />

        {/* Pulsing ring */}
        <div
          className={`absolute -ins-2 rounded-full border border-white/30 transition-all duration-1000 ${
            loaded ? "scale-105 opacity-0" : "scale-100 opacity-100"
          }`}
        />

        {/* Logo with multiple animations */}
        <img
          src={logo}
          alt="Loading..."
          className={`relative w-20 h-20 animate-pulse md:w-24 md:h-24 rounded-full shadow-2xl transition-all duration-1000 ${
            loaded ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 -rotate-90"
          } animate-float`}
          style={{
            animationDelay: "0.5s",
            animationDuration: "5s",
          }}
        />
      </div>
    </div>
  );
};

export default Loader;
