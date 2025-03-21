import React, { useEffect, useRef, useState } from 'react';
import { useDropdown } from '../../DropdownContext';
import useFetchGet from '../../hooks/useFetchGet';

function DepartmentDropdown({ filtersBarRef, setSelectedDepartments, selectedDepartments }) {
  const { toggleDropdown } = useDropdown();
  const dropdownRef = useRef(null);
  const { data: departments, error, loading } = useFetchGet('departments');

  const [tempSelectedDepartments, setTempSelectedDepartments] = useState([]); 
  

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;

    setTempSelectedDepartments((prevState) => {
      if (checked) {
        return [...prevState, value]; 
      } else {
        return prevState.filter(id => id !== value); 
      }
    });
  };

  const handleSubmit = () => {
    setSelectedDepartments(tempSelectedDepartments);
    toggleDropdown("department"); 
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        filtersBarRef.current && !filtersBarRef.current.contains(event.target)
      ) {
        toggleDropdown("department");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleDropdown, filtersBarRef]);

  return (
    <div ref={dropdownRef} className="absolute top-[55px] w-[688px] h-[274px] bg-white border border-[#8338EC] z-50 rounded-md px-[30px] flex flex-col">
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
                  <label className="flex items-center cursor-pointer">
                    
                    <input
                      type="checkbox"
                      id={`department-${department.id}`}
                      name="departments"
                      value={department.id}
                      onChange={handleCheckboxChange}
                      checked={tempSelectedDepartments.includes(department.id.toString())} 
                      className="appearance-none"
                    />
                    
                    
                    <span
                      className={`w-[19px] h-[19px] inline-flex justify-center items-center rounded-[5px] border-[1.5px] mr-[15px] border-[#8338EC]`}
                    >
                      
                      {tempSelectedDepartments.includes(department.id.toString()) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#8338EC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-[13px] h-[13px]"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </span>
                  </label>
                  <label
                    htmlFor={`department-${department.id}`}
                    className="font-style-1 cursor-pointer"
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
        <button
          onClick={handleSubmit} 
          className="font-style-1 w-[155px] h-[35px] px-[20px] bg-[#8338EC] text-white rounded-[20px]"
        >
          არჩევა
        </button>
      </div>
    </div> 
  );
}

export default DepartmentDropdown;