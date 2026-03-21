import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ExternalLink, Calendar, Clock, BookOpen, Loader2 } from "lucide-react";

interface BlogPost {
  title: string;
  pubDate: string;
  link: string;
  thumbnail: string;
  description: string;
  categories: string[];
}

const BlogSection = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const RSS_URL = "https://medium.com/feed/netflix-techblog";
  const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.status === "ok") {
          // Limit to 3 latest posts
          setPosts(data.items.slice(0, 3));
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Blog Fetch Error:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Clean description from HTML and limit length
  const cleanDescription = (html: string) => {
    const text = html.replace(/<[^>]*>?/gm, "");
    return text.slice(0, 100) + "...";
  };

  if (error) return null; // Gracefully hide if it fails

  return (
    <section id="blog" className="relative overflow-hidden py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-primary">
              {t("blog.title")}
            </h2>
            <p className="bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              {t("blog.subtitle")}
            </p>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <Loader2 className="animate-spin text-primary" size={32} />
            <p className="animate-pulse text-muted-foreground">{t("blog.loading")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {posts.map((post, i) => (
              <motion.a
                key={post.link}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card profile-card group relative flex h-full flex-col overflow-hidden p-6"
              >
                {/* Background Decor */}
                <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/10" />

                <div className="relative flex-1">
                  <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-primary">
                    <BookOpen size={14} />
                    <span>Post</span>
                  </div>

                  <h3 className="mb-4 line-clamp-2 text-xl font-bold leading-tight transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>

                  <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {cleanDescription(post.description)}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-6">
                  <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-primary/70" />
                      {formatDate(post.pubDate)}
                    </div>
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-muted-foreground transition-colors hover:scale-110 group-hover:text-primary"
                  />
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {!isLoading && posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 text-center"
          >
            <a
              href={RSS_URL.replace("/feed", "")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold transition-all hover:gap-3 hover:bg-secondary/70"
            >
              {t("blog.view_all")}
              <ExternalLink size={14} />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
