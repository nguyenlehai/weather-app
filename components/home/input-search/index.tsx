'use client';

import styles from '@/app/[locale]/home/home.module.css';
import { LoadingSpinner } from '@/components/spinner';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface InputSearchProps {
  setSearchTerm: (value: string) => void;
  searchTerm?: string;
  isLoading?: boolean;
  searchInputRef?: any;
  noDataAvailable?: boolean;
}

export const InputSearch = ({
  setSearchTerm,
  searchTerm,
  isLoading,
  searchInputRef,
  noDataAvailable,
}: InputSearchProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder={t('searchCity')}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        ref={searchInputRef}
        className={styles.searchInput}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>{noDataAvailable && <div>{t('noDataAvailable')}</div>}</>
      )}
    </div>
  );
};
