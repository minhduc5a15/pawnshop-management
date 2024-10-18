/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./public/**/*.html", "./public/**/*.js"],
  theme: {
    extend: {
      screens: {
        xs: "425px", // Breakpoint tùy chỉnh cho min-width 300px
      },
      fontSize: {
        small: "10px",
      },
      colors: {
        customBlue: "#edf2f9",
        customText: "#bbc4cf",
      },
      fontFamily: {
        forte: ["Forte", "sans-serif"],
      },
      boxShadow: {
        custom: "0 0 10px rgba(0, 0, 0, 0.1)", // Bóng tùy chỉnh
      },
      height: {
        85: "340px",
      },
      width: {
        50: "200px",
        121.5: "486px",
      },
      minWidth: {
        162.5: "650px",
        150: "600px",
        135: "540px",
        125: "500px",
        121.5: "486px",
        116.5: "466px",
        75: "300px",
      },
      maxWidth: {
        300: "1200px",
        312.5: "1250px",
        337.5: "1350px",
        162.5: "650px",
        150: "600px",
        121.5: "486px",
      },
      translate: {
        31.6: "31.6px",
        147.2: "147.2px",
        262.8: "262.8px",
        378.4: "378.4px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
