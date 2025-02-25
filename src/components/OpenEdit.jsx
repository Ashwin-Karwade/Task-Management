import {  useContext, useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { GoGrabber } from 'react-icons/go'
import Update from '../Pages/Update'
import { TaskContext } from './UseContext'
import { VscEllipsis } from 'react-icons/vsc'
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { getDatabase, ref, remove } from 'firebase/database'
import app from './Firebase'

const OpenEdit = ({item}) => {

  const {selected, setSelected} = useContext(TaskContext)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)


 const handleCheckBox = (itemId) => {
  setSelected(prev => prev.includes(itemId)
  ? prev.filter(id => id !== itemId)
  : [...prev, itemId]
 );
};





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
      <div  className='flex justify-between items-center py-4 px-3 border-b-2 bg-gray-200  border-gray-300 '>
        <div className='1div flex sm:gap-1 gap-2 py-1 px-1  justify-center items-center   '>
          <input type='checkbox' onChange={()=>handleCheckBox(item.id)}  checked={selected.includes(item.id)} className='size-4 ' ></input>
          <GoGrabber className='size-6 sm:block hidden '/>
          <FaCircleCheck className=' sm:size-4 size-3 '/>
          <p className='sm:text-[16px] truncate text-[15px] ml-1 sm:w-[10rem] w-[8rem]'>{item.title}</p>
        </div>
        <p className='sm:text-[16px] text-[12px]  sm:w-52 w-25  sm:px-7 px-2 '>{item.date}</p>
        <div className='sm:w-52 w-25   '>
          <p className='md:block hidden py-1 px-2 sm:w-28 w-14 text-center bg-gray-400    rounded-lg  sm:text-[14px] text-[8px]'>{item.status}</p>
        </div> 
        <p className='md:block hidden sm:text-[16px] text-[10px] sm:w-52  w-25 sm:px-14 px-7'>{item.category}</p>

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
      </div>
        
     <Update openUpdate={openUpdate} item={item} setOpenUpdate={setOpenUpdate} />

    
    </>
  )
}

export default OpenEdit
