import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Compass, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Briefcase,
    title: "Business Consulting",
    description: "I audit businesses, identify what's broken or missing, and help build simple systems that make growth easier and more predictable.",
    link: "/services#consulting",
  },
  {
    icon: Compass,
    title: "Career & Skill Direction",
    description:
      "I help people discover their skills, choose the right path, learn what matters, and position themselves for real opportunities and income.",
    link: "/services#coaching",
  },
  {
    icon: Megaphone,
    title: "Brand, Marketing & Social Strategy",
    description:
      "I help individuals and businesses build a clear brand, show up consistently online, and grow through branding, content, and social media management.",
    link: "/services#strategy",
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="px-6 py-12 bg-background">
      <div className="container-wide mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold  text-white mb-4">What I help people do</h2>
          <p className=" text-white max-w-2xl mx-auto">Clear direction. Simple systems. Real results.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            >
              <Link
                to={service.link}
                className="group block h-full p-8 bg-card rounded-xl border border-border hover:border-accent hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground" />
                </div>
                <h3 className="font-heading text-xl font-semibold  text-white mb-4 group-hover:text-accent transition-colors">{service.title}</h3>
                <p className=" text-white leading-relaxed">{service.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
