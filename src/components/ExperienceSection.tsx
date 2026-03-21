import { motion } from "framer-motion";

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
}

const experiences: Experience[] = [
  {
    company: "Costco Wholesale - Seattle, WA",
    role: "Full Stack Developer (Cognizant)",
    period: "May 2025 – Till Now",
    description:
      "Contributing to one of Costco’s largest enterprise modernization initiatives—a ground-up rebuild of legacy systems to improve scalability and operational efficiency.",
    highlights: [
      "Designed and developed scalable backend services using Node.js and NestJS",
      "Implemented secure authentication and authorization using JWT and RBAC",
      "Built a NestJS-based Backend for Frontend (BFF) layer toaggregate and transform API responses",
      "Leveraged GitHub Copilot to accelerate development and improve code quality",
    ],
    tags: ["ReactJS", "TypeScript", "NestJS", "NodeJS", "Zustand", "Argo CD"],
  },
  {
    company: "GuideWell Source – Jacksonville, FL",
    role: "Full Stack Developer",
    period: "Nov 2020 – May 2025",
    description:
      "Redesigned core modules of the 'Letter Connect App' and built internal libraries of reusable React components published to Artifactory.",
    highlights: [
      "Built robust React components and implemented scalable state management using Redux and Hooks",
      "Migrated to npm workspaces for simplified dependency management in Node.js v22",
      "Reduced application load times by 30% using React.lazy and code-splitting",
      "Decoupled deployment pipelines for micro-apps, reducing coordination effort by 40%",
    ],
    tags: ["ReactJS", "Redux", "Node.js", "Express.js", "Material UI", "Tailwind"],
  },
  {
    company: "Blue Cross and Blue Shield of Florida",
    role: "Web Application Developer",
    period: "Jan 2018- Nov 2020",
    description:
      "Developed dynamic, responsive web pages and reusable UI components using ReactJS and Material UI.",
    highlights: [
      "Migrated legacy JavaScript codebases to TypeScript for better maintainability",
      "Built scalable RESTful services using Node.js, Express.js, and MongoDB",
      "Reduced code duplication by 25% through modular and reusable React components",
      "Optimized backend performance through caching strategies and efficient database queries",
    ],
    tags: ["ReactJS", "TypeScript", "Node.js", "MongoDB", "Material UI", "SASS"],
  },
  {
    company: "New Jersey Immunization System",
    role: "UI Developer",
    period: "Jan 2017 - Dec 2017",
    description:
      "Designed use cases and developed technical requirement documents for immunization web applications.",
    highlights: [
      "Developed SPA using Angular 2, Bootstrap 3, and SASS with mobile-first design",
      "Implemented Angular Router for seamless navigation across application tasks",
      "Ensured accessibility standards compliance for screen readers (WCAG)",
      "Used Local Storage and IndexedDB for client-side data persistence",
    ],
    tags: ["Angular 2", "TypeScript", "Bootstrap 3", "SASS", "RxJS", "IndexedDB"],
  },
];

const spring = { type: "spring" as const, stiffness: 200, damping: 25 };

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <span className="section-label">Work History</span>
          <h2 className="section-title">Professional Experience</h2>
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
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
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
