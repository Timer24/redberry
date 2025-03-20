import React, { useState } from 'react';
import { IoMdCheckmark } from "react-icons/io";


const FileValidation = ({ isValidSize }) => {
    const getValidationColor = (isValid) => {
        if (isValid === null) return 'text-gray-400';
        return isValid ? 'text-[#1FBA90]' : 'text-[#EA1919]';
    };

    const textColor = getValidationColor(isValidSize);

    return (
        <div className="w-[127px] h-[34px] absolute top-[155px] flex flex-wrap items-center gap-x-2 gap-y-0">
            <div className="flex items-center gap-x-1">
                <IoMdCheckmark className={`w-[16px] h-[16px] ${textColor}`} />
                <p className={`font-[FiraGO] font-custom-350 text-[10px] leading-[100%] ${textColor} whitespace-nowrap`}>
                    მაქსიმუმ 600KB
                </p>
            </div>
        </div>
    );
};


const CreateEmployee = () => {
    
    const [isValidFileSize, setIsValidFileSize] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSizeInKB = file.size / 1024;
            const isValid = fileSizeInKB < 600;
            setIsValidFileSize(isValid);
            
            if (!isValid) {
                e.target.value = '';
            }
        } else {
            setIsValidFileSize(null);
        }
    };

    return (
        <div>
            
            <div className="relative">
                <input 
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-[550px] h-[76px] rounded-[5px] border-[1px] flex flex-wrap p-[14px] gap-[10px]"
                />
                <FileValidation isValidSize={isValidFileSize} />
            </div>
            
        </div>
    );
};

export default CreateEmployee; 