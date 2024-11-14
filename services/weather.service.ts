import axiosInstance from './axios-instance';
import endpoints from './endpoints';
import { WeatherData } from '@/types/common';
import axios, { AxiosError } from 'axios';

const weatherService = {
  searchCities: async (searchTerm: string): Promise<WeatherData> => {
    try {
      const response = await axiosInstance.get(endpoints.openWeather.find, {
        params: {
          q: searchTerm,
          appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleApiError(error);
      } else {
        console.error('Error:', error);
      }
      return {};
    }
  },
};

const handleApiError = (error: AxiosError) => {
  if (error.response) {
    console.error('API response:', error.response.data);
  } else {
    console.error('Error:', error.message);
  }
};

export default weatherService;
