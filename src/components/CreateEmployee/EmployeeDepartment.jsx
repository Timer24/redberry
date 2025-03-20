import React, { useState, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import useFetchGet from '../../hooks/useFetchGet';
import useClickOutside from '../../hooks/useClickOutside';

function EmployeeDepartment({ isDepartmentSelected }) {
  const { data: departments, error, loading } = useFetchGet("departments");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const toggleDropdown = (e) => { 
    e.stopPropagation(); 
    setIsOpen((prev) => !prev); 
  };

  const handleSelect = (department_id, department_name) => {
    setSelectedDepartment(department_name);
    setIsOpen(false);
    isDepartmentSelected(true, department_id);
  };

  return (
    <div className="mb-[75px] w-[384px] h-auto relative" ref = {dropdownRef}>
      <p className="font-[FiraGO] text-[14px] font-light leading-[100%] tracking-[0%] mb-1">
        დეპარტამენტი*
      </p>

      <div
        className={`w-[384px] h-[42px] bg-white border border-[#CED4DA] p-[10px] flex items-center justify-between cursor-pointer relative
          ${isOpen ? "rounded-t-[6px] border-b-0" : "rounded-[6px]"}`}
        onClick={toggleDropdown}
      >
        <span className="font-[FiraGO] text-[14px] font-light leading-[100%] tracking-[0%]">
          {selectedDepartment || "აირჩიეთ დეპარტამენტი"}
        </span>
        <IoIosArrowDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full w-[384px] bg-white border border-[#CED4DA] border-t-0 max-h-[200px] overflow-y-auto z-10 rounded-b-[6px] shadow-md">
          {loading && <p className="p-2 text-gray-500 text-center">Loading...</p>}
          {error && <p className="p-2 text-red-500 text-center">Error: {error}</p>}
          {departments && departments.length > 0 ? (
            departments.map((department, index) => (
              <div
                key={index}
                className="w-full h-[40px] px-[10px] flex items-center hover:bg-gray-200 cursor-pointer font-[FiraGO] text-[14px] font-light leading-[100%] tracking-[0%]"
                onClick={() => handleSelect(department.id, department.name)}
              >
                {department.name}
              </div>
            ))
          ) : (
            !loading && <p className="p-2 text-gray-500 text-center">No departments available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default EmployeeDepartment;