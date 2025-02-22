import {  useContext, useState } from 'react'
import { BsArrowReturnLeft } from 'react-icons/bs'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { PiPlus } from 'react-icons/pi'
import { get, getDatabase, ref, remove, set } from 'firebase/database'
import app from './Firebase'
import OpenEdit from './OpenEdit'
import { AiOutlinePlus } from 'react-icons/ai'
import { useEffect } from 'react'
import { TaskContext } from './UseContext'
import { RiDeleteBin5Fill } from 'react-icons/ri'

const AllTasks = () => {
  const { displayTaskData, setDisplayTaskData, selected, setSelected, searchData } = useContext(TaskContext)
  const [openEdit, setOpenedit] = useState(false);
  const [openDelBtn, setOpneDelBtn] = useState(false);
  const [open,setOpen] = useState(false);
  const [isOpen,setIsopen] = useState(false);
  const [openAddTask,setOpenAddTask] = useState(false);
  const [openToDo,setOpenToDo] = useState(false);
  const [taskData ,setTaskdata] = useState({
    title:'',
    date:"",
    status:"",
    desc:"",
    category:"",
    img: []
  })



  
   const handleChange = (e) =>{
    const {name, value} = e.target;
    setTaskdata((prev)=> ({...prev, [name]: value}))
   }
   
   
   const id = Date.now()

   const handleAddTask = async ()=>{ 
   const db = getDatabase(app)
   const dbRef = ref (db, "task/"+ id);
   await set(dbRef, taskData).then(()=>{
    alert("data save successfull");
    setTaskdata({
      title:"",
      desc:"",
      date:"",
      status:"",
      category:"",
      img:[]
    });
  
   }).catch((error)=>{
    alert("error:", error.message )
   })
   setDisplayTaskData((prev)=> [...prev, {...taskData, id}])

 }


useEffect(()=>{
  
  const fetchData = async ()=>{
     const db = getDatabase(app)
     const dbref = ref (db,"task")
     try {
       const snapshot = await get(dbref)
       const data = snapshot.val()
       const taskArray = Object.keys(data).map((key)=>(
  
        {
          id:key,
          ...data[key]
        }
       ))
       setDisplayTaskData(taskArray);
     } catch (error) {
      console.log(error)
     }
  }
  fetchData();
},[])




  const toggleBarOne=()=>{
    setOpen(!open);
  }

  const toggleBarTwo=()=>{
    setIsopen(!isOpen);
  }

  

  const handleOpenAddTask =()=>{
    setOpenAddTask(!openAddTask)
  }

  const handleOpenToDo = ()=>{
    setOpenToDo(!openToDo)
  }

  const handleStatus=(element)=>{
    setTaskdata((prev)=> ({...prev, status:element}))

    }
  


  const handleCategory=(element)=>{
    setTaskdata((prev)=> ({...prev, category:element}))
  }


  const deleteSelectedTask = () =>{
    setSelected(prev=> prev.forEach(id => {
      const db = getDatabase(app);
      const dbref = ref(db, 'task/'+ id)
      remove(dbref);
      setSelected([])
      location.reload();

    }))

      // setDisplayTaskData(prev => prev.filter(item => !selected.includes(item.id)));
    // setSelected([]);
  }

  const selectAllTask = ()=>{
    if(selected.length === displayTaskData.length){
      setSelected([])
    }else{
    const selAllData = displayTaskData.map(prev=> prev.id)
    setSelected(selAllData)
    }
  }
 
  return (
    <>
    <div className='sm:px-8 px-3'>
      <hr className='border-black/15 sm:mt-0 mt-4 sm:block hidden' />
      <div className='sm:flex hidden justify-between items-center  mt-2 px-1 py-1 sm:mr-44  sm:text-[15px] text-[11px] text-gray-500 font-semibold'>
        <p className='md:w-[16rem] w-[27rem] sm:px-8 px-1 ' >Task name</p>
        <p className='sm:w-52 sm:px-10 px-2 w-[12rem] ' >Due on</p>
        <p className='md:block hidden sm:w-52 w-[12rem] sm:px-4 ' >Task status</p>
        <p className=' md:block hidden sm:w-52 w-[12rem] text-center' >Task category</p>
      </div>
      <div className='sm:mt-2 mt-2 border rounded-t-3xl  bg-gray-200'>
        <div className=' bg-purple-300 flex rounded-t-xl justify-between py-4 px-2 '> 
          <p className='sm:text-[16px] text-[16px] font-semibold'>All Tasks ({displayTaskData.length})</p>
          {openToDo &&(
          <MdOutlineKeyboardArrowUp onClick={handleOpenToDo} className='size-7 text-gray-600 cursor-pointer' />
          )}

          {!openToDo &&(
          <MdOutlineKeyboardArrowDown onClick={handleOpenToDo} className='size-7 text-gray-600 cursor-pointer' />
          )}
          
        </div>
           {openToDo&&(
            <div>
            <div className='sm:block hidden cursor-pointer '>
              <div  className=' border-b-2 border-gray-300 py-4 px-3 flex justify-between gap-1 items-center  '>
                <div onClick={handleOpenAddTask} className='sm:flex hidden items-center gap-1.5 border border-gray-700 sm:ml-10 ml-5 px-2 py-0.5 rounded-lg hover:bg-gray-300'><PiPlus className=' text-blue-600'/><p className='font-semibold sm:text-[17px] text-[13px] text-blue-700'>Add Task</p>
                </div>

                <div className='flex gap-6 mr-7 '>
                  {selected.length > 0 ? (!openDelBtn && <p onClick={()=>deleteSelectedTask(selected)} className='font-semibold text-[17px] text-white border border-black rounded-lg bg-red-700 py-1 px-2 hover:bg-red-900 flex  items-center gap-1.5'><RiDeleteBin5Fill className='size-5'/>Delete</p>) : (openDelBtn && <p onClick={()=>deleteSelectedTask(selected)} className='font-semibold text-[17px] text-white border border-black rounded-lg bg-red-700 py-1 px-2 hover:bg-red-900 flex  items-center gap-1.5'><RiDeleteBin5Fill className='size-5'/>Delete</p>)}   
                  {selected.length > 0 ? (!openDelBtn && <p onClick={selectAllTask} className='font-semibold text-[17px] text-white border border-black rounded-lg bg-blue-700 py-1 px-2 hover:bg-blue-900 flex  items-center gap-1.5'><RiDeleteBin5Fill className='size-5'/>Select All</p>) : (openDelBtn && <p onClick={selectAllTask} className='font-semibold text-[17px] text-white border border-black rounded-lg bg-blue-700 py-1 px-2 hover:bg-blue-900 flex  items-center gap-1.5'><RiDeleteBin5Fill className='size-5'/>Select All</p>) }   
                </div>
              </div>
              {openAddTask && (
                <div  className='flex flex-col gap-2  border-b-2 py-2 border-gray-300'>
                <div className='flex justify-between items-center  px-2 py-2 mr-10 '>
                 <div className='flex flex-col  ml-14  w-[20rem]  '>
                   <input onChange={handleChange} name='title' value={taskData.title}  type='text' placeholder='Task Title' className='bg-gray-200 font-semibold  py-1 px-2  text-[15px] rounded-md text-gray-900 w-[15rem] '/>
                 </div>
                 <div className=' w-52     '>
                   <input onChange={handleChange} name='date' value={taskData.date} className='py-1 text-center px-2 border rounded-2xl border-black/15 text-[14.5px] bg-gray-200/60 uppercase' type='date' />
                 </div>
     
                 <div onClick={toggleBarOne} className='first+div flex items-center gap-2 w-52 relative  '>
                  <div  className=' w-8 h-8 border-2 rounded-full border-black/15 flex justify-center items-center  '>
                   <AiOutlinePlus className='size-4  '/> 
                  </div>
                  {open && (
                   <div className='  border-2 rounded-md border-purple-100 bg-white flex flex-col absolute top-4 left-9 shadow-lg text-[13px] font-semibold'>
                    <button onClick={()=>handleStatus('TO-DO')} className='hover:bg-purple-200 hover:rounded-sm  py-1.5 px-2 '>TO-DO</button>
                    <button onClick={()=>handleStatus('IN-PROGRESS')} className='hover:bg-purple-200 hover:rounded-sm item py-1.5 px-2 tracking-wide   '>IN-PROGRESS</button>
                    <button onClick={()=>handleStatus('COMPLETED')} className='hover:bg-purple-200 hover:rounded-sm item py-1.5 px-2   '>COMPLETED</button>
                  </div>
                  )}
                 </div>
     
                 <div onClick={toggleBarTwo}  className='second+div flex items-center gap-2 relative w-52 '>
                  <div className='w-8 h-8 border-2 rounded-full  border-black/15 flex justify-center items-center '>
                   <AiOutlinePlus className='size-4 '/> 
                  </div>
                  {isOpen &&(
                   <div className=' border-2 rounded-md border-purple-100 bg-white flex flex-col  absolute top-4 left-9 shadow-lg text-[13px] font-semibold'>
                   <button onClick={()=>handleCategory("WORK")} className='hover:bg-purple-200 py-1 px-3'>WORK</button>
                   <button onClick={()=>handleCategory("PERSONAL")} className='hover:bg-purple-200 py-1 px-3'>PERSONAL</button>
                  </div>
                  )}
                 </div>
                 
                 </div>   
                 <div className='w-fit'>
                   <div className='flex gap-5 items-center w-fit py-2 ml-14'>
                    <div className='flex gap-2 bg-purple-900 text-white text-[15px] hover:bg-purple-700 font-semibold items-center py-1 px-5 border rounded-2xl'>
                     <button onClick={handleAddTask} >Add</button>
                     <BsArrowReturnLeft/>
                    </div>
                     <button className=' text-[16px] items-center py-1 px-5 border border-gray-300 hover:bg-gray-300 font-semibold rounded-2xl'>Cancel</button>
                  </div>
                 </div>
               </div>
              )}   
             </div> 
             {searchData?.map((item)=>{
               return ( <OpenEdit key={item.id} item={item} openDelBtn={openDelBtn} setOpneDelBtn={setOpneDelBtn}  />)
               })}

            </div> 
           )}
        </div>
      </div> 
      </>
  )
}

export default AllTasks





















