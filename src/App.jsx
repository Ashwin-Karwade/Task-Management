import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Loginpage from "./Pages/Loginpage"
import Create from "./Pages/Create"
import Home from "./Pages/Home"
import { TaskProvider } from "./components/UseContext"



function App(){

  const router = createBrowserRouter([
    {
      path:'/signin/',
      element:<Home/>
    },
    {
    path:'/signin',
    element: <Loginpage/>
    },

    {
    path:'/Task-Management/create',
    element: <Create/>
    }
])


  return (
    
    <>
    <TaskProvider>
      <RouterProvider router={router}/>
    </TaskProvider>
    </>
  )
}

export default App
