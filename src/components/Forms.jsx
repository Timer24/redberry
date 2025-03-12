import React, {useState} from 'react';
import checkImg from '../images/check.png'

// function nameInput(){
//     const [name, setName] = useState("");
//     const [isValid, setIsValid] = useState(false);
//     const [error, setError] = useState("");
// }

// function validateName = (value) => {
//     if(value.length < 2 || value.length > 255){
//         setError('');
//         setIsValid(false);
//     } else {
//         setError("");
//         setIsValid(true);
//     }
//     setName(value);
// }

function Forms() {
  return (
    <div>
        <div className = "flex w-[813px] h-[102px] bg-yellow-100 gap-[45px]">
            <div className = "w-[384px] h-[102px] bg-slate-400 relative">
                <h1 className = 'h-[17px] w-[54px]'>
                    <p className = "font-sans font-medium text-[14px] leading-[100%] tracking-[0%]">სახელი*</p>
                </h1>
                <div className = "w-[384px] h-[82px] absolute bottom-0">
                    <input className = "w-[384px] h-[42px] rounded-[6px] border-[1px] flex justify-between p-[10px]"/>
                </div>
                <div className="w-[127px] h-[34px] absolute bottom-1 flex flex-wrap items-center gap-x-2 gap-y-0">
                    <div className="flex items-center gap-x-1">
                        <img src={checkImg} className="w-[16px] h-[16px]" />
                        <p className="font-sans font-normal text-[10px] leading-[100%] text-[#6C757D]">მინიმუმ 2 სიმბოლო</p>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <img src={checkImg} className="w-[16px] h-[16px]" />
                        <p className="font-sans font-normal text-[10px] leading-[100%] text-[#6C757D] whitespace-nowrap">მაქსიმუმ 255 სიმბოლო</p>
                    </div>
                </div>

            </div>
            <div className = "w-[384px] h-[102px] bg-red-400 relative">
                <h1 className = 'h-[17px] w-[54px]'>
                    <p className = "font-sans font-medium text-[14px] leading-[100%] tracking-[0%]">გვარი*</p>
                </h1>
                <div className = "w-[384px] h-[82px] absolute bottom-0">
                    <input className = "w-[384px] h-[42px] rounded-[6px] border-[1px] flex justify-between p-[10px]"/>
                </div>
                <div className="w-[127px] h-[34px] absolute bottom-1 flex flex-wrap items-center gap-x-2 gap-y-0">
                    <div className="flex items-center gap-x-1">
                        <img src={checkImg} className="w-[16px] h-[16px]" />
                        <p className="font-sans font-normal text-[10px] leading-[100%] text-[#6C757D]">მინიმუმ 2 სიმბოლო</p>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <img src={checkImg} className="w-[16px] h-[16px]" />
                        <p className="font-sans font-normal text-[10px] leading-[100%] text-[#6C757D] whitespace-nowrap">მაქსიმუმ 255 სიმბოლო</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Forms