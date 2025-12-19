import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Compass, Megaphone, Check } from "lucide-react";

interface ServiceSectionProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  includes: string[];
  outcomes: string[];
  ctaText: string;
  ctaLink: string;
  reverse?: boolean;
}

function ServiceSection({ id, icon, title, description, includes, outcomes, ctaText, ctaLink, reverse }: ServiceSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`px-4 md:px-12 py-16 ${reverse ? "bg-secondary" : "bg-background"}`}
    >
      <div className="container-wide mx-auto ">
        <div className={`grid px-2 grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ${reverse ? "lg:flex-row-reverse" : ""}`}>
          <div className={reverse ? "lg:order-2" : ""}>
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">{icon}</div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold  text-white mb-6">{title}</h2>
            <p className="text-lg  text-white leading-relaxed">{description}</p>
          </div>

          <div className={`space-y-6 ${reverse ? "lg:order-1" : ""}`}>
            <div className="bg-card rounded-xl border border-border p-8">
              <h3 className="font-heading text-xl font-semibold  text-white mb-6">What this includes:</h3>
              <ul className="space-y-4">
                {includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className=" text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-accent/10 rounded-xl p-8">
              <h3 className="font-heading text-xl font-semibold  text-white mb-6">What you walk away with:</h3>
              <ul className="space-y-4">
                {outcomes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <Button variant="hero" size="lg" asChild className="group text-sm md:text-lg w-full">
                <a href={ctaLink} target="_blank" rel="noopener noreferrer">
                  {ctaText}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

const services = [
  {
    id: "consulting",
    icon: <Briefcase className="w-8 h-8 text-accent" />,
    title: "Business Consulting",
    description:
      "Building a business isn't just about effort. At some point, you need perspective someone who can look at what you're doing, ask the right questions, and help you see things clearly. I work with you to understand your idea or existing business, simplify it, and give it proper direction so your time and energy are spent where they actually count.",
    includes: [
      "Reviewing your business or idea from a fresh, objective angle",
      "Clarifying what you offer and who it's really for",
      "Structuring your business in a simple, workable way",
      "Turning a personal brand into a clear business direction",
      "Helping you decide what to focus on now   and what can wait",
    ],
    outcomes: ["Clear direction for your business", "Better structure and systems", "Confidence in your next move"],
    ctaText: "Book a Business Consulting Session",
    ctaLink: "https://calendly.com/judeiria/business_consultation/judeiria/business_consultation",
  },
  {
    id: "coaching",
    icon: <Compass className="w-8 h-8 text-accent" />,
    title: "Career Coaching",
    description:
      "Many people are capable, talented, and hardworking but unsure where to focus their energy. Career coaching with me is about helping you understand yourself better, make clearer choices, and position yourself for real opportunities. We don't guess. We get clear.",
    includes: [
      "Identifying your strongest and most practical skills",
      "Clarifying a career or skill path that fits you",
      "Creating a focused learning and growth plan",
      "Positioning your skills for roles, gigs, or income",
      "Improving how you present yourself professionally, especially on LinkedIn",
    ],
    outcomes: ["Confidence in your direction", "A clear plan aligned with your strengths", "Better professional positioning"],
    ctaText: "Book a Career Clarity Call",
    ctaLink: "https://calendly.com/judeiria/business_consultation/judeiria/business_consultation",
    reverse: true,
  },
  {
    id: "strategy",
    icon: <Megaphone className="w-8 h-8 text-accent" />,
    title: "Brand & Social Strategy",
    description:
      "Your online presence should make things easier for you not confuse people. If someone visits your profile and still doesn't understand what you do, who you help, or why they should take you seriously, opportunities get missed. I help fix that.",
    includes: [
      "Personal brand positioning and focus",
      "Clarifying your message and online identity",
      "Profile reviews and improvements (LinkedIn and other platforms)",
      "Content direction that fits your goals and personality",
      "Social media strategy and management, where needed",
    ],
    outcomes: ["A clear, professional presence", "Consistent brand messaging", "Attraction of the right conversations and opportunities"],
    ctaText: "Book a Brand Strategy Session",
    ctaLink: "https://calendly.com/judeiria/business_consultation/judeiria/business_consultation",
  },
];

const Services = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="section-padding bg-secondary pt-24">
        <div className="container-narrow mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Build clarity that moves you forward.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Whether you're starting something new or refining what you've built, I help you focus on what matters and move with intention.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-primary font-semibold text-sm mt-4"
          >
            No noise. No guesswork. Just clear thinking.
          </motion.p>
        </div>
      </section>

      {/* Services */}
      {services.map((service, i) => (
        <ServiceSection key={service.id} {...service} reverse={service.reverse} />
      ))}

      {/* Not Sure CTA */}
      <section className="py-10 px-4 bg-secondary relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container-narrow mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Not Sure What You Need Yet?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm">
              That's completely normal. Most people don't come in knowing what they need—they just know something feels off. We'll figure it out
              together.
            </p>
            <Button variant="hero" size="lg" asChild className="group">
              <a href="https://calendly.com/judeiria/business_consultation" target="_blank" rel="noopener noreferrer">
                Book a Clarity Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
