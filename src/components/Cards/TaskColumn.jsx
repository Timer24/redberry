import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const statusColors = {
  1: 'bg-[#F7BC30]', 
  2: 'bg-[#FB5607]', 
  3: 'bg-[#FF006E]', 
  4: 'bg-[#3A86FF]'  
};

function TaskColumn({ status, tasks }) {
  const { setNodeRef, isOver } = useDroppable({
    id: status.id.toString(),
  });

  const needsScroll = tasks.length > 4;

  return (
    <div className={`${needsScroll ? 'w-[405px]' : 'w-[381px]'}`}>
      <div className={`h-[54px] w-[381px] rounded-[10px] mb-6 ${statusColors[status.id]} flex items-center justify-center px-6`}>
        <h2 className="font-[FiraGO] text-[20px] font-medium text-white leading-[100%] tracking-[0%]">{status.name}</h2>
      </div>
      <div
        ref={setNodeRef}
        className={`${needsScroll ? 'h-[892px] w-[405px] overflow-y-auto custom-scrollbar' : ''} transition-all ${
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
        </div>
      </div>
    </div>
  );
}

export default TaskColumn; 