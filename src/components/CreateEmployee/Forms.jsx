import React from 'react';
import { IoMdCheckmark } from "react-icons/io";

const ValidationWarning = ({ isValid }) => {
  const textColor = isValid === null ? "text-[#6C757D]" : isValid ? "text-[#08A508]" : "text-[#FA4D4D]";

  return (
    <div className="w-[127px] h-[34px] absolute bottom-1 flex flex-wrap items-center gap-x-2 gap-y-0">
      <div className="flex items-center gap-x-1">
        <IoMdCheckmark className={`w-[16px] h-[16px] ${textColor}`} />
        <p className={`font-sans font-normal text-[10px] leading-[100%] ${textColor} whitespace-nowrap`}>
          მინიმუმ 2 სიმბოლო
        </p>
      </div>
      <div className="flex items-center gap-x-1">
        <IoMdCheckmark className={`w-[16px] h-[16px] ${textColor}`} />
        <p className={`font-sans font-normal text-[10px] leading-[100%] ${textColor} whitespace-nowrap`}>
          მაქსიმუმ 255 სიმბოლო
        </p>
      </div>
    </div>
  );
};

const Forms = ({ formState, validationState, onInputChange }) => {
  return (
    <div>
      <div className="flex w-[813px] h-[102px] gap-[45px]">
        <div className="w-[384px] h-[102px] relative">
          <h1 className="h-[17px] w-[54px]">
            <p className="font-sans font-medium text-[14px] leading-[100%] tracking-[0%]">სახელი*</p>
          </h1>
          <div className="w-[384px] h-[82px] absolute bottom-0">
            <input
              className="w-[384px] h-[42px] rounded-[6px] border-[1px] flex justify-between p-[10px]"
              name="name"
              value={formState.name}
              onChange={onInputChange}
            />
          </div>
          <ValidationWarning isValid={validationState.name} />
        </div>
        <div className="w-[384px] h-[102px] relative">
          <h1 className="h-[17px] w-[54px]">
            <p className="font-sans font-medium text-[14px] leading-[100%] tracking-[0%]">გვარი*</p>
          </h1>
          <div className="w-[384px] h-[82px] absolute bottom-0">
            <input
              className="w-[384px] h-[42px] rounded-[6px] border-[1px] flex justify-between p-[10px]"
              name="surname"
              value={formState.surname}
              onChange={onInputChange}
            />
          </div>
          <ValidationWarning isValid={validationState.surname} />
        </div>
      </div>
    </div>
  );
};

export default Forms;