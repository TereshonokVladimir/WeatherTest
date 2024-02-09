const weatherService = require('../services/weatherService');

class WeatherController {
  async getWeatherForCity(req, res) {
    try {
      const city = req.params.city; // Assuming the city is a URL parameter
      const data = await weatherService.getWeatherDataForCity(city);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getWeatherForCities(req, res) {
    try {
      const cities = req.body.cities.split(',').map(city => city.trim());
      const data = await weatherService.getWeatherDataForCities(cities);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new WeatherController();
