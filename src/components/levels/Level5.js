import React, { useState, useEffect, useContext } from 'react';
import Dropdown from '../controllers/Dropdown';
import Button from '../controllers/Button';
import './Level.css';
import DataContext from '../../stores/DataContextProvider';
import { useNavigate } from 'react-router-dom';

const Level5 = ({ onPrev, levelData }) => {
  const { updateSelectedOptions, updateTestdata } = useContext(DataContext);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [filteredNoiseLevelOptions, setFilteredNoiseLevelOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (levelData) {
      const initialSelectedOptions = {};
      const initialInputValues = {};
      const noiseLevelOptions = levelData.skillData.find(skill => skill.label === 'Noise level').options;

      levelData.skillData.forEach(skill => {
        if (skill.type === 'dropdown') {
          initialSelectedOptions[skill.label] = skill.options[0]; // Store full object
        } else if (skill.type === 'text') {
          initialInputValues[skill.label] = '';
        }
      });

      setSelectedOptions(initialSelectedOptions);
      setInputValues(initialInputValues);
      setFilteredNoiseLevelOptions(noiseLevelOptions);
    }
  }, [levelData]);

  const handleDropdownSelect = (label, value) => {
    setSelectedOptions(prevState => {
      const newSelectedOptions = { ...prevState, [label]: value };

      if (label === 'Noise type') {
        if (value.value === 'nonoise') {
          // Show only "Quiet" in Noise level dropdown
          setFilteredNoiseLevelOptions([{ label: 'Quiet', value: 'Quiet' }]);
          // Do not auto-select "Quiet", just update options
        } else {
          const allNoiseLevels = levelData.skillData.find(skill => skill.label === 'Noise level').options;
          const filteredOptions = allNoiseLevels.filter(option => option.value !== 'Quiet');
          setFilteredNoiseLevelOptions(filteredOptions);
          // Select the first available option other than "Quiet"
          newSelectedOptions['Noise level'] = filteredOptions[0];
        }
      }

      console.log('Updated selected options:', newSelectedOptions);

      return newSelectedOptions;
    });
  };

  const handleTextChange = (label, value) => {
    setInputValues(prevState => ({ ...prevState, [label]: value }));
  };

  const handleNext = () => {
    updateSelectedOptions(selectedOptions);

    const noiseTypeValue = selectedOptions['Noise type']?.value;
    const noiseLevelValue = selectedOptions['Noise level']?.value;

    if (!noiseTypeValue || !noiseLevelValue) {
      console.error('Noise type or Noise level not selected.');
      return;
    }

    // Ensure values are strings
    const filePath = `audiofiles/auditory/auddisspe/audiword/${noiseTypeValue}/${noiseLevelValue}/one.wav`;

    console.log('Generated audio path:', filePath);

    updateTestdata({
      selectedOptions,
      audioPath: filePath,
    });

    navigate('/instruction');
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
            {skill.type === 'dropdown' && skill.label === 'Noise type' && (
              <div className="element-container">
                <label>{skill.label}</label>
                <Dropdown
                  options={skill.options}
                  selectedOption={selectedOptions[skill.label]?.value} // Pass the value for Dropdown
                  onSelect={(value) => handleDropdownSelect(skill.label, value)}
                />
              </div>
            )}

            {skill.type === 'dropdown' && skill.label === 'Noise level' && (
              <div className="element-container">
                <label>{skill.label}</label>
                <Dropdown
                  options={filteredNoiseLevelOptions}
                  selectedOption={selectedOptions[skill.label]?.value} // Pass the value for Dropdown
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
        <Button buttonName="Back" handleClick={onPrev} />
        <Button buttonName="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default Level5;
