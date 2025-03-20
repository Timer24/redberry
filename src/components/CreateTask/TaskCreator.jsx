import React, { useState } from 'react';
import { TaskForm } from './TaskForm';
import { AssignmentSection } from './AssignmentSection';
import AddTaskButton from './MiniComponents/AddTaskButton';
import { useTaskForm } from '../../hooks/useTaskForm';
import { SuccessPopup } from './SuccessPopup';

function TaskCreator({ isModalOpen, onClose }) {
    const {
        formState,
        validationState,
        handleChange,
        handlePriorities,
        handleStatusSelect,
        handleDepartments,
        handleEmployeeSelect,
        handleDateSelect,
        resetForm,
        isFormValid,
        isDescriptionLengthValid,
        isDescriptionWordsValid,
        selectedDepartment,
        submitTask
    } = useTaskForm();

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleTaskCreation = async () => {
        try {
            await submitTask();
            resetForm();
            setShowSuccessPopup(true);
            setTimeout(() => setShowSuccessPopup(false), 3000);
        } catch (error) {
            console.error("Failed to create task:", error);
            alert(error.message || "Failed to create task. Please try again.");
        }
    };

    return (
        <div className="w-[1684px] h-[958px] mt-[25px] ml-[118px] rounded-[4px] border-[0.3px] border-[#DDD2FF] bg-[#FBF9FFA6] relative">
            {showSuccessPopup && <SuccessPopup />}
            
            <TaskForm 
                formState={formState}
                validationState={validationState}
                handleChange={handleChange}
                handlePriorities={handlePriorities}
                handleStatusSelect={handleStatusSelect}
                isDescriptionLengthValid={isDescriptionLengthValid}
                isDescriptionWordsValid={isDescriptionWordsValid}
            />

            <AssignmentSection 
                handleDepartments={handleDepartments}
                handleEmployeeSelect={handleEmployeeSelect}
                onDateSelect={handleDateSelect}
                selectedDepartment={selectedDepartment}
                isModalOpen={isModalOpen}
            />

            <div className="w-[1261px] h-[42px] top-[700px] left-[55px] absolute flex items-center justify-end gap-[10px]">
                <AddTaskButton 
                    onTaskCreation={handleTaskCreation} 
                    disabled={!isFormValid()}
                />
            </div>
        </div>
    );
}

export default TaskCreator;
