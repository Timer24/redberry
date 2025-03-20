import React, { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GoComment } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { MdDragIndicator } from "react-icons/md";
import Comments from './CardsInner/Comments';

const BEARER_TOKEN = '9e6dffc9-8b8c-43d7-bd5a-d84d84a95aa1';

const statusColors = {
  1: 'border-[#FFA41B]', 
  2: 'border-[#FF4E4E]', 
  3: 'border-[#FF1B8D]', 
  4: 'border-[#1BC1FF]'  
};

const priorityColors = {
  1: 'bg-white text-[#08A508] border-[#08A508]', 
  2: 'bg-white text-[#FFBE0B] border-[#FFBE0B]', 
  3: 'bg-white text-[#FA4D4D] border-[#FA4D4D]', 
};

const departmentShortNames = {
  1: "ადმინ.",
  2: "HR",
  3: "ფინანსები",
  4: "გაყიდვები",
  5: "ლოჯისტიკა",
  6: "ინფ. ტექ",
  7: "მედია",
};

const departmentStyles = {
  1: "bg-[#FD9A6A]",
  2: "bg-[#FF66A8]",
  3: "bg-[#FFD86D]",
  4: "bg-[#89B6FF]",
  5: "bg-[#6AFFC0]",
  6: "bg-[#A566FF]",
  7: "bg-[#FF934F]",
};

const getDepartmentColor = (id) => departmentStyles[id] || "bg-gray-500";

const getShortDepartmentName = (id, name) => {
  return departmentShortNames[id] || name;
};

function TaskCard({ task }) {
  const navigate = useNavigate();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    width: '100%'
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()} იანვ, ${date.getFullYear()}`;
  };

  const handleCardClick = () => {
    navigate(`/tasks/${task.id}`);
  };
  

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`w-[381px] h-[217px] bg-white p-6 rounded-[10px] shadow-sm mb-4 cursor-pointer border ${statusColors[task.status.id]} border-[1px] flex flex-col justify-between relative group`}
      onClick={handleCardClick}
    >
      <div
        {...attributes} 
        {...listeners}
        className="absolute top-2 right-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <MdDragIndicator size={20} />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 relative">
            {task.priority && (
              <span className={`p-[4px] w-[86px] h-[26px] gap-[4px] flex text-xs font-[FiraGO] border-[0.5px] rounded-[5px] justify-center ${priorityColors[task.priority.id]}`}>
                <img src={task.priority.icon} alt={task.priority.name}/>
                {task.priority.name}
              </span>
            )}
            
            <div className={`w-[88px] h-[24px] rounded-[15px] px-[9px] py-[5px] gap-[10px] flex items-center justify-center text-[12px] text-[white] font-[FiraGO] font-normal leading-[100%] tracking-[0%] ${getDepartmentColor(task.department.id)}`}>
                {getShortDepartmentName(task.department.id, task.department.name)}
            </div>
          </div>
          <span className="text-[#212529] text-[12px] font-[FiraGO] leading-[100%] tracking-[0%] whitespace-nowrap ">{formatDate(task.due_date)}</span>
        </div>

        <div className="flex items-center gap-2">
            <h3 className="font-[FiraGO] text-[15px] font-medium text-[#212529] leading-[100%] tracking-[0%]">{task.name}</h3>
        </div>
        
        <p className="font-[FiraGO] text-[14px] text-[#343A40] line-clamp-2">{task.description}</p>
      </div>
      
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center">
          {task.employee && task.employee.avatar && (
            <img
              src={task.employee.avatar}
              alt={`${task.employee.name} ${task.employee.surname}`}
              className="w-8 h-8 rounded-full mr-2 object-cover border border-gray-200"
            />
          )}
          <span className="font-[FiraGO] text-sm text-[#272727]">
            {task.employee ? `${task.employee.name} ${task.employee.surname}` : ''}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <GoComment className="text-[#9B9B9B]"/>
          <span className="font-[FiraGO] text-sm text-[#9B9B9B]">{task.total_comments}</span>
        </div>
      </div>
    </div>
  );
}

export default TaskCard; 