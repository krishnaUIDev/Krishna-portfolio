import { motion } from "framer-motion";

import { Code2, Layout, Database, Terminal, Settings2, ShieldCheck, Globe } from "lucide-react";

const skillGroups = [
  {
    title: "Web Technologies",
    icon: Globe,
    skills: ["ReactJS", "NextJS", "Astro JS", "TypeScript", "JavaScript", "HTML5", "CSS3", "Zustand", "GraphQL", "RESTful APIs"],
  },
  {
    title: "Frameworks & Runtimes",
    icon: Layout,
    skills: ["NodeJS", "NestJS", "Express.js", "AngularJS", "Bootstrap", "Tailwind CSS", "jQuery", "D3JS", "SASS", "LESS"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MongoDB", "MySQL", "PostgreSQL", "SQL Server", "Redis"],
  },
  {
    title: "Tools & DevOps",
    icon: Terminal,
    skills: ["Git", "GitLab", "Argo CD", "Jenkins", "Helm Charts", "OpenShift", "GitHub Actions", "NX Monorepo"],
  },
  {
    title: "Testing & Debugging",
    icon: ShieldCheck,
    skills: ["Jest", "Enzyme", "React Testing Library", "Jasmine", "Karma", "Playwright", "Chrome Inspector"],
  },
  {
    title: "Other",
    icon: Settings2,
    skills: ["WebSphere", "JBoss", "Apache Tomcat", "Splunk", "Jira", "Agile/Scrum"],
  },
];

const spring = { type: "spring" as const, stiffness: 200, damping: 25 };

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <span className="section-label">What I Know</span>
          <h2 className="section-title">Technical Skills</h2>
          <p className="text-body mt-4 max-w-xl">
            A broad toolkit across the full stack, from modern frontend frameworks to cloud infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
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
