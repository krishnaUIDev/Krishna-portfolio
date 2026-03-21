# Krishna Kondoju — Senior Tech Lead & Architect

A premium, high-performance personal portfolio built with a focus on modern aesthetic, smooth interactivity, and scalable architecture.

## ✨ Premium Features

- **"Krishna AI" Assistant**: Secure Gemini-powered AI chatbot integration using **Vercel Serverless Functions** for private, context-aware professional assistance.
- **Interactive Contact Form**: Custom serverless backend integrated with **Supabase (Postgres)** for data persistence.
- **Clerk Authentication**: Advanced user identity and session management for protected portfolio areas.
- **PWA Support**: Progressive Web App capabilities for offline access and a native-like experience.
- **Multi-language Support (i18n)**: Fully localized experience with seamless switching between English and Spanish.
- **iOS-Style Glassmorphism**: High-blur, high-saturation "frosted glass" interface for a premium Apple-inspired feel.
- **3D Interactive Avatar**: A unique "flip-card" profile picture that reveals professional credentials on hover.

## 🚀 Tech Stack

- **Core**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Auth**: [Clerk](https://clerk.com/)
- **AI**: [Google Gemini Flash](https://ai.google.dev/)
- **Backend**: [Vercel Serverless Functions](https://vercel.com/docs/functions)
- **Database**: [Supabase/PostgreSQL](https://supabase.com/)
- **i18n**: [i18next](https://www.i18next.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **PWA**: [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)

## 🛠️ Local Development

Follow these steps to get the project running on your local machine:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/krishnaUIDev/Krishna-portfolio.git
   cd Krishna-portfolio
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file based on `.env.example`:

   ```env
   # Rename to .env and add your keys
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   GEMINI_API_KEY=your_key_here
   SUPABASE_URL=https://...supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

4. **Start the dev server**:
   For standard frontend development:
   ```bash
   npm run dev
   ```
   To test serverless functions (AI & Contact Form) locally:
   ```bash
   npm run vercel-dev
   ```

## 📬 Contact

- **LinkedIn**: [krishnakondoju](https://www.linkedin.com/in/krishnakondoju)
- **GitHub**: [krishnaUIDev](https://github.com/krishnaUIDev)
- **Portfolio**: [krishnakondoju.dev](https://krishnakondoju.dev/)

---

_Built with precision and passion for modern web standards._
