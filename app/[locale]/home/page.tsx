'use client';

import React, { useState, useEffect, useRef } from 'react';
import LanguageSwitcher from '@/components/language-switcher';
import Service from '@/services';
import { WeatherData } from '@/types/common';
import styles from './home.module.css';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { kelvinToCelsius } from '@/lib/utils';
import { InputSearch } from '@/components/home/input-search';
import { SliderTemperature } from '@/components/home/slider-temperature';
import { ListCity } from '@/components/home/list-city';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<WeatherData>();
  const [selectedItem, setSelectedItem] = useState<WeatherData | null>(null);
  const [selectedCities, setSelectedCities] = useState<WeatherData[]>([]);
  const [warmerThan, setWarmerThan] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [noDataAvailable, setNoDataAvailable] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const storedCities = localStorage.getItem('selectedCities');
    if (storedCities) {
      setSelectedCities(JSON.parse(storedCities));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedCities', JSON.stringify(selectedCities));
  }, [selectedCities]);

  useEffect(() => {
    const delayedSearch = setTimeout(async () => {
      if (searchTerm) {
        setIsLoading(true);
        setNoDataAvailable(false);
        const results = await Service.Weather.searchCities(searchTerm);
        setSearchResults(results);
        if (Object.keys(results).length === 0) {
          setNoDataAvailable(true);
        }
        setIsLoading(false);
      } else {
        setSearchResults({});
        setNoDataAvailable(false);
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  useEffect(() => {
    if (
      !selectedItem &&
      searchResults &&
      Object.keys(searchResults).length > 0
    ) {
      setSelectedItem(searchResults);
    }
  }, [searchResults]);

  const handleSelect = (item: WeatherData) => {
    if (selectedCities.some(city => city.name === item.name)) {
      alert(t('cityExisted'));
      return;
    }

    setSelectedCities([...selectedCities, item]);
    setSelectedItem(null);
    setSearchTerm('');
    searchInputRef.current?.blur();
  };

  const handleRemove = (index: number) => {
    setSelectedCities(selectedCities.filter((_, i) => i !== index));
  };

  const filteredCities = selectedCities.filter(city => {
    const tempValue = city.main?.temp;
    return (
      typeof tempValue === 'number' && kelvinToCelsius(tempValue) >= warmerThan
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <div />
          <div className={styles.icons}>
            {/*TODO: implement after*/}
            {/*<ModeToggle /> */}
            <LanguageSwitcher />
          </div>
        </div>

        {/* Body */}
        <div>
          <div className={styles.bodyTitle}>{t('titleApp')}</div>

          {/*Input search*/}
          <InputSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchInputRef={searchInputRef}
            isLoading={isLoading}
            noDataAvailable={noDataAvailable}
          />

          {/*City suggest*/}
          {searchResults && Object.keys(searchResults).length > 0 && (
            <div className={styles.searchResults}>
              <div className={styles.searchItem}>
                {searchResults.name}
                <div className={styles.selectButtonContainer}>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleSelect(searchResults);
                    }}
                    className={styles.selectButton}
                  >
                    {t('select')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/*Slider temperature*/}
          <SliderTemperature
            warmerThan={warmerThan}
            setWarmerThan={setWarmerThan}
          />

          {/*List city*/}
          <div className={styles.weatherItems}>
            {filteredCities.map((item, index) => (
              <div key={index} className={styles.weatherItem}>
                <ListCity
                  item={item}
                  onHandleRemove={handleRemove}
                  index={index}
                />
              </div>
            ))}
          </div>

          {/*No data*/}
          {(!filteredCities || !filteredCities.length) && (
            <div className={styles.noData}>
              <Image
                src={'/images/no-data-city.svg'}
                width={250}
                height={250}
                alt="No data"
              />
              <div>{t('noDataList')}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
