import React, {useRef, useEffect} from 'react';

import { useDropdown } from '../DropdownContext';

function EmployeeDropdown({filtersBarRef}) {
    const { toggleDropdown } = useDropdown();
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)&&
            filtersBarRef.current && !filtersBarRef.current.contains(event.target)) {
                toggleDropdown("employee"); 
            }
        }

        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [toggleDropdown, filtersBarRef]);

    return (
        <div ref = {dropdownRef} className="absolute top-[55px] w-[688px] h-[274px] bg-white border border-[#8338EC] rounded-md flex flex-col justify-between">
            <div className = "mt-[20px] ml-[20px]">
                <ul>
                    <li className="p-2 hover:text-purple-600 cursor-pointer">Option 1</li>
                    <li className="p-2 hover:text-purple-600 cursor-pointer">Option 2</li>
                    <li className="p-2 hover:text-purple-600 cursor-pointer">Option 3</li>
                </ul>
            </div>

            <div className="flex justify-end mb-[20px] mr-[20px]">
                <button
                    onClick={() => toggleDropdown("employee")}
                    className="w-[155px] h-[35px] px-[20px] bg-[#8338EC] text-white rounded-[20px] items-center"
                >
                    არჩევა
                </button>
            </div>
        </div>
    );
}

export default EmployeeDropdown;