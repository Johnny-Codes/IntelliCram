/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
          colors: {
            "gray-20": "#FFF",
            "gray-50": "#EFE6E6",
            "gray-100": "#DFCCCC",
            "gray-500": "#000",
            "primary-100": "#91E5F6",
            "primary-300": "#84D2F6",
            "primary-500": "#59A5D8",
            "secondary-400": "#133C55",
            "secondary-500": "#84D2F6",
          },
          backgroundImage: (theme) => ({
            "gradient-yellowred": "linear-gradient(90deg, #91E5F6 0%, #133C55 100%)",
            "mobile-home": "url('./assets/HomePageGraphic.png')"
          }),
          fontFamily: {
            dmsans: ["DM Sans", "sans-serif"],
            montserrat: ["Monterrat", "sans-serif"]
          },
          content: {
            intellicrambackground: "url('./assets/intellicrambackground.png')",
            abstractwaves: "url('./assets/AbsractWaves.png')",
            sparkles: "url('./assets/Sparkles.png')",
            circles: "url('./assets/Circles.png')",
          }
        },
        screens: {
          xs: "480px",
          sm: "760px",
          md: "1060px",
        },
    },
    plugins: [],
};
