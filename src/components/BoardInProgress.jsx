import React, { useContext } from 'react'
import { TaskContext } from './UseContext'
import EditDeleteCompo from './EditDeleteCompo';

const BoardInProgress = () => {

    const {Progress} = useContext(TaskContext);

  return (
    <div className='px-4 mt-7'>
      {
        Progress.map((item)=>{
            return (
             <div key={item.id} className='flex rounded-lg flex-col px-2 py-2 gap-10 mt-5 border-2 border-gray-300'>
                <div className='flex justify-between items-center'>
                  <p className='text-[16px] font-semibold tracking-wider'>{item.title}</p>
                  <EditDeleteCompo/>
                </div>
                <div className='flex justify-between items-center'>
                  <p className='text-[14px] font-semibold text-gray-500 '>{item.category}</p>
                  <p className='text-gray-600 text-[14px]'>{item.date}</p>
                </div>
             </div>
            )
        })
      }
    </div>
  )
}

export default BoardInProgress
