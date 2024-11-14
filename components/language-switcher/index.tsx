'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';
import languageJson from './languageCode.json';
import GlobalIcon from '../icon/global';
import styles from './language-switcher.module.css';

type Language = {
  [key: string]: { name: string; nativeName: string; countryCode?: string };
};

const languageObject = languageJson as Language;

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleChange = (newLocale: string) => () => {
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`),
      );
    }

    router.refresh();
    setDropdownOpen(false);
  };

  const renderList = () => (
    <div className={styles['dropdown-content']} ref={dropdownRef}>
      {i18nConfig.locales.map(lang => {
        const data = languageObject[lang];
        if (!data) return null;

        return (
          <div
            key={lang}
            className={styles['menu-item']}
            data-language={lang}
            onClick={handleChange(lang)}
          >
            {data.countryCode ? (
              <span
                className={`${styles.icon} fi fi-${data.countryCode.toLowerCase()}`}
              />
            ) : (
              <div style={{ width: '24px', height: '18px' }} />
            )}
            <span>{data.nativeName}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={`${styles['language-switcher']} ${className || ''}`}>
      <div onClick={() => setDropdownOpen(!isDropdownOpen)}>
        <GlobalIcon />
      </div>
      {isDropdownOpen && renderList()}
    </div>
  );
}
