import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Founder, TechStart",
    content: "Working with Jude completely transformed my approach to business. His clarity-first method helped me cut through the noise and focus on what truly matters.",
  },
  {
    name: "Michael Chen",
    role: "Career Professional",
    content: "I was stuck in my career, unsure of my next move. Jude helped me discover my strengths and create a clear path forward. Best investment I've made.",
  },
  {
    name: "Amara Williams",
    role: "Personal Brand Creator",
    content: "Jude's strategic approach to branding is exceptional. He helped me position myself authentically and build a presence that attracts the right opportunities.",
  },
  {
    name: "David Okonkwo",
    role: "Entrepreneur",
    content: "The systems Jude helped me build have made my business predictable and scalable. His practical approach cuts through all the fluff.",
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
            What people say after working with me
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-card rounded-2xl border border-border p-8 md:p-12 relative overflow-hidden">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-accent/20" />
            
            <div className="relative z-10">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                  "{testimonials[current].content}"
                </p>
                <div>
                  <p className="font-heading font-semibold text-primary">
                    {testimonials[current].name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonials[current].role}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? "bg-accent" : "bg-border"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
