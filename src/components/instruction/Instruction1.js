// // Instruction1.js
// import React from 'react';
// import './Instruction.css';
// import Button from '../controllers/Button';

// const Instruction1 = ({ onBack, onNext }) => {
//     return (
//         <div className="instruction-container">
//             <h1>Instruction </h1>

//             <p>ನಿನ್ನ ಬಟ್ಟೆ ಕೊಳಕಾಗಿದೆ. </p>
//       <b> ಸರಿ ಉತ್ತರ: </b><p> ಮಣ್ಣಿನಲ್ಲಿ ಆಟವಾಡಿದೆ </p>
//             <div className="button-container">
//                 <Button buttonName="Back" handleClick={onBack} />
//                 <Button buttonName="Next" handleClick={onNext} />
//             </div>
//         </div>
//     );
// };

// export default Instruction1;

// Instruction1.js
import React from 'react';
import './Instruction.css';
import Button from '../controllers/Button';

const Instruction1 = ({ instructionData, onBack, onNext }) => {
    return (
        <div className="instruction-container">
            <h1>{instructionData.title}</h1>

            {instructionData.levelTitle && (
                <ul>
                    {instructionData.levelTitle.map((title, index) => (
                        <li key={index}>{title}</li>
                    ))}
                </ul>
            )}

            {instructionData.instruction && (
                <div>
                    <h2>Instructions:</h2>
                    <p>{instructionData.instruction}</p>
                </div>
            )}

            {instructionData.example && (
                <div>
                    <h2>Example:</h2>
                    <p>{instructionData.example}</p>
                </div>
            )}

            <div className="button-container">
                <Button buttonName="Back" handleClick={onBack} />
                <Button buttonName="Next" handleClick={onNext} />
            </div>
        </div>
    );
};

export default Instruction1;

