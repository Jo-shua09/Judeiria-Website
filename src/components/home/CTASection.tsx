import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-10 bg-secondary relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-narrow mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">If you're unsure of your next step, that's okay.</h2>

          <p className="text-lg md:text-xl text-primary font-semibold mb-4">Clarity comes before growth.</p>

          <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm">
            If you feel stuck, overwhelmed, or unsure — you don't have to figure it out alone.
          </p>

          <Button variant="hero" size="lg" asChild className="group">
            <a href="https://calendly.com/judeiria/business_consultation" target="_blank" rel="noopener noreferrer">
              Book a Clarity Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
