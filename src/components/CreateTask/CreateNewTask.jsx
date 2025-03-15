import React from 'react'
import Header1 from '../Header/Header1';
import TaskCreator from './TaskCreator';

function CreateNewTask({isModalOpen, onClose}) {
  return (
    <div>
        <Header1/>
        <p className="TaskPage1">შექმენი ახალი დავალება</p>
        <TaskCreator isModalOpen = {isModalOpen} onClose = {onClose}/>
    </div>
  )
}

export default CreateNewTask