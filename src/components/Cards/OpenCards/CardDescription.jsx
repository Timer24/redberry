import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BEARER_TOKEN = '9e6dffc9-8b8c-43d7-bd5a-d84d84a95aa1';

function CardDescription({id}) {
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
      
      
    
    console.log({id})
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTaskData = async () => {
          try {
            
            const response = await fetch(`https://momentum.redberryinternship.ge/api/tasks/${id}`, {
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${BEARER_TOKEN}`,
                }
              });
      
              if (!response.ok) {
                const errorText = await response.text();
                console.error('API response error:', response.status, errorText);
                throw new Error(`Failed to fetch task data: ${response.status}`);
              }
      
              const taskData = await response.json();
              console.log("Task data:", taskData);
              
              setTask(taskData);
              setLoading(false);
            } catch (err) {
              console.error('Error fetching task data:', err);
              setError(err.message);
              setLoading(false);
            }
          };
    
        if (id) {
            fetchTaskData();
        }
    }, [id]);
      
    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
      
    if (error) {
        return <div className="text-red-500 flex justify-center items-center h-screen">Error: {error}</div>;
    }
      
    if (!task) {
        return <div className="flex justify-center items-center h-screen">Task not found</div>;
    }
    
    
    return (
        <div className = "w-[715px] h-[239px] flex flex-col gap-[26px]">
            <div className="w-[715px] h-[105px] pt-[10px] pb-[10px] flex flex-col gap-[12px]">

                <div className="w-[212px] h-[32px] flex flex-column items-center gap-[18px]">
                    <span className={`px-[5px] py-[4px] w-[106px] h-[32px] gap-[4px] flex items-center text-[16px] font-[FiraGO] font-medium border-[0.5px] leading-[150%] tracking-[0%] rounded-[3px] justify-center ${priorityColors[task.priority.id]}`}>
                        <img src={task.priority.icon} alt={task.priority.name}/>
                        {task.priority.name}
                    </span>

                    <div className={`min-w-[88px] h-[29px] rounded-[15px] px-[10px] py-[5px] gap-[10px] flex items-center justify-center text-[16px] text-[white] font-[FiraGO] font-normal leading-[100%] tracking-[0%] whitespace-nowrap ${getDepartmentColor(task.department.id)}`}>
                        {getShortDepartmentName(task.department.id, task.department.name)}
                    </div>

                </div>

                <h2 className="text-[32px] font-[Inter] font-semibold leading-[100%] tracking-[0%]">{task.name}</h2>        
                
            </div>

            <div className = "w-[715px] h-[108px] flex gap-[10px] overflow-y-auto">
                {task.description}
            </div>
        </div>
    )
}

export default CardDescription