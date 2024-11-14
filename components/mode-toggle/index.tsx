'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import styles from './mode-toggle.module.css';
// import { Sun, Moon } from 'lucide-react';

export function ModeToggle() {
  const { setTheme } = useTheme();
  const { t } = useTranslation();
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

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  // Close dropdown after setting theme
  const handleThemeChange = (theme: string) => {
    setTheme(theme);
    setDropdownOpen(false); // Close the dropdown
  };

  return (
    <div className={styles['mode-toggle-container']}>
      <button
        onClick={toggleDropdown}
        className={`${styles['toggle-button']} ${isDropdownOpen ? 'dark-mode' : ''}`}
        aria-label={t('toggle theme')}
      >
        {/*<Sun className={`${styles.icon} ${styles.sun}`} />*/}
        {/*<Moon className={`${styles.icon} ${styles.moon}`} />*/}
      </button>

      {isDropdownOpen && (
        <div className={styles.dropdown} ref={dropdownRef}>
          <div
            className={styles['menu-item']}
            onClick={() => handleThemeChange('light')}
          >
            {t('light')}
          </div>
          <div
            className={styles['menu-item']}
            onClick={() => handleThemeChange('dark')}
          >
            {t('dark')}
          </div>
          <div
            className={styles['menu-item']}
            onClick={() => handleThemeChange('system')}
          >
            {t('system')}
          </div>
        </div>
      )}
    </div>
  );
}
