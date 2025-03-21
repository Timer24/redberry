import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../datepicker.css";
import CalendarIcon from "../../assets/calendar-line.png";
import ArrowUp from "../../assets/Arrow-up.png";
import ArrowDown from "../../assets/Arrow-down.png";

const CustomDatePicker = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [tempDate, setTempDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const getDefaultDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
  };

  useEffect(() => {
    const storedDate = localStorage.getItem("selectedDate");
    if (storedDate) {
      const date = new Date(storedDate);    
      const today = new Date();
      if (date < today) {
        const newDate = getDefaultDate();
        setSelectedDate(newDate);
        setTempDate(newDate);
        localStorage.setItem("selectedDate", newDate.toISOString());
        onDateSelect(formatDate(newDate));
      } else {
        setSelectedDate(date);
        setTempDate(date);
      }
    } else {
      const tomorrow = getDefaultDate();
      setSelectedDate(tomorrow);
      setTempDate(tomorrow);
      localStorage.setItem("selectedDate", tomorrow.toISOString());
      onDateSelect(formatDate(tomorrow));
    }
  }, []);

  useEffect(() => {
    const handleReset = (event) => {
      const tomorrow = getDefaultDate();
      setSelectedDate(tomorrow);
      setTempDate(tomorrow);
      localStorage.setItem("selectedDate", tomorrow.toISOString());
      onDateSelect(formatDate(tomorrow));
    };
    
    window.addEventListener('resetTaskForm', handleReset);
    return () => window.removeEventListener('resetTaskForm', handleReset);
  }, [onDateSelect]);

  const handleDateChange = (date) => {
    setTempDate(date);
    setSelectedDate(date);
    const formattedDate = formatDate(date);
    onDateSelect(formattedDate);
    localStorage.setItem("selectedDate", date.toISOString());
    setIsOpen(false);
  };

  const handleConfirm = () => {
    if (tempDate) {
      setSelectedDate(tempDate);
      const formattedDate = formatDate(tempDate);
      onDateSelect(formattedDate);
      localStorage.setItem("selectedDate", tempDate.toISOString());
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempDate(selectedDate);
    setIsOpen(false);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="flex flex-col gap-[4px] relative w-[320px]">
      <label className="font-[FiraGO] text-[16px] font-normal text-[#343A40]">
        Deadline
      </label>

      <div className="relative">
        <DatePicker
          showPopperArrow={false}
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
          placeholderText={selectedDate ? formatDate(selectedDate) : "DD/MM/YYYY"}
          onCalendarOpen={() => setIsOpen(true)}
          open={isOpen}
          onClickOutside={handleClickOutside}
          popperProps={{
            strategy: "absolute",
            placement: "bottom-start",
            modifiers: [
              { name: "preventOverflow", options: { boundary: "viewport" } },
              { name: "flip", options: { fallbackPlacements: [] } },
            ],
          }}
          className="w-[318px] h-[45px] border-[1px] rounded-[5px] p-[14px] pl-[40px] pb-[16px] text-[#343A40]
            border-[#DEE2E6] focus:border-[#8338EC] focus:ring-1 focus:ring-[#8338EC] outline-none"
          calendarClassName="custom-datepicker"
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <div className="flex justify-end px-3 py-2 bg-white relative w-[286px] h-[20px] mt-[-12px] mb-[15px] ml-[] gap-[5px]">
              <span className="text-[#343A40] absolute left-[10px] top-[18px]">
                {date.toLocaleString("ka-GE", { month: "long", year: "numeric" })}
              </span>

              <button onClick={decreaseMonth} className="text-[#8338EC] w-[20px] h-[20px]"><img src={ArrowDown} alt="↓" /></button>

              <button onClick={increaseMonth} className="text-[#8338EC] w-[20px] h-[20px]"><img src={ArrowUp} alt="↑" /></button>
            </div>
          )}
          calendarContainer={({ children }) => (
            <div className="custom-datepicker relative">
              {children}
              <div className="custom-datepicker-footer flex justify-between absolute bottom-[25px] w-[286px] h-[16px] left-[5px]">
                <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                <button onClick={handleConfirm} className="ok-btn">OK</button>
              </div>
            </div>
          )}
        />
        <img
          src={CalendarIcon}
          alt="calendar icon"
          className="absolute left-[14px] top-[50%] transform -translate-y-1/2 w-[16px] h-[16px] pointer-events-none"
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;
