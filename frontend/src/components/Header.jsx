import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <>
      <div
        className="rounded-lg flex flex-col md:flex flex-row flex-wrap px-6 md:px-10 lg:px-20"
        style={{ backgroundColor: "#5F6FFF" }}
      >
        {/* {left section} */}
        <div className="md:w-1/2 flex flex-col items-start justify-center py-10 gap-6 m-auto md:py-[10vw] md:mb-[-30px]">
          <p className="text-white font-semibold leading-tight text:3xl md:text-4xl lg:text-5xl">
            Book Appointment <br /> With Trusted Doctors{" "}
          </p>
          <div className="flex flex-col md:flex flex-row  text-white text-sm font-light gap-6">
            <img className="w-28" src={assets.group_profiles} alt="" />
            <p className="font-serif">
              Simply browse through our extensive list of trusted doctors,{" "}
              <br className="hidden md:block" /> schedule your appointment
              hassle-free.
            </p>
          </div>
          <a
            href="#speciality"
            className="bg-white text-sm  flex items-center gap-2 px-8 py-3 rounded-full  text-gray-600 m-auto md:m-0 hover:scale-105 transition-all duration-300"
          >
            Book appointment{" "}
            <img className="w-3 mt-1" src={assets.arrow_icon} alt="" />
          </a>
        </div>
        {/* {right section} */}
        <div className="md:w-1/2 relative">
          <img
            className="absolute w-full bottom-0 rounded-lg h-auto"
            src={assets.header_img}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Header;
