import React from 'react'
import Header1 from '../Header/Header1';
import TaskCreator from './TaskCreator';

function CreateNewTask() {
  return (
    <div>
        <Header1/>
        <p className="TaskPage1">შექმენი ახალი დავალება</p>
        <TaskCreator/>
    </div>
  )
}

export default CreateNewTask