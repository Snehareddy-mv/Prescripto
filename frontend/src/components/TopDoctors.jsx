import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center my-16 gap-4 text-gray-900 md:mx-10">
      <h1 className="font-medium text-3xl">Top Doctors to Book</h1>
      <p className="sm:w-1/2 text-center text-sm font-medium text-gray-500">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div
        className="w-full grid grid-cols-auto gap-y-6 gap-4 pt-5 px-3 sm:px-0"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}
      >
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img className="bg-blue-50" src={item.image} alt="" />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${
                  item.available ? "text-green-500" : "text-gray-500"
                } `}
              >
                <p
                  className={`w-1 h-1 mt-1 ${
                    item.available ? "bg-green-500" : "bg-gray-500"
                  }  rounded-full`}
                ></p>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-gray-900 font-medium text-sm ">{item.name}</p>
              <p className="text-gray-600 text-xs">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="px-12 py-3 rounded-full bg-blue-100 text-gray-600 cursor-pointer mt-5"
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;
