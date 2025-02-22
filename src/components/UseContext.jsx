import { createContext, useState } from "react";


 export const TaskContext = createContext();


 export const TaskProvider = ({children})=>{

    const [displayTaskData, setDisplayTaskData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [search, setSearch] = useState('')
    const [categorySearch, setCategorySearch] = useState('')
    const [dateSearch, setDateSearch] = useState('')
    
    let searchData = displayTaskData.filter((prev) => {
        const searchtask = prev.title.includes(search);
        const CategoryTask = categorySearch === "category" || prev.category.includes(categorySearch.toUpperCase())
        const DateTask = prev.date.includes(dateSearch) 
        return searchtask && CategoryTask && DateTask

    })

    

    const To_Do = searchData.filter((prev)=> prev.status === "TO-DO")
    const Completed = searchData.filter((prev)=> prev.status === "COMPLETED")
    const Progress = searchData.filter((prev)=> prev.status === "IN-PROGRESS")

    
    return <TaskContext.Provider value={{ dateSearch, setDateSearch, categorySearch, setCategorySearch , displayTaskData, setDisplayTaskData, selected, setSelected, To_Do, Completed, search, searchData, setSearch, Progress}}>{children}</TaskContext.Provider>
}
