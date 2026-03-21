import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(nextLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="glass-box group relative h-8 w-12 overflow-hidden border-none transition-colors hover:bg-primary/10"
    >
      <motion.div
        key={i18n.language}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        className="text-xs font-bold uppercase tracking-widest text-primary"
      >
        {i18n.language === "en" ? "EN" : "ES"}
      </motion.div>
    </Button>
  );
};
