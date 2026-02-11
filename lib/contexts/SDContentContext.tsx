'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { SDContent, Module } from '../types';

interface SDContentContextType {
    content: SDContent | null;
    loading: boolean;
    error: string | null;
    getModuleBySlug: (slug: string) => Module | undefined;
    isReady: boolean;
}

const SDContentContext = createContext<SDContentContextType | undefined>(undefined);

export function useSDContent() {
    const context = useContext(SDContentContext);
    if (context === undefined) {
        throw new Error('useSDContent must be used within an SDContentProvider');
    }
    return context;
}

interface SDContentProviderProps {
    children: ReactNode;
}

export function SDContentProvider({ children }: SDContentProviderProps) {
    const [content, setContent] = useState<SDContent | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);
    const fetchedRef = useRef<boolean>(false);

    useEffect(() => {
        if (fetchedRef.current) return;

        async function fetchContent() {
            try {
                setLoading(true);
                console.log('Fetching SD content from JSON file...');

                const response = await fetch('/sd_content.json');

                if (!response.ok) {
                    throw new Error('Failed to fetch System Design content');
                }

                const data = await response.json();
                console.log('SD content successfully loaded');
                setContent(data);
                setIsReady(true);
                fetchedRef.current = true;
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                console.error('Error fetching SD content:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchContent();
    }, []);

    const getModuleBySlug = (slug: string): Module | undefined => {
        if (!content) return undefined;
        return content.modules.find(module => module.slug === slug);
    };

    const value = {
        content,
        loading,
        error,
        getModuleBySlug,
        isReady
    };

    return (
        <SDContentContext.Provider value={value}>
            {children}
        </SDContentContext.Provider>
    );
}
