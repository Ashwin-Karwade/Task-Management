import { getDatabase, ref, remove } from 'firebase/database'
import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { VscEllipsis } from 'react-icons/vsc'
import app from './Firebase'
import Update from '../Pages/Update'

const EditDeleteCompo = ({ item, setOpenUpdate, openUpdate}) => {

  const [openEdit, setOpenEdit] = useState(false)



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
      <div className='relative' >
          <VscEllipsis onClick={handleOpenEdit} className='sm:size-6 size-4  cursor-pointer'/>
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
        <Update openUpdate={openUpdate} item={item} setOpenUpdate={setOpenUpdate} />

    </>
  )
}

export default EditDeleteCompo
