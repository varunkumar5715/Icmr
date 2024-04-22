// import React, { useState } from 'react';
// import './TestPage.css';
// import Button from '../components/controllers/Button';

// const TestPage = ({ onBack, onCorrect, onIncorrect, onNext }) => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [answers, setAnswers] = useState([]);

//     const handleCorrect = () => {
//         // Handle correct answer logic
//         setAnswers([...answers, 'correct']);
//         handleNext();
//     };

//     const handleIncorrect = () => {
//         // Handle incorrect answer logic
//         setAnswers([...answers, 'incorrect']);
//         handleNext();
//     };

//     const handleNext = () => {
//         setCurrentPage(currentPage + 1);
//     };

//     const handleBack = () => {
//         setCurrentPage(currentPage - 1);
//     };

//     return (
//         <div className="card-container">
//             <div className="card">
//                 <h4>Skill</h4>
//                 <h3>Goals</h3>
//                 <h3>Instruction</h3>
//                 <div className="white-screen">
//                     <h3>Varun</h3>
//                 </div>
//                 <div className="button-container">
//                     {currentPage > 1 && (
//                         <Button buttonName="Back" handleClick={handleBack} />
//                     )}
//                     <Button buttonName="Correct" handleClick={handleCorrect} />
//                     <Button buttonName="Incorrect" handleClick={handleIncorrect} />
//                     <Button buttonName="Next" handleClick={handleNext} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TestPage;




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
        <div className="testpage-container">
            <div className="top-right">
                <div className="skill">Skill</div>
                <div className="goals">Goals</div>
                <div className="instruction">Instruction</div>
            </div>
            <div className="white-screen">
                <div className="audio-symbol">🔊</div>
            </div>
            <div className="button-container">
                <Button buttonName="Back" handleClick={onPrev} />
                <Button buttonName="Next" handleClick={onNext} />
                <Button buttonName="correct" handleClick={onCorrect} />
                <Button buttonName="incorrect" handleClick={onIncorrect} />
            </div>
        </div>
    );
};

export default TestPage;

