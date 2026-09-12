'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth, UserRole } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldAlert, Lock, ArrowRight, LogIn, UserPlus, ArrowLeft, RefreshCw } from 'lucide-react';

interface PortalGuardProps {
  requiredRole: UserRole | UserRole[];
  portalName: string;
  portalDescription?: string;
  children: React.ReactNode;
}

const rolePathMap: Record<UserRole, string> = {
  FARMER: '/farmer',
  BUYER: '/buyer',
  FPO: '/fpo',
  HUB_OPERATOR: '/hub',
  TRANSPORTER: '/transporter',
  ADMIN: '/admin',
};

const roleDisplayName: Record<UserRole, { en: string; hi: string }> = {
  FARMER: { en: 'Farmer', hi: 'किसान' },
  BUYER: { en: 'Direct Buyer', hi: 'प्रत्यक्ष खरीदार' },
  FPO: { en: 'FPO Manager', hi: 'एफपीओ प्रबंधक' },
  HUB_OPERATOR: { en: 'Hub Quality Inspector', hi: 'हब गुणवत्ता अधिकारी' },
  TRANSPORTER: { en: 'Transporter Fleet', hi: 'रसद एवं परिवहन भागीदार' },
  ADMIN: { en: 'National Governance Admin', hi: 'राष्ट्रीय प्रशासन अधिकारी' },
};

export default function PortalGuard({
  requiredRole,
  portalName,
  portalDescription,
  children,
}: PortalGuardProps) {
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const { language } = useLanguage();

  const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  const primaryRequired = allowedRoles[0];

  // 1. Not Authenticated Screen
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 animate-fadeIn">
        <div className="max-w-md w-full bg-[#FAF5EB] border border-emerald-900/15 rounded-3xl p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-amber-500/20 text-amber-900 border border-amber-500/30 rounded-2xl flex items-center justify-center shadow-inner">
            <Lock className="w-8 h-8 text-amber-700 animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-900 font-extrabold text-[10px] rounded-full uppercase tracking-wider border border-amber-500/30">
              {language === 'hi' ? 'सुरक्षित पोर्टल • लॉगिन अनिवार्य' : 'Secure Portal • Login Required'}
            </span>
            <h2 className="text-2xl font-black text-emerald-950">
              {portalName}
            </h2>
            <p className="text-xs text-emerald-900/80 leading-relaxed">
              {portalDescription ||
                (language === 'hi'
                  ? `इस पोर्टल का उपयोग करने के लिए आपका ${roleDisplayName[primaryRequired]?.hi || primaryRequired} के रूप में लॉगिन होना अनिवार्य है।`
                  : `You must be logged in as a registered ${roleDisplayName[primaryRequired]?.en || primaryRequired} to access this portal.`)}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full py-3.5 px-4 bg-[#0F3826] hover:bg-emerald-900 text-amber-50 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition"
            >
              <LogIn className="w-4 h-4 text-amber-400" />
              <span>
                {language === 'hi'
                  ? `${roleDisplayName[primaryRequired]?.hi} खाते से लॉगिन करें`
                  : `Log In as ${roleDisplayName[primaryRequired]?.en}`}
              </span>
            </button>

            <button
              onClick={() => openAuthModal('signup')}
              className="w-full py-3 px-4 bg-white hover:bg-amber-50/80 text-emerald-950 font-bold rounded-2xl text-xs border border-emerald-900/20 flex items-center justify-center gap-2 shadow-sm transition"
            >
              <UserPlus className="w-4 h-4 text-emerald-700" />
              <span>
                {language === 'hi'
                  ? `नया ${roleDisplayName[primaryRequired]?.hi} खाता बनाएँ`
                  : `Register as New ${roleDisplayName[primaryRequired]?.en}`}
              </span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-900/70 hover:text-emerald-950 font-semibold pt-2 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'सार्वजनिक कृषि बाज़ार पर वापस जाएँ' : 'Return to Public Marketplace'}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated but Wrong Role Screen (Admins are exempt)
  const hasAccess = allowedRoles.includes(user.role) || user.role === 'ADMIN';

  if (!hasAccess) {
    const userRoleText = roleDisplayName[user.role] || { en: user.role, hi: user.role };
    const targetRoleText = roleDisplayName[primaryRequired] || { en: primaryRequired, hi: primaryRequired };
    const myDashboardHref = rolePathMap[user.role] || '/';

    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 animate-fadeIn">
        <div className="max-w-lg w-full bg-[#FAF5EB] border-2 border-red-500/20 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-red-100 text-red-700 border border-red-300 rounded-2xl flex items-center justify-center shadow-inner">
            <ShieldAlert className="w-8 h-8 text-red-600" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-900 font-extrabold text-[10px] rounded-full uppercase tracking-wider border border-red-200">
              {language === 'hi' ? 'अनधिकृत भूमिका • एक्सेस निषेध' : 'Role Restricted • Access Prohibited'}
            </span>
            <h2 className="text-2xl font-black text-emerald-950">
              {language === 'hi' ? 'भूमिका प्रतिबंध (Role Mismatch)' : 'Portal Access Prohibited'}
            </h2>
            <div className="bg-red-50/80 border border-red-200 rounded-2xl p-4 text-xs text-emerald-950 space-y-1.5 text-left">
              <p>
                <strong>{language === 'hi' ? 'आपकी वर्तमान भूमिका: ' : 'Your Current Role: '}</strong>
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-950 rounded-md font-extrabold">
                  {language === 'hi' ? userRoleText.hi : userRoleText.en} ({user.name})
                </span>
              </p>
              <p>
                <strong>{language === 'hi' ? 'आवश्यक भूमिका: ' : 'Required Role: '}</strong>
                <span className="px-2 py-0.5 bg-emerald-700 text-white rounded-md font-bold">
                  {language === 'hi' ? targetRoleText.hi : targetRoleText.en}
                </span>
              </p>
              <p className="text-emerald-900/70 pt-1 text-[11px] leading-relaxed">
                {language === 'hi'
                  ? `आपूर्ति श्रृंखला सुरक्षा के तहत एक भूमिका का उपयोगकर्ता दूसरी भूमिका के पोर्टल के आंतरिक डेटा को एक्सेस नहीं कर सकता।`
                  : `To protect supply-chain integrity, only verified ${targetRoleText.en} accounts can access this portal.`}
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href={myDashboardHref}
              className="w-full py-3.5 px-4 bg-[#0F3826] hover:bg-emerald-900 text-amber-50 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition"
            >
              <span>
                {language === 'hi'
                  ? `अपने ${userRoleText.hi} डैशबोर्ड पर जाएँ`
                  : `Go to your ${userRoleText.en} Dashboard`}
              </span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>

            <button
              onClick={async () => {
                await logout();
                openAuthModal('login');
              }}
              className="w-full py-3 px-4 bg-white hover:bg-amber-50/80 text-emerald-950 font-bold rounded-2xl text-xs border border-emerald-900/20 flex items-center justify-center gap-2 shadow-sm transition"
            >
              <RefreshCw className="w-4 h-4 text-amber-700" />
              <span>
                {language === 'hi'
                  ? `खाता बदलें / ${targetRoleText.hi} के रूप में लॉगिन करें`
                  : `Switch Account / Login as ${targetRoleText.en}`}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated and Authorized
  return <>{children}</>;
}
