import React, { useState, useEffect, useContext } from 'react';
import Dropdown from '../controllers/Dropdown';
import Button from '../controllers/Button';
import DataContext from '../../stores/DataContextProvider';
import './Level.css';

const numberToStringMap = {
  1: 'onesti',
  2: 'twosti',
  3: 'threesti',
  4: 'foursti',
  5: 'fivesti',
  6: 'sixsti',
  7: 'sevensti',
  8: 'eightsti',
  9: 'ninesti',
  10: 'tensti',
  11: 'elevensti',
  12: 'twelfsti',
  13: 'thirteensti',
  14: 'fourteensti',
  15: 'fifteensti',
};

const Level2 = ({ onNext, onPrev, levelData }) => {
  const { 
    updateSelectedOptions, 
    updateDuration, 
    updateNumberOfStimuli, 
    updateResponseWindow, 
    updateFolderPath 
  } = useContext(DataContext);
  
  const [selectedOptions, setSelectedOptions] = useState({});
  const [inputValues, setInputValues] = useState({});
  
  const baseFolderPath = "D:\\ICMR-MAIN\\backend\\audiofiles\\cognition\\cognitive\\cogsustained\\cogsylsus";

  useEffect(() => {
    if (levelData) {
      const initialSelectedOptions = {};
      const initialInputValues = {};

      levelData.skillData.forEach(skill => {
        if (skill.type === 'dropdown') {
          initialSelectedOptions[skill.label] = skill.options[0];
        } else if (skill.type === 'text') {
          initialInputValues[skill.label] = '';
        }
      });

      setSelectedOptions(initialSelectedOptions);
      setInputValues(initialInputValues);
    }
  }, [levelData]);

  const handleDropdownSelect = (label, value) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [label]: value,
    }));
  };

  const handleTextChange = (label, value) => {
    setInputValues(prevState => ({
      ...prevState,
      [label]: value,
    }));
  };

  const handleNext = () => {
    const selectedStimuli = selectedOptions["Number of Stimuli"];
    const numberOfStimuli = parseInt(selectedStimuli.label, 10);

    console.log('Selected Number of Stimuli:', selectedStimuli);

    if (isNaN(numberOfStimuli) || numberOfStimuli <= 0) {
      console.log("Invalid number of stimuli selected.");
      return;
    }

    const folderName = numberToStringMap[numberOfStimuli] || '';
    if (!folderName) {
      console.log("No folder name found for the selected number of stimuli.");
      return;
    }

    console.log('Parsed Number of Stimuli:', numberOfStimuli);

    const duration = parseInt(selectedOptions["Time Duration"].label, 10) || 5;
    const responseWindow = parseInt(inputValues["Response Window"], 10) || 1000;

    const folderPath = `${baseFolderPath}\\${folderName}`;
    console.log('Updated Folder Path:', folderPath);

    // Update the context with the selected options
    const updatedOptions = {
      'Time Duration': selectedOptions["Time Duration"],
      'Number of Stimuli': selectedOptions["Number of Stimuli"],
      'Response Window': responseWindow
    };
    
    updateSelectedOptions(updatedOptions);
    console.log('Updated Selected Options:', updatedOptions);
    
    updateDuration(duration * 60000); // Convert minutes to milliseconds
    console.log('Updated Duration:', duration * 60000);
    
    updateNumberOfStimuli(numberOfStimuli);
    console.log('Updated Number of Stimuli:', numberOfStimuli);
    
    updateResponseWindow(responseWindow);
    console.log('Updated Response Window:', responseWindow);
    
    updateFolderPath(folderPath);
    console.log('Updated Folder Path:', folderPath);

    onNext();
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
                  selectedOption={selectedOptions[skill.label]} 
                  onSelect={(value) => handleDropdownSelect(skill.label, value)}
                />
              </div>
            )}
            {skill.type === 'text' && (
              <div className="element-container">
                <label>{skill.label}(ms)</label>
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
        <Button buttonName="Back" handleClick={onPrev} />
        <Button buttonName="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default Level2;
