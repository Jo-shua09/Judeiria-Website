import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const points = ["Where you are", "What's holding you back", "What actually matters", "What to focus on next"];

export function WhySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Why people choose to work with me</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center space-y-2 mb-8"
        >
          <p className="text-muted-foreground">A lot of people have ideas.</p>
          <p className="text-muted-foreground">A lot of people have skills.</p>
          <p className="text-xl font-semibold text-primary">Most people lack clarity.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <p className="text-center text-muted-foreground text-sm mb-6">I help you understand:</p>

          <div className="grid sm:grid-cols-2 gap-3">
            {points.map((point, i) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium text-foreground">{point}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center text-muted-foreground text-sm mt-6"
          >
            Whether it's your business, career, or brand — I help you move forward with <span className="text-primary font-medium">structure</span>,{" "}
            <span className="text-primary font-medium">confidence</span>, and <span className="text-primary font-medium">direction</span>.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
