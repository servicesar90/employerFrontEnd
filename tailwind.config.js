import plugin from "tailwindcss/plugin";
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.2)" },
          "28%": { transform: "scale(1.4)" },
          "42%": { transform: "scale(1)" },
          "70%": { transform: "scale(1.2)" },
          "84%": { transform: "scale(1.4)" },
        },
      },
      animation: {
        slideUp: "slideUp 0.3s ease-out forwards",
        heartbeat: "heartbeat 1.5s infinite",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      fontSize: {
        12: "12px",
        14: "14px",
        16: "16px",
      },
      colors: {
        primary: "#003B70",
        secondary: "#0784C9",
        black: "#000000",
        light: "#dff3f9",
        gray: {
          650: "#6A6A6A",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".btn-3d": {
          padding: "0.75rem 1.5rem",
          backgroundImage: "linear-gradient(90deg, #0784C9, blue)", 
          color: "#fff",
          fontWeight: "700",
          borderRadius: "0.375rem",
          boxShadow: "4px 6px 0 0 #8C9BA24D",
          transition: "all 0.1s ease-in-out",
        },
        ".btn-3d:active": {
          boxShadow: "0 2px 0 0 #8C9BA24D",
          transform: "translateY(4px)",
        },
        ".btn-slanted": {
          padding: "0.5rem 1.5rem",
          backgroundImage: "linear-gradient(90deg, #0784C9,blue)",
          color: "#fff",
          fontWeight: "700",
          borderRadius: "0.5rem",
          clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
          boxShadow: "20px 20px 20px rgba(0,0,255,1)",
          transition: "all 0.1s ease-in-out",
        },
        ".chip-3d": {
          display: "inline-block",
          padding: "0.25rem 1rem",
          fontSize: "0.875rem",
          fontWeight: "500",
          color: "#fff",
          backgroundColor: "#2563EB",
          borderRadius: "9999px",
          boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.4)",
          transition: "all 0.15s ease-in-out",
        },
        ".chip-3d:hover": {
          boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        },
        ".chip-3d:active": {
          transform: "translateY(1px)",
        },
      });
    }),
  ],
};
