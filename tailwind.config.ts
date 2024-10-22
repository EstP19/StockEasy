import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './index.html', './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: 'var(--color-accent)',
        text: 'var(--color-text)',
      },
    },
  },
  plugins: [
    
  ],
};
export default config;
