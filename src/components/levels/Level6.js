

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../controllers/Dropdown';
import Button from '../controllers/Button';
import './Level.css';
import DataContext from '../../stores/DataContextProvider';

const Level6 = ({ levelData }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [inputValues, setInputValues] = useState({});
  const { updateSelectedOptions, updateTestdata } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (levelData) {
      const initialSelectedOptions = {};
      const initialInputValues = {};

      levelData.skillData.forEach(skill => {
        if (skill.type === 'dropdown') {
          initialSelectedOptions[skill.label] = skill.options[0].value;
        } else if (skill.type === 'text') {
          initialInputValues[skill.label] = '';
        }
      });

      setSelectedOptions(initialSelectedOptions);
      setInputValues(initialInputValues);
    }
  }, [levelData]);

  const handleDropdownSelect = (label, value) => {
    setSelectedOptions(prevState => ({ ...prevState, [label]: value }));
  };

  const handleTextChange = (label, value) => {
    setInputValues(prevState => ({ ...prevState, [label]: value }));     
  };
  const handleNext = () => {
    const selectedData = {
        Standard: selectedOptions.Standard,
        Variable: selectedOptions.Variable,
        ISI: inputValues.ISI,
        IBI: inputValues.IBI
    };

    if (Object.values(selectedData).every(value => value !== '' && value !== undefined)) {
        updateSelectedOptions(selectedData); // Update context with the selected options
        updateTestdata([selectedOptions.Standard, selectedOptions.Variable, inputValues.ISI, inputValues.IBI]);
        navigate('/instruction');
    } else {
        console.log("Please select all the fields");
    }
};

  const handleBack = () => {
    navigate(-1);
  };

  if (!levelData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="level-container">
      <div className="header-container">
        <h2>Select the options</h2>
      </div>
      <div className="content-container">
        {levelData.skillData.map((skill, index) => (
          <div key={index} className="skill-container">
            {skill.type === 'dropdown' && (
              <div className="element-container">
                <label>{skill.label}</label>
                <Dropdown
                  options={skill.options}
                  selectedOption={selectedOptions[skill.label] || skill.options[0].value}
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
                  value={inputValues[skill.label] || ''}
                  onChange={(e) => handleTextChange(skill.label, e.target.value)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="button-container">
        <Button buttonName="Back" handleClick={handleBack} />
        <Button buttonName="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default Level6;
