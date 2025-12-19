import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Check } from "lucide-react";
import judeAbout from "@/assets/jude-cropped.jpg";

const stats = [
  { value: 100, suffix: "+", label: "Brands & businesses supported" },
  { value: 95, suffix: "%", label: "Client satisfaction rate" },
  { value: 100, prefix: "$", suffix: "k+", label: "Revenue scaled for founders" },
];

const beliefs = [
  "Growth shouldn't feel chaotic",
  "Clarity is more powerful than hustle",
  "Structure creates freedom",
  "Skills are valuable when they're positioned correctly",
  "Brands grow faster when they're built intentionally",
];

const faqs = [
  {
    question: "Do you work with people who are just starting out?",
    answer:
      "Yes. I work with people who are early in their journey and need clarity just as much as those who already have businesses or brands. The starting point is always understanding where you are and what makes the most sense for you.",
  },
  {
    question: "Is your work more about strategy or execution?",
    answer:
      "Both. I help with clarity and strategy first, then support execution where needed, either directly or by helping structure the systems, branding, or direction required to move forward.",
  },
  {
    question: "How do I know if you're the right fit for me?",
    answer:
      "If you feel stuck, overwhelmed, or unsure of your next step, and you want clarity instead of noise, we're likely a good fit. The best way to know is to start with a conversation.",
  },
  {
    question: "What kind of results can I expect?",
    answer:
      "Results vary depending on your situation, but most people leave with clearer direction, better structure, and confidence in their next steps. Many also see improved brand presence, growth, or monetization over time.",
  },
  {
    question: "How do we get started?",
    answer: "It starts with a message or a clarity session. Once I understand your goals and challenges, I'll recommend the best next step.",
  },
  {
    question: "What if I'm not sure what I need yet?",
    answer: "That's completely fine. Not knowing what you need is often the reason people reach out. My job is to help you figure that out.",
  },
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
    <span className="font-heading text-4xl md:text-5xl font-bold text-accent">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const About = () => {
  const experienceRef = useRef(null);
  const experienceIsInView = useInView(experienceRef, { once: true, margin: "-100px" });

  return (
    <Layout>
      {/* Hero */}
      <section className="md:px-10 px-4 bg-background">
        <div className="mx-auto">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Who I Am</h1>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                I'm <span className="text-foreground font-semibold">Jude Iria</span>, a founder, business consultant, career coach, and brand
                strategist.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At my core, I help people make sense of growth. Over the years, I've worked with founders, professionals, and personal brands who were
                talented, driven, and ambitious—but stuck.
              </p>
              <p className="text-primary font-medium">My work is about simplifying that journey and helping people build with intention.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="order-2 lg:order-1 relative md:px-12 my-12 md:pb-0 pb-6 lg:flex-1 px-3"
            >
              <div className="absolute -inset-4 mx-6 md:m-6 bg-accent/20 rounded-2xl transform rotate-2" />

              <img
                loading="lazy"
                src={judeAbout}
                alt="Jude Iria"
                className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:max-w-none object-cover aspect-[1/1]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How My Work Started */}
      <Section className=" py-10 bg-secondary">
        <div className="container-narrow mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">How My Work Started</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>I didn't start out trying to "do everything." I started by solving problems—first for myself, then for others.</p>
            <p className="text-lg text-foreground font-semibold py-2">
              Most people struggle not because they aren't capable, but because they don't know what to focus on.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span> Some had skills but didn't know how to monetize them.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span> Some had businesses but no systems.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span> Some had brands but no clear positioning.
              </li>
            </ul>
            <p>That gap between potential and progress became the work I do today.</p>
          </div>
        </div>
      </Section>

      {/* What I'm Known For */}
      <Section className="py-10 bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">What I'm Known For</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Auditing businesses to identify what's missing",
              "Helping people discover skills and direction",
              "Turning personal brands into businesses",
              "Building systems for predictable growth",
              "Helping brands show up with clarity",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-primary font-medium mt-6 text-sm">Clear thinking, simple systems, intentional execution.</p>
        </div>
      </Section>

      {/* The Way I Work */}
      <Section className="px-4 py-12 bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold  text-white mb-8">The Way I Work</h2>
          <div className="space-y-6  text-white leading-relaxed">
            <p>I don't approach people with assumptions or templates.</p>
            <p>I take time to understand:</p>
            <div className="grid sm:grid-cols-2 gap-4 my-8">
              {["Where you are", "What you've tried", "What's holding you back", "What you actually want to build"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="font-medium  text-white">{item}</span>
                </div>
              ))}
            </div>
            <p>From there, I help you focus on what matters, remove distractions, and build what will move you forward.</p>
            <p className="text-xl text-accent font-heading font-semibold">
              Whether I'm consulting, coaching, or leading strategy, the goal is the same: clarity first, then growth.
            </p>
          </div>
        </div>
      </Section>

      {/* Experience & Perspective */}
      <motion.section
        ref={experienceRef}
        initial={{ opacity: 0, y: 30 }}
        animate={experienceIsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="px-4 py-10 bg-secondary"
      >
        <div className="container-wide mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">Experience & Perspective</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={experienceIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="text-center p-4 bg-background rounded-xl border border-primary-foreground/10"
              >
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} isInView={experienceIsInView} />
                <p className="text-white mt-4">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center  text-white-foreground/80 max-w-3xl mx-auto leading-relaxed">
            This mix of hands-on building and strategic advising gives me a practical lens. I don't just suggest ideas I help implement what works.
          </p>
        </div>
      </motion.section>

      {/* What I Believe */}
      <Section className="py-10 bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">What I Believe</h2>
          <div className="space-y-3">
            {beliefs.map((belief, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{belief}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Who I Work With */}
      <Section className="px-4 py-10 bg-secondary">
        <div className="container-narrow mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Who I Work With</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Founders building or scaling businesses",
              "Professionals trying to find direction or grow their careers",
              "Personal brands ready to monetize and stand out",
              "Businesses that need better structure, systems, and visibility",
            ].map((item, i) => (
              <div key={i} className="p-4 bg-card rounded-xl border border-border">
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
          <p className=" text-white mt-8 leading-relaxed text-center">
            Some are just starting. Some are already established.
            <br />
            <span className=" text-white font-semibold">All are ready for clarity.</span>
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="py-10 bg-secondary">
        <div className="container-narrow mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-lg px-4">
                <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:text-primary">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-10 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container-narrow mx-auto text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Let's Work Together</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm">
            If you're feeling stuck, overwhelmed, or unsure of your next step, you don't need more noise. You need clarity.
          </p>
          <Button variant="hero" size="lg" asChild className="group">
            <a href="https://calendly.com/judeiria/business_consultation" target="_blank" rel="noopener noreferrer">
              Book a Clarity Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
