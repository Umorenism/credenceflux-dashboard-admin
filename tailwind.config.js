


module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.7s ease-out forwards",
        slideDown: "slideDown 0.5s ease-out forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      
      keyframes: {
  fadeIn: {
    '0%': {
      opacity: '0',
      transform: 'translateY(-10px)',
    },
    '100%': {
      opacity: '1',
      transform: 'translateY(0)',
    },
  },

  
  
  slideDown: {
    '0%': { transform: 'translateY(-100%)' },
    '100%': { transform: 'translateY(0)' },
  },
  'accordion-down': {
    from: { height: '0' },
    to: { height: 'var(--radix-accordion-content-height)' },
  },
  'accordion-up': {
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: '0' },
  },
},

      colors: {
        "bgdark-mode": "var(--bgdark-mode)",
        "blue-20": "var(--blue-20)",
        "blue-60": "var(--blue-60)",
        neutralwhite: "var(--neutralwhite)",
        "textlight-mode": "var(--textlight-mode)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "BODY-semibold": "var(--BODY-semibold-font-family)",
        "headings-h-bold": "var(--headings-h-bold-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
         poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  // plugins: [],
  // darkMode: ["class"],

  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'], // Optional: specify themes
  },
  darkMode: ["class"],
};
