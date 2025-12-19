import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const workWith = [
  "Founders trying to structure or scale their businesses",
  "Professionals unsure of what skill to focus on or how to grow",
  "Personal brands looking to monetize and stand out",
  "Businesses that need better systems, marketing, and visibility",
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-background/10">
      <div className="container-wide mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-foreground mb-4"
          >
            So, who is <span className="text-primary">Jude Iria</span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground mb-8 leading-relaxed"
          >
            I'm a founder, consultant, and strategist who helps people <span className="text-foreground font-medium">simplify growth</span>. My work
            sits at the intersection of clarity, structure, branding, and growth.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col mt-8 justify-center"
        >
          <div className="grid sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {workWith.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border card-hover"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-white leading-relaxed text-center max-w-4xl mx-auto p-4 ">
            My work sits at the intersection of <span className="text-accent font-semibold">clarity</span>,{" "}
            <span className="text-accent font-semibold">structure</span>, <span className="text-accent font-semibold">branding</span>, and{" "}
            <span className="text-accent font-semibold">growth</span> helping people stop guessing and start moving with confidence.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
