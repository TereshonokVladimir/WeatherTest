
// WeatherComponent.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import WeatherService from '../services/WeatherService';
import WeatherInput from '../components/weather/Input';
import WeatherCardContainer from '../components/weather/CardContainer';
import WeatherData from '../models/WeatherModel';
import GooglePassDefault from '../components/GooglePassDefault';

const WeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  const fetchWeatherData = async (city: string) => {
    try {
      const weatherData = await WeatherService.getCityWeather(city);
      return weatherData && weatherData.temperature !== undefined ? weatherData : null;
    } catch (error) {
      return null;
    }
  };
  
  const handleAddCity = async (input: string) => {
    try {
      const cityArray = input
        .split(',')
        .map((city) => city.trim())
        .filter((city) => city !== ''); // Remove empty strings
  
      const weatherDataArray = await Promise.all(
        cityArray.map(async (city) => fetchWeatherData(city))
      );
  
      const validWeatherDataArray = weatherDataArray.filter((data) => data !== null);
  
      setWeatherData((prevData) => [...prevData, ...validWeatherDataArray]);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <WeatherContainer>
      <GooglePassDefault/>
      <WeatherInput onAddCity={handleAddCity} />
      <WeatherCardContainer weatherData={weatherData} />
    </WeatherContainer>
  );
};

export default WeatherPage;

const WeatherContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;
