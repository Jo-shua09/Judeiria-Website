import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import daniel from "../../assets/daniel.jpg";
import donna from "../../assets/donna.jpg";
import sochima from "../../assets/sochima.jpg";
import olumide from "../../assets/olumide.jpg";
import lydie from "../../assets/lydie.jpg";
import krystal from "../../assets/krystal.jpg";

const testimonials = [
  {
    name: "Daniel Araromi",
    role: "Career Transition Coach",
    content:
      "Jude helped me identify a deep problem i was unaware of and gave me solutions that still work to this day. He truly listens and advises with clarity.",
    image: daniel,
  },
  {
    name: "Donna Kargel",
    role: "2x Founder, Community Thrive Nonprofit, Florida, USA",
    content: "Jude listens, understands, and delivers your vision exactly. He made us feel like his only client. Highly recommend.",
    image: donna,
  },
  {
    name: "Sochima Akujuo",
    role: "Founder, Sales Edge Creators, Nigeria",
    content: "Working with Jude was a breakthrough. He's a genius in brand growth, structure, and monetization.",
    image: sochima,
  },
  {
    name: "Olumide Oduwole",
    role: "Video Editor and Trainer",
    content: "His mentorship reawakened a sleeping giant in me. The systems, strategies, and materials were exactly what i needed.",
    image: olumide,
  },
  {
    name: "Lydie Kasey",
    role: "Strategist & Coach",
    content: "He's a rare gem. Dependable, intuitive, deeply skilled and aligned with purpose.",
    image: lydie,
  },
  {
    name: "Krystal Boothe",
    role: "Health Therapist & 3x Founder, Texas, USA",
    content: "It has been an absolute pleasure working with Jude. Their insight, creativity, and professionalism are truly unmatched.",
    image: krystal,
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(window.innerWidth >= 1024 ? 2 : 1);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = testimonials.length - itemsPerView;

  const next = () => setCurrent((c) => (c + 1 > maxIndex ? 0 : c + 1));
  const prev = () => setCurrent((c) => (c - 1 < 0 ? maxIndex : c - 1));

  return (
    <section ref={ref} className="px-6 py-12 bg-background">
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">What people say after working with me</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
          <div className="bg-card rounded-2xl border border-border p-8 md:p-12 relative overflow-hidden">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-accent/20" />

            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {Array.from({ length: itemsPerView }, (_, i) => {
                  const index = (current + i) % testimonials.length;
                  const testimonial = testimonials[index];
                  return (
                    <motion.div
                      key={`${current}-${i}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex flex-col"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <img loading="lazy" src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <p className="font-heading font-semibold text-primary">{testimonial.name}</p>
                          <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-lg md:text-xl text-foreground leading-relaxed italic">"{testimonial.content}"</p>
                    </motion.div>
                  );
                })}
              </div>
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
                  className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-accent" : "bg-border"}`}
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
