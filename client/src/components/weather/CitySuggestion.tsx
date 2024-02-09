// CitySuggestions.tsx
import React from 'react';
import styled from 'styled-components';

interface CitySuggestionsProps {
  suggestions: string[];
  show: boolean;
  onSuggestionClick: (selectedCity: string) => void;
}

const CitySuggestions: React.FC<CitySuggestionsProps> = ({
  suggestions,
  show,
  onSuggestionClick,
}) => (
  <SuggestionsList show={show}>
    {suggestions.map((city) => (
      <SuggestionItem key={city} onClick={() => onSuggestionClick(city)}>
        {city}
      </SuggestionItem>
    ))}
  </SuggestionsList>
);

const SuggestionsList = styled.ul<{ show: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 120px;
  overflow-y: auto;
  width: 339px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  position: absolute;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  left: 50%;
  top: 50%;
  transform: translate(-50%, 20px);
`;

const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default CitySuggestions;
