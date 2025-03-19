import { useParams } from 'react-router-dom';
import React from 'react';
import Header1 from '../../Header/Header1';
import CardDescription from './CardDescription'
import TaskDetails from './TaskDetails';
import Comments from './Comments';
import useFetchGet from '../../../hooks/useFetchGet';

// const statusColors = {
//   1: 'border-[#FFA41B]', 
//   2: 'border-[#FF4E4E]', 
//   3: 'border-[#FF1B8D]', 
//   4: 'border-[#1BC1FF]'  
// };

function OpenCard({totalComments}) {

  const params = useParams();
  const taskId = params.taskId;

  const { data: task, isLoading, error } = useFetchGet(`tasks/${taskId}`);

  console.log("ygbfiujkydsbuiksdfg", task)

  return (
    <div>
        <Header1/>
        <div className = "w-[715px] h-[239px] top-[140px] left-[120px] gap-[26px] absolute">
          <CardDescription task = {task}/>
        </div>

        <div className = "w-[493px] h-[277px] top-[442px] left-[120px] gap-[18px] absolute">
          <TaskDetails task = {task}/>
        </div>
 
        
        <Comments task = {task}/>
        
    </div>
  )
}
export default OpenCard;