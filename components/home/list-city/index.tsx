'use client';

import styles from '@/app/[locale]/home/home.module.css';
import { getIconUrl, kelvinToCelsius } from '@/lib/utils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { WeatherData } from '@/types/common';
import Image from 'next/image';

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
        <Image src={getIconUrl(item)} alt="icon" width={48} height={48} />
        {item?.weather && item.weather.length > 0 && (
          <div>
            {t('weather', {
              main: item.weather[0].main,
              description: item.weather[0].description,
            })}
          </div>
        )}
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
