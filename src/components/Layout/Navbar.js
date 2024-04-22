

import { useContext } from 'react';
import './Navbar.css';
import DataContext from '../../stores/DataContextProvider';
import Button from '../controllers/Button';

function Navbar() {
  const { level, updateLevel, updateM, updateSM, updateG, updateSK, } = useContext(DataContext);

  function handleClick(e) {
    e.preventDefault();
    window.location.href = '/home';
  }

  const handleSignOut = () => {
    // Redirect user to login page
    window.location.href = '/';
  };

  function handleBack(e) {
    e.preventDefault();

    if (level > 0) {
      updateLevel(pv => pv - 1);
      console.log("Back:", level);
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

  return (
    <>
      <div className="navContainer">
        <div className="buttonContainer">
          <Button handleClick = {handleClick} buttonName = {"Homepage"} />
          <Button handleClick = {handleSignOut} buttonName = {"Sign out"} />
          <Button handleClick = {handleBack} buttonName = {"Back"} />
        </div>
      </div>
    </>
  );
}

export default Navbar;
