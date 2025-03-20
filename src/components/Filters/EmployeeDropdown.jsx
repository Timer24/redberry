import React, { useEffect, useRef, useState } from 'react';
import { useDropdown } from '../../DropdownContext';
import useFetchGet from '../../hooks/useFetchGet';

function EmployeeDropdown({ filtersBarRef, selectedEmployee, setSelectedEmployee }) {
  const { toggleDropdown } = useDropdown();
  const dropdownRef = useRef(null);
  const { data: employees, error, loading } = useFetchGet('employees');
  const [tempSelectedEmployee, setTempSelectedEmployee] = useState(null); 

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        filtersBarRef.current && !filtersBarRef.current.contains(event.target)
      ) {
        toggleDropdown("employee");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleDropdown, filtersBarRef]);

  const handleCheckboxChange = (event) => {
    console.log(event.target);
    const { value } = event.target;
    setTempSelectedEmployee(value);
  };

  const handleSubmit = () => {
    setSelectedEmployee(tempSelectedEmployee);
    toggleDropdown("employee");
  };


  return (
    <div ref={dropdownRef} className="absolute top-[55px] w-[688px] z-50 h-[280px] bg-white border border-[#8338EC] rounded-md px-[30px] flex flex-col">
      <div className="flex-grow overflow-y-auto pr-[5px] z-50 mt-[40px] max-h-[180px]">
        {loading ? (
          <div className="m-auto">Loading employees...</div>
        ) : error ? (
          <div className="m-auto">Error: {error}</div>
        ) : (
          <ul className="flex flex-col space-y-[15px]">
            {employees && employees.length > 0 ? (
              employees.map((employee) => (
                <li key={employee.id} className="h-[28px] min-h-[28px] flex items-center p-2 rounded-md">
                  <label className="flex items-center cursor-pointer">
                    
                    <input
                      type="checkbox"
                      id={`${employee.id}`}
                      value={employee.id}
                      onChange={handleCheckboxChange}
                      checked={tempSelectedEmployee === employee.id} 
                      className="appearance-none"
                    />
                    
                    
                    <span
                      className={`w-[19px] h-[19px] inline-block rounded-[5px] border-[1.5px] mr-[15px] border-[#8338EC] 
                      ${tempSelectedEmployee === employee.id.toString() ? 'relative' : ''} 
                      flex justify-center items-center`}
                    >
                      {tempSelectedEmployee === employee.id.toString() && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#8338EC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="absolute top-[2px] left-[2px] w-[13px] h-[13px]"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </span>
                  </label>

                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-[28px] h-[28px] rounded-full border border-gray-300 mr-[10px] object-cover"
                  />
                  <span className="font-style-1">{employee.name} {employee.surname}</span>
                </li>
              ))
            ) : (
              <li className="m-auto">No employees available</li>
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

export default EmployeeDropdown;
