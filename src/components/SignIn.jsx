// import React from 'react'
import { LuClipboardList } from 'react-icons/lu'
import { useContext, useEffect, useState } from 'react'
import { auth } from './Firebase'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CiViewBoard } from 'react-icons/ci'
import { TfiViewList } from 'react-icons/tfi'
import { BiLogOutCircle, BiSearch } from 'react-icons/bi'
import Create from '../Pages/Create'
import { TaskContext } from './UseContext'

const SignIn = ({open, setOpen}) => {
  
  const { search, setSearch, categorySearch, setCategorySearch, dateSearch, setDateSearch} = useContext(TaskContext);
  
  const [userDetails, setUserDetails] = useState({});
  const [openCreate, setOpenCreate] = useState(false);


  const navigate = useNavigate();
 
  const fetchUserData = async  () =>{
      auth.onAuthStateChanged(async (user) =>{
      
        setUserDetails({
          userName : user.displayName,
          photo : user.photoURL,
        })
      
      })
    }

    useEffect(()=>{
      fetchUserData();
    },[])

     

   const logOut = async () =>{
      try {
       await auth.signOut();
       setUserDetails();
       toast.success("Logged out Successfully", {position:'top-center'})
       navigate('/Task-Management/');
      } catch (error) {
        console.log(error)
      }
   } 
    

  return (
  
      
<>
<div className='sm:px-8 '>

    <div className="flex justify-between sm:h-10 h-14 sm:py-0 py-1 sm:px-0 px-2 sm:text-purple-800  text-gray-300 sm:bg-white bg-purple-800    ">
      <div className="flex items-center gap-1">
         <LuClipboardList className="sm:size-6 size-6"/>
         <p className="sm:text-[20px] text-[17px] tracking-wide font-bold ">TaskBuddy</p>
      </div>      
    
       <div className="flex gap-3 items-center">
        <div onClick={logOut} className='sm:hidden block hover:bg-orange-100 active:bg-orange-100    cursor-pointer   rounded-lg '>
        <BiLogOutCircle className='size-6 text-gray-300' />
        </div>
       <img src={userDetails.photo} className="sm:w-10 w-9  sm:h-10 h-9 sm:border-none border sm:rounded-full rounded-full" alt={userDetails.userName}/>
       <p className="text-[12px] sm:block hidden">{userDetails.userName}</p>
     </div>
    </div>   

    <div className='sm:flex hidden  justify-between items-center sm:px-0 px-1.5 sm:mt-0 mt-2'>
      <div className='flex gap-5  items-center '>
        <div onClick={()=>setOpen(true)} className={`flex hover:bg-gray-200 hover:py-0.5 px-1.5 rounded-lg gap-1  items-center cursor-pointer ${open ? 'border-b-2 border-black font-semibold' : 'border-none'}`}>
          <TfiViewList className='size-3'/> 
          <p  className=' text-[14px]'>List</p>
        </div>

        
        <div onClick={()=>setOpen(false)}  className= {`sm:flex hidden hover:bg-gray-200 hover:py-0.5 px-1.5 rounded-lg gap-1 items-center  cursor-pointer ${open ? 'border-none ': 'border-b-2 border-black font-semibold'} `}>
          <CiViewBoard className='size-4' /> 
          <p className='text-[14px]'>Board</p>
        </div>
      </div>
      <div>
        <div onClick={logOut} className='sm:flex gap-2 hover:bg-orange-100 active:bg-orange-100 hidden bg-orange-50 items-center py-2 cursor-pointer px-3 ring-1 rounded-lg ring-gray-300'>
        <BiLogOutCircle/>
        <p>Logout</p>
        </div>
      </div>
    </div>   
       
    <div className="flex justify-between sm:mb-9 mb-3 mt-3 sm:place-self-auto place-self-end">

      <div className='sm:flex  hidden items-center gap-2 text-[12px] '>
        <p>Fliter by:</p>
       <select onChange={(e)=>setCategorySearch(e.target.value)}  className='rounded-2xl cursor-pointer hover:bg-gray-200 py-1 px-2 border-2 outline-none' name="category" id="">
          <option value="category">Category</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
       </select>
       <input onChange={(e)=>setDateSearch(e.target.value)} type='date' value={dateSearch} placeholder="DD/MM/YYYY" className='rounded-2xl hover:bg-gray-200 py-1 px-1.5 border-2 outline-none cursor-pointer' name="due date" id=""/>    
      </div>

      <div className="flex justify-between items-center  gap-5 sm:px-0 px-2 sm:mt-0 mt-2 ">
       <div className="md:flex hidden justify-between items-center gap-2 border border-black/15 bg-white w-48 rounded-3xl py-1.5 px-3  hover:border-gray-400 ">
         <BiSearch className="text-gray-500 size-5"/>
         <input onChange={(e)=>setSearch(e.target.value)} className="w-36  text-[15px] outline-none rounded-lg" type="text" value={search} placeholder="Search... "/>
       </div>

       <buttton onClick={()=>setOpenCreate(true)} className=" py-1.5 px-4 hover:bg-purple-700 active:bg-purple-700 bg-purple-900 rounded-3xl sm:w-36  w-24 text-center text-white cursor-pointer">Add Task</buttton>
      </div>
    </div>

      <div className="hidden sm:flex md:hidden  mb-6    items-center gap-2 border border-black/15 bg-white w-full rounded-3xl py-2.5 px-5  hover:border-gray-400 ">
         <BiSearch className="text-gray-500 size-5"/>
         <input onChange={(e)=>setSearch(e.target.value)} className="w-36  text-[17px] outline-none rounded-lg" type="text" value={search} placeholder="Search... "/>
      </div>

     <div className='sm:px-0 px-4'>  
      <div className='flex flex-col  sm:hidden px-1  gap-1.5 text-[12px] '>
        <p className='text-[13px]'>Fliter by :</p>
        <div className='flex gap-3'>
         <select onChange={(e)=>setCategorySearch(e.target.value)}  className='rounded-2xl cursor-pointer hover:bg-gray-200 py-1 px-2 border-2 outline-none' name="category" id="">
          <option value="category">Category</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
         </select>
         <input onChange={(e)=>setDateSearch(e.target.value)} type='date' value={dateSearch} placeholder="DD/MM/YYYY" className='rounded-2xl hover:bg-gray-200 py-1 px-1.5 border-2 cursor-pointer outline-none' name="due date" id=""/>    
        </div>
      </div>

       <div className="flex sm:hidden justify-between w-full items-center gap-1.5 border border-black/15 bg-white hover:border-gray-400 hover:border-2 rounded-3xl py-1.5   px-3  mt-5">
         <BiSearch className="text-gray-500 size-[18px]"/>
         <input onChange={(e)=>setSearch(e.target.value)} className="w-full  text-[15px] outline-none rounded-lg" type="text" value={search} placeholder="Search... "/>
       </div>
      </div>

    </div>   

     <Create setOpenCreate={setOpenCreate} openCreate={openCreate}/>
    </>      
  )
}

export default SignIn
