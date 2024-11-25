"use client";

import { usePathname, useRouter } from "next/navigation";

// Icons
import { MdOutlineNotifications } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";

import { BsThreeDots } from "react-icons/bs";
import { FaCaretLeft } from "react-icons/fa";

import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";
import AppLogo from "./AppLogo";

/**
 * The slickest navbar
 *
 * @param {object} props - Component props
 * @param {Function} props.setView - useState function to change view
 * @param {'notifications'|'dashboard'} props.view - Current view the user is on
 */
export default function Navbar({ view, setView }) {
  const router = useRouter();
  const path = usePathname();

  const isSubPage = path !== "/" && path !== "/dashboard";

  return (
    <div className="flex w-full justify-between p-5">
      <div className="flex items-center justify-center gap-5">
        {/* App Logo */}
        <AppLogo />

        {/* Show "back" button */}
        {false && isSubPage && (
          <Button
            className="h-10 px-4 flex items-center hover:bg-white/5 rounded-xl cursor-pointer transition-all"
            onClick={() => router.back()}
          >
            <FaCaretLeft className="mr-1" />
            <span className="mr-1.5">Back</span>
          </Button>
        )}
      </div>

      <div className="flex gap-4">
        <NavButton
          selected={view === "dashboard"}
          onClick={() => setView("dashboard")}
        >
          <RiDashboardLine className="w-6 h-6" />
        </NavButton>

        <NavButton
          selected={view === "notifications"}
          onClick={() => setView("notifications")}
        >
          <MdOutlineNotifications className="w-6 h-6" />
        </NavButton>
      </div>
    </div>
  );
}

function NavButton({ children, selected, onClick }) {
  return (
    <div className="flex flex-col">
      <Button
        className={`w-10 h-10 p-0 flex justify-center items-center`}
        onClick={onClick}
      >
        {children}
      </Button>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "50%" }}
            exit={{ opacity: 0, width: 0 }}
            className="mx-auto w-1/2 bg-accent rounded-xl h-0.5 mt-2"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
