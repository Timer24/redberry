import React from 'react';

import { useDropdown } from '../DropdownContext';

function DepartmentDropdown() {
    const { toggleDropdown } = useDropdown();

    return (
        <div className="absolute top-[55px] w-[688px] h-[274px] bg-white border border-[#8338EC] rounded-md flex flex-col justify-between">
            <div className = "mt-[20px] ml-[20px]">
                <ul>
                    <li className="p-2 hover:text-purple-600 cursor-pointer">Option 1</li>
                    <li className="p-2 hover:text-purple-600 cursor-pointer">Option 2</li>
                    <li className="p-2 hover:text-purple-600 cursor-pointer">Option 3</li>
                </ul>
            </div>

            <div className="flex justify-end mb-[20px] mr-[20px]">
                <button
                    onClick={() => toggleDropdown("department")}
                    className="w-[155px] h-[35px] px-[20px] bg-[#8338EC] text-white rounded-[20px] items-center"
                >
                    არჩევა
                </button>
            </div>
        </div>
    );
}

export default DepartmentDropdown;
