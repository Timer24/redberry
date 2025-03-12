import React, { useState } from "react";
import './App.css';
import Header1 from './components/Header1'
import '@fontsource/firago';
import Filters from './components/Filters'
import AddEmployee from "./components/AddEmployee";

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

      <AddEmployee isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
