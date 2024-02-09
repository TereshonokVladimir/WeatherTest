const express = require('express');
const weatherController = require('../controllers/weatherController');

const router = express.Router();

// Handle both GET and POST requests for weather
router.get('/weather/city/:city', weatherController.getWeatherForCity);
// router.post('/weather/cities', weatherController.getWeatherForCities);

// New route for fetching all city names
router.get('/weather/cities', weatherController.getAllCities);

// Simple route to handle GET requests to the root
router.get('/', (req, res) => {
  res.send('Welcome to the Weather App!');
});

module.exports = router;
