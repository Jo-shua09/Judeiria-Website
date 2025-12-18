import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import judeHero from "@/assets/jude-portrait.jpg";

const flagLinks = [
  "https://en.wikipedia.org/wiki/Flag_of_the_United_States",
  "https://en.wikipedia.org/wiki/Flag_of_the_United_Kingdom",
  "https://en.wikipedia.org/wiki/Flag_of_Georgia_(country)",
  "https://en.wikipedia.org/wiki/Flag_of_Israel",
  "https://en.wikipedia.org/wiki/Flag_of_Kenya",
  "https://en.wikipedia.org/wiki/Flag_of_Cameroon",
  "https://en.wikipedia.org/wiki/Flag_of_Nigeria",
  "https://en.wikipedia.org/wiki/Flag_of_Ghana",
];

const flagImages = [
  "https://flagcdn.com/us.svg",
  "https://flagcdn.com/gb.svg",
  "https://flagcdn.com/ge.svg",
  "https://flagcdn.com/il.svg",
  "https://flagcdn.com/ke.svg",
  "https://flagcdn.com/cm.svg",
  "https://flagcdn.com/ng.svg",
  "https://flagcdn.com/gh.svg",
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-background overflow-hidden py-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, hsl(var(--primary)) 2px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="px-4 md:px-12 mx-auto">
        <div className="flex lg:flex-nowrap justify-center md:py-16 py-0 flex-wrap gap-16 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 lg:flex-[2]"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Instant credibility <span className="text-accent">+ clarity.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-white mb-6 leading-relaxed"
            >
              I'm <span className="text-white font-semibold">Jude Iria</span>, a Business Consultant, Career Coach, and Brand & Growth Strategist
              helping people turn skills into income, brands into businesses, and confusion into clear direction.
            </motion.p>

            {/* Credibility Line */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="mb-8">
              <p className="text-sm text-white mb-3">Founder of multiple ventures • Worked with founders, professionals, and brands across:</p>
              <div className="overflow-hidden">
                <motion.div className="flex gap-4" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, ease: "linear", repeat: Infinity }}>
                  {[...flagImages, ...flagImages].map((image, i) => (
                    <a key={i} href={flagLinks[i % flagImages.length]} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                      <img loading="lazy" src={image} alt={`Flag ${(i % flagImages.length) + 1}`} className="h-8 w-auto rounded" />
                    </a>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="hero" size="xl" asChild>
                <a href="https://calendly.com/judeiria/business_consultation" target="_blank" rel="noopener noreferrer">
                  Book a Clarity Session
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="order-2 lg:order-1 relative md:px-12 md:pb-0 pb-6 lg:flex-1 px-8"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/20 rounded-2xl transform rotate-3" />
              <img
                loading="lazy"
                src={judeHero}
                alt="Jude Iria - Business Consultant"
                className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:max-w-none object-cover aspect-[4/5]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
