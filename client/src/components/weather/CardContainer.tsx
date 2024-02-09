// WeatherCardContainer.tsx
import React from 'react';
import styled from 'styled-components';
import WeatherCard from './Card';
import WeatherData from '../../models/WeatherModel';

interface WeatherCardContainerProps {
  weatherData: WeatherData[];
}

const WeatherCardContainer: React.FC<WeatherCardContainerProps> = ({ weatherData }) => {
  return (
    <Container>
      {weatherData.map((data, index) => (
        <WeatherCard key={index} data={data} />
      ))}
    </Container>
  );
};

export default WeatherCardContainer;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 200px;
`;
