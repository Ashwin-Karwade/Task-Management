import React, { useContext } from 'react'
import { TaskContext } from './UseContext'
import BoardTaskData from './BoardTaskData';

const BoardCompleted = () => {

    const {Completed} = useContext(TaskContext);
  return (
    <div className='px-3 mt-7'>
    {
      Completed.map((item)=>{
          return (
           <BoardTaskData key={item.id} item={item}/>
          )
      })
    }
  </div>
  )
}

export default BoardCompleted
