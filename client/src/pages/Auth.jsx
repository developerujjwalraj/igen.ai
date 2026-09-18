import React, { useState } from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Auth({
    isModel = false, 
    titleBadge = "AI Smart Interview", 
    description = "Sign in to start AI-powered mock interviews, track your progress, and unlock detailed performance insights.",
    onSuccess
}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const handleGoogleAuth = async () => {
        setLoading(true)
        setErrorMsg("")
        try {
            const response = await signInWithPopup(auth,provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            const result = await axios.post(ServerUrl + "/api/auth/google" , {name , email} , {withCredentials:true})
            dispatch(setUserData(result.data))
            if (onSuccess) {
                onSuccess(result.data)
            }
            if (!isModel) {
                navigate("/")
            }
        } catch (error) {
            console.error("Auth error:", error)
            let msg = error.response?.data?.message || error.message || "Failed to sign in with Google"
            if (error.message === "Network Error" || !error.response) {
                msg = `Network Error: Cannot connect to backend server at "${ServerUrl}". Please make sure the backend is running.`
            }
            setErrorMsg(msg)
            dispatch(setUserData(null))
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className={`
      w-full 
      ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] dark:bg-[#0a0d14] flex items-center justify-center px-6 py-20"}
      transition-colors duration-200
    `}>
        <motion.div 
        initial={{opacity:0 , y:-40}} 
        animate={{opacity:1 , y:0}} 
        transition={{duration:1.05}}
        className={`
        w-full 
        ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"}
        bg-white dark:bg-[#111622] shadow-2xl dark:shadow-black/60 border border-gray-200 dark:border-slate-800 transition-colors
      `}>
            <div className='flex items-center justify-center gap-3 mb-6'>
                <img src="/favicon.png" alt="igen.ai logo" className='w-9 h-9 rounded-xl shadow-md' />
                <h2 className='font-bold text-xl text-gray-900 dark:text-white tracking-tight'>igen.ai</h2>
            </div>

            <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4 text-gray-900 dark:text-white'>
                Continue with
                <span className='bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1 rounded-full inline-flex items-center gap-2 ml-2'>
                    <IoSparkles size={16}/>
                    {titleBadge}
                </span>
            </h1>

            <p className='text-gray-500 dark:text-slate-400 text-center text-sm md:text-base leading-relaxed mb-8'>
                {description}
            </p>

            {errorMsg && (
                <div className='mb-6 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-sm rounded-xl text-center'>
                    {errorMsg}
                </div>
            )}

            <motion.button 
            disabled={loading}
            onClick={handleGoogleAuth}
            whileHover={!loading ? {opacity:0.9 , scale:1.03} : {}}
            whileTap={!loading ? {opacity:1 , scale:0.98} : {}}
            className={`w-full flex items-center justify-center gap-3 py-3 rounded-full shadow-md transition ${
                loading 
                  ? "bg-gray-400 text-white cursor-not-allowed" 
                  : "bg-black dark:bg-emerald-500 text-white dark:text-black font-semibold hover:opacity-90 dark:hover:bg-emerald-400"
            }`}>
                <FcGoogle size={20}/>
                {loading ? "Signing in..." : "Continue with Google"}
            </motion.button>
        </motion.div>

      
    </div>
  )
}

export default Auth
