import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const points = ["Where you are", "What's holding you back", "What actually matters", "And what to focus on next"];

export function WhySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 px-4 bg-primary  text-white-foreground">
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Why people choose to work with me</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center md:flex-nowrap flex-wrap gap-2">
            <p className="text-sm md:text-lg text-white-foreground/90 leading-relaxed">A lot of people have ideas.</p>
            <p className="text-sm md:text-lg text-white-foreground/90 leading-relaxed">A lot of people have skills.</p>
          </div>
          <p className="text-2xl font-heading font-semibold text-accent">Most people lack clarity.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 space-y-4"
        >
          <p className=" text-white-foreground/90 leading-relaxed">I don't overwhelm people with trends or complicated theories.</p>
          <p className=" text-white-foreground/90 leading-relaxed">I help you understand:</p>

          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            {points.map((point, i) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-3 p-4 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10"
              >
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="font-medium">{point}</span>
              </motion.div>
            ))}
          </div>

          <p className=" text-white-foreground/90 leading-relaxed mt-8">
            Whether it's your business, career, or brand, my role is to help you move forward with{" "}
            <span className="text-accent font-semibold">structure</span>, <span className="text-accent font-semibold">confidence</span>, and{" "}
            <span className="text-accent font-semibold">direction</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
