import { useParams } from 'react-router-dom';
import React from 'react';
import Header1 from '../../Header/HeaderMain';
import CardDescription from './CardDescription'
import TaskDetails from './TaskDetails';
import Comments from './Comments';
import useFetchGet from '../../../hooks/useFetchGet';


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