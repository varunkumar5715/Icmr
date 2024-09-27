

// import { useContext } from 'react';
// import './Navbar.css';
// import DataContext from '../../stores/DataContextProvider';
// import Button from '../controllers/Button';

// function Navbar() {
//   const { level, updateLevel, updateM, updateSM, updateG, updateSK, } = useContext(DataContext);

//   function handleClick(e) {
//     e.preventDefault();
//     window.location.href = '/home';
//   }

//   const handleSignOut = () => {
//     // Redirect user to login page
//     window.location.href = '/';
//   };

//   function handleBack(e) {
//     e.preventDefault();

//     if (level > 0) {
//       updateLevel(pv => pv - 1);
//       // console.log("Back:", level);
//     }
    
//     switch (level) {
//       case 1: 
//         updateM(pv => "");
//         break;
//       case 2: 
//         updateSM(pv => "");
//         break;
//       case 3: 
//         updateG(pv => "");
//         break;
//       case 4: 
//         updateSK(pv => "");
//         break;
//       default:
//     }      
//   }

//   return (
//     <>
//       <div className="navContainer">
//         <div className="buttonContainer">
//           <Button handleClick = {handleClick} buttonName = {"Homepage"} />
//           <Button handleClick = {handleSignOut} buttonName = {"Sign out"} />
//           <Button handleClick = {handleBack} buttonName = {"Back"} />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Navbar;
import { useContext } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to get the current route
import './Navbar.css';
import DataContext from '../../stores/DataContextProvider';
import Button from '../controllers/Button';

function Navbar() {
  const { level, updateLevel, updateM, updateSM, updateG, updateSK } = useContext(DataContext);
  const location = useLocation(); // Get the current route

  function handleClick(e) {
    e.preventDefault();
    window.location.href = '/home';
  }

  const handleSignOut = () => {
    window.location.href = '/';
  };

  function handleBack(e) {
    e.preventDefault();

    if (level > 0) {
      updateLevel(pv => pv - 1);
      // console.log("Back:", level);
    }

    switch (level) {
      case 1:
        updateM(pv => "");
        break;
      case 2:
        updateSM(pv => "");
        break;
      case 3:
        updateG(pv => "");
        break;
      case 4:
        updateSK(pv => "");
        break;
      default:
    }
  }

  // Conditionally render the Back button based on the current path
  const showBackButton = location.pathname !== '/level'; // Hide Back button if the current route is '/level'

  return (
    <>
      <div className="navContainer">
        <div className="buttonContainer">
          <Button handleClick={handleClick} buttonName={"Homepage"} />
          <Button handleClick={handleSignOut} buttonName={"Sign out"} />
          {showBackButton && (
            <Button handleClick={handleBack} buttonName={"Back"} />
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;

