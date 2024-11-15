import React, { useState, useEffect } from "react";
import Card from "../components/Home/Card";
import { MdAddCard } from "react-icons/md";
import InputData from "../components/Home/InputData";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AllCar = () => {
  const location = useLocation();
  const [InputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();
  const [updatedData, setupdatedData] = useState({
    id: "",
    title: "",
    desc: "",
    tags: "",
  });
  const headers = {
    id: localStorage.getItem("id"),
    authentication: `Bearer ${localStorage.getItem("token")} `,
  };

  useEffect(() => {
    const fetchCars = async () => {
      const response = await axios.get("http://localhost:1000/api/v2/get-all-cars", {
        headers,
      });
      setData(response.data.data); 
    };

    if (location.state && location.state.searchResults) {
      setData({ cars: location.state.searchResults });
    } else if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetchCars();
    }
    
  });

  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button onClick={() => setInputDiv("fixed")}>
            <MdAddCard className="text-3xl text-gray-300 hover:text-gray-50 transition-all duration-300" />
          </button>
        </div>
        <div>
          {Data && (
            <Card
              home={true}
              setinputdiv={setInputDiv}
              data={Data.cars}
              setUpdatedData={setupdatedData}
            />
          )}
        </div>
        <InputData
          Inputdiv={InputDiv}
          setinputdiv={setInputDiv}
          updatedData={updatedData}
          setupdatedData={setupdatedData}
        />
      </div>
    </>
  );
};

export default AllCar;
