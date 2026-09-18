import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from "react-icons/fa";
import Auth from '../pages/Auth';

function AuthModel({ onClose, titleBadge, description, onSuccess }) {
    const {userData} = useSelector((state)=>state.user)

    useEffect(()=>{
        if(userData){
            onClose?.()
        }

    },[userData , onClose])

  return (
    <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md px-4'>
        <div className='relative w-full max-w-md'>
            <button 
                onClick={onClose} 
                className='absolute top-8 right-6 text-gray-400 hover:text-black dark:text-slate-400 dark:hover:text-white text-xl z-20 transition cursor-pointer p-1 rounded-lg'
                aria-label="Close modal"
            >
             <FaTimes size={18}/>
            </button>
            <Auth 
                isModel={true} 
                titleBadge={titleBadge} 
                description={description} 
                onSuccess={onSuccess} 
            />
        </div>
    </div>
  )
}

export default AuthModel
