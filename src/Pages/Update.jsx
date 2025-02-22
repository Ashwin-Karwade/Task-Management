// import React from 'react'

import { useCallback, useContext, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { BsTypeItalic } from "react-icons/bs"
import { FaListCheck, FaS } from "react-icons/fa6"
import { GoStrikethrough } from "react-icons/go"
import { ImCross } from "react-icons/im"
import { MdFormatListBulleted } from "react-icons/md"
import { RiBold, RiListOrdered2 } from "react-icons/ri"
// import { TaskContext } from "../components/UseContext"
import {  get, getDatabase, ref, update } from "firebase/database"

import app from "../components/Firebase"

const Update = ({item, setOpenUpdate, openUpdate}) =>{
  if(!openUpdate){
    return null;
  }
   

  // const {displayTaskData, setDisplayTaskData, taskDataArray, setTaskDataArray} = useContext(TaskContext)

  const [uploadFile, setUploadfile] = useState([])
  const [activeBtn, setActiveBtn] = useState('DETAILS');
  
  const [openDetails, setOpenDetails] = useState(false); 
  const [openActivity, setOpenActivity] = useState(false); 
  const [updateData, setUpdateData] = useState({

    title: item.title,
    desc : item.desc,
    category: item.category,
    date: item.date,
    status: item.status,
    img: item.img
  })



  const handlechange = (e)=>{
    const {name, value} = e.target;
    setUpdateData((prev)=>({...prev, [name]: value}))
  }


   const onDrop = useCallback( acceptedFiles=>{
             setUploadfile(acceptedFiles);
             setUpdateData((prev)=>({...prev, img: acceptedFiles.map((file)=>URL.createObjectURL(file))}))   
       }, [])
     
     
       const{ getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
         accept: '.jpg, .png, .pdf, .gif, .pdf',
         maxFiles: 5, 
       });



const handleSubmitUpdateData = async ()=>{
  const db = getDatabase(app);
  const dbref = ref (db, 'task/' + item.id);

   await update(dbref, updateData)
      .then(() => {
        alert(" Data Updated Successsfully !!")
      })
      .catch((error) => {
        console.error("Error updating task: ", error);
      });
      location.reload();
  };

  
 const handleClick = (element) =>{
  setUpdateData((prev)=>({...prev, category:element}))
 }

 const handleOpenDetails = ()=>{
   setOpenDetails(false)
   setOpenActivity(false)
 }

 const handleOpenActivity = ()=>{
 setOpenDetails(true)
 setOpenActivity(true)
 }

 
 const handleClickOnUpdate = (btn)=>{
  setActiveBtn(btn)
 }
   
  return (
    <>
       
        <div className="bg-black bg-opacity-10  inset-0 z-50 fixed  sm:py-14 py-10">
        <div className="maindiv sm:w-[70%] w-[92%] mx-auto rounded-3xl border shadow-sm bg-white">
            <div className=" border-b px-4 bg-purple-600/10 py-5 shadow-sm ">
             <ImCross onClick={()=>setOpenUpdate(false)} className="size-3 cursor-pointer place-self-end text-black"/>
            </div>

            <div className="sm:hidden px-3 mt-4 flex gap-2  ">
              <div onClick={()=>handleClickOnUpdate('DETAILS')} className="">
                <div onClick={()=>handleOpenDetails()} className={`${activeBtn === "DETAILS" ? 'bg-black  text-white' : ''} px-4 py-1 border border-gray-400 rounded-2xl w-[152px] text-center  font-sans tracking-wider text-[13px]`}><p>DETAILS</p>
                </div>
              </div>
              <div onClick={()=>handleClickOnUpdate('ACTIVITY')} className="">
               <div onClick={handleOpenActivity} className={` ${activeBtn === 'ACTIVITY' ? 'bg-black text-white' : ''} px-4 py-1 border border-gray-400 rounded-2xl w-[152px] text-center font-sans tracking-wider text-[13px] `}><p>ACTIVITY</p>
               </div>
              </div>
            </div>
           
          {!openDetails &&  ( <div className=" flex items-center ">
           <div className=" sm:mt-3 mt-5 overflow-scroll overflow-x-hidden h-[440px] w-full ">
             <div className=" w-[96%] mx-auto py-1 px-3 border rounded-md bg-gray-100">
              <input onChange={handlechange} value={updateData.title} name="title" className="outline-none bg-gray-100" type="text"  placeholder="Title"/>
            </div>
       
            <div className="sm:mt-1 mt-2 w-[96%] mx-auto px-3 py-1 border rounded-md bg-gray-100 relative ">
               <FaListCheck className="size-4 mt-2   text-gray-400"/>
               <textarea  onChange={handlechange} value={updateData.desc} className="bg-gray-100 text-[15px] absolute left-9 h-14 top-2 w-[90%] outline-none resize-none" name="desc" placeholder='Description'/> 
              <div className="flex justify-between items-center mt-12">
               <div className="flex gap-2 items-center ">
               <RiBold className="size-4"/>
                <BsTypeItalic className="size-4"/>
                <GoStrikethrough className="size-4"/>
                <RiListOrdered2 className="size-4"/>
                <MdFormatListBulleted className="size-4"/>
               </div>
               <div>
                 <span className="text-gray-400 text-[13px]">0/300 Characters</span>
               </div>
              </div>
            </div>
              
             <div className=" w-[96%] mx-auto  flex justify-between items-center py-2 sm:mt-5 mt-4">
               <div className="sm:flex hidden flex-col gap-2  items-center">
                 <p className="place-self-start text-[13px]   text-gray-700">Task Category*</p>
                 <div  className="flex gap-2 items-center">
                   <div onClick={()=>handleClick("WORK")}>
                    {updateData.category === 'WORK'  ? <button   name="category"  className="py-1 px-4 border-2 bg-purple-700 text-white font-semibold text-[13px] rounded-2xl">WORK</button> : <button  name="category"  className="py-1 px-4 border-2  font-semibold text-[13px] rounded-2xl">WORK</button>}
                   </div>
                  <div onClick={()=>handleClick("PERSONAL")}>
                   {updateData.category === 'PERSONAL'? <button   className="py-1 px-4 border-2 bg-purple-700 text-white font-semibold text-[13px] rounded-2xl">PERSONAL</button> : <button  className="py-1 px-4 border-2  font-semibold text-[13px] rounded-2xl">PERSONAL</button>}
                  </div>
                 </div>
               </div>
               <div className="flex flex-col gap-2 items-center">
                 <p className="place-self-start text-[13px] text-gray-700">Due on*</p>
                 <input onChange={handlechange}  value={updateData.date} className="py-1 sm:w-40 w-[150px]  bg-gray-100 place-content-center px-2 border-2 rounded-md uppercase text-gray-400 text-[14px]" type="date" name="date"  placeholder="DD/MM/YYYY" />
               </div>
               <div  className="flex flex-col gap-2 items-center">
                 <p className="place-self-start text-[13px] text-gray-700">Task Status*</p>
                 <select onChange={handlechange} value={updateData.status} name="status" className="sm:w-40 w-[150px] outline-none text-[15px] py-1 border-2 text-gray-500 bg-gray-100 rounded-md"  >
                 <option value="CHOOSE" >CHOOSE</option>
                 <option value="TO-DO" >TO-DO</option>
                 <option value="IN-PROGRESS">IN-PROGRESS</option>
                 <option value="COMPLETED" >COMPLETED</option>
                 </select>
               </div>
             </div>

             <div className="sm:hidden flex px-2 gap-2 mt-3 items-center ">
                 <p className="place-self-start text-[13px] text-gray-700">Task Category* :</p>
                 <div  className="flex gap-2  items-center">
                   <div onClick={()=>handleClick("WORK")}>
                    {updateData.category === 'WORK'  ? <button   name="category"  className="py-1 px-4 border-2 bg-purple-700 text-white font-semibold text-[13px] rounded-2xl">WORK</button> : <button  name="category"  className="py-1 px-4 border-2  font-semibold text-[13px] rounded-2xl">WORK</button>}
                   </div>
                  <div onClick={()=>handleClick("PERSONAL")}>
                   {updateData.category === 'PERSONAL'? <button   className="py-1 px-4 border-2 bg-purple-700 text-white font-semibold text-[13px] rounded-2xl">PERSONAL</button> : <button  className="py-1 px-4 border-2  font-semibold text-[13px] rounded-2xl">PERSONAL</button>}
                  </div>
                 </div>
               </div>
       
             <div className=" w-[96%] mx-auto  flex flex-col gap-1 mt-3 mb-5 cursor-pointer">
               <h1 className="text-[14px] text-gray-500 ">Attachment</h1>

               <div className="w-full " {...getRootProps()}>
                 <input {...getInputProps()} />
                 {
                   isDragActive ? 
                   <p className=" w-full py-2 border-2 bg-gray-100 rounded-md text-center text-[13px]">Drop the files here</p>:
                   <p className=" w-full py-2 border-2 bg-gray-100 rounded-md text-center text-[13px]">Drop your files here or <span className="text-blue-600 border-b border-blue-600">Upload</span> </p> 
                 }
               </div>
             </div>

             <div className="px-4 py-3 flex gap-2  ">
              {updateData.img?.map((file,i)=>{
                console.log(file);
                return <img className="sm:size-40 size-32 rounded-xl" key={i} src={file} alt="Uploaded file" name="img" />
              })}
             </div>
         </div>
            <div className="sm:block hidden h-[200px] mb-60 ">
              <div className=" py-1.5 text-[18px] ml-4"><h1>Activity</h1></div>
              <div className="flex bg-gray-100 pb-[275px] flex-col py-2 gap-2 items-center ">
                <div className="flex justify-between px-3 py-1 w-96 ">
                <h1 className=" text-[14px]">You createtd this task</h1>
                  <h2 className="text-[12px] text-gray-600">Dec 27 at 1:50 pm</h2>
                </div>
                <div className="flex justify-between px-3 py-1 w-96">
                  <h1 className=" text-[14px] w-48">You changed status to from in progess to complete</h1>
                  <h2 className="text-[12px]  text-gray-600">Dec 27 at 1:50 pm</h2>
                </div>
                <div className="flex justify-between px-3 py-1 w-96 ">
               <h1 className=" text-[14px]">You uploaded file</h1>
                  <h2 className="text-[12px] text-gray-600 ">Dec 27 at 1:50 pm</h2>
                </div>
              </div>
            </div>
           </div>
          )}


          {/* /*----------- for responsive update page ---------------- */ }

          
          
           {
            openActivity &&  (
          <div className="sm:hidden mb-64 px-2 ">
            <div className=" py-1.5 text-[20px] text-purple-500  mt-5 font-semibold ml-2 "><h1>Activity</h1></div>
              <div className="flex bg-gray-100 flex-col py-2 gap-2 items-center mt-2 rounded-xl ">
                <div className="flex justify-between px-3 py-1 w-80 ">
                  <h1 className=" text-[14px]">You createtd this task</h1>
                  <h2 className="text-[12px] text-gray-600">Dec 27 at 1:50 pm</h2>
                </div>
                <div className="flex justify-between px-3 py-1 w-80">
                  <h1 className=" text-[14px] w-48">You changed status to from in progess to complete</h1>
                  <h2 className="text-[12px]  text-gray-600">Dec 27 at 1:50 pm</h2>
                </div>
                <div className="flex justify-between px-3 py-1 w-80 ">
                  <h1 className=" text-[14px]">You uploaded file</h1>
                  <h2 className="text-[12px] text-gray-600 ">Dec 27 at 1:50 pm</h2>
                </div>
              </div>
          </div>
            )
           }
       
             <div className="items-center bg-gray-100 border-2 px-4 py-4 rounded-b-3xl shadow-sm bg-purple-600/10">
               <div className="place-self-end flex gap-3   "> 
               <button onClick={()=>setOpenUpdate(false)} className="py-1 px-4 border-2 bg-red-400/30 rounded-2xl hover:bg-red-400 font-semibold ">Cancel</button>
               <button onClick={handleSubmitUpdateData} className="py-1 px-4 border-2 rounded-2xl text-white hover:bg-purple-800 font-semibold bg-purple-900">Update</button>
               </div>
             </div>
          </div>
      </div>  
    </>
  )
}

export default Update
