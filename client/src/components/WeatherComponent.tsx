// WeatherComponent.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import WeatherService from '../services/WeatherService';
import WeatherInput from './WeatherInput';
import WeatherCard from './WeatherCard';
import WeatherData from '../models/WeatherModel';

const WeatherComponent: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  const handleAddCity = async (input: string) => {
    try {
      const cityArray = input
        .split(',')
        .map((city) => city.trim())
        .filter((city) => city !== ''); // Remove empty strings
  
      const weatherDataArray = await Promise.all(
        cityArray.map(async (city) => {
          try {
            const weatherData = await WeatherService.getCityWeather(city);
            // Check if the weather data is valid (you can modify this condition based on your actual data structure)
            if (weatherData && weatherData.temperature !== undefined) {
              return weatherData;
            }
            console.warn(`Invalid data for ${city}`);
            return null;
          } catch (error) {
            console.error(`Error fetching data for ${city}`, error);
            return null;
          }
        })
      );
      // Filter out null values (cities with invalid or missing data)
      const validWeatherDataArray = weatherDataArray.filter((data) => data !== null);
  
      setWeatherData((prevData) => [...prevData, ...validWeatherDataArray]);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <WeatherContainer>
      <WeatherInput onAddCity={handleAddCity} />
      <WeatherCardContainer>
        {weatherData.map((data, index) => (
          <WeatherCard key={index} data={data} />
        ))}
      </WeatherCardContainer>
    </WeatherContainer>
  );
};

export default WeatherComponent;

const WeatherContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const WeatherCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top:200px;
`;

