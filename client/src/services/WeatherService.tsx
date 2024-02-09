// WeatherService.ts

import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/weather'; // Update with your backend URL

const WeatherService = {
  async getAllCities(): Promise<string[]> {
    try {
      const response = await axios.get(`${BASE_URL}/cities`);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      return [];
    }
  },

  async getCityWeather(city: string): Promise<any> {
    try {
      const response = await axios.get(`${BASE_URL}/city/${encodeURIComponent(city)}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching weather for ${city}:`, error);
      return null;
    }
  },
};

export default WeatherService;
