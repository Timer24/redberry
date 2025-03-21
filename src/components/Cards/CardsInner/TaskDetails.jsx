import React, { useEffect, useState, useRef } from 'react';
import { FiUser, FiChevronDown, FiCalendar } from "react-icons/fi";
import { TfiPieChart } from "react-icons/tfi";
import useClickOutside from '../../../hooks/useClickOutside';

const BEARER_TOKEN = '9e6dffc9-8b8c-43d7-bd5a-d84d84a95aa1';

function TaskDetails({task}) {
    function formatDate(dateString) {
        const date = new Date(dateString);

        const weekdays = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];
        const weekday = weekdays[date.getDay()];

        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${weekday} - ${month}/${day}/${year}`;
    }

    const [updatedTask, setUpdatedTask] = useState(task);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statuses, setStatuses] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const response = await fetch("https://momentum.redberryinternship.ge/api/statuses", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${BEARER_TOKEN}`,
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch statuses: ${response.status}`);
                }

                const statusesData = await response.json();
                setStatuses(statusesData);
            } catch (err) {
                console.error('Error fetching statuses:', err);
            }
        };

        fetchStatuses();
    }, []);

    useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

    const handleStatusChange = async (newStatus) => {
        try {
            const response = await fetch(`https://momentum.redberryinternship.ge/api/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${BEARER_TOKEN}`,
                },
                body: JSON.stringify({
                    status_id: newStatus.id
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update task status');
            }

            setUpdatedTask(prevTask => ({
                ...prevTask,
                status: newStatus
            }));

        } catch (err) {
            console.error('Error updating task status:', err);
        } finally {
            setIsDropdownOpen(false);
        }
    };

    if (!task) {
        return <div className="flex justify-center items-center h-screen">Task not found</div>;
    }

    const formattedDate = task?.due_date ? formatDate(task.due_date) : 'N/A';

    return (
        <div className="w-[493px] h-[277px] relative">
            <div className="w-[273px] h-[49px] pt-[10px] pb-[10px] flex gap-[10px]">
                <p className="font-[FiraGO] text-[#2A2A2A] font-medium text-[24px] leading-[100%] tracking-[0%]">დავალების დეტალები</p>
            </div>

            <div className="w-[493px] h-[210px] flex flex-col absolute bottom-0">

                <div className="w-[493px] h-[70px] flex flex-row justify-between items-center pt-[10px] pb-[10px] border-b-[1px]">
                    <div className="w-[164px] h-[24px] flex flex-row gap-[6px] items-center">
                        <TfiPieChart />
                        <p className="font-[FiraGO] text-[16px] leading-[150%] font-normal text-[#474747]">სტატუსი</p>
                    </div>

                    <div className="w-[259px] h-[45px] flex flex-row items-center relative" ref={dropdownRef}>
                        <div
                            className={`w-full h-full px-[8px] flex items-center justify-between border-t border-l border-r ${isDropdownOpen ? 'border-b-0 rounded-t-[6px]' : 'border-b rounded-[6px]'} border-gray-300 cursor-pointer`}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <span className="text-[14px] font-[FiraGO] text-[#0D0F10]">
                                {updatedTask?.status?.name || task.status.name}
                            </span>
                            <FiChevronDown
                                className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute left-0 top-full w-full bg-white border border-[#CED4DA] border-t-0 rounded-b-[6px] max-h-[200px] overflow-y-auto z-10 shadow-md">
                                {statuses && statuses.length > 0 ? (
                                    statuses.map((status) => (
                                        <div
                                            key={status.id}
                                            className={`w-full h-[40px] px-[10px] flex items-center hover:bg-gray-200 cursor-pointer font-[FiraGO] text-[14px] font-light leading-[100%] tracking-[0%] ${status.id === task.status.id ? '' : ''}`}
                                            onClick={() => handleStatusChange(status)}
                                        >
                                            {status.name}
                                        </div>
                                    ))
                                ) : (
                                    !loading && <p className="p-2 text-gray-500 text-center">No statuses available</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-[493px] h-[70px] flex flex-row items-center gap-[70px] pt-[10px] pb-[10px] border-b-[1px]">
                    <div className="w-[164px] h-[24px] flex items-center gap-[6px]">
                        <FiUser />
                        <p className="font-[FiraGO] text-[16px] leading-[150%] font-normal text-[#474747]">თანამშრომელი</p>
                    </div>

                    <div className='w-[178px] h-[41px] flex flex-row items-center relative'>
                        <div className="flex flex-row items-center w-[178px] h-[32px] bottom-0 gap-[12px] absolute whitespace-nowrap text-[14px] text-[#0D0F10] font-[FiraGO] font-normal leading-[150%] tracking-[0%]">
                            <img src={task.employee.avatar} alt={task.employee.name} className="w-[28px] h-[28px] rounded-full mr-[2px] object-cover" />
                            {task.employee.name} {task.employee.surname}
                        </div>

                        <p className="w-[135px] h-[13px] flex gap-[10px] font-[FiraGO] text-[11px] leading-[100%] tracking-[0%] font-light text-[#474747] absolute top-[5px] right-0 whitespace-nowrap">{task.department.name}</p>
                    </div>
                </div>

                <div className="w-[493px] h-[70px] flex flex-row items-center gap-[70px] pt-[10px] pb-[10px] border-b-[1px]">
                    <div className="w-[164px] h-[24px] flex items-center gap-[6px]">
                        <FiCalendar />
                        <p className="font-[FiraGO] text-[16px] leading-[150%] font-normal text-[#474747]">დავალების ვადა</p>
                    </div>

                    <div className='w-[178px] h-[41px] flex flex-row items-center relative text-[14px] font-[FiraGO] leading-[150%] font-normal tracking-[0%] text-[#0D0F10]'>
                        {formattedDate}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskDetails;
