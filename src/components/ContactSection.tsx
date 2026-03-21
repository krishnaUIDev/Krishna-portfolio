import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "sonner";

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
  const { t, i18n } = useTranslation();

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
                <a key={link.label} href={link.href} className="group flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary/50 text-muted-foreground transition-all duration-300 group-hover:border-primary/30 group-hover:text-primary">
                    <link.icon size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {link.label}
                    </div>
                    <div className="text-foreground transition-colors group-hover:text-primary">
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
            className="glass-card rounded-2xl p-8"
          >
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  name: formData.get("name"),
                  email: formData.get("email"),
                  message: formData.get("message"),
                };

                const promise = fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                }).then(async (res) => {
                  const contentType = res.headers.get("content-type");
                  if (!contentType || !contentType.includes("application/json")) {
                    if (res.status === 404) {
                      throw new Error(
                        i18n.language === "es"
                          ? "Error 404: El backend no se encontró. Por favor, usa 'npm run vercel-dev' para el desarrollo local."
                          : "Error 404: The backend was not found. Please use 'npm run vercel-dev' for local development."
                      );
                    }
                    throw new Error("Server returned a non-JSON response");
                  }

                  const result = await res.json();
                  if (!res.ok) {
                    throw new Error(result.error || "Failed to send message");
                  }
                  return result;
                });

                toast.promise(promise, {
                  loading: t("contact.form.submitting") || "Sending message...",
                  success: t("contact.form.success") || "Message sent successfully!",
                  error: (err) => err.message || "Failed to send message",
                });

                try {
                  await promise;
                  (e.target as HTMLFormElement).reset();
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("contact.form.name")}
                  </label>
                  <input
                    name="name"
                    type="text"
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
                className="shimmer-button w-full rounded-xl bg-primary py-4 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                {t("contact.form.submit")}
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
