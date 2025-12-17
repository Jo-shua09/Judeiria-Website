import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="px-6 md:px-12 py-12 bg-secondary text-primary-foreground">
      <div className="container-narrow mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="font-heading text-3xl text-primary md:text-4xl lg:text-5xl font-bold mb-6">
            If you're unsure of your next step, that's okay.
          </h2>

          <p className="text-xl md:text-2xl text-primary font-heading font-semibold mb-6">Clarity comes before growth.</p>

          <p className="text-lg text-primary mb-10 max-w-2xl mx-auto leading-relaxed">
            If you feel stuck, overwhelmed, or unsure, you don't have to figure it out alone.
          </p>

          <Button variant="hero" size="xl" asChild className="group">
            <a href="https://calendly.com/judeiria/business_consultation" target="_blank" rel="noopener noreferrer">
              Book a Clarity Session
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
