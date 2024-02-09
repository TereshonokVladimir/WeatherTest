class Weather {
  constructor(city, temperature, humidity, conditions) {
    this.city = city;
    this.temperature = temperature;
    this.humidity = humidity;
    this.conditions = conditions;
  }
}

module.exports = Weather;