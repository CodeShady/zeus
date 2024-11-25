"use client";

import AnimatedStars from "@/components/ui/AnimatedStars";
import AppLogo from "@/components/ui/AppLogo";
import { useEffect, useState } from "react";

const MobileOnly = ({ children }) => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkIfMobile = () => {
      if (window.innerWidth <= 768) {
        // Mobile breakpoint
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkIfMobile(); // Check initially

    window.addEventListener("resize", checkIfMobile); // Update on resize

    return () => {
      window.removeEventListener("resize", checkIfMobile); // Cleanup listener
    };
  }, []);

  if (isMobile) {
    return <>{children}</>; // Render the app content for mobile
  }

  return (
    <>
      {/* Background animation */}
      <AnimatedStars />

      <div className="w-full h-[100vh] flex flex-col items-center justify-center">
        {/* App Logo */}
        <div className="bg-[transparent] mb-10 -ml-3 scale-125">
          <AppLogo />
        </div>
        
        <h2 className="font-medium">This web-app is best on mobile!</h2>
        <p className="mt-2">
          Please visit us on your mobile device for the best experience.
        </p>
      </div>
    </>
  );
};

export default MobileOnly;
