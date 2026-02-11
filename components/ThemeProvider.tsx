'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    enableSystem?: boolean;
    attribute?: string;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    systemTheme: Theme | undefined;
};

const initialState: ThemeProviderState = {
    theme: 'system',
    setTheme: () => null,
    systemTheme: undefined,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = 'system',
    enableSystem = true,
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(defaultTheme);
    const [systemTheme, setSystemTheme] = useState<Theme | undefined>(undefined);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        if (theme === 'system' && enableSystem) {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
            root.classList.add(systemTheme);
            setSystemTheme(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme, enableSystem]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = () => {
            if (theme === 'system' && enableSystem) {
                const systemTheme = mediaQuery.matches ? 'dark' : 'light';
                const root = window.document.documentElement;
                root.classList.remove('light', 'dark');
                root.classList.add(systemTheme);
                setSystemTheme(systemTheme);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme, enableSystem]);

    const value = { theme, setTheme, systemTheme };

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined)
        throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};
