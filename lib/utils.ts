import { KEVIN_TEMPERATURE } from '@/lib/constants';
import { WeatherData } from '@/types/common';

export const kelvinToCelsius = (kelvin: number) => {
  return Math.round((kelvin - KEVIN_TEMPERATURE) * 100) / 100;
};

export const getIconUrl = (item: WeatherData) => {
  const URL = process.env.NEXT_PUBLIC_WEATHER_ICON || '';
  if (item?.weather && item.weather.length > 0) {
    return URL + item?.weather[0]?.icon + '@2x.png';
  }
  return '';
};
