const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "framer-gradient": "url('/img/gradient.png')"
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // accent: "#e0fb73",
        // accent: "#73fbad",
        accent: "#ffb400",
        dark: "#292929",
        loss: "#fb7373",
        gain: "#73fbad",
        // loading: "#ff0000",
        loading: "#202020",
      },
    },
  },
  plugins: [],
};
export default config;
