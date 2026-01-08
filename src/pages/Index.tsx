import * as HelmetPkg from "react-helmet-async";
const { Helmet } = HelmetPkg;

import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhySection } from "@/components/home/WhySection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Jude Iria – Business Consultant, Career Coach & Brand Strategist</title>
        <meta
          name="description"
          content="Jude Iria is a business consultant, career coach, and brand strategist helping individuals and founders gain clarity, build skills, and create sustainable income."
        />
      </Helmet>

      <Layout>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhySection />
        <StatsSection />
        <TestimonialsSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
