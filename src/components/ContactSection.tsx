import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { useTranslation } from "react-i18next";

const spring = { type: "spring" as const, stiffness: 200, damping: 25 };

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "krishnakondoju",
    href: "https://www.linkedin.com/in/krishnakondoju",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "krishnaUIDev",
    href: "https://github.com/krishnaUIDev",
  },
];

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <span className="section-label">{t("contact.label")}</span>
          <h2 className="section-title">{t("contact.title")}</h2>
          <p className="text-body mt-4 max-w-xl">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Left - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="space-y-8"
          >
            <div className="space-y-6">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl border border-border bg-secondary/50 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-all duration-300">
                    <link.icon size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      {link.label}
                    </div>
                    <div className="text-foreground group-hover:text-primary transition-colors">
                      {link.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right - Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="glass-card p-8 rounded-2xl"
          >
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("contact.form.name")}</label>
                  <input
                    type="text"
                    placeholder={t("contact.form.placeholder.name")}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("contact.form.email")}</label>
                  <input
                    type="email"
                    placeholder={t("contact.form.placeholder.email")}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("contact.form.message")}</label>
                <textarea
                  placeholder={t("contact.form.placeholder.message")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:brightness-110 transition-all shimmer-button"
              >
                {t("contact.form.submit")}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Krishnakanth Kondoju. Built with React, TypeScript & NX
          </span>
          <span className="text-sm text-muted-foreground">
            {t("contact.footer")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
