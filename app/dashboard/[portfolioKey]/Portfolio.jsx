"use client";

import { useState } from "react";

// Views
import Dashboard from "./Dashboard";
import Notifications from "./Notifications";
import Navbar from "@/components/ui/Navbar";

export default function Portfolio() {
  const [view, setView] = useState("dashboard");

  return (
    <>
      {/* Navbar */}
      <Navbar view={view} setView={setView} />

      <div className="p-5">
        {/* Dashboard */}
        {view === "dashboard" && <Dashboard setView={setView} />}

        {/* Notifications */}
        {view === "notifications" && <Notifications setView={setView} />}
      </div>
    </>
  );
}
