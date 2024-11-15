import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchCars = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDesc, setSearchDesc] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authentication: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/v2/get-all-cars", { headers });
      const allCars = response.data.data.cars;

      const filteredCars = allCars.filter((car) => {
        return (
          (searchTitle && car.title.toLowerCase().includes(searchTitle.toLowerCase())) ||
          (searchDesc && car.desc.toLowerCase().includes(searchDesc.toLowerCase())) ||
          (searchTags && car.tags.toLowerCase().includes(searchTags.toLowerCase()))
        );
    });
    { navigate("/", { state: { searchResults: filteredCars } })}
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Search Cars</h2>
      <div className="grid gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800 w-full"
        />
        <input
          type="text"
          placeholder="Search by Description"
          value={searchDesc}
          onChange={(e) => setSearchDesc(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800 w-full"
        />
        <input
          type="text"
          placeholder="Search by Tags"
          value={searchTags}
          onChange={(e) => setSearchTags(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800 w-full"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded w-full font-semibold"
        >
          Search
        </button>
      </div>
    </div>

  );
};

export default SearchCars;
