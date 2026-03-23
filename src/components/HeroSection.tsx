import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ChevronDown, FileDown, Calendar } from "lucide-react";
import { lazy, Suspense, useState } from "react";
const PopupModal = lazy(() => import("react-calendly").then(m => ({ default: m.PopupModal })));
import { useTranslation } from "react-i18next";
import GridBackground from "./GridBackground";
import { Magnetic } from "./ui/Magnetic";

const stats = [
  { value: "10+", label: "Years Exp" },
  { value: "MS", label: "Info Security" },
  { value: "MS", label: "Computer Science" },
  { value: "Remote", label: "Location" },
];

const spring = { type: "spring" as const, stiffness: 200, damping: 25 };

const HeroSection = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Subtle gradient background and blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      <GridBackground />
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-64 w-64 animate-pulse-glow rounded-full bg-primary/20 blur-[100px]" />

      <div className="container-main relative z-10 w-full pb-12 pt-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.1 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2"
            >
              <span className="h-2 w-2 animate-pulse-glow rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">{t("hero.badge")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.2 }}
              className="text-display"
            >
              {t("hero.greeting")} <span className="block text-primary">Krishna Kondoju</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.35 }}
              className="mt-4 text-xl font-semibold text-primary/80 md:text-2xl"
            >
              {t("hero.role")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.45 }}
              className="text-body mt-4 max-w-lg"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <Magnetic strength={0.4}>
                <button
                  onClick={() => setIsOpen(true)}
                  aria-label={t("hero.buttons.meeting")}
                  className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Calendar size={18} />
                  {t("hero.buttons.meeting")}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                </button>
              </Magnetic>

              <Magnetic strength={0.3}>
                <a
                  href="/resume.pdf"
                  download
                  aria-label={t("hero.buttons.resume")}
                  className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/30 px-7 py-4 text-sm font-bold text-muted-foreground backdrop-blur-md transition-all hover:border-primary/50 hover:text-foreground"
                >
                  <FileDown size={18} />
                  {t("hero.buttons.resume")}
                </a>
              </Magnetic>

              <Magnetic strength={0.2}>
                <a
                  href="#contact"
                  className="group flex items-center gap-2 px-6 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-primary"
                >
                  {t("hero.buttons.contact")}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </Magnetic>
            </motion.div>

            {/* Calendly Popup */}
            <Suspense fallback={null}>
              {isOpen && (
                <PopupModal
                  url="https://calendly.com/krishnakanth"
                  onModalClose={() => setIsOpen(false)}
                  open={isOpen}
                  rootElement={document.getElementById("root")!}
                />
              )}
            </Suspense>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 flex gap-3"
            >
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/krishnakondoju" },
                { icon: Github, href: "https://github.com/krishnaUIDev" },
                { icon: Mail, href: "mailto:hello@example.com" },
              ].map(({ icon: Icon, href }) => (
                <Magnetic key={href} strength={0.4}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={href.includes("linkedin") ? "LinkedIn" : href.includes("github") ? "GitHub" : "Email"}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground"
                  >
                    <Icon size={16} />
                  </a>
                </Magnetic>
              ))}
            </motion.div>
          </div>

          {/* Right - Profile photo area with floating stats */}
          <motion.div
            className="relative flex justify-center"
          >
            {/* 3D Flip Avatar Card */}
            <div className="perspective-1000 group relative h-72 w-72 md:h-80 md:w-80">
              <div className="pointer-events-none absolute inset-[-20px] animate-pulse-glow rounded-full bg-primary/15 blur-3xl" />

              <motion.div
                className="preserve-3d relative h-full w-full cursor-pointer transition-all duration-500"
                whileHover={{ rotateY: 180 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className="backface-hidden absolute inset-0 z-10">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-gradient-to-br from-primary/20 to-primary/5 shadow-2xl backdrop-blur-sm">
                    <img
                      src="/avatar.avif"
                      alt="Krishnakanth Kondoju"
                      width={320}
                      height={320}
                      loading="eager"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="backface-hidden rotate-y-180 absolute inset-0 z-20">
                  <div className="glass-card flex h-full w-full flex-col items-center justify-center rounded-full border-primary/30 p-8 text-center shadow-2xl">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-2xl font-bold text-primary">K</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Krishnakanth</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-primary/80">
                      Tech Lead
                    </p>
                    <div className="my-3 h-px w-12 bg-border" />
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      10+ Years Expert in
                      <br />
                      Scalable Systems &<br />
                      Modern Architectures
                    </p>
                    <div className="mt-4 flex gap-2">
                      <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                      <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
                        Ready to Build
                      </span>
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
                  className={`absolute ${positions[i]} glass-card min-w-[120px] px-4 py-3`}
                >
                  <div className="text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 transition-transform hover:translate-y-1"
      >
        <div className="h-12 w-px bg-gradient-to-b from-border to-transparent" />
        <span className="text-data text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Scroll</span>
        <ChevronDown size={14} className="animate-bounce text-muted-foreground" />
      </motion.a>
    </section>
  );
};

export default HeroSection;
