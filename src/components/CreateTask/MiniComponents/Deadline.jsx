import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Calendar from '../../images/calendar-line.png';
import '../../../Custom.css'

function Deadline({ formState, setFormState }) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [selectedDate, setSelectedDate] = useState(tomorrow);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const formattedDate = getFormattedDate(selectedDate);
    setFormState((prev) => ({
      ...prev,
      due_date: formattedDate,
    }));
  }, [selectedDate, setFormState]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsTyping(false); 
  };

  const handleInputChange = () => {
    setIsTyping(true); 
  };

  const getFormattedDate = (date) => {
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const hours = '00';
    const minutes = '00';
    const seconds = '00';
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  };

  return (
    <div className="flex flex-col gap-[4px] relative">
      <label className="font-[FiraGO] text-[16px] font-normal text-[#343A40] leading-[100%] tracking-[0%]">
        დედლაინი
      </label>

      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={tomorrow}
        dateFormat="yyyy/MM/dd"
        className={`w-[318px] h-[45px] border-[1px] rounded-[5px] p-[14px] pl-[36px] 
            ${isTyping ? 'text-[#343A40]' : 'text-[#ADB5BD]'}
            border-[#DEE2E6] focus:border-[#8338EC] focus:ring-2 focus:ring-[#8338EC] outline-none`}
        placeholderText="აირჩიეთ თარიღი"
        onInput={handleInputChange}
        popperPlacement="bottom-start"
      />
      <img
        src={Calendar}
        alt="calendar icon"
        className="absolute left-[14px] top-[34px] w-[16px] h-[16px] pointer-events-none"
      />
    </div>
  );
}

export default Deadline;
