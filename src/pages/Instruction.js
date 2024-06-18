import React, { useState, useContext } from 'react';
import Instruction1 from '../components/instruction/Instruction1';
import Instruction2 from '../components/instruction/Instruction2';
import Instruction3 from '../components/instruction/Instruction3';
import Layout from '../components/Layout/Layout';
import DataContext from '../stores/DataContextProvider';

const Instruction = () => {
    const [step, setStep] = useState(1);
    const { data, levelCode } = useContext(DataContext);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const getInstructionData = (step) => {
        const moduleData = data.find(item => item.levelCode === levelCode);
        if (!moduleData) {
            console.error(`Instruction data for level code ${levelCode} not found`);
            return null;
        }
        return moduleData;
    };

    const instructionData = getInstructionData(step);

    if (!instructionData) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            {step === 1 && <Instruction1 instructionData={instructionData} onNext={handleNext} onBack={handleBack} />}
            {step === 2 && <Instruction2 instructionData={instructionData} onNext={handleNext} onBack={handleBack} />}
            {step === 3 && <Instruction3 instructionData={instructionData} onStart={() => console.log('Start')} onBack={handleBack} />}
        </Layout>
    );
};

export default Instruction;
