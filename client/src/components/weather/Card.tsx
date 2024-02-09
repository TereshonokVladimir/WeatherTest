import React from 'react';
import styled from 'styled-components';
import WeatherData from '../../models/WeatherModel';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <CardContainer>
      <CardContent>
        <CityLabel>{data.city}</CityLabel>
      </CardContent>
      <CardContent>
        <TemperatureLabel>{data.temperature}°C</TemperatureLabel>
      </CardContent>
      <CardContent>
        <DetailsLabel>Humidity:</DetailsLabel>
        <DetailsValue>{data.humidity}%</DetailsValue>
      </CardContent>
      <CardContent>
        <DetailsLabel>Conditions:</DetailsLabel>
        <DetailsValue>{data.conditions}</DetailsValue>
      </CardContent>
    </CardContainer>
  );
};

export default WeatherCard;

const CardContainer = styled.div`
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
  padding: 20px;
  margin: 10px;
`;

const CardContent = styled.div`
  margin-bottom: 15px;
`;

const CityLabel = styled.h2`
  font-size: 24px;
  margin: 0;
  color: #333;
`;

const TemperatureLabel = styled.h1`
  font-size: 36px;
  margin: 0;
  color: #ff6600;
`;

const DetailsLabel = styled.p`
  font-weight: bold;
  margin: 0;
  color: #666;
`;

const DetailsValue = styled.p`
  margin: 0;
  color: #333;
`;
