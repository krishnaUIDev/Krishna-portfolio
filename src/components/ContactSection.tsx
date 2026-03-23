import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Magnetic } from "./ui/Magnetic";
import { useContact } from "@/hooks/useContact";

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
  const { sendMessage, isSubmitting } = useContact();

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
          <p className="text-body mt-4 max-w-xl">{t("contact.description")}</p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
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
                <Magnetic key={link.label} strength={0.3}>
                  <a href={link.href} className="group flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary/50 text-muted-foreground transition-all duration-300 group-hover:border-primary/30 group-hover:text-primary">
                      <link.icon size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{link.label}</div>
                      <div className="text-xs text-muted-foreground">{link.value}</div>
                    </div>
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          {/* Right - Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="surface-card p-6 md:p-8"
          >
            <form
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  name: formData.get("name") as string,
                  email: formData.get("email") as string,
                  message: formData.get("message") as string,
                };

                const result = await sendMessage(data);
                if (result.success) {
                  (e.target as HTMLFormElement).reset();
                }
              }}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("contact.form.name")}
                  </label>
                  <input
                    name="name"
                    required
                    placeholder={t("contact.form.placeholder.name")}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("contact.form.email")}
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={t("contact.form.placeholder.email")}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("contact.form.message")}
                </label>
                <textarea
                  name="message"
                  required
                  placeholder={t("contact.form.placeholder.message")}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="shimmer-button w-full rounded-xl bg-primary py-4 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50"
              >
                {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Krishnakanth Kondoju. Built with React, TypeScript & NX
          </span>
          <span className="text-sm text-muted-foreground">{t("contact.footer")}</span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
