import React,{useState} from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import axios from 'axios';  
import { authActions } from '../store/auth';
import { useDispatch ,useSelector } from 'react-redux';
const Login = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    if(isLoggedIn===true){
        navigate("/");
    }
    
    const [Data, setData] = useState({username:"",password:""}); 
    const dispatch = useDispatch();
  const change = (e)=>{
    const {name,value} = e.target;
    setData({...Data,[name]:value});
  }

  const submit = async()=>{
    try{
      if(Data.username === "" || Data.email=== "" || Data.password === ""){
        alert("All fields are required")
      }else{
        const response = await axios.post("https://car-management-system-jlz6.onrender.com/api/v1/log-in",Data);
        setData({username:"",password:""})
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("token",response.data.token)
        dispatch(authActions.login());
        navigate("/");  
    }
    }catch(err){
      alert(err.response.data.message);
    }
  }
  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="sm:w-2/6 md:w-2/6 lg:w-2/6 w-4/6 p-4 bg-slate-900 rounded flex flex-col items-center">
        <div className="text-2xl">LogIn</div>
        <input
        type="username" 
        placeholder="username" 
        name="username"
        value = {Data.username}
        onChange={change}
        className="bg-slate-800 px-3 py-2 rounded my-3 w-full" />
        <input
        type="password" 
        placeholder="password" 
        name="password"
        value = {Data.email}
        onChange={change}
        className="bg-slate-800 px-3 py-2 rounded my-3 w-full" />
        <div className='w-full flex items-center justify-between'>
            <button className="bg-slate-600 p-2 rounded my-3 " onClick={submit}>LogIn</button>
            <Link to="/signup" className="text-xs text-slate-300 hover:text-blue-200">Not having account? sighnup here</Link>
        </div>
      </div>
    </div>
  )
}

export default Login