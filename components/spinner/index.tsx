'use client';

import React from 'react';
import styles from '@/app/[locale]/home/home.module.css';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.spinnerCircle} />
    </div>
  );
};
