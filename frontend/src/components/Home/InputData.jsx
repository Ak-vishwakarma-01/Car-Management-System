import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const InputData = ({ Inputdiv, setinputdiv, updatedData, setupdatedData }) => {
  const [Data, setData] = useState({ title: "", desc: "", tags: "" });

  useEffect(() => {
    setData({
      title: updatedData.title,
      desc: updatedData.desc,
      tags: updatedData.tags,
    });
  }, [updatedData]);

  const headers = {
    id: localStorage.getItem("id"),
    authentication: `Bearer ${localStorage.getItem("token")} `,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submitData = async () => {
    if (Data.title === "" || Data.desc === "" || Data.tags === "") {
      alert("All fields are required");
    } else {
      try {
        const response = await axios.post(
          "https://car-management-system-jlz6.onrender.com/api/v2/add-car",
          Data,
          { headers }
        );
        setData({ title: "", desc: "", tags: "" });
        setinputdiv("hidden");
      } catch (error) {
        alert("Internal error");
      }
    }
  };

  const updateCar = async () => {
    if (Data.title === "" || Data.desc === "" || Data.tags === "") {
      alert("All fields are required");
    } else {
      try {
        const response = await axios.put(
          `https://car-management-system-jlz6.onrender.com/api/v2/update-car/${updatedData.id}`,
          Data,
          { headers }
        );
        setupdatedData({
          id: "",
          title: "",
          desc: "",
          tags: "",
        });
        setData({ title: "", desc: "", tags: "" });
        setinputdiv("hidden");
      } catch (error) {
        alert("Internal error");
      }
    }
  };

  return (
    <>
      <div
        className={`${Inputdiv} fixed top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="sm:w-2/6 md:w-2/6 lg:w-2/6 w-3/6 bg-gray-900 p-4 rounded">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setinputdiv("hidden");
                setData({
                  title: "",
                  desc: "",
                  tags: "",
                });
                setupdatedData({
                  id: "",
                  title: "",
                  desc: "",
                  tags: "",
                });
              }}
              className="text-2xl"
            >
              <IoCloseCircleOutline />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-800 my-2"
            value={Data.title}
            onChange={change}
          />
          <textarea
            name="desc"
            cols="30"
            rows="10"
            placeholder="Description"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={Data.desc}
            onChange={change}
          />
          <input
            type="text"
            placeholder="Tags"
            name="tags"
            className="px-3 py-2 rounded w-full bg-gray-800 my-2"
            value={Data.tags}
            onChange={change}
          />
          {updatedData.id === "" ? (
            <button
              className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
              onClick={submitData}
            >
              Submit
            </button>
          ) : (
            <button
              className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
              onClick={updateCar}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
