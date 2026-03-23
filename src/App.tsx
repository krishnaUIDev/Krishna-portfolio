import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { lazy, Suspense } from "react";
const Index = lazy(() => import("./pages/Index.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Store = lazy(() => import("./pages/Store.tsx"));
const SignInPage = lazy(() => import("./pages/SignInPage.tsx"));
const SignUpPage = lazy(() => import("./pages/SignUpPage.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center bg-background"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div></div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sign-in/*" element={<SignInPage />} />
            <Route path="/sign-up/*" element={<SignUpPage />} />
            <Route
              path="/store"
              element={
                <>
                  <SignedIn>
                    <Store />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/" replace />
                  </SignedOut>
                </>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
