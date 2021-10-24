module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        hop: "bounce 1s ease-in-out infinite",
        blinking: "blink 2s ease-in-out infinite",
        bigSmall: "bigSmall 5s ease-in-out infinite",
        fadeIn: "fadeIn 3s",
        fadeOut: "fadeOut 3s ease-in-out",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(3px)" },
        },
        blink: {
          "0%": {
            opacity: "0",
            transform: "scale(1)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1.2)",
          },
        },
        bigSmall: {
          "0%, 100%": {
            transform: "translate(-10px, 10px)",
          },
          "25%": { transform: "translate(10px, 10px)" },
          "50%": { transform: "translate(10px, -10px)" },
          "75%": { transform: "translate(-10px, -10px)" },
        },

        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      colors: {
        jazzberry: "#aa1155",
        pansy: "880044",
        raspberry: "#dd1155",
        crayola: "#ff3388",
        caribbean: "#00cc99",
      },
      gridTemplateColumns: {
        balance: "1fr min-content 1fr min-content 1fr min-content 1fr",
      },
      gridTemplateRows: {
        addTransaction: "1fr auto",
      },
      inset: {
        deletePortfolio: "-0.3rem",
        "3/10": "30%",
      },
    },
    container: {
      center: true,
    },
    minWidth: {
      "screen-sm": "640px",
    },
  },
  variants: {
    extend: {
      animation: ["hover"],
      textColor: ["hover"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-pseudo-elements")({
      customPseudoClasses: ["foo"],
      customPseudoElements: ["bar"],
      contentUtilities: false,
      emptyContent: true,
      classNameReplacer: {
        "hover:before:text-black": "hbt",
      },
    }),
  ],
};
