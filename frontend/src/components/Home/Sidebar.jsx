import React, { useEffect, useState } from "react";
import { FaListAlt, FaSearch  } from "react-icons/fa";
import { Link ,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions  } from "../../store/auth";
import axios from 'axios';
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = [
    { title: "All Cars", 
      icons:<FaListAlt />,
      link: "/",
    },
    { title: "Search Cars", 
      icons:<FaSearch />,
      link: "/search",
    },
  ];

  const [Data,setData] = useState();

  const logout = async()=>{
    localStorage.clear("id");
    localStorage.clear("token");
    dispatch(authActions.logout());
    navigate("/login")
  }
 
  const headers = {
    id:localStorage.getItem("id"),
    authentication: `Bearer ${localStorage.getItem("token")} `,
  };

  useEffect(() => {
    const fetch = async()=>{
      const response =  await axios.get("http://localhost:1000/api/v2/get-all-cars",{
        headers,
      });
      setData(response.data.data);
    };
    fetch();
  }, []);
  

  return (
    <>
      {Data && <div>
        <h2 className="text-xl font-semibold">{Data.username}</h2>
        <h4 className="my-1 text-gray-400">{Data.email}</h4>
        <hr />
      </div>}
        <div>
        {data.map((items, index) => (
            <Link 
            to={items.link} 
            key={index} 
            className="my-2 flex items-center gap-2 hover:bg-slate-600 p-2 rounded transition-all duration-300"> 
                {items.icons }{items.title}
            </Link> 
          ))}
        </div>
        <div>
          <button className="bg-zinc-500 w-full p-1 rounded " onClick={logout}>Log Out</button>
        </div>
      </>
  );
};

export default Sidebar;
