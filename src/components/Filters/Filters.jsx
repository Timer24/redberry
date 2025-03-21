import React, {useState, useRef, useEffect} from "react";
import { IoIosArrowDown } from "react-icons/io";
import DepartmentDropdown from "./DepartmentDropdown";
import PriorityDropdown from "./PriorityDropdown";
import EmployeeDropdown from "./EmployeeDropdown"
import { DropdownContext } from "../../DropdownContext";
import useFetchGet from "../../hooks/useFetchGet";
import { IoMdClose } from "react-icons/io";

function Filters({selectedEmployee, setSelectedEmployee, selectedPriorities, setSelectedPriorities, selectedDepartments, setSelectedDepartments}) {

    
        const[departmentOpen, setDepartmentOpen] = useState(false);
        const[priorityOpen, setPriorityOpen] = useState(false);
        const[employeeOpen, setEmployeeOpen] = useState(false);
        const [departmentNames, setDepartmentNames] = useState ({});
        const [priorityNames, setPriorityNames] = useState({});
        const [employeeNames, setEmployeeNames] = useState({});


        const toggleDropdown = (dropdown) => {
            if (dropdown === "department"){
                setDepartmentOpen(!departmentOpen);
                setPriorityOpen(false);
                setEmployeeOpen(false);
            }
            else if (dropdown === "priority"){
                setPriorityOpen(!priorityOpen);
                setEmployeeOpen(false);
                setDepartmentOpen(false);
            }
            else if (dropdown === "employee"){
                setEmployeeOpen(!employeeOpen);
                setPriorityOpen(false);
                setDepartmentOpen(false);
            }
        };

        const { data: departments } = useFetchGet('departments');
        const { data: priorities } = useFetchGet('priorities');
        const { data: employees } = useFetchGet('employees');

        useEffect(() => {
          if (departments) {
            const names = {};
            departments.forEach(dept => {
              names[dept.id] = dept.name;
            });
            setDepartmentNames(names);
          }
          if (priorities) {
            const names = {};
            priorities.forEach(priority => {
              names[priority.id] = priority.name;
            });
            setPriorityNames(names);
          }
          if (employees) {
            const names = {};
            employees.forEach(employee => {
              names[employee.id] = `${employee.name} ${employee.surname}`;
            });
            setEmployeeNames(names);
          }
        }, [departments, priorities, employees]);


        const handleClearFilters = () => {
          setSelectedEmployee(null);
          setSelectedPriorities([]);
          setSelectedDepartments([]);
          localStorage.removeItem('selectedEmployee');
          localStorage.removeItem('selectedPriorities');
          localStorage.removeItem('selectedDepartments');
        }

        const filtersBarRef = useRef(null);

        const removeDepartment = (departmentId) => {
          const updatedDepartments = selectedDepartments.filter(id => id !== departmentId.toString());
          setSelectedDepartments(updatedDepartments);
        };

        const removePriority = (priorityId) => {
            const updatedPriorities = selectedPriorities.filter(id => id !== priorityId.toString());
            setSelectedPriorities(updatedPriorities);
          };
        
        const removeEmployee = (employeeId) => {
          setSelectedEmployee(null);
        }

        
  return (
    <DropdownContext.Provider value = {{toggleDropdown, departmentOpen, setDepartmentOpen, priorityOpen, setPriorityOpen, employeeOpen, setEmployeeOpen}}>
    <div ref = {filtersBarRef} className="absolute top-[233px] left-[120px] w-[688px] mb-[40px] h-[44px] rounded-[10px] border-[0.5px] border-[#DEE2E6] flex items-center justify-around z-49">
      <button onClick={() => toggleDropdown("department")}
       className={`font-style-1 relative flex items-center ${departmentOpen ? "text-[#8338EC]": ""}`}>
        დეპარტამენტი
        <IoIosArrowDown className="mt-[3px] ml-[8px]"/>
        
      </button>
      <button onClick={() => toggleDropdown("priority")}
       className={`font-style-1 relative flex items-center ${priorityOpen ? "text-[#8338EC]": ""}`}>
        პრიორიტეტი
        <IoIosArrowDown className="mt-[3px] ml-[8px]"/>
        
      </button>
      <button onClick={() => toggleDropdown("employee")}
       className={`font-style-1 relative flex items-center ${employeeOpen ? "text-[#8338EC]": ""}`}>
        თანამშრომელი
        <IoIosArrowDown className="mt-[3px] ml-[8px]"/>
      </button>
        {employeeOpen && (
          <EmployeeDropdown filtersBarRef={filtersBarRef} selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} style={{ zIndex: 100 }} />
        )}
        {priorityOpen && (
          <PriorityDropdown filtersBarRef={filtersBarRef} selectedPriorities={selectedPriorities} setSelectedPriorities={setSelectedPriorities} style={{ zIndex: 100 }} />
        )}
        {departmentOpen && (
          <DepartmentDropdown filtersBarRef={filtersBarRef} selectedDepartments={selectedDepartments} setSelectedDepartments={setSelectedDepartments} style={{ zIndex: 100 }} />
        )}

        <div className="min-h-[34px] w-[1680px] flex gap-2 absolute left-0 top-[52px] flex-wrap">
          <div className="flex flex-row gap-2 items-center justify-start flex-wrap">
            {selectedDepartments.map(id => (
              <div key={id} className="flex items-center h-[29px] bg-white gap-[4px] rounded-[43px] border-[1px] border-[#CED4DA] px-[10px] py-[6px] text-[14px] font-normal font-[FiraGO] text-[#343A40] z-0">
                <span>{departmentNames[id]}</span>
                <button onClick={() => removeDepartment(id)} className=" text-[#343A40] hover:text-gray-700"><IoMdClose/></button>
              </div>
            ))}
            {selectedPriorities.map(id => (
              <div key={id} className="flex items-center h-[29px] bg-white gap-[4px] rounded-[43px] border-[1px] border-[#CED4DA] px-[10px] py-[6px] text-[14px] font-normal font-[FiraGO] text-[#343A40] z-0">
                <span>{priorityNames[id]}</span>
                <button onClick={() => removePriority(id)} className="ml-2 text-[#343A40] hover:text-gray-700"><IoMdClose/></button>
              </div>
            ))}
            {selectedEmployee && (
              <div className = "flex items-center h-[29px] bg-white gap-[4px] rounded-[43px] border-[1px] border-[#CED4DA] px-[10px] py-[6px] text-[14px] font-normal font-[FiraGO] text-[#343A40] z-0">
                <span>{employeeNames[selectedEmployee]}</span>
                <button onClick={removeEmployee} className="ml-2 text-[#343A40] hover:text-gray-700"><IoMdClose/></button>
              </div>
            )}
            {(selectedDepartments.length > 0 || selectedPriorities.length > 0 || selectedEmployee !== null) && (
              <div onClick={handleClearFilters} className="flex items-center cursor-pointerh-[29px] bg-white gap-[4px] rounded-[43px] px-[10px] py-[6px] text-[14px] font-normal font-[FiraGO] text-[#343A40] z-0"> 
                <span className = "cursor-pointer">გასუფთავება</span>
              </div>
            )}
          </div>
        </div>
      </div>

    
    </DropdownContext.Provider>
  );
}

export default Filters;