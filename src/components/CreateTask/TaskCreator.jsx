import React, { useState, useEffect, useCallback } from 'react';
import AddTaskButton from './MiniComponents/AddTaskButton';
import Deadline from './MiniComponents/Deadline';
import Department from './MiniComponents/Department';
import Description from './MiniComponents/Description';
import Employee from './MiniComponents/Employee';
import Title from './MiniComponents/Title';
import Priority from './MiniComponents/Priority';
import Status from './MiniComponents/Status';

function TaskCreator(isModalOpen, onClose) {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isPrioritySelected, setIsPrioritySelected] = useState(false);
    const [isStatusSelected, setIsStatusSelected] = useState(false);
    const [isDepartmentSelected, setIsDepartmentSelected] = useState(false);
    const [isEmployeeSelected, setIsEmployeeSelected] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [isDescriptionLengthValid, setIsDescriptionLengthValid] = useState(() => {
        const savedValidation = localStorage.getItem('descriptionValidation');
        return savedValidation ? JSON.parse(savedValidation).lengthValid : null;
    });
    const [isDescriptionWordsValid, setIsDescriptionWordsValid] = useState(() => {
        const savedValidation = localStorage.getItem('descriptionValidation');
        return savedValidation ? JSON.parse(savedValidation).wordsValid : null;
    });

    const [formState, setFormState] = useState(() => {
        const savedFormState = localStorage.getItem('taskFormState');
        return savedFormState ? JSON.parse(savedFormState) : {
            name: '',
            description: '',
            due_date: '',
            priority_id: null, 
            status_id: null, 
            employee_id: null, 
        };
    });

    const [validationState, setValidationState] = useState(() => {
        const savedValidationState = localStorage.getItem('taskValidationState');
        return savedValidationState ? JSON.parse(savedValidationState) : {
            name: null,
            description: null, 
            priority: null,
            status_id: null,
            employee_id: null,
            due_date: null,
        };
    });

    useEffect(() => {
        localStorage.setItem('taskFormState', JSON.stringify(formState));
        localStorage.setItem('taskValidationState', JSON.stringify(validationState));
        localStorage.setItem('descriptionValidation', JSON.stringify({
            lengthValid: isDescriptionLengthValid,
            wordsValid: isDescriptionWordsValid
        }));
    }, [formState, validationState, isDescriptionLengthValid, isDescriptionWordsValid]);

    const resetForm = () => {
        setFormState({
            name: '',
            description: '',
            due_date: '',
            priority_id: null, 
            status_id: null, 
            employee_id: null, 
        });
        setValidationState({
            name: null,
            description: null, 
            priority: null,
            status_id: null,
            employee_id: null,
            due_date: null,
        });
        setIsDescriptionLengthValid(null);
        setIsDescriptionWordsValid(null);
        setIsPrioritySelected(false);
        setIsStatusSelected(false);
        setIsDepartmentSelected(false);
        setIsEmployeeSelected(false);
        setSelectedDepartment(null);
    };

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const validateField = useCallback((name, value) => {
        const isValid = value.length >= 2 && value.length <= 255;
        setValidationState((prev) => ({ ...prev, [name]: isValid }));
    }, []);

    const validateDescription = useCallback((value) => {
        const isValidLength = value.length >= 0 && value.length <= 255;  
        const wordCount = value.trim().split(/\s+/).length;  
        const isValidWords = wordCount >= 4;  

        const isValid = isValidLength && isValidWords;

        setIsDescriptionLengthValid(isValidLength);
        setIsDescriptionWordsValid(isValidWords);

        setValidationState((prev) => ({
            ...prev,
            description: isValid, 
        }));

        return isValid;
    }, []);

    const debouncedValidateField = useCallback(
        debounce((name, value) => validateField(name, value), 500),
        [validateField]
    );

    const debouncedValidateDescription = useCallback(
        debounce((value) => validateDescription(value), 500),
        [validateDescription]
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));

        if (name === "description") {
            debouncedValidateDescription(value);  
        } else {
            debouncedValidateField(name, value);  
        }
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

    const handleDateSelect = (selectedDate) => {
        setFormState((prev) => ({
            ...prev,
            due_date: selectedDate,
        }));
    };

    const handleTaskCreation = async () => {
        
        
        const allFieldsValid = Object.values(validationState).every(
            (field) => field === true || field === null 
        );
        
        if (!allFieldsValid) {
            console.log('Validation failed for fields:', Object.entries(validationState).filter(([_, value]) => value === false));
            alert("Please fill all the required fields correctly.");
            return;
        }

        if (isFormValid()) {
            if (!formState.name || !formState.description || !formState.due_date || 
                formState.priority_id === null || formState.status_id === null|| !formState.employee_id) {
                
                alert("Please fill in all required fields.");
                return;
            }

            const taskData = {
                name: formState.name,
                description: formState.description,
                due_date: formState.due_date,
                status_id: formState.status_id,
                employee_id: formState.employee_id,
                priority_id: formState.priority_id,
            };
           

            const response = await fetch("https://momentum.redberryinternship.ge/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer 9e6dffc9-8b8c-43d7-bd5a-d84d84a95aa1`,
                },
                body: JSON.stringify(taskData),
            });

            if (response.ok) {
                const result = await response.json();
                
                localStorage.removeItem('taskFormState');
                localStorage.removeItem('taskValidationState');
                localStorage.removeItem('descriptionValidation');
                localStorage.removeItem('selectedEmployee');
                localStorage.removeItem('hasDepartmentBeenSelected');
                localStorage.removeItem('selectedDepartment');
                localStorage.removeItem('selectedPriority');
                localStorage.removeItem('selectedStatus');
                localStorage.removeItem('selectedDate');
                
                resetForm();
                
                setShowSuccessPopup(true);
                setTimeout(() => setShowSuccessPopup(false), 3000);
            } else {
                console.error("Failed to create task");
                alert("Failed to create task. Please try again.");
            }
        } else {
            console.log('Form validation failed:', {
                isFormFilled: formState.name && formState.description && formState.due_date,
                validationState: Object.entries(validationState).filter(([_, value]) => value === false)
            });
        }
    };

    const isFormValid = () => {
        const isFormFilled = formState.name && formState.description && formState.due_date;
        const isValid = Object.values(validationState).every((field) => field === true || field === null); 
      
        return isFormFilled && isValid;
    };

    return (
        <div className="w-[1684px] h-[958px] mt-[25px] ml-[118px] rounded-[4px] border-[0.3px] border-[#DDD2FF] bg-[#FBF9FFA6] relative">
            {showSuccessPopup && (
                <div className="fixed top-4 right-4 text-[#8338EC] bg-white border-[1px] px-6 py-3 rounded-md shadow-lg z-50">
                    Task Created Successfully!
                </div>
            )}
            <div className="w-[550px] h-[674px] top-[65px] left-[55px] flex flex-col gap-[55px] absolute">
                <div className="relative">
                    <Title formState={formState} validationState={validationState} onInputChange={handleChange}/>
                </div>

                <div className="relative">
                    <Description formState={formState} validationState={validationState.description} onInputChange={handleChange} isValidLength={isDescriptionLengthValid} isValidWords ={isDescriptionWordsValid}/>
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
                <Employee isEmployeeSelected={handleEmployeeSelect} selectedDepartment={selectedDepartment} isModalOpen = {isModalOpen}/>
            </div>

            <div className="w-[320px] h-[76px] top-[473px] left-[766px] absolute flex flex-col gap-[4px]">
                <Deadline onDateSelect={handleDateSelect}/>
            </div>

            <div className="w-[1261px] h-[42px] top-[700px] left-[55px] absolute flex items-center justify-end gap-[10px]">
                <AddTaskButton onTaskCreation={handleTaskCreation} disabled={!isFormValid()}/>
            </div>
        </div>
    );
}

export default TaskCreator;
