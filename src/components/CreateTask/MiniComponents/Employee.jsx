import React, { useEffect, useState, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import useFetchGet from '../../../hooks/useFetchGet';
import useClickOutside from '../../../hooks/useClickOutside';
import PlusSign from '../../assets/plus-sign.png';
import Modal from '../../CreateEmployee/Modal'

function EmployeeDropdown({ isEmployeeSelected, selectedDepartment}) {
  const { data: employees, error, loading } = useFetchGet('employees');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(() => {
    const savedEmployee = localStorage.getItem('selectedEmployee');
    return savedEmployee ? JSON.parse(savedEmployee) : null;
  });
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasDepartmentBeenSelected, setHasDepartmentBeenSelected] = useState(() => {
    const savedDepartment = localStorage.getItem('selectedDepartment');
    return savedDepartment ? true : false;
  });
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedEmployee = localStorage.getItem('selectedEmployee');
    if (savedEmployee) {
      const parsedEmployee = JSON.parse(savedEmployee);
      setSelectedEmployee(parsedEmployee);
      isEmployeeSelected(true, parsedEmployee.id);
    }
  }, []);

  useEffect(() => {
    if (employees) {
      if (selectedDepartment) {
        setHasDepartmentBeenSelected(true);
        localStorage.setItem('hasDepartmentBeenSelected', 'true');
        setFilteredEmployees(
          employees.filter((employee) => employee.department?.id === selectedDepartment)
        );
        setSelectedEmployee(null);
        localStorage.removeItem('selectedEmployee');
        isEmployeeSelected(false, null);
      } else {
        const savedEmployee = localStorage.getItem('selectedEmployee');
        if (savedEmployee) {
          const parsedEmployee = JSON.parse(savedEmployee);
          setFilteredEmployees(
            employees.filter((employee) => employee.department?.id === parsedEmployee.department_id)
          );
          setHasDepartmentBeenSelected(true);
        } else {
          setFilteredEmployees([]);
        }
      }
    }
  }, [employees, selectedDepartment]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () =>{
    setIsModalOpen(false);
  }

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (employee_id, employee_name, avatar) => {
    const employee = { 
      id: employee_id, 
      name: employee_name, 
      avatar,
      department_id: selectedDepartment 
    };
    setSelectedEmployee(employee);
    setIsOpen(false);
    isEmployeeSelected(true, employee_id);
    localStorage.setItem('selectedEmployee', JSON.stringify(employee));
  };

  useClickOutside(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    const handleReset = (event) => {
        setSelectedEmployee(null);
        setHasDepartmentBeenSelected(false);
        localStorage.removeItem('selectedEmployee');
        localStorage.setItem('hasDepartmentBeenSelected', 'false');
        isEmployeeSelected(false, null);
    };
    
    window.addEventListener('resetTaskForm', handleReset);
    return () => window.removeEventListener('resetTaskForm', handleReset);
  }, [isEmployeeSelected]);

  return (
    <div className="mb-[75px] w-[550px] h-auto relative" ref={dropdownRef}>
      <p className={`font-[FiraGO] text-[16px] font-normal leading-[100%] tracking-[0%] mb-1 ${hasDepartmentBeenSelected ? 'text-[#343A40]' : 'text-[#ADB5BD]'}`}>პასუხისმგებელი თანამშრომელი*</p>
      <div
        className={`w-[550px] h-[45px] border p-[10px] flex items-center justify-between relative ${hasDepartmentBeenSelected ? (isOpen ? 'bg-white cursor-pointer border-[#8338EC] rounded-t-[6px] border-b-0' : 'bg-white cursor-pointer border-[#CED4DA] rounded-[6px]') : 'bg-white cursor-not-allowed border-[#DEE2E6] rounded-[6px]'}`}
        onClick={() => hasDepartmentBeenSelected && toggleDropdown()}
      >
        <span className="font-[FiraGO] text-[14px] font-light leading-[100%] tracking-[0%] flex items-center">
          {hasDepartmentBeenSelected ? (selectedEmployee ? (<><img src={selectedEmployee.avatar} alt={selectedEmployee.name} className="w-[28px] h-[28px] rounded-full mr-[8px] object-cover" />{selectedEmployee.name}</>) : 'აირჩიეთ თანამშრომელი') : ''}
        </span>
        <IoIosArrowDown className={`transition-transform ${isOpen ? 'rotate-180' : ''} ${hasDepartmentBeenSelected ? 'text-[#343A40]' : 'text-[#ADB5BD]'}`} />
      </div>
      <Modal isOpen = {isModalOpen} onClose = {handleCloseModal}/>
      {isOpen && (
        <div className="absolute left-0 top-full w-[550px] bg-white border border-[#8338EC] border-t-0 h-[278px] overflow-y-auto z-10 rounded-b-[6px] shadow-md">
          {loading && <p className="p-2 text-gray-500 text-center">Loading...</p>}
          {error && <p className="p-2 text-red-500 text-center">Error: {error}</p>}
          <div 
            className="w-full h-[46px] px-[20px] flex items-center gap-[6px] hover:bg-gray-200 cursor-pointer font-[FiraGO] text-[16px] font-normal leading-[100%] tracking-[0%]"
            onClick={handleOpenModal}
          >
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
