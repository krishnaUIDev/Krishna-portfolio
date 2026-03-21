import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Layout, Database, Terminal, Settings2, ShieldCheck, Globe } from "lucide-react";

const icons = [Globe, Layout, Database, Terminal, ShieldCheck, Settings2];

// Skills don't need translation as they are technical terms
const skillLists = [
  ["ReactJS", "NextJS", "Astro JS", "TypeScript", "JavaScript", "HTML5", "CSS3", "Zustand", "GraphQL", "RESTful APIs"],
  ["NodeJS", "NestJS", "Express.js", "AngularJS", "Bootstrap", "Tailwind CSS", "jQuery", "D3JS", "SASS", "LESS"],
  ["MongoDB", "MySQL", "PostgreSQL", "SQL Server", "Redis"],
  ["Git", "GitLab", "Argo CD", "Jenkins", "Helm Charts", "OpenShift", "GitHub Actions", "NX Monorepo"],
  ["Jest", "Enzyme", "React Testing Library", "Jasmine", "Karma", "Playwright", "Chrome Inspector"],
  ["WebSphere", "JBoss", "Apache Tomcat", "Splunk", "Jira", "Agile/Scrum"],
];

const spring = { type: "spring" as const, stiffness: 200, damping: 25 };

const SkillsSection = () => {
  const { t } = useTranslation();
  const groups = t("skills.groups", { returnObjects: true });

  // Safety check to ensure groups is an array
  const safeGroups = Array.isArray(groups) ? groups : [];

  const skillGroups = safeGroups.map((group, i) => ({
    ...group,
    icon: icons[i],
    skills: skillLists[i],
  }));

  return (
    <section id="skills" className="section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <span className="section-label">{t("skills.label")}</span>
          <h2 className="section-title">{t("skills.title")}</h2>
          <p className="text-body mt-4 max-w-xl">
            {t("skills.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {skillGroups.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.05 }}
              className="surface-card p-6 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <group.icon size={18} />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="tag-tech hover:border-primary/30 hover:text-foreground"
                  >
                    {skill}
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

export default SkillsSection;
