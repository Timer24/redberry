import React, { useState } from "react";
import './App.css';
import Header1 from './components/Header/Header1'
import '@fontsource/firago';
import Filters from './components/Filters/Filters'
import Modal from './components/ModalComponent/Modal'
import CreateNewTask from './components/CreateTask/CreateNewTask';
import { Routes, Route } from "react-router-dom";
import Cards from './components/Cards/Cards'
import OpenCard from './components/Cards/OpenCards/OpenCard'


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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-task" element={<CreateNewTask isModalOpen={handleOpenModal} onClose={handleCloseModal} />} />
        <Route path="/tasks/:taskId" element={<OpenCard />} />
      </Routes>
    </div>
  );

  function LandingPage() {
    return (
      <div>
        <Header1 handleOpenModal={handleOpenModal} />
        <p className="TaskPage1">დავალებების გვერდი</p>
        <Filters />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        <Cards />
      </div>
    );
  }
}

export default App;
