import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import DataContext from '../stores/DataContextProvider';
import dataFlow from '../utils/Dataflow.json'; // Adjust the path as necessary
import './Instruction.css'; // Import the CSS file

const Instruction = () => {
    const [step, setStep] = useState(1);
    const { levelCode, skillCode } = useContext(DataContext); // Assuming skillCode is also provided by DataContext
    const [instructionData, setInstructionData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Fetching instruction data for levelCode:", levelCode, "and skillCode:", skillCode);

        const fetchInstructionData = () => {
            let foundInstruction = null;

            const searchInstruction = (items) => {
                for (const item of items) {
                    if (item.levelCode === levelCode && item.skillCode === skillCode) {
                        foundInstruction = item;
                        return;
                    }
                    if (item.item && item.item.length > 0) {
                        searchInstruction(item.item);
                    }
                    if (foundInstruction) return;
                }
            };

            searchInstruction(dataFlow.dataFlow);

            console.log("Fetched instruction data:", foundInstruction);
            setInstructionData(foundInstruction);
        };

        fetchInstructionData();
    }, [levelCode, skillCode]);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        // Navigate back to the previous page or level page
        navigate(-1);
    };

    if (!instructionData) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <div className="instruction-container">
                <h1>Instruction</h1>
                <p>{Array.isArray(instructionData.instruction) ? instructionData.instruction.join(' ') : instructionData.instruction}</p>
                <h1>Example</h1>
                {instructionData.example && <p className="example">{instructionData.example}</p>}
                <div className="button-container">
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            </div>
        </Layout>
    );
};

export default Instruction;


