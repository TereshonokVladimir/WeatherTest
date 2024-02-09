// WeatherCard.tsx
import React from 'react';
import styled from 'styled-components';
import WeatherData from '../models/WeatherModel';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <CardContainer>
      <CardContent>
        <InfoLabel>City:</InfoLabel>
        <InfoValue>{data.city}</InfoValue>
      </CardContent>
      <CardContent>
        <InfoLabel>Temperature:</InfoLabel>
        <InfoValue>{data.temperature}</InfoValue>
      </CardContent>
      <CardContent>
        <InfoLabel>Humidity:</InfoLabel>
        <InfoValue>{data.humidity}</InfoValue>
      </CardContent>
      <CardContent>
        <InfoLabel>Conditions:</InfoLabel>
        <InfoValue>{data.conditions}</InfoValue>
      </CardContent>
      <Separator />
    </CardContainer>
  );
};

export default WeatherCard;

const CardContainer = styled.div`
  margin: 10px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  width: 300px;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const InfoLabel = styled.p`
  font-weight: bold;
`;

const InfoValue = styled.p`
  margin-left: 10px;
`;

const Separator = styled.hr`
  border: 0.5px solid #ccc;
  margin-top: 15px;
`;

