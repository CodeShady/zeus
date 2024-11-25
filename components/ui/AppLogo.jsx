"use client";

import { motion } from "framer-motion";

export default function AppLogo() {
  return (
    <motion.div
      initial={{ scale: 1, opacity: 0 }}
      animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 1] }} // Single pulse animation
      transition={{
        duration: 0.4, // Total time for one pulse
        times: [0, 0.5, 1], // Control timing of each keyframe
        ease: "easeInOut",
      }}
      className="flex gap-2"
    >
      <div className="w-8 h-8 rotate-[20deg]">
        <img
          className="w-full h-full object-cover rounded-xl"
          src="/img/logo.png"
        />
      </div>
      <span className="text-accent -mt-[7px] text-4xl font-bold">zeus</span>
    </motion.div>
  );
}
