import { useState, useCallback, useEffect } from 'react';
import { debounce } from '../utils/debounce';

const API_TOKEN = '9e6dffc9-8b8c-43d7-bd5a-d84d84a95aa1';

export const useTaskForm = () => {
    const [formState, setFormState] = useState(() => {
        const savedFormState = localStorage.getItem('taskFormState');
        return savedFormState ? JSON.parse(savedFormState) : {
            name: '',
            description: '',
            due_date: '',
            priority_id: null,
            status_id: null,
            employee_id: null,
            department_id: null
        };
    });

    const [validationState, setValidationState] = useState(() => {
        return {
            name: null,
            description: null,
            priority_id: null,
            status_id: null,
            employee_id: null,
            due_date: null,
            department_id: null
        };
    });

    const [isDescriptionLengthValid, setIsDescriptionLengthValid] = useState(null);
    const [isDescriptionWordsValid, setIsDescriptionWordsValid] = useState(null);

    const [selectedDepartment, setSelectedDepartment] = useState(null);

    useEffect(() => {
        localStorage.setItem('taskFormState', JSON.stringify(formState));
    }, [formState]);

    useEffect(() => {
        
        if (formState.description) {
            validateDescription(formState.description);
        }
        
        if (formState.name) {
            validateField('name', formState.name);
        }

        if (formState.priority_id) {
            setValidationState(prev => ({ ...prev, priority_id: true }));
        }
        
        if (formState.status_id) {
            setValidationState(prev => ({ ...prev, status_id: true }));
        }
        
        if (formState.employee_id) {
            setValidationState(prev => ({ ...prev, employee_id: true }));
        }

        if (formState.due_date) {
            setValidationState(prev => ({ ...prev, due_date: true }));
        }
    }, []); 

    const validateField = useCallback((name, value) => {
        const isValid = value.length >= 2 && value.length <= 255;
        setValidationState((prev) => ({ ...prev, [name]: isValid }));
    }, []);

    const validateDescription = useCallback((value) => {
        if (!value) {
            setIsDescriptionLengthValid(false);
            setIsDescriptionWordsValid(false);
            setValidationState(prev => ({
                ...prev,
                description: false
            }));
            return false;
        }

        const isValidLength = value.length > 0 && value.length <= 255;
        const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;
        const isValidWords = wordCount >= 4;

        setIsDescriptionLengthValid(isValidLength);
        setIsDescriptionWordsValid(isValidWords);

        const isValid = isValidLength && isValidWords;

        setValidationState(prev => ({
            ...prev,
            description: isValid
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
        setFormState(prev => ({ ...prev, [name]: value }));

        if (name === "description") {
            validateDescription(value);
        } else {
            debouncedValidateField(name, value);
        }
    };

    const handlePriorities = (isSelected, priority_id) => {
        setFormState((prev) => ({
            ...prev,
            priority_id: priority_id,
        }));
        setValidationState((prev) => ({ ...prev, priority_id: isSelected }));
    };

    const handleStatusSelect = (isSelected, status_id) => {
        setFormState((prev) => ({
            ...prev,
            status_id: status_id,
        }));
        setValidationState((prev) => ({ ...prev, status_id: isSelected }));
    };

    const handleDepartments = (isSelected, department_id) => {
        if (department_id !== selectedDepartment) {
            setFormState(prev => ({
                ...prev,
                department_id: department_id,
                employee_id: null
            }));
            setValidationState(prev => ({
                ...prev,
                department_id: isSelected,
                employee_id: null
            }));
            setSelectedDepartment(department_id);
        } else {
            setFormState(prev => ({
                ...prev,
                department_id: department_id
            }));
            setValidationState(prev => ({
                ...prev,
                department_id: isSelected
            }));
        }
    };

    const handleEmployeeSelect = (isSelected, employee_id) => {
        setFormState(prev => ({
            ...prev,
            employee_id: employee_id
        }));
        setValidationState(prev => ({
            ...prev,
            employee_id: isSelected
        }));
    };

    const handleDateSelect = (selectedDate) => {
        setFormState((prev) => ({
            ...prev,
            due_date: selectedDate,
        }));
    };

    const resetForm = () => {
        
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formattedTomorrow = tomorrow.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).split('/').join('-');

        
        window.dispatchEvent(new CustomEvent('resetTaskForm', {
            detail: {
                priority_id: 2,
                priority_name: "საშუალო", 
                status_id: 1,
                status_name: "დასაწყები", 
                due_date: formattedTomorrow
            }
        }));

        
        const defaultState = {
            name: '',
            description: '',
            due_date: formattedTomorrow,
            priority_id: 2,
            status_id: 1,
            employee_id: null,
            department_id: null
        };

        setFormState(defaultState);
        localStorage.setItem('taskFormState', JSON.stringify(defaultState));

        
        setValidationState({
            name: null,
            description: null,
            priority_id: null,
            status_id: null,
            employee_id: null,
            due_date: null,
            department_id: null
        });

        setIsDescriptionLengthValid(null);
        setIsDescriptionWordsValid(null);

        
        localStorage.removeItem('taskValidationState');
        localStorage.removeItem('descriptionValidation');
    };

    useEffect(() => {
        const savedFormState = localStorage.getItem('taskFormState');
        if (!savedFormState) {
            resetForm(); 
        }
    }, []); 
    const isFormValid = () => {
        const isFormFilled = Boolean(
            formState.name && 
            formState.description && 
            formState.due_date &&
            formState.priority_id &&
            formState.status_id &&
            formState.employee_id
        );
                           
        const isValid = Object.values(validationState).every(
            (field) => field === true || field === null
        );

        const isDescriptionValid = isDescriptionLengthValid && isDescriptionWordsValid;

        return isFormFilled && isValid && isDescriptionValid;
    };

    const submitTask = async () => {
        if (!isFormValid()) {
            throw new Error("Please fill all the required fields correctly.");
        }

        const taskData = {
            name: formState.name,
            description: formState.description,
            due_date: formState.due_date,
            status_id: formState.status_id,
            employee_id: formState.employee_id,
            priority_id: formState.priority_id,
        };

        console.log('Form validation state:', {
            validationState,
            nameLength: formState.name.length,
            isFormValid: isFormValid(),
            formState
        });

        try {
            const response = await fetch("https://momentum.redberryinternship.ge/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${API_TOKEN}`,
                },
                body: JSON.stringify(taskData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                throw new Error("Failed to create task");
            }

            return await response.json();
        } catch (error) {
            console.error('Error details:', error);
            throw error;
        }
    };

    return {
        formState,
        validationState,
        isDescriptionLengthValid,
        isDescriptionWordsValid,
        handleChange,
        handlePriorities,
        handleStatusSelect,
        handleDepartments,
        handleEmployeeSelect,
        handleDateSelect,
        resetForm,
        isFormValid,
        selectedDepartment,
        submitTask,
    };
}; 