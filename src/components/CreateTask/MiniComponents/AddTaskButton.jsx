import React from 'react';

function AddTaskButton({ disabled, onTaskCreation}) {
  return (
    <div className="flex absolute bottom-0 right-0 gap-[22px]">
      <button
        className="flex justify-center items-center w-[263px] h-[42px] rounded-[5px] px-[10px] py-[20px] gap-[4px] text-white bg-[#8338EC] transition-all duration-300 ease-out hover:bg-[#B588F4] font-[FiraGO] font-normal text-[18px] leading-[100%] tracking-[0%]"
        disabled={disabled}
        style={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
        }}
        onClick={onTaskCreation}
      >
        დავალების შექმნა
      </button>
    </div>
  );
}

export default AddTaskButton;
