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
          <p className="text-body mt-4 max-w-xl">{t("projects.description")}</p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.08 }}
              className="surface-card group p-6 transition-all duration-300 hover:border-primary/30"
            >
              <div className="mb-4 flex items-center justify-between">
                <span role="img" aria-label="Project icon" className="text-2xl">{project.emoji}</span>
                <span className="text-data text-muted-foreground">{project.period}</span>
              </div>

              <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-primary/70">{project.company}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-tech">
                    {tag}
                  </span>
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
