import React, { useEffect, useRef, useState } from 'react';
import { useDropdown } from '../../DropdownContext';
import useFetchGet from '../../hooks/useFetchGet';

function PriorityDropdown({ filtersBarRef }) {
  const { toggleDropdown } = useDropdown();
  const dropdownRef = useRef(null);
  const { data: priorities, error, loading } = useFetchGet('priorities');

  
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [tempSelectedPriorities, setTempSelectedPriorities] = useState([]); 

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;

    setTempSelectedPriorities((prevState) => {
      if (checked) {
        return [...prevState, value]; 
      } else {
        return prevState.filter(id => id !== value); 
      }
    });
  };

  const handleSubmit = () => {
    setSelectedPriorities(tempSelectedPriorities); 
    toggleDropdown("priority"); 
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        filtersBarRef.current && !filtersBarRef.current.contains(event.target)
      ) {
        toggleDropdown("priority");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleDropdown, filtersBarRef]);

  return (
    <div ref={dropdownRef} className="absolute top-[55px] w-[688px] h-[230px] bg-white border border-[#8338EC] rounded-md px-[30px] flex flex-col">
      <div className="flex-grow overflow-y-auto pr-[5px] mt-[40px]" style={{ maxHeight: 'calc(100% - 70px)' }}>
        {loading ? (
          <div className="m-auto">Loading priorities...</div>
        ) : error ? (
          <div className="m-auto">Error: {error}</div>
        ) : (
          <ul className="flex flex-col space-y-[25px]">
            {priorities && priorities.length > 0 ? (
              priorities.map((priority) => (
                <li key={priority.id} className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    
                    <input
                      type="checkbox"
                      id={`priority-${priority.id}`}
                      value={priority.id}
                      onChange={handleCheckboxChange}
                      checked={tempSelectedPriorities.includes(priority.id.toString())} 
                      className="appearance-none"
                    />
                    
                   
                    <span
                      className={`w-[19px] h-[19px] inline-block rounded-[5px] border-[1.5px] mr-[15px] border-[#8338EC] 
                      ${tempSelectedPriorities.includes(priority.id.toString()) ? 'relative' : ''} 
                      flex justify-center items-center`}
                    >
                      {tempSelectedPriorities.includes(priority.id.toString()) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#8338EC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="absolute top-[2px] left-[2px] w-[13px] h-[13px]"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </span>
                  </label>
                  <label
                    htmlFor={`priority-${priority.id}`}
                    className="font-style-1 cursor-pointer"
                  >
                    {priority.name}
                  </label>
                </li>
              ))
            ) : (
              <li className="m-auto">No priorities available</li>
            )}
          </ul>
        )}
      </div>
      <div className="flex justify-end p-[20px]">
        <button
          onClick={handleSubmit} 
          className="font-style-1 w-[155px] h-[35px] px-[20px] bg-[#8338EC] text-white rounded-[20px]"
        >
          არჩევა
        </button>
      </div>
    </div>
  );
}

export default PriorityDropdown;
