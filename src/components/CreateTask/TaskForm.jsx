import React from 'react';
import Title from './MiniComponents/Title';
import Description from './MiniComponents/Description';
import Priority from './MiniComponents/Priority';
import Status from './MiniComponents/Status';

export const TaskForm = ({ formState, validationState, handleChange, handlePriorities, handleStatusSelect, isDescriptionLengthValid, isDescriptionWordsValid }) => {
    return (
        <div className="w-[550px] h-[674px] top-[65px] left-[55px] flex flex-col gap-[55px] absolute">
            <div className="relative">
                <Title 
                    formState={formState} 
                    validationState={validationState} 
                    onInputChange={handleChange}
                />
            </div>

            <div className="relative">
                <Description 
                    formState={formState} 
                    validationState={validationState.description} 
                    onInputChange={handleChange}
                    isValidLength={isDescriptionLengthValid}
                    isValidWords={isDescriptionWordsValid}
                />
            </div>

            <div className="w-[550px] h-[260px] relative">
                <Priority isPrioritySelected={handlePriorities} />
                <div className="absolute top-[0px] left-[calc(259px+32px)]">
                    <Status isStatusSelected={handleStatusSelect}/>
                </div>
            </div>
        </div>
    );
}; 