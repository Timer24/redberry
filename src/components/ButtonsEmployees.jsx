import React from 'react'

function ButtonsEmployees() {
  return (
    <div className = "flex absolute bottom-0 right-0 gap-[22px]">
        <button
            className = "flex justify-center items-center w-[102px] h-[42px] border-[1px] border-[#8338EC] rounded-[5px] px-[10px] py-[16px] gap-[2px] hover:border-[#B588F4] font-[FiraGO] font-normal text-[16px] leading-[100%] tracking-[0%]">
            გაუქმება
        </button>
              
        <button className = "flex justify-center items-center w-[263px] h-[42px] top-[20px] left-[20px] rounded-[5px] px-[10px] py-[20px] gap-[4px] text-white bg-[#8338EC] transition-all duration-300 ease-out hover:bg-[#B588F4] font-[FiraGO] font-normal text-[18px] leading-[100%] tracking-[0%]" >
            დაამატე თანამშრომელი
        </button>
                      
    </div>
  )
}

export default ButtonsEmployees