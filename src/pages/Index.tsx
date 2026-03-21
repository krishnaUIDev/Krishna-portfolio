import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background decorative blobs for glass effect visibility */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '8s' }} />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '12s' }} />
      <div className="fixed top-[40%] left-[20%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '10s' }} />
      <div className="fixed top-[10%] right-[20%] w-[30%] h-[30%] bg-orange-400/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '15s' }} />

      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
