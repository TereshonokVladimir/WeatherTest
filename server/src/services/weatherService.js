const axios = require('axios');
const Weather = require('../models/weatherModel');

class WeatherService {
  async getWeatherDataForCity(city) {
    try {
      const apiKey = 'de059d7ddc7c1894d486801b4938ee9f';
      
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const { main, weather } = response.data;
      
      return new Weather(city, main.temp, main.humidity, weather[0].description);
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching weather data for the city');
    }
  }

  async getWeatherDataForCities(cityArray) {
    try {
      const apiKey = 'de059d7ddc7c1894d486801b4938ee9f';
      
      const weatherDataPromises = cityArray.map(async (city) => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const { main, weather } = response.data;
        
        return new Weather(city, main.temp, main.humidity, weather[0].description);
      });

      const weatherData = await Promise.all(weatherDataPromises);
      return weatherData;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching weather data for cities');
    }
  }
}

module.exports = new WeatherService();
