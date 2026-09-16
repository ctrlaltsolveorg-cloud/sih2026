import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { RoleProvider } from '@/context/RoleContext';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import FloatingCartButton from '@/components/FloatingCartButton';
import AuthModal from '@/components/AuthModal';
import IndiaTranslatorModal from '@/components/IndiaTranslatorModal';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'KisanBandhan AI — Kisan Diwas Direct Farm-to-Buyer Platform (SIH 2026)',
  description: 'AI-Powered Direct Agriculture Trading & Logistics Platform for SIH 2026 Problem Statement 26033. Computer Vision Grading, Fair Price AI, and Demand Forecasting.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('kb_theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (storedTheme === 'dark' || (!storedTheme && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-amber-200 selection:text-emerald-950 dark:selection:bg-amber-500/30 dark:selection:text-amber-200 bg-[#FAF5EB] dark:bg-[#07170f] text-[#1A2E26] dark:text-[#E2E8F0] transition-colors duration-200">
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <RoleProvider>
                <CartProvider>
                  <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 py-6">
                      {children}
                    </main>
                    <CartDrawer />
                    <FloatingCartButton />
                    <AuthModal />
                    <IndiaTranslatorModal />
                    <Footer />
                  </div>
                </CartProvider>
              </RoleProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
