import React, { useState } from 'react';
import Instruction1 from '../components/instruction/Instruction1';
import Instruction2 from '../components/instruction/Instruction2';
import Instruction3 from '../components/instruction/Instruction3';
import Layout from '../components/Layout/Layout';

const Instruction = () => {
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    return (
        <Layout>  
            {step === 1 && <Instruction1 onNext={handleNext} />}
            {step === 2 && <Instruction2 onNext={handleNext} onBack={handleBack} />}
            {step === 3 && <Instruction3 onStart={() => console.log('Start')} onBack={handleBack} />}
            </Layout>
    );
};

export default Instruction;
