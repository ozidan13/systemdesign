import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '../components/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SDContentProvider } from '../lib/contexts/SDContentContext';

export const metadata: Metadata = {
  title: 'System Design Master | Learn System Design from Zero to Hero',
  description: 'Master System Design with interactive architecture diagrams, real-world case studies, and step-by-step explanations in Arabic & English.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'System Design Master',
    description: 'Interactive System Design Learning Platform — From Zero to Hero',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <script
          src="https://kit.fontawesome.com/1ed8332167.js"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SDContentProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </SDContentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
