import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const BlogSection = lazy(() => import("@/components/BlogSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const AIChatbot = lazy(() => import("@/components/AIChatbot"));

const SectionLoader = () => (
  <div className="flex w-full items-center justify-center py-20 opacity-50">
    <div className="h-6 w-6 animate-pulse rounded-full bg-primary/20" />
  </div>
);

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background decorative blobs for glass effect visibility */}
      <div
        className="pointer-events-none fixed left-[-10%] top-[-10%] h-[50%] w-[50%] animate-pulse-glow rounded-full bg-primary/20 blur-[120px]"
        style={{ animationDuration: "8s" }}
      />
      <div
        className="pointer-events-none fixed bottom-[-10%] right-[-10%] h-[50%] w-[50%] animate-pulse-glow rounded-full bg-blue-500/20 blur-[120px]"
        style={{ animationDuration: "12s" }}
      />
      <div
        className="pointer-events-none fixed left-[20%] top-[40%] h-[40%] w-[40%] animate-pulse-glow rounded-full bg-purple-600/10 blur-[100px]"
        style={{ animationDuration: "10s" }}
      />
      <div
        className="pointer-events-none fixed right-[20%] top-[10%] h-[30%] w-[30%] animate-pulse-glow rounded-full bg-orange-400/10 blur-[100px]"
        style={{ animationDuration: "15s" }}
      />

      <Navbar />
      <HeroSection />
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ExperienceSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <SkillsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <BlogSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>

      {/* AI Assistant */}
      <Suspense fallback={null}>
        <AIChatbot />
      </Suspense>
    </div>
  );
};

export default Index;
