import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        screens: {
            xs: "400px",
            ...defaultTheme.screens,
            md: "820px"
        },
        extend: {
            colors: {
                primary: "#f5f5f5"
            },
            borderWidth: { 1: "1px" }
        }
    },
    plugins: []
};
export default config;
