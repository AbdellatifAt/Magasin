import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

import logo from "../../public/images/logo.png"

//icons
import { FaCarAlt } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { GiAutoRepair } from 'react-icons/gi';
import { GrInProgress } from "react-icons/gr";
import { FaBusinessTime } from "react-icons/fa6";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { GrCatalog } from "react-icons/gr";

import { PiGarageBold } from "react-icons/pi";
import { RiArrowDropDownLine } from "react-icons/ri";
const NavBarEmployee = ({etat  = ""}) => {
    const [isDropDown , setIsDropDrown] = useState(false)
    const { user } = useAuthContext()

    const toogeDropDown = ()=>{
      setIsDropDrown(!isDropDown)
    }
    const {logout} = useLogout()
    const handelLogout = ()=>{
      logout()
    }
  return (
   <>
        {/* <div className="sm:ml-64 "> 
            <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/employee" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-teal-500">{etat}</span>
                    </Link>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                       





                    </ul>
                    </div>
                </div>
            </nav>            
        </div> */}


<div className="sm:ml-64 ">
          

          <nav className="bg-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                
                  <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>
                  
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  
                    <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/> */}
    
                    <Link to="/employee" className="flex items-center space-x-3 rtl:space-x-reverse">
                      <img src={logo} className="h-8 w-auto" alt=" Logo" />
                      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Multipack international</span>
                  </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                    
                      {/* <a href="#" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Dashboard</a>
                      <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a>
                      <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
                      <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a> */}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">View notifications</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-widthW1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                  </button> */}
    
                  <div className="relative ml-3">
                    <div>
                  
                      <a onClick={toogeDropDown}  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer">
                        <div className='flex relative pr-4 '>
                          <span> {user.fname}  </span>  
                          <span className='absolute bottom-0 right-0'><RiArrowDropDownLine className='text-xl' /></span> 
                        </div>
                      </a>
                  
                    </div>
    
                    {isDropDown && <>
                    
                      <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                        <Link to="/" className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" role="menuitem" tabindex="-1" id="user-menu-item-0"> Profile</Link>
                        <Link to="/" className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</Link>
                        <a  onClick={handelLogout} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" role="menuitem" tabindex="-1" id="user-menu-item-2">Logout</a>
                      </div>
                    
                    </>
    
                    }
    
                  </div>
                </div>
              </div>
            </div>
    
          
            <div className="sm:hidden" id="mobile-menu">
              <div className="space-y-1 px-2 pb-3 pt-2">
              
                {/* <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Dashboard</a>
                <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a>
                <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
                <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a> */}
              </div>
            </div>
          </nav>
                
          </div>
   </>
  )
}

export default NavBarEmployee