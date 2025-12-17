import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: "jude@judeiria.com",
    link: "mailto:jude@judeiria.com",
  },
  {
    icon: Phone,
    title: "Phone",
    details: "+1 (555) 123-4567",
    link: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Location",
    details: "San Francisco, CA",
    link: "#",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Mon-Fri: 9AM-6PM PST",
    link: "#",
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

const Contact = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="px-6 pt-20 pb-12 bg-secondary">
        <div className="container-narrow mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">Get In Touch</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Ready to gain clarity and build with intention? Let's start a conversation about your goals and how I can help you move forward.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <Section className="px-6 py-12 bg-background">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl text-primary">Send a Message</CardTitle>
                  <p className="text-muted-foreground">Fill out the form below and I'll get back to you within 24 hours.</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can I help you?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell me about your goals, challenges, or what you're looking to achieve..." rows={6} />
                  </div>
                  <Button className="w-full group" size="lg">
                    Send Message
                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-6">Contact Information</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">Prefer to reach out directly? Here are the best ways to connect with me.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((info, i) => (
                  <Card key={i} className="border-border hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <info.icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary mb-1">{info.title}</h3>
                          <a href={info.link} className="text-muted-foreground hover:text-accent transition-colors">
                            {info.details}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="font-heading text-xl font-semibold text-primary mb-4">Quick Response Guarantee</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I respond to all inquiries within 24 hours during business days. For urgent matters, feel free to call directly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <Section className="px-6 py-12 bg-secondary">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">Find Me</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Based in San Francisco, I work with clients globally. Virtual consultations are available worldwide.
            </p>
          </div>
          <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Interactive map would be embedded here</p>
              <p className="text-sm text-muted-foreground mt-2">San Francisco, CA</p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="px-6 py-12 bg-primary text-primary-foreground">
        <div className="container-narrow mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            The first step toward clarity is often the hardest. Let's make it simple—book a free clarity session and see how we can work together.
          </p>
          <Button variant="hero" size="xl" asChild className="group">
            <a href="https://calendly.com/judeiria/business_consultation" target="_blank" rel="noopener noreferrer">
              Book a Clarity Session
              <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
