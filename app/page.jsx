import { motion } from "framer-motion";
import Link from "next/link";

import AppLogo from "@/components/ui/AppLogo";
import Button from "@/components/ui/Button";
import AnimatedStars from "@/components/ui/AnimatedStars";

import { IoNavigate } from "react-icons/io5";

export default function Home() {
  return (
    <>
      {/* Background animation */}
      <AnimatedStars />

      <div className="w-full h-[100vh] flex flex-col items-center justify-center">
        {/* App Logo */}
        <div className="bg-[transparent] mb-10 -ml-3 scale-125">
          <AppLogo />
        </div>

        <Link href="/dashboard/2d4cd4133d56127480f71e97740552da">
          <Button className="flex items-center gap-2">
            <span>Demo Portfolio</span>
            <IoNavigate color="#ffb400" />
          </Button>
        </Link>
      </div>
    </>
  );
}
