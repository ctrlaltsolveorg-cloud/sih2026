'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useRole } from '@/context/RoleContext';
import { useCart } from '@/context/CartContext';
import { Leaf, ShoppingBag, Globe, Sparkles, UserCheck, Building2, Award, Truck, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenCart?: () => void;
}

export default function Navbar({ onOpenCart }: NavbarProps) {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { role, setRole, userName } = useRole();
  const { itemCount, setIsCartOpen } = useCart();

  useEffect(() => {
    if (pathname === '/farmer') setRole('FARMER');
    else if (pathname === '/fpo') setRole('FPO');
    else if (pathname === '/buyer') setRole('BUYER');
    else if (pathname === '/hub') setRole('HUB_OPERATOR');
    else if (pathname === '/transporter') setRole('TRANSPORTER');
    else if (pathname === '/admin') setRole('ADMIN');
  }, [pathname, setRole]);

  const handleCartClick = () => {
    if (onOpenCart) {
      onOpenCart();
    } else {
      setIsCartOpen(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF5EB]/95 backdrop-blur-md border-b border-emerald-900/10 shadow-sm">
      {/* Top Banner */}
      <div className="bg-[#0F3826] text-amber-50 text-[11px] py-1.5 px-4 sm:px-8 border-b border-amber-500/10 flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 font-extrabold rounded-md text-[10px] border border-amber-400/20">
            SIH 2026 PS 26033
          </span>
          <span className="truncate hidden sm:inline">{t.subTitle}</span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span>सक्रिय भूमिका: <strong className="text-amber-300">{userName} ({role.toUpperCase()})</strong></span>
        </div>
      </div>

      {/* Main Navbar Row */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F3826] to-[#164E35] flex items-center justify-center text-amber-400 shadow-md border border-amber-500/20">
            <Leaf className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-emerald-950 leading-none tracking-tight">
              {t.appName}
            </h1>
            <span className="text-[10px] text-amber-800 font-semibold leading-none">
              किसान दिवस एग्री-टेक मंच
            </span>
          </div>
        </Link>

        {/* Desktop 6 Role Nav Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-emerald-900/5 p-1 rounded-2xl border border-emerald-900/10 text-xs font-bold">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-xl transition ${pathname === '/'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'text-emerald-950 hover:bg-emerald-100/60'
              }`}
          >
            {t.navHome}
          </Link>
          <Link
            href="/farmer"
            onClick={() => setRole('FARMER')}
            className={`px-3 py-1.5 rounded-xl transition ${pathname === '/farmer'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'text-emerald-950 hover:bg-emerald-100/60'
              }`}
          >
            {t.navFarmer}
          </Link>
          <Link
            href="/fpo"
            onClick={() => setRole('FPO')}
            className={`px-3 py-1.5 rounded-xl transition ${pathname === '/fpo'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'text-emerald-950 hover:bg-emerald-100/60'
              }`}
          >
            {t.navFPO}
          </Link>
          <Link
            href="/buyer"
            onClick={() => setRole('BUYER')}
            className={`px-3 py-1.5 rounded-xl transition ${pathname === '/buyer'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'text-emerald-950 hover:bg-emerald-100/60'
              }`}
          >
            {t.navBuyer}
          </Link>
          <Link
            href="/hub"
            onClick={() => setRole('HUB_OPERATOR')}
            className={`px-3 py-1.5 rounded-xl transition ${pathname === '/hub'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'text-emerald-950 hover:bg-emerald-100/60'
              }`}
          >
            {t.navHub}
          </Link>
          <Link
            href="/transporter"
            onClick={() => setRole('TRANSPORTER')}
            className={`px-3 py-1.5 rounded-xl transition ${pathname === '/transporter'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'text-emerald-950 hover:bg-emerald-100/60'
              }`}
          >
            {t.navTransporter}
          </Link>
          <Link
            href="/admin"
            onClick={() => setRole('ADMIN')}
            className={`px-3 py-1.5 rounded-xl transition ${pathname === '/admin'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'text-emerald-950 hover:bg-emerald-100/60'
              }`}
          >
            {t.navAdmin}
          </Link>
        </nav>

        {/* Right Buttons: Language Switch + Cart */}
        <div className="flex items-center gap-2.5">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="px-3 py-1.5 bg-white/80 hover:bg-white text-emerald-950 border border-emerald-900/15 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition"
          >
            <Globe className="w-4 h-4 text-amber-700" />
            <span>{language === 'hi' ? 'English' : 'हिंदी'}</span>
          </button>

          {/* Cart Trigger Button */}
          <button
            onClick={handleCartClick}
            className="relative px-4 py-2 bg-[#0F3826] hover:bg-emerald-900 text-amber-50 font-bold rounded-xl shadow-md transition flex items-center gap-2 text-xs"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>{language === 'hi' ? 'खरीदारी टोकरी' : 'Cart'}</span>
            {itemCount > 0 && (
              <span className="w-5 h-5 bg-amber-500 text-emerald-950 font-extrabold text-[10px] rounded-full flex items-center justify-center border-2 border-[#0F3826]">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Horizontal Role Navigation Strip */}
      <div className="xl:hidden border-t border-emerald-900/10 bg-emerald-900/5 px-4 py-2 overflow-x-auto no-scrollbar">
        <nav className="flex items-center gap-1.5 min-w-max text-xs font-bold">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-xl transition ${pathname === '/'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'bg-white/70 text-emerald-950 hover:bg-white'
              }`}
          >
            {t.navHome}
          </Link>
          <Link
            href="/farmer"
            onClick={() => setRole('FARMER')}
            className={`px-3 py-1.5 rounded-xl transition ${pathname === '/farmer'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'bg-white/70 text-emerald-950 hover:bg-white'
              }`}
          >
            {t.navFarmer}
          </Link>
          <Link
            href="/fpo"
            onClick={() => setRole('FPO')}
            className={`px-3 py-1.5 rounded-xl transition ${pathname === '/fpo'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'bg-white/70 text-emerald-950 hover:bg-white'
              }`}
          >
            {t.navFPO}
          </Link>
          <Link
            href="/buyer"
            onClick={() => setRole('BUYER')}
            className={`px-3 py-1.5 rounded-xl transition ${pathname === '/buyer'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'bg-white/70 text-emerald-950 hover:bg-white'
              }`}
          >
            {t.navBuyer}
          </Link>
          <Link
            href="/hub"
            onClick={() => setRole('HUB_OPERATOR')}
            className={`px-3 py-1.5 rounded-xl transition ${pathname === '/hub'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'bg-white/70 text-emerald-950 hover:bg-white'
              }`}
          >
            {t.navHub}
          </Link>
          <Link
            href="/transporter"
            onClick={() => setRole('TRANSPORTER')}
            className={`px-3 py-1.5 rounded-xl transition ${pathname === '/transporter'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'bg-white/70 text-emerald-950 hover:bg-white'
              }`}
          >
            {t.navTransporter}
          </Link>
          <Link
            href="/admin"
            onClick={() => setRole('ADMIN')}
            className={`px-3 py-1.5 rounded-xl transition ${pathname === '/admin'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'bg-white/70 text-emerald-950 hover:bg-white'
              }`}
          >
            {t.navAdmin}
          </Link>
        </nav>
      </div>
    </header>
  );
}
