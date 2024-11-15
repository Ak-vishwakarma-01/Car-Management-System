import React, { useEffect } from 'react';
import Home from './pages/Home';
import { Routes, Route, Router, useNavigate } from "react-router-dom";
import Allcar from './pages/AllCar';
import SighnUp from './pages/SighnUp';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import SearchCars from './pages/SearchCars';

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
    }else if(isLoggedIn===false){
      navigate("/signup");
    }
  }, []);
  
  return (
    <div className="bg-gray-950 text-white h-screen p-2 relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<Allcar />} />
          <Route path="/search" element={<SearchCars/>}/>
        </Route>
          <Route path="/signup" element={<SighnUp />}/>
          <Route path="/login" element={<Login />}/>
      </Routes>
    </div>
  )
}

export default App;
