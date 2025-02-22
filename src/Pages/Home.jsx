// import React from 'react'
import SignIn from '../components/SignIn'
import { useState } from 'react'
import BoardView from '../components/BoardView'
import ListView from '../components/ListView'

const Home = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className='sm:py-4' >
      <SignIn open={open} setOpen={setOpen} />   
      {
        open ? 
        <div>
       <ListView />
      </div>
      :
       <BoardView/>
        }
       
    </div>
  )
}

export default Home
