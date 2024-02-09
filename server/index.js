const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/weather', async (req, res) => {
  try {
    const cities = req.body.cities.split(',').map(city => city.trim());
    const weatherData = await getWeatherData(cities);
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

async function getWeatherData(cities) {
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
  const weatherData = [];

  for (const city of cities) {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const { main, weather } = response.data;
    weatherData.push({
      city,
      temperature: main.temp,
      humidity: main.humidity,
      conditions: weather[0].description,
    });
  }

  return weatherData;
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
