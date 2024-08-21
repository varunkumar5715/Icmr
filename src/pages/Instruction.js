

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import DataContext from '../stores/DataContextProvider';
import dataFlow from '../utils/Dataflow.json'; // Adjust the path as necessary
import './Instruction.css'; // Import the CSS file

const Instruction = () => {
  const [step, setStep] = useState(1);
  const { levelCode, skillCode, instruction, updateInstruction } = useContext(DataContext);
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
            return;
          }
          if (item.item && Array.isArray(item.item)) {
            searchInstruction(item.item);
          }
          if (foundInstruction) return;
        }
      };

      // Ensure dataFlow.dataFlow is an array
      if (Array.isArray(dataFlow.dataFlow)) {
        searchInstruction(dataFlow.dataFlow);
      } else {
        console.error("Invalid dataFlow structure.");
      }

      updateInstruction(foundInstruction ? foundInstruction.instruction : null);
    };

    fetchInstructionData();
  }, [levelCode, skillCode, updateInstruction]);

  const handleNext = () => {
    navigate('/testscreen', { state: { selectedOptions } });
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
        <p>{Array.isArray(instruction) ? instruction.join(' ') : instruction}</p>
        <div className="button-container">
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </Layout>
  );
};

export default Instruction;
