import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const SignInPage = () => {
  return (
    <div className="flex flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 items-center justify-center p-6 pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-4 md:p-8"
        >
          <SignIn routing="path" path="/sign-in" forceRedirectUrl="/store" signUpUrl="/sign-up" />
        </motion.div>
      </div>
    </div>
  );
};

export default SignInPage;
