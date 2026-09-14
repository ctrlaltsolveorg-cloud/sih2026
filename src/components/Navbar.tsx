'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useRole } from '@/context/RoleContext';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import UserAvatar from './UserAvatar';
import {
  Leaf,
  ShoppingBag,
  Globe,
  LogIn,
  LogOut,
  Languages,
  ChevronDown,
  Check,
  Sun,
  Moon
} from 'lucide-react';

interface NavbarProps {
  onOpenCart?: () => void;
}

export default function Navbar({ onOpenCart }: NavbarProps) {
  const pathname = usePathname();
  const {
    language,
    setLanguage,
    t,
    setIsTranslatorOpen,
    supportedLanguages
  } = useLanguage();
  const { role, setRole, userName } = useRole();
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const { itemCount, setIsCartOpen } = useCart();
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname === '/farmer') setRole('FARMER');
    else if (pathname === '/fpo') setRole('FPO');
    else if (pathname === '/buyer') setRole('BUYER');
    else if (pathname === '/hub') setRole('HUB_OPERATOR');
    else if (pathname === '/transporter') setRole('TRANSPORTER');
    else if (pathname === '/admin') setRole('ADMIN');
  }, [pathname, setRole]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCartClick = () => {
    if (onOpenCart) {
      onOpenCart();
    } else {
      setIsCartOpen(true);
    }
  };

  const currentLangMeta =
    supportedLanguages.find((l) => l.code === language) ||
    supportedLanguages.find((l) => l.code === 'en') ||
    supportedLanguages[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF5EB]/95 dark:bg-[#07170f]/95 backdrop-blur-md border-b border-emerald-900/10 dark:border-emerald-500/20 shadow-sm transition-colors duration-200">
      {/* Top Banner */}
      <div className="bg-[#0F3826] text-amber-50 text-[11px] py-1.5 px-4 sm:px-8 border-b border-amber-500/10 flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 font-extrabold rounded-md text-[10px] border border-amber-400/20">
            SIH 2026 PS 26033
          </span>
          <span className="truncate hidden sm:inline">{t.subTitle}</span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span>
            सक्रिय भूमिका: <strong className="text-amber-300">{userName} ({role.toUpperCase()})</strong>
          </span>
        </div>
      </div>

      {/* Main Navbar Row */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between gap-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F3826] to-[#164E35] flex items-center justify-center text-amber-400 shadow-md border border-amber-500/20">
            <Leaf className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-emerald-950 dark:text-amber-100 leading-none tracking-tight">
              {t.appName}
            </h1>
            <span className="text-[10px] text-amber-800 dark:text-amber-400 font-semibold leading-none">
              किसान दिवस एग्री-टेक मंच
            </span>
          </div>
        </Link>

        {/* Desktop 6 Role Nav Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-emerald-900/5 dark:bg-emerald-950/60 p-1 rounded-2xl border border-emerald-900/10 dark:border-emerald-500/20 text-xs font-bold">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-xl transition ${
              pathname === '/'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'text-emerald-950 dark:text-emerald-200 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40'
            }`}
          >
            {t.navHome}
          </Link>
          <Link
            href="/farmer"
            onClick={() => setRole('FARMER')}
            className={`px-3 py-1.5 rounded-xl transition ${
              pathname === '/farmer'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'text-emerald-950 dark:text-emerald-200 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40'
            }`}
          >
            {t.navFarmer}
          </Link>
          <Link
            href="/fpo"
            onClick={() => setRole('FPO')}
            className={`px-3 py-1.5 rounded-xl transition ${
              pathname === '/fpo'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'text-emerald-950 dark:text-emerald-200 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40'
            }`}
          >
            {t.navFPO}
          </Link>
          <Link
            href="/buyer"
            onClick={() => setRole('BUYER')}
            className={`px-3 py-1.5 rounded-xl transition ${
              pathname === '/buyer'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'text-emerald-950 dark:text-emerald-200 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40'
            }`}
          >
            {t.navBuyer}
          </Link>
          <Link
            href="/hub"
            onClick={() => setRole('HUB_OPERATOR')}
            className={`px-3 py-1.5 rounded-xl transition ${
              pathname === '/hub'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'text-emerald-950 dark:text-emerald-200 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40'
            }`}
          >
            {t.navHub}
          </Link>
          <Link
            href="/transporter"
            onClick={() => setRole('TRANSPORTER')}
            className={`px-3 py-1.5 rounded-xl transition ${
              pathname === '/transporter'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'text-emerald-950 dark:text-emerald-200 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40'
            }`}
          >
            {t.navTransporter}
          </Link>
          <Link
            href="/admin"
            onClick={() => setRole('ADMIN')}
            className={`px-3 py-1.5 rounded-xl transition ${
              pathname === '/admin'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'text-emerald-950 dark:text-emerald-200 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40'
            }`}
          >
            {t.navAdmin}
          </Link>
        </nav>

        {/* Right Buttons: Theme Toggle + India Translator + 11-Language Dropdown + User Profile + Cart */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme Toggle Button (Sun / Moon) */}
          <button
            type="button"
            onClick={toggleTheme}
            id="theme-toggle-btn"
            aria-label={resolvedTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={
              resolvedTheme === 'dark'
                ? (language === 'hi' ? 'लाइट मोड चालू करें' : 'Switch to Light Mode')
                : (language === 'hi' ? 'डार्क मोड चालू करें' : 'Switch to Dark Mode')
            }
            className="px-2.5 sm:px-3 py-1.5 bg-white/90 dark:bg-emerald-950/80 hover:bg-white dark:hover:bg-emerald-900 text-emerald-950 dark:text-amber-300 border border-emerald-900/15 dark:border-emerald-500/30 font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition transform active:scale-95"
          >
            {resolvedTheme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="hidden md:inline">{language === 'hi' ? 'लाइट' : 'Light'}</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-emerald-800 dark:text-amber-400" />
                <span className="hidden md:inline">{language === 'hi' ? 'डार्क' : 'Dark'}</span>
              </>
            )}
          </button>

          {/* India Translator Launch Button */}
          <button
            onClick={() => setIsTranslatorOpen(true)}
            className="px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-emerald-800/10 hover:bg-amber-500/30 text-emerald-950 dark:text-amber-200 border border-amber-600/30 dark:border-amber-500/30 font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition"
            title={t.translatorTitle || 'India Multi-Language Translator'}
          >
            <Languages className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span className="hidden md:inline">{t.translatorBtn || '🇮🇳 India Translator'}</span>
            <span className="md:hidden">🇮🇳</span>
          </button>

          {/* 11-Indian Language Dropdown Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="px-2.5 sm:px-3 py-1.5 bg-white/90 dark:bg-emerald-950/80 hover:bg-white dark:hover:bg-emerald-900 text-emerald-950 dark:text-emerald-100 border border-emerald-900/15 dark:border-emerald-500/30 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition"
              aria-label="Select Indian Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-300" />
              <span className="font-extrabold">{currentLangMeta.flagEmoji} {currentLangMeta.nativeName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-800/60 dark:text-emerald-300/60" />
            </button>

            {/* Dropdown Menu */}
            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white dark:bg-[#0c2217] rounded-2xl shadow-2xl border border-emerald-900/15 dark:border-emerald-500/30 py-2 z-50 animate-fadeIn">
                <div className="px-3 py-1.5 border-b border-emerald-900/10 dark:border-emerald-500/20 flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-emerald-950 dark:text-emerald-100 uppercase tracking-wider">
                    {t.selectLanguage || 'भाषा चुनें'} (11 Languages)
                  </span>
                  <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold bg-amber-100 dark:bg-amber-950/80 px-1.5 py-0.5 rounded">
                    Pan-India
                  </span>
                </div>

                <div className="max-h-80 overflow-y-auto py-1 space-y-0.5">
                  {supportedLanguages.map((lang) => {
                    const isSelected = language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition ${
                          isSelected
                            ? 'bg-[#0F3826] text-amber-50 font-bold'
                            : 'hover:bg-emerald-50 dark:hover:bg-emerald-900/50 text-emerald-950 dark:text-emerald-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{lang.flagEmoji}</span>
                          <div>
                            <div className="font-bold leading-tight">{lang.nativeName}</div>
                            <div className={`text-[10px] ${isSelected ? 'text-amber-200/80' : 'text-emerald-800/60 dark:text-emerald-300/60'}`}>
                              {lang.name} • {lang.region}
                            </div>
                          </div>
                        </div>

                        {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                      </button>
                    );
                  })}
                </div>

                <div className="px-3 pt-2 mt-1 border-t border-emerald-900/10 dark:border-emerald-500/20 text-center">
                  <button
                    onClick={() => {
                      setIsLangDropdownOpen(false);
                      setIsTranslatorOpen(true);
                    }}
                    className="text-[11px] text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-emerald-100 font-bold flex items-center justify-center gap-1 w-full py-1 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 rounded-lg transition"
                  >
                    <Languages className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                    <span>{t.translatorTitle || 'AI Translator'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar / Login Button */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1.5 bg-white/80 dark:bg-emerald-950/80 hover:bg-white dark:hover:bg-emerald-900 border border-emerald-900/15 dark:border-emerald-500/30 rounded-2xl shadow-sm transition"
              >
                <UserAvatar name={user.name} size="sm" />
                <span className="text-xs font-extrabold text-emerald-950 dark:text-emerald-100 max-w-[90px] truncate hidden md:inline">
                  {user.name}
                </span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-[#FAF5EB] dark:bg-[#0c2217] rounded-2xl shadow-2xl border border-emerald-900/20 dark:border-emerald-500/30 p-3 z-50 animate-fadeIn space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-emerald-900/5 dark:bg-emerald-950/60 rounded-xl border border-emerald-900/10 dark:border-emerald-500/20">
                    <UserAvatar name={user.name} size="md" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-extrabold text-emerald-950 dark:text-amber-100 truncate">{user.name}</p>
                      <p className="text-[10px] text-emerald-800/70 dark:text-emerald-300/70 truncate">{user.email}</p>
                      <span className="inline-block mt-0.5 text-[9px] font-bold px-2 py-0.5 bg-amber-500/20 text-amber-900 dark:text-amber-300 rounded-md border border-amber-500/30">
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full py-2 px-3 bg-red-100 dark:bg-red-950/60 hover:bg-red-200 dark:hover:bg-red-900/60 text-red-900 dark:text-red-200 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'लॉगआउट (Log Out)' : 'Log Out'}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-md transition shrink-0"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'hi' ? 'लॉगिन' : 'Log In'}</span>
            </button>
          )}

          {/* Cart Trigger Button */}
          <button
            onClick={handleCartClick}
            className="relative px-3 sm:px-4 py-2 bg-[#0F3826] hover:bg-emerald-900 text-amber-50 font-bold rounded-xl shadow-md transition flex items-center gap-2 text-xs shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">{language === 'hi' ? 'टोकरी' : 'Cart'}</span>
            {itemCount > 0 && (
              <span className="w-5 h-5 bg-amber-500 text-emerald-950 font-extrabold text-[10px] rounded-full flex items-center justify-center border-2 border-[#0F3826]">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Horizontal Role Navigation Strip */}
      <div className="xl:hidden border-t border-emerald-900/10 dark:border-emerald-500/20 bg-emerald-900/5 dark:bg-[#07170f] px-4 py-2 overflow-x-auto no-scrollbar">
        <nav className="flex items-center gap-1.5 min-w-max text-xs font-bold">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-xl transition ${
              pathname === '/'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'bg-white/70 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-100 hover:bg-white dark:hover:bg-emerald-900 border border-transparent dark:border-emerald-500/20'
            }`}
          >
            {t.navHome}
          </Link>
          <Link
            href="/farmer"
            onClick={() => setRole('FARMER')}
            className={`px-3 py-1.5 rounded-xl transition ${
              pathname === '/farmer'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'bg-white/70 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-100 hover:bg-white dark:hover:bg-emerald-900 border border-transparent dark:border-emerald-500/20'
            }`}
          >
            {t.navFarmer}
          </Link>
          <Link
            href="/fpo"
            onClick={() => setRole('FPO')}
            className={`px-3 py-1.5 rounded-xl transition ${
              pathname === '/fpo'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'bg-white/70 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-100 hover:bg-white dark:hover:bg-emerald-900 border border-transparent dark:border-emerald-500/20'
            }`}
          >
            {t.navFPO}
          </Link>
          <Link
            href="/buyer"
            onClick={() => setRole('BUYER')}
            className={`px-3 py-1.5 rounded-xl transition ${
              pathname === '/buyer'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'bg-white/70 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-100 hover:bg-white dark:hover:bg-emerald-900 border border-transparent dark:border-emerald-500/20'
            }`}
          >
            {t.navBuyer}
          </Link>
          <Link
            href="/hub"
            onClick={() => setRole('HUB_OPERATOR')}
            className={`px-3 py-1.5 rounded-xl transition ${
              pathname === '/hub'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'bg-white/70 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-100 hover:bg-white dark:hover:bg-emerald-900 border border-transparent dark:border-emerald-500/20'
            }`}
          >
            {t.navHub}
          </Link>
          <Link
            href="/transporter"
            onClick={() => setRole('TRANSPORTER')}
            className={`px-3 py-1.5 rounded-xl transition ${
              pathname === '/transporter'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'bg-white/70 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-100 hover:bg-white dark:hover:bg-emerald-900 border border-transparent dark:border-emerald-500/20'
            }`}
          >
            {t.navTransporter}
          </Link>
          <Link
            href="/admin"
            onClick={() => setRole('ADMIN')}
            className={`px-3 py-1.5 rounded-xl transition ${
              pathname === '/admin'
                ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                : 'bg-white/70 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-100 hover:bg-white dark:hover:bg-emerald-900 border border-transparent dark:border-emerald-500/20'
            }`}
          >
            {t.navAdmin}
          </Link>
        </nav>
      </div>
    </header>
  );
}
