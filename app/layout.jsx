import BackgroundGradient from "@/components/ui/BackgroundGradient";
import "./globals.css";

// Local imports
import Navbar from "@/components/ui/Navbar";

// Import Open Sans font
import { Kanit } from "next/font/google";

// Configure our font object
const kanit = Kanit({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  //   subsets: ['latin'],
  //   display: 'swap',
});

// Metadata
export const metadata = {
  title: "zeus",
  description: "The zappiest paper trading app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={kanit.className}>
      <body className={`antialiased`}>

        {/* Page Content */}
        {children}

      </body>
    </html>
  );
}
