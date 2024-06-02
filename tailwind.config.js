/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        screen: {
          light: "#08070B",
          dark: "#08070B",
        },
        title: {
          light: "#817D92",
          dark: "#817D92",
        },
        field: {
          light: "#24232C",
          dark: "#24232C",
        },
        password: {
          light: "#E6E5EA",
          dark: "#E6E5EA",
        },
        copy_button: {
          light: "#A4FFAF",
          dark: "#A4FFAF",
        },
        label: {
          light: "#E6E5EA",
          dark: "#E6E5EA",
          highlight: "#A4FFAF",
        },
        checkbox: {
          border: "#FFFFFF",
          active_background: "#A4FFAF",
          checked: "#18171F",
        },
        strength: {
          background: {
            light: "#18171F",
            dark: "#18171F",
          },
          text: {
            light: "#817D92",
            dark: "#817D92",
          },
          level: {
            light: "#E6E5EA",
            dark: "#E6E5EA",
          },
          too_weak: "#F64A4A",
          weak: "#FB7C58",
          medium: "#F8CD65",
          strong: "#A4FFAF",
        },
        generate_button: {
          text: {
            light: "#24232C",
            dark: "#24232C",
          },
          background: {
            light: "#A4FFAF",
            dark: "#A4FFAF",
          },
        },
      },
    },
  },
  plugins: [],
};
