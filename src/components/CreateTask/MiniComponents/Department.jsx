import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import useFetchGet from '../../../hooks/useFetchGet';

function EmployeeDepartment({ isDepartmentSelected }) {
  const { data: departments, error, loading } = useFetchGet("departments");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const dropdownRef = useRef(null);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (department_id, department_name) => {
    setSelectedDepartment({ name: department_name });
    setIsOpen(false);
    isDepartmentSelected(true, department_id);
    localStorage.setItem('selectedDepartment', department_name);
  };

  useEffect(() => {
    const savedDepartment = localStorage.getItem('selectedDepartment');
    if (savedDepartment) {
      setSelectedDepartment({ name: savedDepartment });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="mb-[75px] w-[550px] h-auto relative" ref={dropdownRef}>
      <p className="font-[FiraGO] text-[16px] text-[#343A40] font-normal leading-[100%] tracking-[0%] mb-1">
        დეპარტამენტი*
      </p>

      <div
        className={`w-[550px] h-[45px] bg-white border border-[#CED4DA] p-[10px] flex items-center justify-between cursor-pointer relative
          ${isOpen ? "rounded-t-[6px] border-b-0" : "rounded-[6px]"}`}
        onClick={toggleDropdown}
      >
        <span className="font-[FiraGO] text-[14px] font-light leading-[100%] tracking-[0%]">
          {selectedDepartment ? selectedDepartment.name : "აირჩიეთ დეპარტამენტი"}
        </span>
        <IoIosArrowDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full w-[550px] bg-white border border-[#CED4DA] border-t-0 max-h-[200px] overflow-y-auto z-10 rounded-b-[6px] shadow-md">
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
