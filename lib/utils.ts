import { KEVIN_TEMPERATURE } from '@/lib/constants';

export const kelvinToCelsius = (kelvin: number) => {
  return Math.round((kelvin - KEVIN_TEMPERATURE) * 100) / 100;
};
