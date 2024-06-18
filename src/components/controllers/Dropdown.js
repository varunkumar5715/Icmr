import React, { useState } from 'react';
import './Dropdown.css';

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false); 
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle"
        type="button"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {selectedOption ? selectedOption.label : 'Select an option'}
        <span className="dropdown-symbol">&#9662;</span>
      </button>
      <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        {options.map((option, index) => (
          <div
            key={index}
            className="dropdown-item"
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;

