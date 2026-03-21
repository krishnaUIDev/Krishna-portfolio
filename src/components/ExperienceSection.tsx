import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
}

const spring = { type: "spring" as const, stiffness: 200, damping: 25 };

const ExperienceSection = () => {
  const { t } = useTranslation();
  const jobs = t("experience.jobs", { returnObjects: true });

  // Safety check to ensure jobs is an array
  const experiences = Array.isArray(jobs) ? jobs : [];

  return (
    <section id="experience" className="section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <span className="section-label">{t("experience.label")}</span>
          <h2 className="section-title">{t("experience.title")}</h2>
        </motion.div>

        <div className="mt-12 relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: i * 0.1 }}
                className="relative pl-8 md:pl-20 py-8 group"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-10 w-2.5 h-2.5 rounded-full bg-primary -translate-x-1/2 ring-4 ring-background z-10" />

                <div className="surface-card p-6 md:p-8 hover:bg-card/60 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {exp.company}
                      </h3>
                      <p className="text-sm font-medium text-primary/80 mt-1">{exp.role}</p>
                    </div>
                    <span className="text-data text-muted-foreground shrink-0">{exp.period}</span>
                  </div>

                  <p className="text-body max-w-2xl">{exp.description}</p>

                  <ul className="mt-4 space-y-2">
                    {exp.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">●</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="tag-tech">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
