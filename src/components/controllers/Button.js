import React from 'react'
import './Button.css'

function Button({handleClick, buttonName}) {
  return (    
      <button className="button" onClick={handleClick}>{buttonName}</button>    
  )
}

export default Button


// Button.js
