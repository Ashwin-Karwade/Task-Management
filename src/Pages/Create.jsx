import React from 'react'

import { useCallback, useContext, useEffect, useState } from "react"
import { BsTypeItalic } from "react-icons/bs"
import { FaListCheck } from "react-icons/fa6"
import { GoStrikethrough } from "react-icons/go"
import { ImCross } from "react-icons/im"
import { MdFormatListBulleted } from "react-icons/md"
import { RiBold, RiListOrdered2 } from "react-icons/ri"
import app from "../components/Firebase"
import { get, getDatabase, push, ref, set } from "firebase/database"
import { useDropzone } from "react-dropzone"
import { TaskContext } from "../components/UseContext"


const Create = ({openCreate, setOpenCreate, }) => {

 const {displayTaskData, setDisplayTaskData} = useContext(TaskContext)
 const [uploadFile, setUploadfile] = useState([])
 const [activeCategory, SetactiveCategory] = useState(null);


const [bold, setBold] = useState(false)
const [italic, setItalic] = useState(false)
const [linethrough, setLinethrough] = useState(false)
const [taskData, setTaskdata] = useState({
  title:"",
  desc : "",
  category:"",
  date: "",
  status:"",
  img:[]
})



const maxtext = 300;
const handelCharacters = (e)=>{
  const value = e.target.value;
  setTaskdata((prev)=> ({...prev, desc:value}))
}

 
 const handlECreateTask = (e)=>{
      e.preventDefault();
      const {name, value} = e.target;
      setTaskdata((prev)=>({...prev, [name]:value}))
 }

const handleCategory = (element)=>{
  
  setTaskdata((prev)=>({...prev, category:element}))
  SetactiveCategory(element);
}
  
const id = Date.now();

const handleSubmitTask= async(e)=>{ 
  e.preventDefault();
  
  const db = getDatabase(app)
  const newDocRef = ref (db, "task/" + id);
  await set(newDocRef,
    taskData
  ).then(()=>{
    alert("data save successfull");
    setOpenCreate(false);
  }).catch((error)=>{
    alert("error:", error.message )
  })
  setDisplayTaskData((prev)=>[...prev, {...taskData, id}])
  setTaskdata({
    title:"",
    desc : "",
    category:"",
    date: "",
    status:"",
    img:[]
  });
  
  SetactiveCategory(null);
  setUploadfile([]);
  // location.reload();
 }

 useEffect(()=>{
  
  const fetchData = async ()=>{
     const db = getDatabase(app)
     const dbref = ref(db,'task')
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


     const onDrop = useCallback( acceptedFiles=>{
           setUploadfile(acceptedFiles);
           setTaskdata((prev)=>({...prev, img: acceptedFiles.map((file)=>URL.createObjectURL(file))}))   
     }, [])
   
   
     const{ getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
       accept: '.jpg, .png, .pdf, .gif, .pdf',
       maxFiles: 5, 
     });

     

  if(!openCreate){
    return null;
  }

  return (
   <div className="fixed inset-0 bg-black bg-opacity-25  z-50 py-1 ">
    <div className="maindiv sm:w-[40%] w-[92%] mx-auto rounded-2xl border shadow-sm sm:my-7 my-5 bg-white">
     <div className="flex bg-purple-600/10 rounded-t-2xl justify-between items-center border-b px-4 py-4 shadow-sm ">
      <h1 className="sm:text-[20px] text-[17px] font-semibold">Create Task</h1>
      <ImCross onClick={()=>setOpenCreate(false)} className="size-3 text-black cursor-pointer"/>
     </div>

     <div className="mt-3 w-[96%] mx-auto py-1 px-3 border rounded-md bg-gray-100">
       <input name="title" onChange={handlECreateTask} value={taskData.title} className="outline-none bg-gray-100" type="text" placeholder="Title"/>
     </div>

     <div className="mt-3 w-[96%] mx-auto px-3 py-1 border rounded-md bg-gray-100 relative ">
        <FaListCheck className="size-4 mt-2   text-gray-400"/>
        <textarea  id="textarea" name="desc" onChange={handelCharacters} maxLength={maxtext} className={`bg-gray-100 text-[15px] absolute left-9 h-14 top-2 w-[90%] outline-none resize-none ${bold  ? 'font-bold' : 'font-normal'}  ${ italic ? ' italic ': 'not-italic'}  ${ linethrough ? 'line-through ': 'normal-case'}` }  placeholder='Description..'/> 
       <div className="flex justify-between items-center mt-12">
        <div className="flex justify-center gap-1.5 items-center ">
        <RiBold onClick={()=>setBold(!bold)} className="size-4 cursor-pointer"/>
         <BsTypeItalic onClick={()=>setItalic(!italic)} className="size-4 cursor-pointer"/>
         <GoStrikethrough onClick={()=>setLinethrough(!linethrough)} className="size-4"/>
          <p className="mb-1.5 px-1 text-gray-400">|</p>
         <RiListOrdered2  className="size-4 "/>
         <MdFormatListBulleted  className="size-4 cursor-pointer "/>
        </div>
        <div>
          <span className="text-gray-400 text-[13px]">{taskData.desc.length}/{maxtext}</span>
        </div>
       </div>
     </div>
       
      <div className=" w-[96%] mx-auto  flex justify-between items-center py-2 mt-5">
        <div className="sm:flex hidden flex-col gap-2 items-center">
          <p className="place-self-start text-[13px] text-gray-700">Task Category*</p>
          <div className="flex gap-2 items-center">
            <button onClick={()=>handleCategory("WORK")} className={` ${activeCategory === 'WORK' ? 'bg-purple-800 text-gray-100' : ""} py-1 px-4 border-2 font-semibold text-[14px] rounded-2xl `}>WORK</button>
            <button onClick={()=>handleCategory("PERSONAL")} className={`${activeCategory === 'PERSONAL' ? 'bg-purple-800 text-gray-100'  : ""} py-1 px-4 border-2 font-semibold text-[14px] rounded-2xl `}>PERSONAL</button>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="place-self-start text-[13px] text-gray-700">Due on*</p>
          <input onChange={handlECreateTask} value={taskData.date} name="date" className="py-1 sm:w-40 w-36 bg-gray-100 place-content-center px-1 border-2 rounded-md uppercase text-gray-400 sm:text-[14px] text-[13px]" type="date" placeholder="DD/MM/YYYY" />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="place-self-start text-[13px] text-gray-700">Task Status*</p>
          <select onChange={handlECreateTask} name="status" value={taskData.status} className="sm:w-40 w-36  sm:text-[14px] text-[13px] outline-none py-1 border-2 text-gray-500 bg-gray-100 rounded-md" >
          <option value="CHOOSE"  >CHOOSE</option>
          <option value="TO-DO"  >TO-DO</option>
          <option value="IN-PROGRESS"  >IN-PROGRESS</option>
          <option value="COMPLETED"   >COMPLETED</option>
          </select>
        </div>
      </div>    

       <div className="sm:hidden items-center gap-2 px-2 mt-5 flex  ">
          <p className=" sn:text-[13px] text-[14px] text-gray-700">Task Category* : </p>
          <div className="flex gap-2 items-center">
            <button onClick={()=>handleCategory("WORK")} className={` ${activeCategory === 'WORK' ? 'bg-purple-800 text-gray-100' : ""} sm:py-1 py-1 sm:px-4 px-3 border-2 font-semibold sm:text-[14px] text-[13px] rounded-2xl `}>WORK</button>
            <button onClick={()=>handleCategory("PERSONAL")} className={`${activeCategory === 'PERSONAL' ? 'bg-purple-800 text-gray-100'  : ""} sm:py-1 py-1 sm:px-4 px-3 border-2 font-semibold sm:text-[14px] text-[13px] rounded-2xl `}>PERSONAL</button>
          </div>
        </div>
      
      <div className=" w-[96%] mx-auto  flex flex-col gap-1.5 sm:mt-3 mt-5">
        <h1 className="text-[14px] text-gray-500 ">Attachment</h1>
        <div className="w-full " {...getRootProps()}>
                 <input {...getInputProps()} />
                 {
                   isDragActive ? 
                   <p className=" w-full py-2 border-2 bg-gray-100 rounded-md text-center text-[13px]">Drop the files here</p>:
                   <p className=" w-full py-2 border-2 bg-gray-100 rounded-md text-center text-[13px] cursor-pointer">Drop your files here or <span className="text-blue-600 border-b border-blue-600">Upload</span> </p> 
                 }
        </div>
      </div>

      <div className="px-4 py-3 flex gap-2  ">
        {uploadFile.map((file,i)=>{
           return <img className="sm:size-[120px] size-[100px] rounded-xl" key={i} src={URL.createObjectURL(file)} alt="Uploaded file" />
        })}
      </div>

      <div className="items-center bg-gray-200 mt-2  px-4 py-4 rounded-b-2xl shadow-sm bg-purple-600/10">
        <div className="place-self-end flex gap-3 sm:mr-5 "> 
        <button onClick={()=>setOpenCreate(false)} className="py-1 px-4 border-2 bg-red-700 text-white rounded-2xl font-semibold ">Cancel</button>
        <button onClick={handleSubmitTask} className="py-1 px-4 border-2 rounded-2xl text-white font-semibold bg-purple-900">Create</button>
        </div>
      </div>
    </div>
      
   </div>
    
  )
}

export default Create