import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 items-center justify-center p-6 pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-4 md:p-8"
        >
          <SignUp routing="path" path="/sign-up" afterSignUpUrl="/store" signInUrl="/sign-in" />
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;
