import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
        screens: {
            xs: '420px',
            sm: '680px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
            ...defaultTheme.screens,
        },
    },

    plugins: [forms,require("daisyui")],
    daisyui: {

        darkTheme: 'dark',
        base: true,
        styled: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: '',
        themes: ['dark'],
        // Disable the default themes to avoid conflicts
        // defaultTheme: false,
        // Disable the dark theme to avoid conflicts
        darkTheme: false,
        // Disable the light theme to avoid conflicts
        lightTheme: false,
        // Disable the system theme to avoid conflicts
        systemTheme: false,
        // Disable the custom theme to avoid conflicts
        customTheme: false,
        // Disable the daisyUI theme to avoid conflicts
        daisyUITheme: false,
        // Disable the daisyUI theme to avoid conflicts
        baseTheme: false,
        // Disable the daisyUI theme to avoid conflicts 
        componentTheme: false,
    },
};
