import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);

  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <>
      <div>
        <p className="text-gray-700">Browse through the doctors specialist.</p>
        <div className=" flex flex-col sm:flex-row items-start gap-10 mt-13 mb-12">
          <div className="flex flex-col gap-5 text-sm text-gray-700">
            <p
              onClick={() =>
                speciality === "General physician"
                  ? navigate("/doctors")
                  : navigate("/doctors/General physician")
              }
              className={`border border-gray-600 px-6 sm:px-10 py-2 rounded transition-all duration-300 cursor-pointer w-full sm:w-auto text-center ${
                speciality === "General physician"
                  ? "bg-indigo-300 text-black"
                  : ""
              } `}
            >
              General physician
            </p>
            <p
              onClick={() =>
                speciality === "Gynecologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Gynecologist")
              }
              className={`border border-gray-600 px-6 sm:px-10 py-2 rounded transition-all duration-300 cursor-pointer w-full sm:w-auto text-center ${
                speciality === "Gynecologist" ? "bg-indigo-300 text-black" : ""
              } `}
            >
              Gynecologist
            </p>
            <p
              onClick={() =>
                speciality === "Dermatologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Dermatologist")
              }
              className={`border border-gray-600 px-6 sm:px-10 py-2 rounded transition-all duration-300 cursor-pointer w-full sm:w-auto text-center ${
                speciality === "Dermatologist" ? "bg-indigo-300 text-black" : ""
              } `}
            >
              Dermatologist
            </p>
            <p
              onClick={() =>
                speciality === "Pediatricians"
                  ? navigate("/doctors")
                  : navigate("/doctors/Pediatricians")
              }
              className={`border border-gray-600 px-6 sm:px-10 py-2 rounded transition-all duration-300 cursor-pointer w-full sm:w-auto text-center ${
                speciality === "Pediatricians" ? "bg-indigo-300 text-black" : ""
              } `}
            >
              Pediatricians
            </p>
            <p
              onClick={() =>
                speciality === "Neurologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Neurologist")
              }
              className={`border border-gray-600 px-6 sm:px-10 py-2 rounded transition-all duration-300 cursor-pointer w-full sm:w-auto text-center ${
                speciality === "Neurologist" ? "bg-indigo-300 text-black" : ""
              } `}
            >
              Neurologist
            </p>
            <p
              onClick={() =>
                speciality === "Gastroenterologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Gastroenterologist")
              }
              className={`border border-gray-600 px-6 sm:px-10 py-2 rounded transition-all duration-300 cursor-pointer w-full sm:w-auto text-center ${
                speciality === "Gastroenterologist"
                  ? "bg-indigo-300 text-black"
                  : ""
              } `}
            >
              Gastroenterologist
            </p>
          </div>
          <div
            className="w-full "
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1rem", // Optional: adds gap between grid items
            }}
          >
            {filterDoc.map((item, index) => (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border  max-w-xs border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                key={index}
              >
                <img
                  className="bg-blue-50  w-full h-80 object-cover"
                  src={item.image}
                  alt=""
                />
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
                  <p className="text-gray-900 font-medium text-sm ">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-xs">{item.speciality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctors;
