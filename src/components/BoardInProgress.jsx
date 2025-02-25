// import React, { useContext } from 'react'
import { TaskContext } from './UseContext'
import BoardTaskData from './BoardTaskData';
import { useContext } from 'react';

const BoardInProgress = () => {

    const {Progress} = useContext(TaskContext);

  return (
    <div className='px-3 mt-7'>
      {
        Progress.map((item)=>{
            return (
              <BoardTaskData key={item.id} item={item}/>
            )
        })
      }
    </div>
  )
}

export default BoardInProgress
