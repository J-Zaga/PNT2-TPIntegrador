/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "log-in": "url('/img/Log-in.jpg')"
      }
    },
  },
  plugins: [],
}

