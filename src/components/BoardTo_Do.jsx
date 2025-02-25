import React, { useContext } from 'react'
import { TaskContext } from './UseContext'
import BoardTaskData from './BoardTaskData'


const BoardTo_Do = () => {

    const {To_Do} = useContext(TaskContext)
    
    
    

  return (
  <>
    <div className='px-3 mt-7'>
      {
        To_Do.map((item)=>{
            return (
             <BoardTaskData key={item.id} item={item}/>
            )
        })
      }
    </div>
  </>
  )
}

export default BoardTo_Do
