const axios = require('axios');
const Weather = require('../models/weatherModel');

class WeatherService {
  async getWeatherDataForCity(city) {
    try {
      const apiKey = 'de059d7ddc7c1894d486801b4938ee9f';
      
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      
      if (response.data.cod !== 200) {
        throw new Error(`Failed to fetch weather data for ${city}: ${response.data.message || 'Unknown error'}`);
      }

      const { main, weather } = response.data;
      return new Weather(city, main.temp, main.humidity, weather[0].description);
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching weather data for ${city}`);
    }
  }

  async getWeatherDataForCities(cityArray) {
    try {
      const apiKey = 'de059d7ddc7c1894d486801b4938ee9f';
      
      const weatherDataPromises = cityArray.map(async (city) => {
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
          
          if (response.data.cod !== 200) {
            throw new Error(`Failed to fetch weather data for ${city}: ${response.data.message || 'Unknown error'}`);
          }

          const { main, weather } = response.data;
          return new Weather(city, main.temp, main.humidity, weather[0].description);
        } catch (error) {
          console.error(error);
          return null; // If there's an error fetching data for a city, return null
        }
      });

      const weatherData = await Promise.all(weatherDataPromises);
      return weatherData.filter((data) => data !== null); // Filter out null values
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching weather data for cities');
    }
  }

  async getAllCities() {
    try {
      const response = await axios.get('https://countriesnow.space/api/v0.1/countries/population/cities');

      const cityNames = response.data.data.map((cityInfo) => cityInfo.city);
      return cityNames; // Limit to 5 cities for simplicity
    } catch (error) {
      console.error('Error fetching city names:', error);
      throw new Error('Error fetching city names');
    }
  }
}

module.exports = new WeatherService();
