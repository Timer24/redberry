import React, {useState} from "react";
import { IoIosArrowDown } from "react-icons/io";
import DepartmentDropdown from "./DepartmentDropdown";
import PriorityDropdown from "./PriorityDropdown";
import EmployeeDropdown from "./EmployeeDropdown"
import { DropdownContext } from "../DropdownContext";

function Filters() {
    
        const[departmentOpen, setDepartmentOpen] = useState(false);
        const[priorityOpen, setPriorityOpen] = useState(false);
        const[employeeOpen, setEmployeeOpen] = useState(false);

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

  return (
    <DropdownContext.Provider value = {{toggleDropdown, departmentOpen, setDepartmentOpen, priorityOpen, setPriorityOpen, employeeOpen, setEmployeeOpen}}>
    <div className="absolute top-[233px] left-[120px] w-[688px] mb-[40px] h-[44px] rounded-[10px] border border-[#DEE2E6] flex items-center justify-around">
      <button onClick={() => toggleDropdown("department")} className={`relative flex items-center ${departmentOpen ? "text-[#8338EC]": ""}`}>
        დეპარტამენტი
        <IoIosArrowDown className="mt-[3px] ml-[8px]"/>
        
      </button>
      <button onClick={() => toggleDropdown("priority")} className={`relative flex items-center ${priorityOpen ? "text-[#8338EC]": ""}`}>
        პრიორიტეტი
        <IoIosArrowDown className="mt-[3px] ml-[8px]"/>
        
      </button>
      <button onClick={() => toggleDropdown("employee")} className={`relative flex items-center ${employeeOpen ? "text-[#8338EC]": ""}`}>
        თანამშრომელი
        <IoIosArrowDown className="mt-[3px] ml-[8px]"/>
      </button>
        {employeeOpen && (
            <EmployeeDropdown closeDropdown={() => toggleDropdown("employee")}/>
        )}
        {priorityOpen && (
            <PriorityDropdown closeDropdown={() => toggleDropdown("priority")}/>
        )}
        {departmentOpen && (
            <DepartmentDropdown closeDropdown={() => toggleDropdown("department")}/>
        )}
      
    </div>
    </DropdownContext.Provider>
  );
}

export default Filters;
