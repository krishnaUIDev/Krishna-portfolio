import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ShoppingBag, Star, ArrowRight, Zap, Shield, CreditCard } from "lucide-react";
import Navbar from "@/components/Navbar";

const products = [
  {
    id: 1,
    name: "Architectural Review",
    price: "$499",
    description:
      "Deep dive into your system architecture with a full security and scalability audit.",
    icon: Shield,
    tag: "Popular",
  },
  {
    id: 2,
    name: "Tech Strategy Session",
    price: "$199",
    description: "1-hour 1-on-1 session to discuss tech stack, hiring, or product roadmap.",
    icon: Zap,
    tag: "Instant",
  },
  {
    id: 3,
    name: "Custom Workflow Setup",
    price: "$299",
    description: "Professional CI/CD and automation setup tailored to your team's needs.",
    icon: CreditCard,
    tag: "Efficiency",
  },
];

const Store = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container-main pb-24 pt-32">
        <div className="mb-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="mb-4 bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              The Service Store
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Premium technical consulting and architectural services designed to scale your
              business.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card group relative flex h-full flex-col overflow-hidden p-8"
            >
              {/* Badge */}
              <div className="absolute right-4 top-4 rounded-full border border-primary/20 bg-primary/20 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                {product.tag}
              </div>

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                <product.icon className="text-primary" size={24} />
              </div>

              <h3 className="mb-2 text-2xl font-bold">{product.name}</h3>
              <p className="mb-4 font-mono text-xl font-bold text-primary">{product.price}</p>

              <p className="mb-8 flex-1 leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:brightness-110 group-hover:gap-4">
                Purchase Service
                <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-4">
          {[
            {
              icon: ShoppingBag,
              title: "Instant Access",
              desc: "Get started immediately after purchase.",
            },
            {
              icon: Star,
              title: "Expert Quality",
              desc: "Services delivered personally by Krishna.",
            },
            { icon: Shield, title: "Secure Payment", desc: "Encrypted and safe transaction flow." },
            { icon: Zap, title: "Fast Delivery", desc: "Guaranteed turnaround times." },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-2xl border border-border/50 bg-secondary/30 p-6 text-center"
            >
              <item.icon className="mb-3 text-primary/70" size={24} />
              <h4 className="mb-1 text-sm font-bold">{item.title}</h4>
              <p className="text-[12px] text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Store;
