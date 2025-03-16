import { useParams } from 'react-router-dom';
import React from 'react';
import Header1 from '../../Header/Header1';
import CardDescription from './CardDescription'
import TaskDetails from './TaskDetails';
import Comments from './Comments';

function OpenCard() {
  const params = useParams();
  const taskId = params.taskId;
  
  console.log("OpenCard - params:", params);
  console.log("OpenCard - id:", taskId);

  return (
    <div>
        <Header1/>
        <div className = "w-[715px] h-[239px] top-[140px] left-[120px] gap-[26px] absolute">
          <CardDescription id = {taskId}/>
        </div>

        <div className = "w-[493px] h-[277px] top-[442px] left-[120px] gap-[18px] absolute">
          <TaskDetails id = {taskId}/>
        </div>
 
        
        <Comments id={taskId}/>
        
    </div>
  )
}
export default OpenCard;