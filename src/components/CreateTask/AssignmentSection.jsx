import React from 'react';
import Department from './MiniComponents/Department';
import Employee from './MiniComponents/Employee';
import Deadline from './MiniComponents/Deadline';

export const AssignmentSection = ({ handleDepartments, handleEmployeeSelect, onDateSelect, selectedDepartment, isModalOpen }) => {
    return (
        <>
            <div className="w-[550px] h-[108px] top-[65px] left-[766px] absolute">
                <Department isDepartmentSelected={handleDepartments}/>
            </div>

            <div className="w-[550px] h-[76px] top-[234px] left-[766px] absolute">
                <Employee 
                    isEmployeeSelected={handleEmployeeSelect} 
                    selectedDepartment={selectedDepartment} 
                    isModalOpen={isModalOpen}
                />
            </div>

            <div className="w-[320px] h-[76px] top-[473px] left-[766px] absolute flex flex-col gap-[4px]">
                <Deadline onDateSelect={onDateSelect}/>
            </div>
        </>
    );
}; 