import React, { useState } from "react";
import './App.css';
import Header1 from './components/Header/Header1'
import '@fontsource/firago';
import Filters from './components/Filters/Filters'
import Modal from './components/ModalComponent/Modal'
import CreateNewTask from './components/CreateTask/CreateNewTask';
import { BrowserRouter as Router, Route, Routes } from "react-router";


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
          <Route path = "/" element = {<LandingPage />}/>
          <Route path = "/create-task" element = {<CreateNewTask isModalOpen = {handleOpenModal} onClose = {handleCloseModal}/>}/>
        </Routes>

      </div>
  );

  function LandingPage(){
    return (
      <div>
        <Header1 handleOpenModal={handleOpenModal}/>
        <p className="TaskPage1">დავალებების გვერდი</p>
        <Filters/>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}/>
      </div>
    )
  }
}

export default App;
