import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";

const DoctorsList = () => {
  const { aToken, getAllDoctors, doctors,changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);
  return (
    <div className="m-7 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>

      <div className="flex flex-wrap w-full gap-7 pt-5 gap-y-8">
        {doctors.map((item, index) => (
          <div className="border cursor-pointer border-indigo-200 rounded-xl max-w-48 overflow-hidden group" key={index}>
            <img  className='bg-indigo-50  group-hover:bg-blue-400 transistion-all duration-500' src={item.image} alt="" />
            <div className="p-4">
              <p className="text-base font-medium text-neutral-800">{item.name}</p>
              <p className="text-sm text-zinc-600">{item.speciality}</p>

              <div className="flex gap-1 text-sm items-center mt-2">
                <input
                onChange={()=>changeAvailability(item._id)}
                 type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
