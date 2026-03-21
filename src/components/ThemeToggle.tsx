import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group rounded-xl border border-border bg-card p-2 transition-all duration-300 hover:border-primary/30"
      aria-label="Toggle theme"
    >
      <div className="relative h-5 w-5 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0, rotate: 45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center text-primary"
            >
              <Moon size={18} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ y: 20, opacity: 0, rotate: 45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center text-primary"
            >
              <Sun size={18} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}
