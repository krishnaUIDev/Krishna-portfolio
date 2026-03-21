import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const navItems = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.blog"), href: "#blog" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-background/80 shadow-lg backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute left-0 right-0 top-0 z-50 h-[2px] origin-left bg-primary"
          style={{ scaleX }}
        />

        <div className="container-main flex h-16 items-center justify-between">
          <a href="#" className="text-lg font-bold tracking-tight text-foreground">
            <span className="text-primary">K</span>K
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mx-2 h-4 w-[1px] bg-border" />
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle />
            <ThemeToggle />
            <button
              className="ml-2 rounded-lg p-2 text-foreground transition-colors hover:bg-secondary"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-background/98 fixed inset-0 z-40 px-6 pt-20 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-semibold text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side dot navigation */}
      <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {navItems.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            title={item.label}
            className="h-2.5 w-2.5 rounded-full border border-border bg-secondary transition-all duration-200 hover:border-primary hover:bg-primary"
          />
        ))}
      </div>
    </>
  );
};

export default Navbar;
