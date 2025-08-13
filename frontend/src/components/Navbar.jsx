import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";


const Navbar = () => {
    const navigate=useNavigate();
    const [showMenu,setshowMenu]=useState(false);
    const {token,setToken,userData}=useContext(AppContext);

    const logout=()=>{
      setToken(false)
      localStorage.removeItem('token')
    }


  return (
    <>
      <div className="flex justify-between items-center border-b border-b-gray-400 py-4 mb-5">
        <img onClick={()=>navigate('/')} className='w-40 cursor-pointer' src={assets.logo} alt="" />
        <ul className="hidden md:flex font-medium text-sm  gap-5 items-start">
          <NavLink to='/'>
            <li className="py-1">HOME</li>
            <hr className="border-none outline-none bg-blue-600 h-0.5 w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to='/doctors'>
            <li className="py-1">ALL DOCTORS</li>
           <hr className="border-none outline-none bg-blue-600 h-0.5 w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to='/about'>
            <li className="py-1">ABOUT</li>
              <hr className="border-none outline-none bg-blue-600 h-0.5 w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to='/contact'>
            <li className="py-1">CONTACT</li>
             <hr className="border-none outline-none bg-blue-600 h-0.5 w-3/5 m-auto hidden" />
          </NavLink>
        </ul>

        <div className=" flex items-center gap-4">
            {
                token  && userData
                ?
                <div className="flex items-center gap-2  cursor-pointer group relative">
                    <img  className='w-8 rounded-full' src={userData.image} alt="" />
                    <img src={assets.dropdown_icon} alt="" />
                    <div className="absolute top-0 right-0 pt-16 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                        <div className='bg-stone-100 p-4 flex flex-col gap-4 min-w-48 rounded'>
                            <p className="hover:text-blue-600  cursor-pointer bg-white  p-3 rounded" onClick={()=>navigate('/my-profile')}>My Profile</p>
                            <p className="hover:text-blue-600 bg-white cursor-pointer p-3 rounded" onClick={()=>navigate('/my-appointments')}>Appointments</p>
                            <p className="hover:text-blue-600 bg-white rounded cursor-pointer p-3" onClick={logout}>Logout</p>
                        </div>
                    </div>
                </div>
                :
               <button onClick={()=>navigate('/login')} className="bg-blue-600 text-white cursor-pointer rounded-full px-7  py-2 font-light hidden md:block cursor-pointer">Create account</button>
            }

            {/* <img onClick={()=>setshowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="" /> */}
            {/* mobile menu */}
            {/* <div className={` ${showMenu ? 'fixed w-full':'h-0 w-0'}  md:hidden right-0 top-0 z-20 overflow-hidden bg-white transistion-all`}>
              <div className="flex items-center justify-between px-5 py-6"> 
                <img className="w-36" src={assets.logo} alt=""  />
                <img  className='w-7' src={assets.cross_icon} alt="" onClick={()=>setshowMenu(false)} />
              </div>
              <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium  h-[100vh]">
                <NavLink onClick={()=>setshowMenu(false)}  to='/'>Home</NavLink>
                 <NavLink  onClick={()=>setshowMenu(false)} to='/doctors'>ALL DOCTORS</NavLink>
                  <NavLink  onClick={()=>setshowMenu(false)} to='/about'>ABOUT</NavLink>
                   <NavLink onClick={()=>setshowMenu(false)}  to='/contact'>CONTACT</NavLink>
              </ul>
            </div> */}

            <img onClick={() => setshowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="" />

{/* mobile menu */}
<div className={`${showMenu ? 'fixed top-0 left-0 w-full h-full z-20 bg-white transition-all duration-300' : 'w-0 h-0 overflow-hidden'} md:hidden`}>
  <div className="flex items-center justify-between px-5 py-6">
    <img className="w-36" src={assets.logo} alt="" />
    <img className="w-7" src={assets.cross_icon} alt="" onClick={() => setshowMenu(false)} />
  </div>
  <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium">
    <NavLink   onClick={() => setshowMenu(false)} to='/'><p  className="px-4 py-2 rounded inline-block">Home</p></NavLink>
    <NavLink   onClick={() => setshowMenu(false)} to='/doctors'><p  className="px-4 py-2 rounded inline-block">ALL DOCTORS</p></NavLink>
    <NavLink  onClick={() => setshowMenu(false)} to='/about'><p  className="px-4 py-2 rounded inline-block">ABOUT</p></NavLink>
    <NavLink  onClick={() => setshowMenu(false)} to='/contact'><p  className="px-4 py-2 rounded inline-block">CONTACT</p></NavLink>
  </ul>
</div>


        </div>


      </div>
    </>
  );
};

export default Navbar;
