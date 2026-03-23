import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";
import { useExperiences } from "@/hooks/useExperiences";

const spring = { type: "spring" as const, stiffness: 200, damping: 25 };

const ExperienceSection = () => {
  const { t } = useTranslation();
  const { data: experiences, isLoading, error } = useExperiences();

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

        <div className="relative mt-12">
          {/* Timeline line */}
          <div className="absolute bottom-0 left-0 top-0 w-px bg-border md:left-8" />

          <div className="space-y-0">
            {isLoading ? (
              <div className="space-y-8 py-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative pl-8 md:pl-20">
                    <Skeleton className="absolute left-0 top-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full md:left-8" />
                    <div className="surface-card p-6 md:p-8">
                      <div className="flex justify-between gap-4">
                        <div className="w-1/3 space-y-2">
                          <Skeleton className="h-6 w-full" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="mt-6 h-16 w-full" />
                      <div className="mt-6 flex gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="py-20 text-center text-red-500">
                <p>Failed to load experience data.</p>
              </div>
            ) : experiences?.map((exp, i) => (
              <motion.div
                key={exp.company + i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: i * 0.1 }}
                className="group relative py-8 pl-8 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-10 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background md:left-8" />

                <div className="surface-card p-6 transition-all duration-300 hover:bg-card/60 md:p-8">
                  <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                        {exp.company}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-primary/80">{exp.role}</p>
                    </div>
                    <span className="text-data shrink-0 text-muted-foreground">{exp.period}</span>
                  </div>

                  <p className="text-body max-w-2xl">{exp.description}</p>

                  <ul className="mt-4 space-y-2">
                    {exp.highlights?.map((h, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1 text-primary">●</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {exp.tags?.map((tag) => (
                      <span key={tag} className="tag-tech">
                        {tag}
                      </span>
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
