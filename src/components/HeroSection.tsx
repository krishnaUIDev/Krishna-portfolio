import { motion, useMotionValue, useSpring as useFramerSpring } from "framer-motion";
import { Mail, Linkedin, Github, ChevronDown, FileDown } from "lucide-react";

const stats = [
  { value: "10+", label: "Years Exp" },
  { value: "MS", label: "Info Security" },
  { value: "MS", label: "Computer Science" },
  { value: "Remote", label: "Location" },
];

const spring = { type: "spring" as const, stiffness: 200, damping: 25 };

const HeroSection = () => {
  // Magnetic button logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const dx = useFramerSpring(mouseX, springConfig);
  const dy = useFramerSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x * 0.3);
    mouseY.set(y * 0.3);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Subtle gradient background and blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" />

      <div className="container-main w-full relative z-10 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-glow" />
              <span className="text-sm text-muted-foreground">Available for new opportunities</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.2 }}
              className="text-display"
            >
              Hey, I'm{" "}
              <span className="text-primary block">Krishna Kondoju</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.35 }}
              className="text-xl md:text-2xl font-semibold text-primary/80 mt-4"
            >
              Full Stack Developer | Tech Lead
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.45 }}
              className="text-body mt-4 max-w-lg"
            >
              10+ years building high-performance web applications with React, Node.js,
              TypeScript, and NX — focused on clean architecture, great UX, and scalable systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.55 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ x: dx, y: dy }}
              >
                <a
                  href="#contact"
                  className="px-7 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:brightness-110 shadow-lg shadow-primary/25 transition-all flex items-center gap-2 group"
                >
                  Contact Me
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </motion.div>

              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ x: dx, y: dy }}
              >
                <a
                  href="/resume.pdf"
                  download
                  className="px-7 py-4 border border-border/50 bg-card/30 backdrop-blur-md rounded-xl font-bold text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all flex items-center gap-2"
                >
                  <FileDown size={18} />
                  Download Resume
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 flex gap-3"
            >
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/krishnakondoju" },
                { icon: Github, href: "https://github.com/krishnaUIDev" },
                { icon: Mail, href: "mailto:hello@example.com" }, // No email in resume, keeping placeholder
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right - Profile photo area with floating stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...spring, delay: 0.3 }}
            className="relative flex justify-center"
          >
            {/* 3D Flip Avatar Card */}
            <div className="relative group w-72 h-72 md:w-80 md:h-80 perspective-1000">
              {/* Outer pulsing glow stays behind the flip */}
              <div className="absolute inset-[-20px] rounded-full bg-primary/15 blur-3xl animate-pulse-glow pointer-events-none" />

              <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-500 cursor-pointer"
                whileHover={{ rotateY: 180 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden z-10">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-sm">
                    <img
                      src="/avatar.png"
                      alt="Krishnakanth Kondoju"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 z-20">
                  <div className="w-full h-full rounded-full glass-card flex flex-col items-center justify-center p-8 text-center border-primary/30 shadow-2xl">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-primary">K</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Krishnakanth</h3>
                    <p className="text-xs font-semibold text-primary/80 uppercase tracking-widest mt-1">Tech Lead</p>
                    <div className="h-px w-12 bg-border my-3" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      10+ Years Expert in<br />
                      Scalable Systems &<br />
                      Modern Architectures
                    </p>
                    <div className="mt-4 flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Ready to Build</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating stat cards */}
            {stats.map((stat, i) => {
              const positions = [
                "top-0 right-0 lg:-right-4",
                "top-1/4 -right-8 lg:-right-12",
                "bottom-1/4 -right-4 lg:-right-8",
                "bottom-0 right-4 lg:right-0",
              ];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...spring, delay: 0.5 + i * 0.1 }}
                  className={`absolute ${positions[i]} glass-card px-4 py-3 min-w-[120px]`}
                >
                  <div className="font-bold text-lg text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-border to-transparent" />
        <span className="text-data text-muted-foreground">Scroll</span>
        <ChevronDown size={14} className="text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
