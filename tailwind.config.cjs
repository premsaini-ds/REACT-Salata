/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: "#000000",
      red: "rgb(176 217 92)",
      blue: "rgb(0 134 97)",
      light_black: "#252525",
      footer_bg: "#008661",
      dark_black: "#3f4044",
      facebook: "#45619d",
      light: "#fafafa",
      green: "#348B31",
      dark_blue: "#09093e",
      dark_red: "#348B31",
    },

    fontFamily: {
      raleway: ['"Raleway", Georgia, Arial, sans-serif'],
      bebas_neue: ['"Bebas Neue", Georgia, Arial, sans-serif'],
    },
    extend: {
      backgroundImage: {
        plus: "url('images/plus.svg')",
        minus: "url('images/minus.svg')",
      },
    },
  },
  plugins: [],
};
