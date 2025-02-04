import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx,html}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "inset-2": "inset 0 0 0 2px var(--tw-shadow-color)",
      },
      animation: {
        scaleTo1: "scaleTo1 200ms linear 1",
        shake: "shake 300ms",
      },
      keyframes: {
        scaleTo1: {
          "0%": { transform: "scale(0.5)" },
          "100%": { transform: "scale(1)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%, 75%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#dc00d2",
          "primary-content": "#110010",
          secondary: "#00ca7f",
          "secondary-content": "#000f06",
          accent: "#007cb4",
          "accent-content": "#d3e5f1",
          neutral: "#050f14",
          "neutral-content": "#c5c8ca",
          "base-100": "#edffff",
          "base-200": "#cedede",
          "base-300": "#b0bebe",
          "base-content": "#141616",
          info: "#0067e3",
          "info-content": "#d1e2fd",
          success: "#00e37d",
          "success-content": "#001205",
          warning: "#b53d00",
          "warning-content": "#f4d9d0",
          error: "#d20048",
          "error-content": "#fdd6d8",
        },
        dark: {
          primary: "#7300ff",
          "primary-content": "#ded9ff",
          secondary: "#ff7000",
          "secondary-content": "#160400",
          accent: "#e50000",
          "accent-content": "#ffd8d1",
          neutral: "#01090c",
          "neutral-content": "#c3c7c7",
          "base-100": "#262d2c",
          "base-200": "#202625",
          "base-300": "#191f1e",
          "base-content": "#cfd1d0",
          info: "#00b1e0",
          "info-content": "#000c12",
          success: "#00c653",
          "success-content": "#000e02",
          warning: "#ba6200",
          "warning-content": "#0d0300",
          error: "#ff0060",
          "error-content": "#160003",
        },
      },
    ],
  },
};

export default config;
