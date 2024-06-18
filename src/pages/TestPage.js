// // // TestPage.js
// // import React, { useState } from 'react';
// // import './TestPage.css';
// // import Button from '../components/controllers/Button';

// // const TestPage = ({ onNext, onPrev, onCorrect, onIncorrect }) => {
// //     const [selectedOption, setSelectedOption] = useState(null);
// //     const [inputValue, setInputValue] = useState('');

// //     const handleDropdownSelect = (option) => {
// //         setSelectedOption(option);
// //     };

// //     const handleTextChange = (event) => {
// //         setInputValue(event.target.value);
// //     };

// //     return (
// //         <div className="custom-card">
// //             <div className="skill">Skill</div>
// //             <div className="goals">Goals</div>
// //             <div className="instruction">Instruction</div>
// //             <div className="card-content">

// //                 <div className="centered-container">
// //                     <div className="white-container">
// //                         <div className="audio-symbol">🔊</div>
// //                     </div>
// //                 </div>

// //                 <div className="button-line">
// //                     <Button buttonName="Back" handleClick={onPrev} />
// //                     <Button buttonName="Next" handleClick={onNext} />
// //                 </div>
// //                 <div className="button-line">
// //                     <Button buttonName="correct" handleClick={onCorrect} />
// //                     <Button buttonName="incorrect" handleClick={onIncorrect} />
// //                 </div>

// //             </div>
// //         </div>
// //     );
// // };

// // export default TestPage;


import React, { useState } from 'react';
import './TestPage.css';
import Button from '../components/controllers/Button';

const TestPage = ({ onNext, onPrev, onCorrect, onIncorrect }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const handleDropdownSelect = (option) => {
        setSelectedOption(option);
    };

    const handleTextChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="custom-card">
            <div className="skill">Skill</div>
            <div className="goals">Goals</div>
            <div className="instruction">Instruction</div>
            <div className="card-content">

                <div className="centered-container">
                    <div className="white-container">
                        <div className="audio-symbol">🔊</div>
                    </div>
                </div>

                <div className="button-line">
                    <Button buttonName="Back" handleClick={onPrev} />
                    <Button buttonName="Next" handleClick={onNext} />
                </div>
                <div className="button-line">
                    <Button buttonName="correct" handleClick={onCorrect} />
                    <Button buttonName="incorrect" handleClick={onIncorrect} />
                </div>

            </div>
        </div>
    );
};

export default TestPage;

