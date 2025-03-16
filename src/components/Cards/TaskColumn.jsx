import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';
import { FaTasks } from 'react-icons/fa';

const statusColors = {
  1: 'bg-[#F7BC30]', 
  2: 'bg-[#FB5607]', 
  3: 'bg-[#FF006E]', 
  4: 'bg-[#3A86FF]'  
};

const emptyStateMessages = {
  1: 'დასაწყები ტასკები ცარიელია',
  2: 'ტასკები პროგრესში ცარიელია',
  3: 'ტასკები მზად ტესტირებისთვის ცარიელია',
  4: 'დასრულებული ტასკები ცარიელია'
};

function TaskColumn({ status, tasks }) {
  const { setNodeRef, isOver } = useDroppable({
    id: status.id.toString(),
  });

  const needsScroll = tasks.length > 4;

  return (
    <div className={`${needsScroll ? 'w-[399px]' : 'w-[381px]'}`}>
      <div className={`h-[54px] w-[381px] rounded-[10px] mb-6 ${statusColors[status.id]} flex items-center justify-center px-6`}>
        <h2 className="font-[FiraGO] text-[20px] font-medium text-white leading-[100%] tracking-[0%]">{status.name}</h2>
      </div>
      <div
        ref={setNodeRef}
        className={`${
          needsScroll ? 'h-[978px] w-[381px] overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden' : 'w-[381px]'
        } transition-all ${
          isOver ? 'bg-gray-50 ring-2 ring-blue-400 ring-opacity-50 rounded-lg' : ''
        }`}
      >
        <div className="w-[381px]">
          <SortableContext
            items={tasks.map(task => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
          {tasks.length === 0 && (
            <div className="w-[381px] h-[217px] rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 bg-opacity-50 flex flex-col items-center justify-center gap-4 text-gray-400">
              <FaTasks className="scale-150" />
              <p className="font-[FiraGO] text-[16px]">{emptyStateMessages[status.id]}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskColumn; 