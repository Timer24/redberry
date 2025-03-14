import React, { useEffect, useState, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import useFetchGet from '../../../hooks/useFetchGet';
import PlusSign from '../../images/plus-sign.png';

function EmployeeDropdown({ isEmployeeSelected, selectedDepartment }) {
  const { data: employees, error, loading } = useFetchGet('employees');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSelectedEmployee(null);
    isEmployeeSelected(false, null);
  }, [selectedDepartment]);

  useEffect(() => {
    if (selectedDepartment && employees) {
      setFilteredEmployees(
        employees.filter((employee) => employee.department?.id === selectedDepartment)
      );
    } else {
      setFilteredEmployees([]);
    }
  }, [employees, selectedDepartment]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (employee_id, employee_name, avatar) => {
    setSelectedEmployee({ id: employee_id, name: employee_name, avatar });
    setIsOpen(false);
    isEmployeeSelected(true, employee_id);
  };

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
      <p className={`font-[FiraGO] text-[16px] font-normal leading-[100%] tracking-[0%] mb-1 ${selectedDepartment ? 'text-[#343A40]' : 'text-[#ADB5BD]'}`}>პასუხისმგებელი თანამშრომელი*</p>
      <div
        className={`w-[550px] h-[45px] border p-[10px] flex items-center justify-between relative ${selectedDepartment ? (isOpen ? 'bg-white cursor-pointer border-[#8338EC] rounded-t-[6px] border-b-0' : 'bg-white cursor-pointer border-[#CED4DA] rounded-[6px]') : 'bg-white cursor-not-allowed border-[#DEE2E6] rounded-[6px]'}`}
        onClick={() => selectedDepartment && toggleDropdown()}
      >
        <span className="font-[FiraGO] text-[14px] font-light leading-[100%] tracking-[0%] flex items-center">
          {selectedDepartment ? (selectedEmployee ? (<><img src={selectedEmployee.avatar} alt={selectedEmployee.name} className="w-[28px] h-[28px] rounded-full mr-[8px] object-cover" />{selectedEmployee.name}</>) : 'აირჩიეთ თანამშრომელი') : ''}
        </span>
        <IoIosArrowDown className={`transition-transform ${isOpen ? 'rotate-180' : ''} ${selectedDepartment ? 'text-[#343A40]' : 'text-[#ADB5BD]'}`} />
      </div>
      {isOpen && (
        <div className="absolute left-0 top-full w-[550px] bg-white border border-[#8338EC] border-t-0 h-[278px] overflow-y-auto z-10 rounded-b-[6px] shadow-md">
          {loading && <p className="p-2 text-gray-500 text-center">Loading...</p>}
          {error && <p className="p-2 text-red-500 text-center">Error: {error}</p>}
          <div className="w-full h-[46px] px-[20px] flex items-center gap-[6px] hover:bg-gray-200 cursor-pointer font-[FiraGO] text-[16px] font-normal leading-[100%] tracking-[0%]">
            <img src={PlusSign} className="text-[#8338EC] w-[18px] h-[18px]" alt="+" />
            <span className="text-[#8338EC]">თანამშრომლის დამატება</span>
          </div>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <div key={employee.id} className="w-full h-[46px] px-[6px] gap-[6px] flex items-center hover:bg-gray-200 cursor-pointer font-[FiraGO] text-[14px] font-light leading-[100%] tracking-[0%]" onClick={() => handleSelect(employee.id, `${employee.name} ${employee.surname}`, employee.avatar)}>
                <span className="flex items-center px-[14px] py-[12px] gap-[6px]">
                  <img src={employee.avatar} alt={employee.name} className="w-[28px] h-[28px] rounded-full mr-[2px] object-cover" />
                  {employee.name} {employee.surname}
                </span>
              </div>
            ))
          ) : (
            !loading && <p className="p-2 text-gray-500 text-center">No employees available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default EmployeeDropdown;
