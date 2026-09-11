import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { RoleProvider } from '@/context/RoleContext';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
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
    <html lang="en">
      <body className="antialiased selection:bg-amber-200 selection:text-emerald-950">
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
                  <AuthModal />
                  <IndiaTranslatorModal />
                  <Footer />
                </div>
              </CartProvider>
            </RoleProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
