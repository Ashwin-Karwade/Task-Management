
import { LuClipboardList } from "react-icons/lu"
import { auth, } from "../components/Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Loginpage = () => {

    const navigate = useNavigate();

    const googleSignIn =  () =>{
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then(async (result)=> {
        console.log(result);
         if(result.user){
            toast.success("User Logged In Successfully",{position:"top-center"})
         }
         navigate('/Task-Management/');
      })

      }   
 
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-purple-800/10">
     <div className="sm:w-[25%]  w-[95%] sm:px-0 px-4  mx-auto sm:py-14 py-10 ">
        <div className="flex items-center text-purple-900 mx-auto font-bold gap-2 ml-10 ">
         <LuClipboardList className="size-11"/>
         <p className="text-3xl tracking-wide">TaskBuddy</p>
        </div>
        <p className="mt-3 text-[15px] w-[280px] text-justify place-self-center">streamline your workflow and track progress effortlessly with our all-in-one task management app.</p>
        
            <div onClick={googleSignIn} className="flex items-center sm:gap-2.5 place-self-center gap-3 bg-black rounded-3xl w-fit sm:px-10 px-10 sm:py-4 py-3 sm:mt-4 mt-4 cursor-pointer ">
            <img src="/google.jpg" className="sm:size-7 size-5 bg-black "/>
            <p className="sm:text-[20px] text-[18px] text-white font-semibold ">Continue with Google</p>
            </div>
    
    </div>
  </div> 
  )
}

export default Loginpage
