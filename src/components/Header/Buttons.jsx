import React, {useState} from 'react'
import Modal from '../ModalComponent/Modal';
import { FaPlus } from "react-icons/fa";

function Buttons () {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className = "flex gap-[40px]">
        <button onClick = {handleOpenModal}
        className = "font-style-1 flex justify-center items-center w-[225px] h-[39px] top-[20px] left-[20px] border-[1px] border-[#8338EC] rounded-[5px] px-[10px] py-[20px] gap-[10px] hover:border-[#B588F4]">
            თანამშრომლის შექმნა
        </button>

        <button className = "font-style-1 flex justify-center items-center w-[268px] h-[40px] top-[20px] left-[20px] rounded-[5px] px-[10px] py-[20px] gap-[4px] text-white bg-[#8338EC] transition-all duration-300 ease-out hover:bg-[#B588F4]">
          <FaPlus className = "w-[12px] h-[12px]"/> შექმენი ახალი დავალება
        </button>
        <Modal isOpen = {isModalOpen} onClose = {handleCloseModal}/>
    </div>
  )
}

export default Buttons