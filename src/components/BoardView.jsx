// import React from 'react'

import BoardCompleted from "./BoardCompleted"
import BoardInProgress from "./BoardInProgress"
import BoardTo_Do from "./BoardTo_Do"

const BoardView = () => {
  return (
    <div className=" maiDiv flex justify-between items-center  gap-10 px-8">

      <div className=" firstdiv h-screen   rounded-md w-[500px] border py-4 bg-gray-100 shadow-md">
        <div className="py-1 px-4 rounded-sm font-semibold mb-5  bg-purple-400  ml-4 w-fit  text-[15px]"><>TO-DOS</></div>
        <BoardTo_Do/>   
      </div>

      <div className=" secondiv h-screen   rounded-md w-[500px] border py-4  bg-gray-100 shadow-md">
        <div className="py-1 px-4 rounded-sm font-semibold mb-5  bg-cyan-400  ml-4 w-fit text-[15px]"><p>IN PROGRESS</p></div>
        <BoardInProgress/>
      </div>

      <div className=" thirdiv  h-screen rounded-md w-[500px] border py-4  bg-gray-100 shadow-md">
        <div className="py-1 px-4 rounded-sm font-semibold mb-5  bg-green-400  ml-4 w-fit text-[15px]"><p>COMPLETED</p></div>
        <BoardCompleted/>
      </div>
      
    </div>
  )
}

export default BoardView
