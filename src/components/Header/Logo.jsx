import logo1 from '../images/momentum-logo.png';
import React from 'react'

function Logo({onClick}) {
  return (
    <div onClick = {onClick}>
      <img src={logo1} alt="Momentum Logo" className="cursor-pointer"></img>
    </div>
    
  )
}

export default Logo