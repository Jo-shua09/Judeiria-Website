import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import judeAbout from "@/assets/jude-about.jpg";

const stats = [
  { value: "100+", label: "Brands & businesses supported" },
  { value: "95%", label: "Client satisfaction rate" },
  { value: "$100k+", label: "Revenue scaled for founders" },
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
  return (
    <Layout>
      {/* Hero */}
      <section className="px-6 md:pt-0 pt-8 bg-secondary">
        <div className="mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">Who I Am</h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                I'm <span className="text-primary font-semibold">Jude Iria</span>, a founder, business consultant, career coach, and brand strategist.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At my core, I help people make sense of growth. Over the years, I've worked with founders, professionals, and personal brands who were
                talented, driven, and ambitious—but stuck. Not because they lacked ability, but because they lacked clarity, structure, and direction.
              </p>
              <p className="text-lg text-primary font-medium mt-6">
                My work is about simplifying that journey and helping people build with intention.
              </p>
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
                className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:max-w-none object-cover aspect-square"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How My Work Started */}
      <Section className="px-6 py-12 bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-8">How My Work Started</h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>I didn't start out trying to "do everything."</p>
            <p>I started by solving problems—first for myself, then for others.</p>
            <p>
              As I built businesses, worked across different teams, and supported people at different stages of growth, one pattern kept showing up:
            </p>
            <p className="text-xl text-primary font-heading font-semibold py-4">
              Most people don't struggle because they aren't capable. They struggle because they don't know what to focus on, what to build, or how to
              structure it properly.
            </p>
            <ul className="space-y-2 pl-6">
              <li>• Some had skills but didn't know how to monetize them.</li>
              <li>• Some had businesses but no systems.</li>
              <li>• Some had brands but no clear positioning.</li>
            </ul>
            <p>That gap between potential and progress became the work I do today.</p>
          </div>
        </div>
      </Section>

      {/* What I'm Known For */}
      <Section className="px-6 py-12 bg-secondary">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-8">What I'm Known For</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            I'm known for helping people gain clarity and build structure—whether they're starting from scratch or trying to scale.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Auditing businesses and brands to identify what's missing or broken",
              "Helping people discover their skills and choose the right direction",
              "Turning personal brands into structured, income-generating businesses",
              "Building systems that make growth easier and more predictable",
              "Helping brands show up online with clarity, consistency, and credibility",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                <span className="text-accent mt-1">•</span>
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-lg text-primary font-medium mt-8">
            I don't believe in overcomplicating growth. I believe in clear thinking, simple systems, and intentional execution.
          </p>
        </div>
      </Section>

      {/* The Way I Work */}
      <Section className="px-6 py-12 bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-8">The Way I Work</h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>I don't approach people with assumptions or templates.</p>
            <p>I take time to understand:</p>
            <div className="grid sm:grid-cols-2 gap-4 my-8">
              {["Where you are", "What you've tried", "What's holding you back", "What you actually want to build"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="font-medium text-primary">{item}</span>
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
      <Section className="px-6 py-12 bg-primary text-primary-foreground">
        <div className="container-wide mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">Experience & Perspective</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-8 bg-primary-foreground/5 rounded-xl border border-primary-foreground/10">
                <span className="font-heading text-4xl md:text-5xl font-bold text-accent">{stat.value}</span>
                <p className="text-primary-foreground/80 mt-4">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            This mix of hands-on building and strategic advising gives me a practical lens. I don't just suggest ideas—I help implement what works.
          </p>
        </div>
      </Section>

      {/* What I Believe */}
      <Section className="px-6 py-12 bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-8">What I Believe</h2>
          <div className="space-y-4">
            {beliefs.map((belief, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-secondary rounded-lg">
                <svg className="w-6 h-6 text-accent flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg text-foreground">{belief}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-8 leading-relaxed">These beliefs shape how I work and who I work with.</p>
        </div>
      </Section>

      {/* Who I Work With */}
      <Section className="px-6 py-12 bg-secondary">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-8">Who I Work With</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              "Founders building or scaling businesses",
              "Professionals trying to find direction or grow their careers",
              "Personal brands ready to monetize and stand out",
              "Businesses that need better structure, systems, and visibility",
            ].map((item, i) => (
              <div key={i} className="p-6 bg-card rounded-xl border border-border">
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-8 leading-relaxed text-center">
            Some are just starting. Some are already established.
            <br />
            <span className="text-primary font-semibold">All are ready for clarity.</span>
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="px-6 py-12 bg-background">
        <div className="container-narrow mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-12 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-heading font-semibold text-primary hover:text-accent">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* CTA */}
      <section className="px-6 py-12 bg-primary text-primary-foreground">
        <div className="container-narrow mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            If you're feeling stuck, overwhelmed, or unsure of your next step, you don't need more noise. You need clarity.
          </p>
          <p className="text-primary-foreground/80 mb-10">
            If my work resonates with you, you're welcome to reach out. We'll start with a clarity call and take it from there.
          </p>
          <Button variant="hero" size="xl" asChild className="group">
            <a href="https://calendly.com/judeiria/business_consultation" target="_blank" rel="noopener noreferrer">
              Book a Clarity Session
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
