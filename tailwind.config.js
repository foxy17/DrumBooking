// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      themes: [
        {
          mainTheme: {
            "primary": "#111827",
            "secondary": "#473e61",
            "accent": "#cecfcc",
            "neutral": "#111827",
            "base-100": "#e9e9e8",
            "info": "#bae6fd",
            "success": "#bbf7d0",
            "warning": "#fde68a",
            "error": "#fda4af",
          },
        },
      ],
    },
  },
  plugins: [require("daisyui")],
};
