import React from 'react'
import closeButton from '../images/close-button.png';
import ButtonsEmployees from './ButtonsEmployees';
import Forms from './Forms'

function Modal({isOpen, onClose}) {
  if (!isOpen) return null;

  return(
    <div className = "fixed inset-0 bg-[#0D0F1026] bg-opacity-15 flex justify-center items-center z-50" style={{ backdropFilter: 'blur(10px)' }}>
      <div className="bg-white rounded-[10px] w-[913px] h-[768px] relative px-[50px] pt-[40px] pb-[60px] gap-[37px] ">
        <img src = {closeButton} className =  "absolute top-[40px] right-[50px] w-[40px] h-[40px] cursor-pointer" onClick = {onClose}></img>
        <div className = "bg-green-100 w-[813px] h-[589px] absolute bottom-[60px] gap-[45px]">
            <h1 className = "text-center font-medium text-[32px] leading-[100%] tracking-[0%]">თანამშრომლის დამატება</h1>
            <div className = "bg-red-100 w-[813px] h-[522px] absolute bottom-[0px]">
              <div className = "bg-blue-100 w-[813px] h-[439px] absolute top-0">
                <Forms/>
              </div>
              <ButtonsEmployees />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;


