import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-4 md:px-10 py-10 bg-white text-gray-800'>
      {/* Main Content */}
      <div className='flex flex-col md:flex-row md:justify-between md:items-start gap-10 mb-10'>

        {/* Left Section */}
        <div className='md:w-1/2'>
          <img className='w-32 md:w-44 mb-4' src={assets.logo} alt="Logo" />
          <p className='text-gray-700 leading-6 text-xs md:text-sm'>
            Lorem is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Center Section */}
        <div className='md:w-1/4'>
          <p className='mb-4 text-lg font-medium'>COMPANY</p>
          <ul className='text-gray-700 text-sm flex flex-col gap-2'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className='md:w-1/4'>
          <p className='mb-4 text-lg font-medium'>IN TOUCH</p>
          <ul className='text-gray-700 text-sm flex flex-col gap-2'>
            <li>+1-212-456-7890</li>
            <li>sneha@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <hr />
      <p className='text-gray-700 text-xs sm:text-sm py-5 text-center'>
        Copyright © 2025 <span className='text-blue-600 font-bold underline'>Prescripto</span> - All Right Reserved.
      </p>
    </div>
  )
}

export default Footer
