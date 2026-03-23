import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useTranslation } from "react-i18next";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const getHref = (href: string) => {
    if (href.startsWith("#")) {
      return isHomePage ? href : `/${href}`;
    }
    return href;
  };

  const navItems = [
    { label: t("nav.about"), href: getHref("#about") },
    { label: t("nav.experience"), href: getHref("#experience") },
    { label: t("nav.skills"), href: getHref("#skills") },
    { label: t("nav.projects"), href: getHref("#projects") },
    { label: t("nav.blog"), href: getHref("#blog") },
    { label: t("nav.store"), href: "/store" },
    { label: t("nav.contact"), href: getHref("#contact") },
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
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled
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
          <a href="#" aria-label="Home" className="text-lg font-bold tracking-tight text-foreground">
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
              <div className="mx-1 h-4 w-[1px] bg-border" />
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle />
            <ThemeToggle />
            <button
              className="ml-2 rounded-lg p-2 text-foreground transition-colors hover:bg-secondary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
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

              <div className="mt-4 flex items-center gap-4 border-t border-border pt-6">
                <SignedIn>
                  <div className="flex items-center gap-4">
                    <UserButton afterSignOutUrl="/" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {t("nav.profile")}
                    </span>
                  </div>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="w-full rounded-xl bg-primary py-4 text-lg font-bold text-white">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
              </div>
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
            aria-label={`Go to ${item.label}`}
            className="h-2.5 w-2.5 rounded-full border border-border bg-secondary transition-all duration-200 hover:border-primary hover:bg-primary"
          />
        ))}
      </div>
    </>
  );
};

export default Navbar;
