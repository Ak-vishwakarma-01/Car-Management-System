import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdAddCard } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Card = ({ home, setinputdiv, data, setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authentication: `Bearer ${localStorage.getItem("token")} `,
  };

  const handleUpdate = async (id, title, desc,tags) => {
    setinputdiv("fixed");
    setUpdatedData({ id: id, title: title, desc: desc ,tags:tags});
  };

  const deleteCar = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:1000/api/v2/delete-car/${id}`,
        { headers }
      );
      console.log(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {data &&
        data.map((items, i) => (
          <div className="flex flex-col justify-between bg-slate-800 rounded-md p-4 hover:scale-105 cursor-pointer transition-all duration-300">
            <div>
              <h1 className="text-2xl font-semibold">{items.title}</h1>
              <p className="text-gray-200 my-2"><span className="text-pink-600 ">Description:- </span>{items.desc}</p>
              <p className="text-gray-200 my-2 font-semibold"><span className="text-green-600 ">Tags:- </span> {items.tags}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <div className=" text-white w-3/6 flex justify-around">
                <button
                  className="ml-3 text-xl"
                  onClick={() =>
                    handleUpdate(items._id, items.title, items.desc,items.tags)
                  }
                >
                  <FaEdit />{" "}
                </button>
                <button 
                className="text-xl"
                onClick={() => deleteCar(items._id)}>
                  <MdDelete />
                </button>
                <button 
                className="text-xl bg-blue-900 p-1 border-spacing-1"
                onClick={()=>handleUpdate(items._id, items.title, items.desc,items.tags)}>
                  Images
                </button>
              </div>
            </div>
          </div>
        ))}

      {home && (
        <button
          className="flex flex-col justify-center items-center bg-gray-700 text-gray-300 rounded-md p-4 hover:scale-105 cursor-pointer transition-all duration-300"
          onClick={() => setinputdiv("fixed")}
        >
          <MdAddCard className="text-3xl" />
          <h2 className="text-2xl mt-3"> Add Car</h2>
        </button>
      )}
    </div>
  );
};

export default Card;
