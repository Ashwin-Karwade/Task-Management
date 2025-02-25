import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { VscEllipsis } from 'react-icons/vsc'
import Update from '../Pages/Update'
import { getDatabase, ref, remove } from 'firebase/database'
import app from './Firebase'

const BoardTaskData = ({item}) => {

    const [openUpdate, setOpenUpdate] = useState(false);
      const [ openEdit, setOpenEdit] = useState(false)
    
      const handleOpenEdit = ()=>{
        setOpenEdit(!openEdit)
       }
      
       const handleEdit = ()=>{
         setOpenEdit(false)
         setOpenUpdate(!openUpdate);
       }
      
      
      
      const handleDeletTask = (id)=>{
        const db = getDatabase(app);
        const dbref = ref(db, "task/" + id);
        remove(dbref)
        location.reload();
      }


  return (
    <>
      <div key={item.id} className='flex rounded-lg flex-col  py-2 gap-14 px-3 mt-3 bg-white'>
        <div className='flex justify-between items-center'>
         <p className='text-[14px] font-semibold tracking-wide truncate w-48 text-black/75'>{item.title}</p>
         <div>
           <div className='relative' >
            <VscEllipsis onClick={handleOpenEdit} className='sm:size-6 size-3  cursor-pointer text-black/75'/>
    
            {openEdit && (
            <div className='flex flex-col sm:gap-2 gap-1 items-center text-green-700 font-bold bg-white border-2 rounded-lg border-red-50 shadow-lg sm:px-3 px-1.5 sm:py-2 py-1 absolute right-2 top-5 z-50'>
                <div onClick={handleEdit} className=' mr-1 flex gap-2 items-center justify-center cursor-pointer'>
                <AiFillEdit  className=' sm:size-6 size-4'/>
                <p className='sm:text-[17px] text-[14px]'>Edittt</p>
                </div>
                <div onClick={()=>handleDeletTask(item.id)} className='flex gap-2 items-center justify-center cursor-pointer text-red-600'>
                    <RiDeleteBin5Fill  className='sm:size-5 size-4' />
                    <p className='sm:text-[17px] text-[14px]'>Delete</p>
                </div>
            </div> 
            )}
                            
           </div>
           <Update item={item} openUpdate={openUpdate} setOpenUpdate={setOpenUpdate}/>
         </div>
        </div>
         <div className='flex justify-between items-center '>
            <p className='text-[13px] font-semibold text-gray-500 '>{item.category}</p>
            <p className='text-gray-600 text-[12px]'>{item.date}</p>
         </div>
       </div>
    </>
  )
}

export default BoardTaskData
