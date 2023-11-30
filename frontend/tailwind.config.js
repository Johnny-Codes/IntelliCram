/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
          colors: {
            "gray-20": "#FFFFFF",
            "gray-50": "#F4F4F4",
            "gray-100": "#CCCCCC",
            "gray-500": "#000000",
            "primary-100": "#B3E0F2",
            "primary-300": "#4FA5D2",
            "primary-500": "#0066CC",
            "secondary-400": "#004080",
            "secondary-500": "#4FA5D2",
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
            // abstractwaves: "url('./assets/AbsractWaves.png')",
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
