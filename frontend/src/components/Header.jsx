import React, { useState } from 'react';
import {
  Activity,
  FileText,
  Languages,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

import { t } from '../translation/translation';

export default function Header({
  isLiveBackend,
  lang,
  setLang,
  assistedMode,
  setAssistedMode,
  onOpenReport
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLang?.(lang === 'hi' ? 'en' : 'hi');
  };

  const toggleAssistedMode = () => {
    setAssistedMode?.(!assistedMode);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-violet-100 bg-white/90 backdrop-blur-xl shadow-sm">

      {/* Top Gradient Line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="flex min-h-[76px] items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-lg shadow-violet-200 transition-transform duration-300 hover:scale-105">

              <span className="text-xl font-black">
                G
              </span>

              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />

            </div>

            <div>

              <div className="text-lg font-extrabold tracking-tight">
                Gramin<span className="gradient-text">Guru</span>
              </div>

              <div className="text-xs text-slate-500">
                {lang === 'hi'
                  ? 'हर उद्यमी का अपना सलाहकार'
                  : 'Har Udyami ka Apna Salahkar'}
              </div>

            </div>

          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 md:flex">

            {/* Backend Status */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm text-slate-600">

              <Activity
                size={15}
                className={
                  isLiveBackend
                    ? 'text-emerald-500'
                    : 'text-slate-400'
                }
              />

              <span className="font-medium">
                FastAPI
              </span>

              <span
                className={`h-2 w-2 rounded-full ${
                  isLiveBackend
                    ? 'bg-emerald-500 animate-pulse'
                    : 'bg-slate-400'
                }`}
              />

              <span
                className={`text-xs font-semibold ${
                  isLiveBackend
                    ? 'text-emerald-700'
                    : 'text-slate-500'
                }`}
              >
                {isLiveBackend
                  ? 'Live'
                  : lang === 'hi'
                    ? 'लोकल'
                    : 'Local'}
              </span>

            </div>

            {/* Assisted Mode */}
            <button
              type="button"
              onClick={toggleAssistedMode}
              className={`rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                assistedMode
                  ? 'border-violet-300 bg-violet-50 text-violet-700 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-violet-200 hover:bg-violet-50'
              }`}
            >
              {assistedMode
                ? lang === 'hi'
                  ? 'सहायता मोड चालू'
                  : 'Assisted Mode On'
                : t(lang, 'assistedMode')}
            </button>

            {/* Language */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-violet-200 hover:bg-violet-50"
            >
              <Languages size={15} />

              {lang === 'hi'
                ? 'English'
                : 'हिंदी'}
            </button>

            {/* Report */}
            <button
              type="button"
              onClick={() => onOpenReport?.()}
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-violet-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-300"
            >
              <FileText size={15} />

              {t(lang, 'generateReport')}

              <Sparkles
                size={14}
                className="opacity-70 transition-transform duration-300 group-hover:rotate-12"
              />
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="rounded-xl border border-violet-100 bg-white p-2.5 text-slate-700 shadow-sm transition hover:bg-violet-50 md:hidden"
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
          >
            {mobileMenuOpen
              ? <X size={20} />
              : <Menu size={20} />}
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-violet-100 py-4 md:hidden page-enter">

            <div className="flex flex-col gap-2">

              {/* Backend */}
              <div className="flex items-center gap-2 rounded-xl bg-violet-50 px-3 py-2.5 text-sm text-slate-600">

                <Activity
                  size={15}
                  className={
                    isLiveBackend
                      ? 'text-emerald-600'
                      : 'text-slate-400'
                  }
                />

                <span>
                  FastAPI
                </span>

                <span
                  className={`h-2 w-2 rounded-full ${
                    isLiveBackend
                      ? 'bg-emerald-500'
                      : 'bg-slate-400'
                  }`}
                />

                <span>
                  {isLiveBackend
                    ? 'Live'
                    : lang === 'hi'
                      ? 'लोकल'
                      : 'Local'}
                </span>

              </div>

              {/* Assisted Mode */}
              <button
                type="button"
                onClick={toggleAssistedMode}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50"
              >
                {assistedMode
                  ? lang === 'hi'
                    ? 'सहायता मोड बंद करें'
                    : 'Turn Off Assisted Mode'
                  : t(lang, 'assistedMode')}
              </button>

              {/* Language */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50"
              >
                {lang === 'hi'
                  ? 'Switch to English'
                  : 'हिंदी'}
              </button>

              {/* Report */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReport?.();
                }}
                className="rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-3 py-2.5 text-left text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:shadow-lg"
              >
                {t(lang, 'generateReport')}
              </button>

            </div>
          </div>
        )}

      </div>
    </header>
  );
}