import React, { useState, useEffect } from 'react';
import { DndContext, DragOverlay, closestCorner, pointerWithin } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import TaskColumn from './TaskColumn';
import TaskCard from './TaskCard';

const BEARER_TOKEN = '9e6dffc9-8b8c-43d7-bd5a-d84d84a95aa1';

function Cards() {
  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusesResponse, tasksResponse] = await Promise.all([
          fetch('https://momentum.redberryinternship.ge/api/statuses', {
            headers: {
              'Authorization': `Bearer ${BEARER_TOKEN}`,
            }
          }),
          fetch('https://momentum.redberryinternship.ge/api/tasks', {
            headers: {
              'Authorization': `Bearer ${BEARER_TOKEN}`,
            }
          })
        ]);

        if (!statusesResponse.ok || !tasksResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [statusesData, tasksData] = await Promise.all([
          statusesResponse.json(),
          tasksResponse.json()
        ]);

        setStatuses(statusesData);
        setTasks(tasksData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find(task => task.id === active.id);
    const overId = over.id;
    
    
    const overTask = tasks.find(task => task.id === overId);
    if (overTask) {
      const newStatusId = overTask.status.id;
      if (activeTask.status.id !== newStatusId) {
        updateTaskStatus(active.id, newStatusId);
      }
    } else {
      
      const newStatusId = parseInt(overId);
      if (activeTask.status.id !== newStatusId) {
        updateTaskStatus(active.id, newStatusId);
      }
    }
  };

  const updateTaskStatus = async (taskId, newStatusId) => {
    try {
      const response = await fetch(`https://momentum.redberryinternship.ge/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify({
          status_id: newStatusId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }

      const updatedTask = await response.json();
      setTasks(tasks.map(task =>
        task.id === taskId ? updatedTask : task
      ));
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeTask = tasks.find(task => task.id === active.id);
    const overTask = tasks.find(task => task.id === over.id);

    if (activeTask && overTask && activeTask.status.id === overTask.status.id) {
      const oldIndex = tasks.findIndex(task => task.id === active.id);
      const newIndex = tasks.findIndex(task => task.id === over.id);

      if (oldIndex !== newIndex) {
        setTasks(arrayMove(tasks, oldIndex, newIndex));
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  const activeTask = activeId ? tasks.find(task => task.id === activeId) : null;

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
    >
      <div className="absolute top-[356px] left-[120px] right-[120px]">
        <div className="flex gap-8">
          {statuses.map(status => (
            <TaskColumn
              key={status.id}
              status={status}
              tasks={tasks.filter(task => task.status.id === status.id)}
            />
          ))}
        </div>
      </div>

      <DragOverlay dropAnimation={{
        duration: 200,
        easing: 'ease-out',
      }}>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

export default Cards;