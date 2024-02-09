// WeatherInput.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import WeatherService from '../../services/WeatherService';
import Button from './Button';
import CitySuggestion from './CitySuggestion';

interface WeatherInputProps {
  onAddCity: (city: string) => void;
}

const WeatherInput: React.FC<WeatherInputProps> = ({ onAddCity }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchCityNames = async () => {
    try {
      const data = await WeatherService.getAllCities();

      if (Array.isArray(data) && data.every((item) => typeof item === 'string')) {
        return data;
      } else {
        throw new Error('Invalid data format received from the server');
      }
    } catch (error: any) {
      console.error('Error fetching city names:', error.message);
      return [];
    }
  };

  const filterSuggestions = (data: string[]) => {
    const regex = new RegExp(`^${query.replace(/[^\w\s()]/g, '')}`, 'i');
    const filteredCities = data.filter((city: string) => regex.test(city) && !/\d/.test(city));
    setSuggestions(filteredCities);
  };

  useEffect(() => {
    const fetchDataAndFilter = async () => {
      const data = await fetchCityNames();
      filterSuggestions(data);
    };

    const timeoutId = setTimeout(fetchDataAndFilter, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSuggestionClick = (selectedCity: string) => {
    setQuery(selectedCity);
    setSuggestions([]);
  };

  const handleAddCityClick = () => {
    if (query.trim() !== '') {
      onAddCity(query.trim());
      setQuery('');
      setSuggestions([]);
    }
  };

  return (
    <InputContainer>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter city name"
      />
      <Button onClick={handleAddCityClick} />
      <CitySuggestion
        suggestions={suggestions}
        show={suggestions.length > 0}
        onSuggestionClick={handleSuggestionClick}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default WeatherInput;
