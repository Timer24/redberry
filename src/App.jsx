import React, { useState } from "react";
import './App.css';
import Header1 from './components/Header/Header1'
import '@fontsource/firago';
import Filters from './components/Filters/Filters'
import Modal from './components/ModalComponent/Modal'


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <Header1 handleOpenModal={handleOpenModal} />
      <Filters />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
