import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  plugins: [
    // Tailwind CSS v4 handles animations internally
    require("tailwindcss-animate"),
  ],
} satisfies Config;

export default config;