import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Dropdown from '../controllers/Dropdown';
import Button from '../controllers/Button';
import './Level.css';

const Level1 = ({ onNext, onPrev, levelData }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [inputValues, setInputValues] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDropdownSelect = (label, value) => {
    setSelectedOptions(prevState => ({ ...prevState, [label]: value }));
  };

  const handleTextChange = (label, value) => {
    setInputValues(prevState => ({ ...prevState, [label]: value }));
  };

  const handleBack = () => {
    onPrev(); // Use onPrev function to navigate back
  };

  if (!levelData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="level-container">
      <div className="header-container">
        <h1>Level {levelData.levelCode}</h1>
      </div>
      <div className="content-container">
        {levelData.skillData.map((skill, index) => (
          <div key={index} className="skill-container">
            {skill.type === 'dropdown' && (
              <div className="element-container">
                <label>{skill.label}</label>
                <Dropdown
                  options={skill.options}
                  selectedOption={selectedOptions[skill.label]}
                  onSelect={(value) => handleDropdownSelect(skill.label, value)}
                />
              </div>
            )}
            {skill.type === 'text' && (
              <div className="element-container">
                <label>{skill.label}</label>
                <input
                  type="text"
                  placeholder={skill.placeholder}
                  value={inputValues[skill.label]}
                  onChange={(e) => handleTextChange(skill.label, e.target.value)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="button-container">
        <Button buttonName="Back" handleClick={handleBack} />
        <Button buttonName="Next" handleClick={onNext} />
      </div>
    </div>
  );
}

export default Level1;
