import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-xl text-center text-blue-700 pt-10'>
        <p className='font-semibold'>CONTACT US</p>
      </div>
      <div className=' my-10 sm:flex flex-col md:flex flex-row text-sm mb-28 gap-15 justify-center '>
        <img  className='w-full md:max-w-[360px] mb-10' src={assets.contact_image} alt="" />
        <div className='flex flex-col gap-6 justify-center items-start'>
          <p className='text-lg font-semibold text-gray-600'>Our OFFICE</p>
          <p className='text-gray-500'>54709 Willms Station  <br/> Suite 350, Washington, USA </p>
          <p className='text-gray-500'>Tel: (415) 555‑0132 <br/> Email: sneha@gmail.com</p>
          <p className='text-gray-600 font-semibold text-lg'>Careers at PRESCRIPTO</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border px-8 py-4 text-sm border-black hover:bg-black hover:text-white cursor-pointer transition-all duration-300'>Explore Jobs</button>
        </div>

      </div>
    </div>
  )
}

export default Contact