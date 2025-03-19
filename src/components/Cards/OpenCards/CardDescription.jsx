import React from 'react'

function CardDescription({task}) {
      
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
      
      const getDepartmentColor =(id) => departmentStyles[id] || "bg-gray-500";
      
      const getShortDepartmentName = (id, name) => {
        return departmentShortNames[id] || name;
      };
      
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