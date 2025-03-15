import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../datepicker.css";
import CalendarIcon from "../../images/calendar-line.png";
import ArrowUp from "../../images/Arrow-up.png";
import ArrowDown from "../../images/Arrow-down.png";

const CustomDatePicker = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [tempDate, setTempDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedDate = localStorage.getItem("selectedDate");
    if (storedDate) {
      setSelectedDate(new Date(storedDate));
      setTempDate(new Date(storedDate));
    }
  }, []);

  const handleDateChange = (date) => {
    setTempDate(date);
    const formattedDate = formatDate(date);
    onDateSelect(formattedDate);
  };

  const handleConfirm = () => {
    if (tempDate) {
      const formattedDate = formatDate(tempDate);
      setSelectedDate(tempDate);
      onDateSelect(formattedDate);
      localStorage.setItem("selectedDate", tempDate.toISOString());
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempDate(selectedDate);
    setIsOpen(false);
  };

  const formatDate = (date) => {
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
          selected={tempDate || selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
          placeholderText={selectedDate ? formatDate(selectedDate) : "DD/MM/YYYY"}
          onCalendarOpen={() => setIsOpen(true)}
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
