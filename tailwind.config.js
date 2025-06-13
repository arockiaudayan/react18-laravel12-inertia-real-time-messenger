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
    },

    plugins: [forms,require("daisyui")],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: '#4f46e5',
                    secondary: '#f43f5e',
                    accent: '#a855f7',
                    neutral: '#1c1917',
                    'base-100': '#ffffff',
                    info: '#3b82f6',
                    success: '#16a34a',
                    warning: '#f59e0b',
                    error: '#dc2626',
                },
            },
        ],
        darkTheme: 'mytheme',
        base: true,
        styled: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: '',
        themes: true,
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
