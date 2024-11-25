"use client";

import { motion } from 'framer-motion';

export default function FloatingIcon() {
  return (
    <motion.div
      className="flex justify-center items-center" // Center the icon (optional)
      animate={{
        y: ['-10px', '10px', '-10px'], // Move up and down
        scale: [1, 1.1, 1], // Slight scale change to make it look like it's "breathing"
      }}
      transition={{
        duration: 2, // Total duration for one oscillation
        repeat: Infinity, // Infinite loop
        repeatType: 'loop', // Loops the animation
        ease: 'easeInOut', // Smooth easing for a more natural float
      }}
    >
      <img src="/icon/crypto/ETH.png" alt="Floating Icon" className="w-12 h-12" />
    </motion.div>
  );
}
