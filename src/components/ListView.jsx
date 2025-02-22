// import React from 'react'
import InProgress from './InProgress'
import Completed from './Completed'
import AllTasks from './AllTasks'
import To_Do from './To_Do'

const ListView = () => {
  return (
    <div className='sm:py-0 py-4'>
      <AllTasks />
      <To_Do/>
      <InProgress />
      <Completed/>
    </div>
  )
}

export default ListView
