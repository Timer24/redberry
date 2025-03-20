import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import useFetchGet from '../../../hooks/useFetchGet';
import useClickOutside from '../../../hooks/useClickOutside';
export default function Status({ isStatusSelected }) {
  const { data: statuses, error, loading } = useFetchGet("statuses");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (status_id, status_name) => {
    setSelectedStatus(status_name);
    setIsOpen(false);
    isStatusSelected(true, status_id);
    localStorage.setItem('selectedStatus', status_name);
  };

  useEffect(() => {
    const savedStatus = localStorage.getItem('selectedStatus');
    if (savedStatus) {
      setSelectedStatus(savedStatus);
      if (statuses && statuses.length > 0) {
        const status = statuses.find(s => s.name === savedStatus);
        if (status) {
          isStatusSelected(true, status.id);
        }
      }
    } else if (statuses && statuses.length > 0) {
      const defaultStatus = statuses.find(s => s.id === 1);
      if (defaultStatus) {
        setSelectedStatus(defaultStatus.name);
        isStatusSelected(true, defaultStatus.id);
      }
    }
  }, [statuses]);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    const handleReset = (event) => {

        setSelectedStatus("დასაწყები"); 
        localStorage.removeItem('selectedStatus');
        isStatusSelected(true, 1);
    };
    
    window.addEventListener('resetTaskForm', handleReset);
    return () => window.removeEventListener('resetTaskForm', handleReset);
}, [isStatusSelected]);

  return (
    <div className="mb-[75px] w-[259px] top-[62px] relative" ref={dropdownRef}>
      <p className="font-[FiraGO] text-[16px] font-light leading-[100%] tracking-[0%] mb-1 text-[#343A40]">
        სტატუსი*
      </p>

      <div
        className={`w-[259px] h-[46px] bg-white border border-[#CED4DA] p-[10px] flex items-center justify-between cursor-pointer relative
          ${isOpen ? "rounded-t-[6px] border-b-0" : "rounded-[6px]"}`}
        onClick={toggleDropdown}
      >
        {selectedStatus ? (
          <span className="font-[FiraGO] text-[14px] font-light leading-[100%] tracking-[0%]">
            {selectedStatus}
          </span>
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
          {statuses && statuses.length > 0 ? (
            statuses.map((status, index) => (
              <div
                key={index}
                className="w-full h-[40px] px-[10px] flex items-center hover:bg-gray-200 cursor-pointer font-[FiraGO] text-[14px] font-light leading-[100%] tracking-[0%]"
                onClick={() => handleSelect(status.id, status.name)}
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
  );
}
