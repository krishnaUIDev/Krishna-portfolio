import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";
import { ThemeProvider } from "./components/ThemeProvider.tsx";

import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.warn("Missing Clerk Publishable Key in .env");
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </ThemeProvider>
);
