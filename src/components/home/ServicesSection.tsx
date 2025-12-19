import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Compass, Megaphone, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Briefcase,
    title: "Business Consulting",
    description: "Audit businesses, identify gaps, and build simple systems for predictable growth.",
    link: "/services#consulting",
  },
  {
    icon: Compass,
    title: "Career Coaching",
    description: "Discover skills, choose the right path, and position yourself for real opportunities.",
    link: "/services#coaching",
  },
  {
    icon: Megaphone,
    title: "Brand & Social Strategy",
    description: "Build a clear brand, show up consistently, and grow through content and social media.",
    link: "/services#strategy",
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-secondary">
      <div className="container-wide mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">What I help people do</h2>
          <p className="text-muted-foreground text-sm">Clear direction. Simple systems. Real results.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <Link to={service.link} className="group block h-full p-6 bg-card rounded-xl border border-border card-hover">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <service.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
