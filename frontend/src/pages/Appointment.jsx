import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  };

  const getAvailableslots = async () => {
    if (!docInfo || !docInfo.slots_booked) return;

    setDocSlots([]);

    //getting current date

    let today = new Date();
    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //setting end time date with index

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;

        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          //add slot to array

          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }

        //increment current time by 30 min

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
    
    try {
      const date = docSlots[slotIndex][0].dateTime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      //api call

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        {
          docId,
          slotTime,
          slotDate,
        },
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // useEffect(() => {
  //   fetchDocInfo();
  // }, [doctors]);
  useEffect(() => {
    if (doctors.length > 0 && docId) {
      const docInfo = doctors.find((doc) => doc._id === docId);
      setDocInfo(docInfo);
      setSlotIndex(0); // optional: reset selected slot index
      setSlotTime(""); // optional: reset selected slot time
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableslots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <>
        <div>
          {/* doctor details */}
          <div className="flex flex-col sm: flex flex-row gap-4">
            <div>
              <img
                className="bg-blue-500 rounded-lg w-full sm:max-w-72"
                src={docInfo.image}
                alt=""
              />
            </div>
            <div className="flex-1 border border-gray-400 rounded p-4 py-7  bg-white mx-2 sm:mx-0  ">
              {/* details like name degree */}
              <p className="flex gap-2 items-center text-gray-900 font-medium text-xl">
                {docInfo.name}{" "}
                <img className="w-4" src={assets.verified_icon} alt="" />
              </p>
              <div className="flex gap-4 items-center text-sm mt-3 font-medium text-gray-500">
                <p>
                  {docInfo.degree}-{docInfo.speciality}
                </p>
                <button className="py-0.5 px-2 border text-xs rounded-full">
                  {docInfo.experience}
                </button>
              </div>
              {/* doctor about details */}
              <div>
                <p className="flex items-center gap-2 text-lg text-gray-900 mt-3">
                  About <img className="w-3" src={assets.info_icon} alt="" />
                </p>
                <p className="text-gray-500 mt-2 text-sm max-w-[700]">
                  {docInfo.about}
                </p>
              </div>
              <p className="text-gray-500 mt-4">
                Appointment fee:{" "}
                <span className="text-gray-700 font-semibold">
                  {currencySymbol}
                  {docInfo.fees}
                </span>
              </p>
            </div>
          </div>

          {/* Booking slots */}
          <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
            <p>Booking slots</p>
            <div className="flex  gap-3 items-center w-full overflow-x-scroll mt-4">
              {docSlots.length &&
                docSlots.map((item, index) => (
                  <div
                    onClick={() => setSlotIndex(index)}
                    className={`text-center py-6 min-w-14 rounded-full cursor-pointer ${
                      slotIndex === index
                        ? "bg-blue-500 text-white "
                        : "border border-gray-400"
                    }`}
                  >
                    <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                    <p>{item[0] && item[0].dateTime.getDate()}</p>
                  </div>
                ))}
            </div>

            <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
              {docSlots.length &&
                docSlots[slotIndex].map((item, index) => (
                  <p
                    onClick={() => setSlotTime(item.time)}
                    className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                      item.time === slotTime
                        ? "bg-blue-500 text-white"
                        : "text-gray-400 border border-gray-300 "
                    }`}
                    key={index}
                  >
                    {item.time.toLowerCase()}
                  </p>
                ))}
            </div>
            <button
              onClick={bookAppointment}
              className="bg-blue-500 text-white text-sm font-light px-14 py-3 rounded-full my-6"
            >
              Book an appointment
            </button>
          </div>
          {/* listing RelatedDoctors */}

          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </>
    )
  );
};

export default Appointment;
