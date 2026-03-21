import { motion } from "framer-motion";

interface Project {
  emoji: string;
  period: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
}

const projects: Project[] = [
  {
    emoji: "📦",
    period: "2025-Present",
    title: "Costco Vendor Applications",
    company: "Costco Wholesale",
    description: "Developed and enhanced high-impact business applications for vendor management and delivery service messaging.",
    tags: ["ReactJS", "TypeScript", "NestJS", "NodeJS", "Zustand", "Argo CD"],
  },
  {
    emoji: "✉️",
    period: "2020-2025",
    title: "Letter Connect App",
    company: "GuideWell Source",
    description: "Redesigned core modules using Material-UI and Redux, improving maintainability and modularity of the letter generation system.",
    tags: ["ReactJS", "Redux", "Material-UI", "Styled-Components", "TypeScript"],
  },
  {
    emoji: "🛠️",
    period: "Ongoing",
    title: "UI Webkit",
    company: "Personal Project",
    description: "A comprehensive library of reusable UI components and utilities for modern web development.",
    tags: ["React", "Storybook", "Tailwind", "Design System"],
  },
  {
    emoji: "💉",
    period: "2017",
    title: "Jersey Immunization System",
    company: "New Jersey State",
    description: "Developed a single-page application for managing immunization records with high accessibility standards.",
    tags: ["Angular 2", "Bootstrap 3", "SASS", "RxJS", "WCAG"],
  },
];

const spring = { type: "spring" as const, stiffness: 200, damping: 25 };

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <span className="section-label">My Work</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="text-body mt-4 max-w-xl">
            A selection of impactful projects spanning enterprise, fintech, healthcare, and e-commerce.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
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
