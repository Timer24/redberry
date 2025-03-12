import React, { useEffect, useRef, useState } from 'react';
import { useDropdown } from '../DropdownContext';
import useFetchGet from '../hooks/useFetchGet';

function PriorityDropdown({ filtersBarRef }) {
  const { toggleDropdown } = useDropdown();
  const dropdownRef = useRef(null);
  const { data: priorities, error, loading } = useFetchGet('priorities');
  
  const [selectedPriorities, setSelectedPriorities] = useState([]);

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    setSelectedPriorities(prevState => 
      checked ? [...prevState, value] : prevState.filter(id => id !== value)
    );
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
                  <input
                    type="checkbox"
                    id={`priority-${priority.id}`}
                    value={priority.id}
                    onChange={handleCheckboxChange}
                    className="w-[19px] h-[19px] cursor-pointer"
                  />
                  <label
                    htmlFor={`priority-${priority.id}`}
                    className="font-style-1 cursor-pointer ml-[10px]"
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
          onClick={() => toggleDropdown("priority")}
          className="font-style-1 w-[155px] h-[35px] px-[20px] bg-[#8338EC] text-white rounded-[20px]"
        >
          Choose
        </button>
      </div>
    </div>
  );
}

export default PriorityDropdown;
