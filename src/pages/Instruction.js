import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import DataContext from '../stores/DataContextProvider';
import dataFlow from '../utils/Dataflow.json'; // Adjust the path as necessary
import './Instruction.css';

const Instruction = () => {
  const { levelCode, skillCode, instruction, updateInstruction, testCode, updateTestCode } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedOptions } = location.state || {};

  useEffect(() => {
    const fetchInstructionData = () => {
      let foundInstruction = null;

      const searchInstruction = (items) => {
        if (!Array.isArray(items)) {
          return;
        }
        for (const item of items) {
          if (item.levelCode === levelCode && item.skillCode === skillCode) {
            foundInstruction = item;
            console.log('Found Instruction:', foundInstruction);
            return;
          }
          if (item.item && Array.isArray(item.item)) {
            searchInstruction(item.item);
          }
          if (foundInstruction) return;
        }
      };

      if (Array.isArray(dataFlow.dataFlow)) {
        searchInstruction(dataFlow.dataFlow);
      } else {
        console.error("Invalid dataFlow structure.");
      }

      updateInstruction(foundInstruction ? foundInstruction.instruction : null);
      updateTestCode(foundInstruction ? foundInstruction.testCode : 1); // Update testCode based on found instruction
    };

    fetchInstructionData();
  }, [levelCode, skillCode, updateInstruction, updateTestCode]);

  const handleNext = () => {
    console.log('Navigating to TestScreen with testCode:', testCode);

    switch (testCode) {
      case 1:
        console.log('Navigating to TestScreen1');
        navigate('/testscreen1', { state: { selectedOptions } });
        break;
      case 2:
        console.log('Navigating to TestScreen2');
        navigate('/testscreen2', { state: { selectedOptions } });
        break;
      case 3:
        console.log('Navigating to TestScreen3');
        navigate('/testscreen3', { state: { selectedOptions } });
        break;
        case 4:
          console.log('Navigating to TestScreen4');
          navigate('/testscreen4', { state: { selectedOptions } });
          break;
      default:
        console.error('Invalid testCode:', testCode);
        navigate('/home'); // Fallback in case of an invalid testCode
    }
  };

  const handleBack = () => {
    navigate('/home');
  };

  if (!instruction) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="instruction-container">
        <h1>Instruction</h1>
        <p>{instruction}</p>
        <div className="button-container">
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Start</button>
        </div>
      </div>
    </Layout>
  );
};

export default Instruction;
