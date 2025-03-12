import React, { useEffect, useRef } from 'react';
import { useDropdown } from '../DropdownContext';
import useFetchGet from '../hooks/useFetchGet';


function DepartmentDropdown({ filtersBarRef }) {
    const { toggleDropdown } = useDropdown();
    const dropdownRef = useRef(null);
    const { data: departments, error, loading } = useFetchGet('departments');

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                filtersBarRef.current && !filtersBarRef.current.contains(event.target)) {
                toggleDropdown("department");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [toggleDropdown, filtersBarRef]);

    return (
        <div ref={dropdownRef} className="absolute top-[55px] w-[688px] h-[274px] bg-white border border-[#8338EC] rounded-md px-[30px] flex flex-col">
            <div className="flex-grow overflow-y-auto pr-[5px] mt-[40px]" style={{ maxHeight: 'calc(100% - 70px)' }}>
                {loading ? (
                    <div className="m-auto">Loading departments...</div>
                ) : error ? (
                    <div className="m-auto">Error: {error}</div>
                ) : (
                    <ul className="flex flex-col space-y-[25px]">
                        {departments && departments.length > 0 ? (
                            departments.map((department) => (
                                <li key={department.id} className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        id={`department-${department.id}`} 
                                        name="departments" 
                                        value={department.id} 
                                        className="w-[19px] h-[19px] cursor-pointer"
                                    />
                                    <label 
                                        htmlFor={`department-${department.id}`} 
                                        className="font-style-1 cursor-pointer ml-[10px]" 
                                        >
                                        {department.name}
                                    </label>
                                </li>
                            ))
                        ) : (
                            <li className="m-auto">No departments available</li>
                        )}
                    </ul>
                )}
            </div>
            <div className="flex justify-end p-[20px]">
                <button onClick={() => toggleDropdown("department")} className=" font-style-1 w-[155px] h-[35px] px-[20px] bg-[#8338EC] text-white rounded-[20px]" >
                    არჩევა
                </button>
            </div>
        </div>
    );
}

export default DepartmentDropdown;
