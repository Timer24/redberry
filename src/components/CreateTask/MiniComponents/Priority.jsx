import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import useFetchGet from '../../../hooks/useFetchGet';

export default function Priority({ isPrioritySelected }) {
  const { data: priorities, error, loading } = useFetchGet("priorities");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (priority_id, priority_name, priority_icon) => {
    setSelectedPriority({ name: priority_name, icon: priority_icon });
    setIsOpen(false);
    isPrioritySelected(true, priority_id);
    localStorage.setItem('selectedPriority', JSON.stringify({ name: priority_name, icon: priority_icon, id: priority_id }));
  };

  useEffect(() => {
    const savedPriority = localStorage.getItem('selectedPriority');
    if (savedPriority) {
      const parsedPriority = JSON.parse(savedPriority);
      setSelectedPriority(parsedPriority);
      isPrioritySelected(true, parsedPriority.id);
    } else if (priorities && priorities.length > 0) {
      const defaultPriority = priorities.find(s => s.id === 2);
      if (defaultPriority) {
        setSelectedPriority(defaultPriority);
      }
    }
  }, [priorities]);
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-[75px] w-[259px] top-[62px] relative" ref={dropdownRef}>
      <p className="font-[FiraGO] text-[16px] font-light leading-[100%] tracking-[0%] mb-1 text-[#343A40]">
        პრიორიტეტი*
      </p>

      <div
        className={`w-[259px] h-[46px] bg-white border border-[#CED4DA] p-[10px] flex items-center justify-between cursor-pointer relative
          ${isOpen ? "rounded-t-[6px] border-b-0" : "rounded-[6px]"}`}
        onClick={toggleDropdown}
      >
        {selectedPriority ? (
          <div className="flex items-center">
            {selectedPriority.icon && (
              <img
                src={selectedPriority.icon}
                alt={selectedPriority.name}
                className="w-[20px] h-[20px] mr-[10px] object-contain"
              />
            )}
            <span className="font-[FiraGO] text-[14px] font-light leading-[100%] tracking-[0%]">
              {selectedPriority.name}
            </span>
          </div>
        ) : (
          <span className="font-[FiraGO] text-[14px] font-light leading-[100%] tracking-[0%]">
            Loading...
          </span>
        )}
        <IoIosArrowDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full w-[259px] bg-white border border-[#CED4DA] border-t-0 max-h-[200px] overflow-y-auto z-10 rounded-b-[6px] shadow-md">
          {loading && <p className="p-2 text-gray-500 text-center">Loading...</p>}
          {error && <p className="p-2 text-red-500 text-center">Error: {error}</p>}
          {priorities && priorities.length > 0 ? (
            priorities.map((priority, index) => (
              <div
                key={index}
                className="w-full h-[40px] px-[10px] flex items-center hover:bg-gray-200 cursor-pointer font-[FiraGO] text-[14px] font-light leading-[100%] tracking-[0%]"
                onClick={() => handleSelect(priority.id, priority.name, priority.icon)}
              >
                {priority.icon && (
                  <img
                    src={priority.icon}
                    alt={priority.name}
                    className="w-[px] h-[20px] mr-[10px] object-contain"
                  />
                )}
                {priority.name}
              </div>
            ))
          ) : (
            !loading && <p className="p-2 text-gray-500 text-center">No priorities available</p>
          )}
        </div>
      )}
    </div>
  );
}
