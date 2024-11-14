'use client';

import styles from '@/app/[locale]/home/home.module.css';
import { kelvinToCelsius } from '@/lib/utils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { WeatherData } from '@/types/common';

interface ListCityProps {
  item: WeatherData;
  onHandleRemove: (value: number) => void;
  index: number;
}

export const ListCity = ({ item, onHandleRemove, index }: ListCityProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.weatherItemDetails}>
        <div className={styles.weatherItemTitle}>{item.name}</div>
        {item.main?.temp && (
          <div>
            {t('temperature', {
              temp: kelvinToCelsius(item.main?.temp),
            })}
          </div>
        )}
        <div>{t('wind', { speed: item.wind?.speed })}</div>
        <div>
          {t('country', { country: item.sys?.country })}
          <span
            className={`${styles.icon} fi fi-${item.sys?.country.toLowerCase()}`}
          />
        </div>
      </div>
      <button
        onClick={() => onHandleRemove(index)}
        className={styles.weatherItemRemove}
      >
        x
      </button>
    </>
  );
};
