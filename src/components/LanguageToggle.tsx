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
            className="relative w-12 h-8 glass-box border-none hover:bg-primary/10 transition-colors group overflow-hidden"
        >
            <motion.div
                key={i18n.language}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="font-bold text-xs uppercase tracking-widest text-primary"
            >
                {i18n.language === "en" ? "EN" : "ES"}
            </motion.div>
        </Button>
    );
};
