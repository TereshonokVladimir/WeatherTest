// WeatherInput.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import WeatherService from '../services/WeatherService';
import WeatherButton from './WeatherButton';

interface SuggestionsListProps {
  show: boolean;
}

interface WeatherInputProps {
  onAddCity: (city: string) => void;
}

const WeatherInput: React.FC<WeatherInputProps> = ({ onAddCity }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch city names with timeout
    const fetchCityNames = async () => {
      try {
        setLoading(true);
        setError(null);
  
        const data = await WeatherService.getAllCities();
        console.log('Received data:', data);
  
        if (Array.isArray(data) && data.every((item) => typeof item === 'string')) {
          const regex = new RegExp(`^${query.replace(/[^\w\s()]/g, '')}`, 'i');
          const filteredCities = data.filter((city: string) => regex.test(city));
  
          setSuggestions(filteredCities);
        } else {
          throw new Error('Invalid data format received from the server');
        }
      } catch (error:any) {
        console.error('Error fetching city names:', error.message);
        // setError('Error fetching city names'); // Commented out to avoid displaying error messages
      } finally {
        setLoading(false);
      }
    };
  
    // Set a timeout for 500ms after the last input change
    const timeoutId = setTimeout(fetchCityNames, 500);
  
    // Cleanup the timeout on component unmount or input changes
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
      <WeatherButton onClick={handleAddCityClick} />

      {/* {loading && <LoadingMessage>Loading...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>} */}

      <SuggestionsList show={suggestions.length > 0 && !loading && !error}>
  {suggestions.map((city) => (
    <SuggestionItem key={city} onClick={() => handleSuggestionClick(city)}>
      {city}
    </SuggestionItem>
  ))}
</SuggestionsList>
    </InputContainer>
  );
};

export default WeatherInput;


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

const LoadingMessage = styled.p`
  margin: 5px 0;
  color: #4caf50;
`;

const ErrorMessage = styled.p`
  margin: 5px 0;
  color: red;
`;

const SuggestionsList = styled.ul<SuggestionsListProps>`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-height: 120px;
  overflow-y: auto;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  position: absolute;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
`;

const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
