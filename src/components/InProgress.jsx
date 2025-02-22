// import React from 'react'
import { useContext, useState } from 'react'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { TaskContext } from './UseContext';
import OpenEdit from './OpenEdit';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { getDatabase, ref, remove } from 'firebase/database';
import app from './Firebase';

const InProgress = () => {
 
const [OpenProgress,setOpenprogess] = useState(false);

const {Progress, selected, setSelected} = useContext(TaskContext)

const handleOpenProgress = () =>{
  setOpenprogess(!OpenProgress);
}

const deleteSelectedTask = ()=>{
  setSelected((prev=> prev.forEach(id => {
    const db = getDatabase(app);
    const dbref = ref(db, 'task/'+ id);
    remove(dbref);
    location.reload();
   })));
}

const selectAllTask = ()=>{
  if(selected.length === Progress.length){
    setSelected([])
  }else{
    const selAllTask = Progress.map((prev)=> prev.id);
    setSelected(selAllTask);
  }
}


  return (
    <div className='sm:px-8 px-3'>
             <div className='sm:mt-10 mt-7 border rounded-xl bg-gray-100 shadow-sm'>
               <div className=' bg-cyan-300 flex rounded-t-xl justify-between py-4 px-2 '> 
                 <p className='text-[16px] font-semibold'>In-progress ({Progress.length})</p>
                 {OpenProgress && (<MdOutlineKeyboardArrowDown onClick={handleOpenProgress} className='size-7 text-gray-600 cursor-pointer' />)}                
                 {!OpenProgress && (<MdOutlineKeyboardArrowUp onClick={handleOpenProgress} className='size-7 text-gray-600 cursor-pointer' />)}                
                </div>
                
                {selected.length > 0 ? (<div className='sm:block hidden bg-gray-200 w-full '>
                    <div className='flex gap-6  py-4 place-self-end mr-10'>
                      <p onClick={selectAllTask} className='font-semibold  text-[17px] text-white border border-black rounded-lg bg-blue-700 cursor-pointer py-1 px-2 hover:bg-blue-900 flex  items-center gap-1.5'><RiDeleteBin5Fill className='size-5'/>Select All</p> 
                      <p onClick={()=>deleteSelectedTask(selected)} className='font-semibold text-[17px]  text-white border cursor-pointer border-black rounded-lg bg-red-700 py-1 px-2 hover:bg-red-900 flex  items-center gap-1.5'><RiDeleteBin5Fill className='size-5'/>Delete</p>
                    </div>                 
                </div>) : null }
                

                { !OpenProgress && <div>
                  {
                    Progress.map((item)=>{
                      return (
                          <OpenEdit key={item.id} item={item}/>
                      )
                    })
                  }
                </div>}
               {/* { OpenProgress &&(
                <div className=' cursor-pointer'>
                <div className='h-32 flex justify-center items-center '><p className='text-[15px]'>No Task in Progress</p> </div>
              </div>
               )} */}
             </div>
    </div>
  )
}

export default InProgress























