/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#6366f1',
                    dark: '#4338ca',
                    light: '#818cf8',
                },
                secondary: {
                    DEFAULT: '#06b6d4',
                    dark: '#0891b2',
                    light: '#67e8f9',
                },
                accent: {
                    DEFAULT: '#f59e0b',
                    dark: '#d97706',
                    light: '#fcd34d',
                },
                background: {
                    light: '#ffffff',
                    dark: '#0a0a0f',
                },
                surface: {
                    light: '#f5f5f7',
                    dark: '#1e1e2e',
                },
                text: {
                    light: '#1e293b',
                    dark: '#f1f5f9',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Poppins', 'system-ui', 'sans-serif'],
                mono: ['Source Code Pro', 'monospace'],
                arabic: ['Cairo', 'Tajawal', 'sans-serif'],
            },
            boxShadow: {
                card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                'card-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
                'card-hover-dark': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
                'glass-hover': '0 20px 40px rgba(0, 0, 0, 0.3)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'float-medium': 'floatMedium 6s ease-in-out infinite',
                'gradient-text': 'gradientText 6s ease infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                floatMedium: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                gradientText: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
            },
        },
    },
    plugins: [],
};
