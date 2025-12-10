import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { ThemeContext, useTheme } from "../context/ThemeContext";
import { MapPin, Layers, Star, Earth, UserRoundPen } from "lucide-react";

import axios from "axios";
import { toast } from "react-toastify";



const Listing = () => {
  const { id } = useParams();
  const { demoData } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { isDark, getlistingData } = useTheme();
  const [currentUserId, setCurrentUserId] = useState(null);
  // const [user, setUser] = useState(null);
  const [ownerid, setOwnerId] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const backendurl = import.meta.env.VITE_BACKEND_URL;


  // Fetch the listing from demoData
  useEffect(() => {
    if (demoData && demoData.length > 0) {
      const foundItem = demoData.find((item) => String(item._id) === id);
      setData(foundItem || null);
    }
  }, [id, demoData]);

  console.log("Listing Data:", id);
  // Get current user ID from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) setCurrentUserId(user._id);
  }, []);




  const handleDelete = async (deleteId) => {
    try {
      const res = await axios.delete(backendurl + `/api/product/product/${deleteId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.success) {
        toast.success("Listing deleted successfully!");
        getlistingData();
        navigate("/");

      } else toast.error(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };




  if (!data) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          } text-gray-400`}
      >
        Loading listing...
      </div>
    );
  }

  return (
    <div
      className={`pt-25 min-h-screen justify-center ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-600"
        } text-gray-300 px-4 sm:px-8 py-10`}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className={`flex items-center gap-2 text-sm text-gray-300 ${isDark
          ? "bg-gray-900 text-white border border-gray-500 hover:bg-blue-400"
          : "bg-white border border-gray-300 text-gray-900 hover:bg-blue-400"
          } px-4 py-2 rounded-lg mb-8 transition`}
      >
        ← Back to Home
      </button>


      {/* Image + Details */}

      <div className="ml-5 sm:flex w-full max-w-5xl mx-auto">
        <div className="flex sm:flex-col">

        </div>

        {data.image && data.image.length > 0 && (
          <img
            src={mainImage || data.image[0]}
            alt={data.name}
            className="rounded-xl shadow-lg w-90 h-70  sm:h-90 sm:w-150 sm:ml-5 "
          />
        )}


        {/* Title & Info */}
        <div className="ml-5 mt-2  sm:px-0">

          <h1 className="text-3xl sm:text-4xl font-bold">{data.name}</h1>



          {/* 📍 Category & Country */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
            <span className="flex items-center gap-1">
              <Layers size={16} className="text-blue-400" /> {data.category}
            </span>
            <span className="flex items-center gap-1">
              <Earth size={16} className="text-blue-400" /> {data.price}
            </span>

            <span className="flex items-center gap-1">
              <UserRoundPen size={16} className="text-blue-400" /> {data.owner.name || "Unknown"}
            </span>
          </div>


          {data?.owner && currentUserId === data.owner._id ? (
            <div>
              <div className="flex gap-4">
                <NavLink to={`/product/${id}/edit`} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Edit  Now
                </NavLink>
                <button onClick={() => handleDelete(data._id)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Delete Now
                </button>
              </div>
            </div>
          ) : (
            ""
          )}




        </div>
      </div>



    </div>
  );
};

export default Listing;