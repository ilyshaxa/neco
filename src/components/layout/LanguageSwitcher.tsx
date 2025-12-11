'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Languages } from 'lucide-react';
import { useState } from 'react';

const locales = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    const path = pathname.split('/').slice(2).join('/');
    router.push(`/${newLocale}/${path}`);
    setIsOpen(false);
  };

  const currentLocale = locales.find((l) => l.code === locale) || locales[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 dark:bg-[#161B22] hover:bg-gray-200 dark:hover:bg-[#1C2128] transition-colors border border-transparent dark:border-[#30363D]"
        aria-label="Change language"
      >
        <Languages className="w-5 h-5" />
        <span className="text-sm font-medium">{currentLocale.flag}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-[#161B22] shadow-xl border border-gray-200 dark:border-[#30363D] z-20 overflow-hidden">
            {locales.map((loc) => (
              <button
                key={loc.code}
                onClick={() => handleLocaleChange(loc.code)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-[#1C2128] transition-colors flex items-center gap-3 ${
                  loc.code === locale ? 'bg-gray-50 dark:bg-[#21262D]' : ''
                }`}
              >
                <span className="text-xl">{loc.flag}</span>
                <span className="font-medium">{loc.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

