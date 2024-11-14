'use client';

import styles from '@/app/[locale]/home/home.module.css';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface SliderTemperatureProps {
  warmerThan: number;
  setWarmerThan: (value: number) => void;
}

export const SliderTemperature = ({
  warmerThan,
  setWarmerThan,
}: SliderTemperatureProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.temperatureRange}>
      <h2 className={styles.temperatureLabel}>{t('warmerThan')}</h2>
      <input
        type="range"
        min={-100}
        max={100}
        value={warmerThan}
        onChange={e => setWarmerThan(parseInt(e.target.value))}
        className={styles.temperatureInput}
      />
      <div className={styles.temperatureValue}>{warmerThan}°C</div>
    </div>
  );
};
