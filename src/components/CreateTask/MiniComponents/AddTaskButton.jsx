import React from 'react'

function AddTaskButton() {
  return (
    <div>
        <button className = "font-style-1 flex justify-center items-center w-[208px] h-[42px] top-[20px] left-[20px] rounded-[5px] px-[10px] py-[20px] gap-[4px] text-white bg-[#8338EC] transition-all duration-300 ease-out hover:bg-[#B588F4]"
        onClick = {() => localStorage.clear()}>
                დავალების შექმნა
        </button>
    </div>
  )
}

export default AddTaskButton