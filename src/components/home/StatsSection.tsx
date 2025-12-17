import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 100, suffix: "+", label: "Brands & businesses supported" },
  { value: 95, suffix: "%", label: "Client satisfaction rate" },
  { value: 100, prefix: "$", suffix: "k+", label: "Revenue scaled for founders" },
];

function AnimatedCounter({ value, prefix = "", suffix = "", isInView }: { value: number; prefix?: string; suffix?: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span className="font-heading text-5xl md:text-6xl font-bold text-accent">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

const highlights = [
  "Founder of multiple businesses and initiatives",
  "Worked with founders, professionals, and brands across multiple countries",
  "Led branding, marketing, systems, and growth projects",
  "Helped people move from confusion to clear career and business paths",
  "Built and managed digital brands, content systems, funnels, and communities",
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="px-6 py-12 bg-secondary">
      <div className="container-wide mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">A snapshot of my work</h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="text-center p-8 bg-card rounded-xl border border-border"
            >
              <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} isInView={isInView} />
              <p className="text-primary mt-4">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-card rounded-xl border border-border p-8 md:p-12"
        >
          <ul className="grid md:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-primary">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
