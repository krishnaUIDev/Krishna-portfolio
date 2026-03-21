import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Project {
  emoji: string;
  period: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
}

const spring = { type: "spring" as const, stiffness: 200, damping: 25 };

const ProjectsSection = () => {
  const { t } = useTranslation();
  const list = t("projects.list", { returnObjects: true });

  // Safety check to ensure list is an array
  const projects = Array.isArray(list) ? list : [];

  return (
    <section id="projects" className="section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <span className="section-label">{t("projects.label")}</span>
          <h2 className="section-title">{t("projects.title")}</h2>
          <p className="text-body mt-4 max-w-xl">
            {t("projects.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.08 }}
              className="surface-card p-6 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{project.emoji}</span>
                <span className="text-data text-muted-foreground">{project.period}</span>
              </div>

              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-primary/70 mt-1">{project.company}</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{project.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-tech">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
