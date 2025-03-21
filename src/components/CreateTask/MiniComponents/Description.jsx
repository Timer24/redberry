import React, { useState, useCallback } from 'react';
import { IoMdCheckmark } from "react-icons/io";

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

const getValidationColor = (isValid) => {
    if (isValid === null) return 'text-[#6C757D]'; 
    return isValid ? 'text-[#08A508]' : 'text-[#FA4D4D]';
};

function Description({ formState, onInputChange }) {
    const [isValidLength, setIsValidLength] = useState(null);
    const [isValidWords, setIsValidWords] = useState(null);

    const validateInput = useCallback((value) => {
        const words = value.trim().split(/\s+/);
        setIsValidLength(value.length <= 255);
        setIsValidWords(words.length >= 4);
    }, []);

    const debouncedValidateInput = useCallback(debounce(validateInput, 500), [validateInput]);

    const handleChange = (e) => {
        const { value } = e.target;
        onInputChange(e); 
        debouncedValidateInput(value); 
    };

    return (
        <div className="w-[550px] h-[133px] top-0 left-0">
            <div className="w-[384px] h-[102px] relative">
                <h1 className="h-[17px] w-[54px]">
                    <p className="font-[FiraGO] font-medium text-[16px] leading-[100%] tracking-[0%] text-[#343A40]">აღწერა</p>
                </h1>

                <div className="w-[384px] h-[82px] absolute bottom-0">
                    <textarea
                        className="w-[550px] h-[133px] rounded-[5px] border-[1px] flex flex-wrap p-[14px] gap-[10px]"
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                        style={{ resize: 'none' }}
                    />
                </div>

                <ValidationWarning isValidLength={isValidLength} isValidWords={isValidWords} />
            </div>
        </div>
    );
}

const ValidationWarning = ({ isValidLength, isValidWords }) => {
    const textColorLength = getValidationColor(isValidLength);
    const textColorWords = getValidationColor(isValidWords);

    return (
        <div className="w-[127px] h-[34px] absolute top-[155px] flex flex-wrap items-center gap-x-2 gap-y-0">
            <div className="flex items-center gap-x-1">
                <IoMdCheckmark className={`w-[16px] h-[16px] ${textColorWords}`} />
                <p className={`font-[FiraGO] font-custom-350 text-[10px] leading-[100%] ${textColorWords} whitespace-nowrap`}>
                    მინიმუმ 4 სიტყვა
                </p>
            </div>
            <div className="flex items-center gap-x-1">
                <IoMdCheckmark className={`w-[16px] h-[16px] ${textColorLength}`} />
                <p className={`font-[FiraGO] font-custom-350 text-[10px] leading-[100%] ${textColorLength} whitespace-nowrap`}>
                    მაქსიმუმ 255 სიმბოლო
                </p>
            </div>
        </div>
    );
};

export default Description;
