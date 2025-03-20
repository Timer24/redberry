import React, { useState, Suspense, lazy, useEffect } from "react";
import './App.css';
import Header1 from './components/Header/HeaderMain'
import '@fontsource/firago';
import { Routes, Route, useLocation } from "react-router-dom";
import Cards from './components/Cards/Cards'


const Filters = lazy(() => import('./components/Filters/Filters'));
const Modal = lazy(() => import('./components/CreateEmployee/Modal'));
const CreateNewTask = lazy(() => import('./components/CreateTask/CreateNewTask'));
const CardInner = lazy(() => import('./components/Cards/CardsInner/CardInner'));


const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8338EC]"></div>
  </div>
);

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(() => {
    const saved = localStorage.getItem('selectedEmployee');
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedPriorities, setSelectedPriorities] = useState(() => {
    const saved = localStorage.getItem('selectedPriorities');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedDepartments, setSelectedDepartments] = useState(() => {
    const saved = localStorage.getItem('selectedDepartments');
    return saved ? JSON.parse(saved) : [];
  });

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setSelectedEmployee(null);
      setSelectedPriorities([]);
      setSelectedDepartments([]);
      localStorage.removeItem('selectedEmployee');
      localStorage.removeItem('selectedPriorities');
      localStorage.removeItem('selectedDepartments');
    }
  }, [location.pathname]);

  
  useEffect(() => {
    if (location.pathname === '/') {
      localStorage.setItem('selectedEmployee', JSON.stringify(selectedEmployee));
      localStorage.setItem('selectedPriorities', JSON.stringify(selectedPriorities));
      localStorage.setItem('selectedDepartments', JSON.stringify(selectedDepartments));
    }
  }, [selectedEmployee, selectedPriorities, selectedDepartments, location.pathname]);

  console.log(selectedDepartments);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="App">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/create-task" 
            element={
              <CreateNewTask 
                isModalOpen={handleOpenModal} 
                onClose={handleCloseModal} 
              />
            } 
          />
          <Route path="/tasks/:taskId" element={<CardInner />} />
        </Routes>
      </Suspense>
    </div>
  );

  function LandingPage() {
    return (
      <div>
        <Header1 handleOpenModal={handleOpenModal} />
        <p className="TaskPage1">დავალებების გვერდი</p>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Filters 
            setSelectedEmployee={setSelectedEmployee} 
            selectedEmployee={selectedEmployee}
            setSelectedPriorities={setSelectedPriorities} 
            selectedPriorities={selectedPriorities}
            setSelectedDepartments={setSelectedDepartments} 
            selectedDepartments={selectedDepartments}
          />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </Suspense>

        <Cards 
          selectedEmployee={selectedEmployee} 
          selectedPriorities={selectedPriorities} 
          selectedDepartments={selectedDepartments}
        />
      </div>
    );
  }
}

export default App;
