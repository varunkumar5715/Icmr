// import React, { useState, useContext } from 'react';
// import Instruction1 from '../components/instruction/Instruction1';
// import Instruction2 from '../components/instruction/Instruction2';
// import Instruction3 from '../components/instruction/Instruction3';
// import Layout from '../components/Layout/Layout';
// import DataContext from '../stores/DataContextProvider';

// const Instruction = () => {
//     const [step, setStep] = useState(1);
//     const { data, levelCode } = useContext(DataContext);

//     const handleNext = () => {
//         setStep(step + 1);
//     };

//     const handleBack = () => {
//         setStep(step - 1);
//     };

//     const getInstructionData = (step) => {
//         const moduleData = data.find(item => item.levelCode === levelCode);
//         if (!moduleData) {
//             console.error(`Instruction data for level code ${levelCode} not found`);
//             return null;
//         }
//         return moduleData;
//     };

//     const instructionData = getInstructionData(step);

//     if (!instructionData) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <Layout>
//             {step === 1 && <Instruction1 instructionData={instructionData} onNext={handleNext} onBack={handleBack} />}
//             {step === 2 && <Instruction2 instructionData={instructionData} onNext={handleNext} onBack={handleBack} />}
//             {step === 3 && <Instruction3 instructionData={instructionData} onStart={() => console.log('Start')} onBack={handleBack} />}
//         </Layout>
//     );
// };




// import React, { useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Layout from '../components/Layout/Layout';
// import DataContext from '../stores/DataContextProvider';
// import dataFlow from '../utils/Dataflow.json'; // Adjust the path as necessary

// const Instruction = () => {
//     const [step, setStep] = useState(1);
//     const { levelCode } = useContext(DataContext);
//     const [instructionData, setInstructionData] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         console.log("Fetching instruction data for levelCode:", levelCode);
//         // Fetch instruction data based on the level code
//         const fetchInstructionData = () => {
//             let foundInstruction = null;
//             for (const category of dataFlow.dataFlow) {
//                 for (const subCategory of category.item) {
//                     for (const task of subCategory.item) {
//                         if (task.levelCode === levelCode) {
//                             foundInstruction = task;
//                             break;
//                         }
//                     }
//                     if (foundInstruction) break;
//                 }
//                 if (foundInstruction) break;
//             }
//             console.log("Fetched instruction data:", foundInstruction);
//             setInstructionData(foundInstruction);
//         };

//         fetchInstructionData(); // Call fetchInstructionData when levelCode changes
//     }, [levelCode]);

//     const handleNext = () => {
//         setStep(step + 1);
//     };

//     const handleBack = () => {
//         setStep(step - 1);
//     };

//     if (!instructionData) {
//         return <div>Loading...</div>; // Show loading message while instruction data is being fetched
//     }

//     return (
//         <Layout>
//             <div>
//                 <h1>Instruction</h1>
//                 <p>{instructionData.instruction}</p> {/* Display instruction */}
//                 <div>
//                     <button onClick={handleBack} disabled={step === 1}>Back</button>
//                     <button onClick={handleNext}>Next</button>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default Instruction;



// import React, { useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import Layout from '../components/Layout/Layout';
// import DataContext from '../stores/DataContextProvider';
// import dataFlow from '../utils/Dataflow.json'; // Adjust the path as necessary
// import './Instruction.css'; // Import the CSS file

// const Instruction = () => {
//     const [step, setStep] = useState(1);
//     const { levelCode } = useContext(DataContext);
//     const [instructionData, setInstructionData] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         console.log("Fetching instruction data for levelCode:", levelCode);

//         const fetchInstructionData = () => {
//             let foundInstruction = null;

//             const searchInstruction = (items) => {
//                 for (const item of items) {
//                     if (item.levelCode === levelCode) {
//                         foundInstruction = item;
//                         return;
//                     }
//                     if (item.item && item.item.length > 0) {
//                         searchInstruction(item.item);
//                     }
//                     if (foundInstruction) return;
//                 }
//             };

//             searchInstruction(dataFlow.dataFlow);

//             console.log("Fetched instruction data:", foundInstruction);
//             setInstructionData(foundInstruction);
//         };

//         fetchInstructionData();
//     }, [levelCode]);

//     const handleNext = () => {
//         setStep(step + 1);
//     };

//     const handleBack = () => {
//         setStep(step - 1);
//     };

//     if (!instructionData) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <Layout>
//             <div className="instruction-container">
//                 <h1>Instruction</h1>
//                 <p>{Array.isArray(instructionData.instruction) ? instructionData.instruction.join(' ') : instructionData.instruction}</p>
//                 <div className="button-container">
//                     <button onClick={handleBack} disabled={step === 1}>Back</button>
//                     <button onClick={handleNext}>Next</button>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default Instruction;



// import React, { useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Layout from '../components/Layout/Layout';
// import DataContext from '../stores/DataContextProvider';
// import dataFlow from '../utils/Dataflow.json'; // Adjust the path as necessary
// import './Instruction.css'; // Import the CSS file

// const Instruction = () => {
//     const [step, setStep] = useState(1);
//     const { levelCode } = useContext(DataContext);
//     const [instructionData, setInstructionData] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         console.log("Fetching instruction data for levelCode:", levelCode);

//         const fetchInstructionData = () => {
//             let foundInstruction = null;

//             const searchInstruction = (items) => {
//                 for (const item of items) {
//                     if (item.levelCode === levelCode) {
//                         foundInstruction = item;
//                         return;
//                     }
//                     if (item.item && item.item.length > 0) {
//                         searchInstruction(item.item);
//                     }
//                     if (foundInstruction) return;
//                 }
//             };

//             searchInstruction(dataFlow.dataFlow);

//             console.log("Fetched instruction data:", foundInstruction);
//             setInstructionData(foundInstruction);
//         };

//         fetchInstructionData();
//     }, [levelCode]);

//     const handleNext = () => {
//         setStep(step + 1);
//     };

//     const handleBack = () => {
//         setStep(step - 1);
//     };

//     if (!instructionData) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <Layout>
//             <div className="instruction-container">
//                 <h1>Instruction</h1>
//                 <p>{Array.isArray(instructionData.instruction) ? instructionData.instruction.join(' ') : instructionData.instruction}</p>
//                 <h1>Example</h1>
//                 {instructionData.example && <p className="example">{instructionData.example}</p>}
//                 <div className="button-container">
//                     <button onClick={handleBack} disabled={step === 1}>Back</button>
//                     <button onClick={handleNext}>Start</button>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default Instruction;


import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import DataContext from '../stores/DataContextProvider';
import dataFlow from '../utils/Dataflow.json'; // Adjust the path as necessary
import './Instruction.css'; // Import the CSS file

const Instruction = () => {
    const [step, setStep] = useState(1);
    const { levelCode } = useContext(DataContext);
    const [instructionData, setInstructionData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Fetching instruction data for levelCode:", levelCode);

        const fetchInstructionData = () => {
            let foundInstruction = null;

            const searchInstruction = (items) => {
                for (const item of items) {
                    if (item.levelCode === levelCode) {
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
    }, [levelCode]);

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
