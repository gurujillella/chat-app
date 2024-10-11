import {Route,Routes,Navigate} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import './App.css'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import { useAuthContext } from './context/Authcontext'

function App() {
      const  {authUser}=useAuthContext()
  return (
    
     <div className='p-4 h-screen flex item-center justify-centet'>
        <Routes>
         <Route path="/" element={authUser?<Home/>: <Navigate to ="/signin"/>}/>
         <Route path="/signup" element={authUser? <Navigate to ="/"/>:<Signup/>}/>
         <Route path="/signin" element={authUser?<Navigate to ="/"/>:<Login/>}/>
        </Routes>
        <Toaster/>

     </div>
  
  )
}

export default App
