import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import AIChatbot from "@/components/AIChatbot";

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
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />

      {/* AI Assistant */}
      <AIChatbot />
    </div>
  );
};

export default Index;
