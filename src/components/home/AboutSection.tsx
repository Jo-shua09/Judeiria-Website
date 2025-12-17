import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import judePortrait from "@/assets/jude-portrait.jpg";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-secondary ">
      <div className="container-wide mx-auto">
        <div className="flex md:flex-nowrap flex-wrap-reverse gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:flex-1 md:px-0 px-8"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-2xl transform -rotate-3" />
              <img src={judePortrait} alt="Jude Iria" className="relative rounded-2xl shadow-xl w-full max-w-md mx-auto object-cover aspect-square" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:flex-1"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">So, who is Jude Iria?</h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I'm a founder, consultant, and strategist who helps people <span className="text-primary font-medium">simplify growth</span>.
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">Over the years, I've worked with:</p>

            <ul className="space-y-3 mb-8">
              {[
                "Founders trying to structure or scale their businesses",
                "Professionals unsure of what skill to focus on or how to grow",
                "Personal brands looking to monetize and stand out",
                "Businesses that need better systems, marketing, and visibility",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>

            <p className="text-muted-foreground leading-relaxed">
              My work sits at the intersection of <span className="text-accent font-semibold">clarity</span>,{" "}
              <span className="text-accent font-semibold">structure</span>, <span className="text-accent font-semibold">branding</span>, and{" "}
              <span className="text-accent font-semibold">growth</span>—helping people stop guessing and start moving with confidence.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
