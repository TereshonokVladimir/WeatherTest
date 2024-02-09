const weatherService = require('../services/weatherService');

class WeatherController {
  async getWeatherForCity(req, res) {
    try {
      const city = req.params.city;
      
      if (!city || city.trim() === '') {
        return res.status(400).json({ error: 'City parameter is missing or empty' });
      }

      const data = await weatherService.getWeatherDataForCity(city);
      
      if (!data) {
        return res.status(404).json({ error: `Weather data not found for ${city}` });
      }

      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getWeatherForCities(req, res) {
    try {
      const cities = req.body.cities;

      if (!cities || cities.trim() === '') {
        return res.status(400).json({ error: 'Cities parameter is missing or empty' });
      }

      const cityArray = cities.split(',').map(city => city.trim());
      const data = await weatherService.getWeatherDataForCities(cityArray);

      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getAllCities(req, res) {
    try {
      const cities = await weatherService.getAllCities();
      res.json(cities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new WeatherController();
