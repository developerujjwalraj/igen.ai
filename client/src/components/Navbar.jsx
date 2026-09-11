import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin, BsSun, BsMoonStars } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';
import { useTheme } from '../context/ThemeContext';

function Navbar() {
    const {userData} = useSelector((state)=>state.user)
    const [showCreditPopup,setShowCreditPopup] = useState(false)
    const [showUserPopup,setShowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const handleNav = (hash) => {
        if (window.location.pathname !== '/') {
            navigate('/')
            setTimeout(() => {
                document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
            }, 150)
        } else {
            document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout" , {withCredentials:true})
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='bg-[#f3f3f3] dark:bg-[#0a0d14] flex justify-center px-4 pt-6 transition-colors duration-200'>
        <motion.div 
        initial={{opacity:0 , y:-40}}
        animate={{opacity:1 , y:0}}
        transition={{duration: 0.3}}
        className='w-full max-w-6xl bg-white dark:bg-[#111622] rounded-[24px] shadow-sm dark:shadow-black/40 border border-gray-200 dark:border-slate-800 px-8 py-4 flex justify-between items-center relative transition-colors duration-200'>
            <div onClick={() => navigate("/")} className='flex items-center gap-3 cursor-pointer group'>
                <img src="/favicon.png" alt="igen.ai logo" className='w-9 h-9 rounded-xl shadow-md group-hover:scale-105 transition-transform' />
                <h1 className='font-bold hidden md:block text-lg text-gray-900 dark:text-white tracking-tight'>igen.ai</h1>
            </div>

            {/* Desktop Navigation Links */}
            <div className='hidden lg:flex items-center gap-7 text-sm font-medium text-gray-600 dark:text-slate-300'>
                <button onClick={() => handleNav('#features')} className='hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer'>Features</button>
                <button onClick={() => handleNav('#about')} className='hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer'>About Us</button>
                <button onClick={() => handleNav('#faq')} className='hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer'>FAQ</button>
                <button onClick={() => navigate('/pricing')} className='hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer'>Pricing</button>
            </div>

            <div className='flex items-center gap-4 md:gap-6 relative'>
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    aria-label="Toggle Theme"
                    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    className='p-2.5 rounded-full bg-gray-100 dark:bg-slate-800/80 text-gray-700 dark:text-amber-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all border border-gray-200 dark:border-slate-700 flex items-center justify-center'
                >
                    {theme === 'dark' ? (
                        <BsSun size={18} className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                    ) : (
                        <BsMoonStars size={18} className="text-slate-700" />
                    )}
                </button>

                <div className='relative'>
                    <button onClick={()=>{
                        if(!userData){
                            setShowAuth(true)
                            return;
                        }
                        setShowCreditPopup(!showCreditPopup);
                        setShowUserPopup(false)
                    }} className='flex items-center gap-2 bg-gray-100 dark:bg-slate-800/80 text-gray-800 dark:text-slate-200 border border-transparent dark:border-slate-700 px-4 py-2 rounded-full text-md hover:bg-gray-200 dark:hover:bg-slate-700 transition'>
                        <BsCoin size={20} className="text-amber-500" />
                        {userData?.credits || 0}
                    </button>

                    {showCreditPopup && (
                        <div className='absolute right-[-50px] mt-3 w-64 bg-white dark:bg-[#161f30] shadow-xl border border-gray-200 dark:border-slate-700 rounded-xl p-5 z-50 text-gray-800 dark:text-slate-200'>
                            <p className='text-sm text-gray-600 dark:text-slate-300 mb-4'>Need more credits to continue interviews?</p>
                            <button onClick={()=>navigate("/pricing")} className='w-full bg-black dark:bg-emerald-500 text-white dark:text-black font-medium py-2 rounded-lg text-sm hover:opacity-90 transition'>Buy more credits</button>
                        </div>
                    )}
                </div>

                <div className='relative'>
                    <button
                    onClick={()=>{
                         if(!userData){
                            setShowAuth(true)
                            return;
                        }
                        setShowUserPopup(!showUserPopup);
                        setShowCreditPopup(false)
                    }} className='w-9 h-9 bg-black dark:bg-emerald-500 text-white dark:text-black rounded-full flex items-center justify-center font-semibold transition'>
                        {userData ? userData?.name.slice(0,1).toUpperCase() : <FaUserAstronaut size={16}/>}
                    </button>

                    {showUserPopup && (
                        <div className='absolute right-0 mt-3 w-48 bg-white dark:bg-[#161f30] shadow-xl border border-gray-200 dark:border-slate-700 rounded-xl p-4 z-50'>
                            <p className='text-md text-emerald-600 dark:text-emerald-400 font-medium mb-1 truncate'>{userData?.name}</p>

                            <button onClick={()=>navigate("/history")} className='w-full text-left text-sm py-2 hover:text-black dark:hover:text-white text-gray-600 dark:text-slate-300 transition'>InterView History</button>
                            <button onClick={handleLogout} 
                            className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-500 dark:text-red-400 hover:opacity-90 transition'>
                                <HiOutlineLogout size={16}/>
                                Logout</button>
                        </div>
                    )}
                </div>

            </div>

        </motion.div>

        {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}
      
    </div>
  )
}

export default Navbar
