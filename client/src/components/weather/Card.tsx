import React from 'react';
import styled from 'styled-components';
import WeatherData from '../../models/WeatherModel';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <CardContainer>
      <CityLabel>{data.city}</CityLabel>
      <TemperatureLabel>{data.temperature}°C</TemperatureLabel>
      <DetailsContainer>
        <Detail>
          <DetailLabel>Humidity</DetailLabel>
          <DetailValue>{data.humidity}%</DetailValue>
        </Detail>
        <Detail>
          <DetailLabel>Conditions</DetailLabel>
          <DetailValue>{data.conditions}</DetailValue>
        </Detail>
      </DetailsContainer>
    </CardContainer>
  );
};

export default WeatherCard;

const CardContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
  padding: 20px;
  margin: 10px;
`;

const CityLabel = styled.h2`
  font-size: 24px;
  margin: 0;
  color: #333333;
`;

const TemperatureLabel = styled.h1`
  font-size: 36px;
  margin: 15px 0;
  color: #ff6600;
`;

const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Detail = styled.div`
  flex: 1;
  padding: 10px;
`;

const DetailLabel = styled.p`
  font-weight: bold;
  margin: 0;
  color: #666666;
`;

const DetailValue = styled.p`
  margin: 0;
  color: #333333;
  font-weight: 700;
`;
