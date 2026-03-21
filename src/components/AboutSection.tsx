import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();
  const list = t("about.expertise_list", { returnObjects: true });

  // Safety check to ensure list is an array
  const expertiseList = Array.isArray(list) ? list : [];

  return (
    <section id="about" className="section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <span className="section-label">{t("about.label")}</span>
          <h2 className="section-title">{t("about.title")}</h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-1"
          >
            <p className="text-body mb-2 font-medium italic text-foreground/80">
              "{t("about.quote")}"
            </p>
            <p className="text-body mt-4">
              <Trans i18nKey="about.p1">
                I'm a Full Stack Developer with{" "}
                <strong className="text-foreground">10 years of expertise</strong> in designing and
                building dynamic web applications. My experience spans modern JavaScript frameworks
                like{" "}
                <strong className="text-foreground">ReactJS, NextJS, NestJS, and NodeJS</strong>,
                with a deep understanding of component-driven development and scalable architecture.
              </Trans>
            </p>
            <p className="text-body mt-4">
              <Trans i18nKey="about.p2">
                I specialize in building high-performance systems — from responsive, mobile-friendly
                UIs to secure, microservices-ready backends. I have a strong track record of
                delivering enterprise-level modernization initiatives and leading technical teams
                toward excellence in performance, accessibility, and maintainability.
              </Trans>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 md:col-span-1"
          >
            {expertiseList.map((item, index) => (
              <div key={index} className="glass-box group hover:border-primary/30 hover:bg-card/60">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {item}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
