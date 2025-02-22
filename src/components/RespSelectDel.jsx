import React, { useContext, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { TbCopyCheck } from 'react-icons/tb'
import { TaskContext } from './UseContext'
import { getDatabase, ref, remove } from 'firebase/database'
import app from './Firebase'

const RespSelectDel = () => {

const {selected, setSelected, displayTaskData, Completed, To_Do, Progress} = useContext(TaskContext);
 const [open, setOpen] = useState(false)
    
const delSelMultiple = ()=>{
    setSelected(prev=>prev.forEach(id => {
        const db = getDatabase(app);
        const dbref = ref(db, 'task/'+ id)
        remove(dbref)
        location.reload();
    }));
}


const selectAllTask =()=>{
 const selAllTask = displayTaskData.map((prev)=>prev.id);
 setSelected(selAllTask); 
}

const remSelTask = ()=>{
    setSelected([])
}

const selectAllComptask = ()=>{
if(selected.length === Completed.length){
    setSelected([]);

}else{
    const selCompAllData = Completed.map((prev)=>prev.id);
    setSelected(selCompAllData)
}
setOpen(false)
}

const selectAllTo_Dotask =()=>{
    if(selected.length === To_Do.length){
        setSelected([]);
    }else{
        const selTo_DoAllData = To_Do.map((prev)=>prev.id);
        setSelected(selTo_DoAllData)
    }
    setOpen(false)
}


const selectAllProgressTask = ()=>{
    if(selected.length === Progress.length){
        setSelected([]);   
    }else{
        const selprogrAllData = Progress.map((prev)=>prev.id);
        setSelected(selprogrAllData)
    }
    setOpen(false)
}


const statusDivOpen = ()=>{
setOpen(!open)
}
  return (
    <>
    <div className='sm:hidden '>
    

     {selected.length > 0 ?  (<div className='mainDiv sm:hidden flex justify-between gap-5 px-2 py-3 border rounded-2xl  bg-black w-full mt-4  '>
        <div className='1Div flex gap-3 items-center'>
            <div className='1Div1st flex gap-3 border rounded-2xl text-white items-center px-5 py-2'>
                <p className='text-[11px]'>{selected.length} Task Selected</p>
                <ImCross onClick={remSelTask} className='size-2'/>
            </div>
            <div className='1Div2nd items-center'>
                <TbCopyCheck onClick={selectAllTask} className='text-white size-5 '/>
            </div>
        </div>
        <div className='2div flex gap-3'>
            <div onClick={statusDivOpen} className='py-2 px-3 border text-[11px] rounded-2xl  hover:bg-white/40 bg-white/20 border-gray-500 text-white items-center relative'>Status
            {open && (<div className='flex flex-col gap-2 px-2 py-2 text-base border border-gray-200 w-fit rounded-lg bg-black text-white/90 ring-2 ring-red-600/50  mt-2 absolute bottom-14 right-1'>
            <span onClick={selectAllTo_Dotask} className='px-7 rounded-lg py-1 hover:bg-red-600/40 place-self-center'>To_Do</span>
            <span onClick={selectAllProgressTask} className='px-2 rounded-lg py-1 hover:bg-red-600/40 place-self-center'>In_Progress</span>
            <span onClick={selectAllComptask} className='px-1.5 rounded-lg py-1 hover:bg-red-600/40 place-self-center'>Completed</span>
            </div>)}
            </div>
            <div onClick={delSelMultiple} className='py-2 px-3 border text-[11px] rounded-2xl hover:bg-red-600/50 bg-red-600/10 border-red-700 text-red-700 items-center'>Delete</div>
        </div>
    </div>) :  null} 
  
  </div>
    </>
  )
}

export default RespSelectDel
