import React, { useState, useEffect } from 'react';
import AddTaskButton from './MiniComponents/AddTaskButton';
import Deadline from './MiniComponents/Deadline';
import Department from './MiniComponents/Department';
import Description from './MiniComponents/Description';
import Employee from './MiniComponents/Employee';
import Title from './MiniComponents/Title';
import Priority from './MiniComponents/Priority';
import Status from './MiniComponents/Status';

function TaskCreator() {
    const [isPrioritySelected, setIsPrioritySelected] = useState(false);
    const [isStatusSelected, setIsStatusSelected] = useState(false);
    const [isDepartmentSelected, setIsDepartmentSelected] = useState(false);
    const [isEmployeeSelected, setIsEmployeeSelected] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [formState, setFormState] = useState({
        name: '',
        description: '',
        priority: '', 
        department_id: '',
        status_id: '', 
        employee_id: '',
        due_date: '',
    });

    const [validationState, setValidationState] = useState({
        name: null,
        description: { wordCount: null, length: null },
        priority: null,
        department_id: null, 
        status_id: null,
        employee_id: null,
        due_date: null,
    });

    useEffect(() => {
        const savedFormState = JSON.parse(localStorage.getItem('taskFormState'));
        if (savedFormState) {
            setFormState(savedFormState);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('taskFormState', JSON.stringify(formState));
    }, [formState]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));

        if (name === "description") {
            validateDescriptionFieldWords(name, value);  
            validateDescriptionFieldLength(name, value);  
        } else {
            validateField(name, value);  
        }
    };

    const validateField = (name, value) => {
        const isValid = value.length >= 2 && value.length <= 255;
        setValidationState((prev) => ({ ...prev, [name]: isValid }));
    };

    const validateDescriptionFieldWords = (name, value) => {
        const wordCount = value.trim().split(/\s+/).length;  
        const isValidWords = wordCount >= 4;  
        setValidationState((prev) => ({
            ...prev,
            [name]: {
                ...prev[name], 
                wordCount: isValidWords,  
            },
        }));
    };

    const validateDescriptionFieldLength = (name, value) => {
        const isValidLength = value.length >= 0 && value.length <= 255;  
        setValidationState((prev) => ({
            ...prev,
            [name]: {
                ...prev[name], 
                length: isValidLength,  
            },
        }));
    };

    const handlePriorities = (isSelected, priority_id) => {
        setIsPrioritySelected(isSelected);
        setFormState((prev) => ({
            ...prev,
            priority_id: priority_id, 
        }));
        setValidationState((prev) => ({ ...prev, priority_id: isSelected }));
    };

    const handleStatusSelect = (isSelected, status_id) => { 
        setIsStatusSelected(isSelected);
        setFormState((prev) => ({
            ...prev,
            status_id: status_id, 
        }));
        setValidationState((prev) => ({ ...prev, status_id: isSelected }));
    };

    const handleDepartments = (isSelected, department_id) => {
        setIsDepartmentSelected(isSelected);
        setFormState((prev) => ({
            ...prev,
            department_id: department_id, 
        }));
        setValidationState((prev) => ({ ...prev, department_id: isSelected }));
        setSelectedDepartment(department_id);
    };

    const handleEmployeeSelect = (isSelected, employee_id) => {
        setIsEmployeeSelected(isSelected); 
        setFormState((prev) => ({
            ...prev,
            employee_id: employee_id, 
        }));
        setValidationState((prev) => ({ ...prev, employee_id: isSelected })); 
    };

    const handleTaskCreation = () => {
        localStorage.removeItem('taskFormState');
    };

    return (
        <div className="w-[1684px] h-[958px] mt-[25px] ml-[118px] rounded-[4px] border-[0.3px] border-[#DDD2FF] bg-[#FBF9FFA6] relative">
            <div className="w-[550px] h-[674px] top-[65px] left-[55px] flex flex-col gap-[55px] absolute">
                <div className="relative">
                    <Title formState={formState} validationState={validationState} onInputChange={handleChange} validateDescriptionFieldLength={validateDescriptionFieldLength} validateDescriptionFieldWords={validateDescriptionFieldWords}/>
                </div>

                <div className="relative">
                    <Description formState={formState} validationState={validationState} onInputChange={handleChange}/>
                </div>

                <div className="w-[550px] h-[260px] relative">
                    <Priority isPrioritySelected={handlePriorities} />
                    <div className="absolute top-[0px] left-[calc(259px+32px)]">
                        <Status isStatusSelected={handleStatusSelect}/>
                    </div>
                </div>
            </div>

            <div className="w-[550px] h-[108px] top-[65px] left-[766px] absolute">
                <Department isDepartmentSelected={handleDepartments}/>
            </div>

            <div className="w-[550px] h-[76px] top-[234px] left-[766px] absolute">
                <Employee isEmployeeSelected={handleEmployeeSelect} selectedDepartment={selectedDepartment}/>
            </div>

            <div className="w-[320px] h-[76px] top-[479px] left-[766px] absolute flex flex-col gap-[4px]">
                <Deadline formState={formState} setFormState={setFormState}/>
            </div>

            <div className="w-[1261px] h-[42px] top-[700px] left-[55px] absolute flex items-center justify-end gap-[10px]">
                <AddTaskButton onClick={handleTaskCreation} />
            </div>
        </div>
    );
}

export default TaskCreator;
