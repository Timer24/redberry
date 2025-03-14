import React from 'react'
import { IoMdCheckmark } from "react-icons/io";

function Title({formState, validationState, onInputChange}) {
  return (
    <div className = " w-[550px] h-[108px] top-0 left-0">
        <div className = "w-[384px] h-[102px]  relative">

                <h1 className = 'h-[17px] w-[54px]'>
                    <p className = "font-[FiraGO] font-medium text-[16px] leading-[100%] tracking-[0%] text-[#343A40]">სათაური*</p>
                </h1>

                <div className = "w-[384px] h-[82px] absolute bottom-0">
                    <input className = "w-[550px] h-[45px] rounded-[5px] border-[1px] flex justify-between p-[14px]"
                        name = "name"
                        value = {formState.name}
                        onChange = {onInputChange}/>
                </div>

                <ValidationWarning isValid = {validationState.name}/>

        </div>
    </div>
  )
}   const ValidationWarning = ({isValid}) => {
        const textColor = isValid === null ? "text-[#6C757D]" : isValid ? "text-[#08A508]" : "text-[#FA4D4D]";


        return (
            <div className="w-[127px] h-[34px] absolute bottom-0 flex flex-wrap items-center gap-x-2 gap-y-0">
                    <div className="flex items-center gap-x-1">
                        <IoMdCheckmark className = {`w-[16px] h-[16px] ${textColor}`}/>
                        <p className={`font-[FiraGO] font-custom-350 text-[10px] leading-[100%] ${textColor} whitespace-nowrap`}>მინიმუმ 2 სიმბოლო</p>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <IoMdCheckmark className = {`w-[16px] h-[16px] ${textColor}`}/>
                        <p className={`font-[FiraGO] font-custom-350 text-[10px] leading-[100%] ${textColor} whitespace-nowrap`}>მაქსიმუმ 255 სიმბოლო</p>
                    </div>
            </div>
        )
    }

export default Title