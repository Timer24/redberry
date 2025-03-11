import React from 'react'
import logo1 from '../images/momentum-logo.png'

function Header1() {

  function handleClick(){
    // Handle button click
  }

  return (
    <div>
      <div className="ml-[120px] h-[100px] w-[1920] flex justify-between items-center">
        <img 
          src={logo1} 
          alt="Momentum Logo" 
          className = "cursor-pointer"
        />
        
        <div className="w-[533px] h-[40px] flex justify-end gap-[40px] mr-[120px]">
          <button onClick={handleClick} className="btn-1">
            თანამშრომლის შექმნა
          </button>
          <button onClick={handleClick} className="btn-2">
            შექმენი ახალი დავალება
          </button>
        </div>
      </div>
      <p className = "ml-[120px] mt-[30px] font-[FiraGO] font-semibold text-[34px] leading-[100%] tracking-[0%]">დავალებების გვერდი</p>
    </div>
  )
}

export default Header1;
