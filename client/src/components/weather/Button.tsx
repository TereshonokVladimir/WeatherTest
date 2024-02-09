import React from 'react';
import styled from 'styled-components';

interface AddCityButtonProps {
  onClick: () => void;
}

const AddCityButton: React.FC<AddCityButtonProps> = ({ onClick }) => {
  return <StyledButton onClick={onClick}>See Weather</StyledButton>;
};

const StyledButton = styled.button`
  padding: 8px 12px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

export default AddCityButton;
