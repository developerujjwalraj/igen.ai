import React from 'react'
import { BsRobot, BsArrowUp } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Footer({ onOpenAuth }) {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavClick = (path) => {
    if (path.startsWith('#')) {
      const el = document.querySelector(path)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate('/')
        setTimeout(() => {
          document.querySelector(path)?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    } else {
      navigate(path)
    }
  }

  return (
    <footer className='bg-[#f3f3f3] dark:bg-[#0a0d14] flex justify-center px-4 pt-8 pb-12 transition-colors duration-200 border-t border-gray-200 dark:border-slate-800/80'>
      <div className='w-full max-w-6xl bg-white dark:bg-[#111622] rounded-[28px] shadow-sm dark:shadow-black/40 border border-gray-200 dark:border-slate-800 p-8 md:p-10 transition-colors duration-200'>
        
        {/* Main Row */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-100 dark:border-slate-800/80'>
          
          {/* Brand Info */}
          <div className='flex items-center gap-3 cursor-pointer group' onClick={scrollToTop}>
            <img src="/favicon.png" alt="igen.ai logo" className='w-9 h-9 rounded-xl shadow-md group-hover:scale-105 transition-transform' />
            <h2 className='font-bold text-2xl text-gray-900 dark:text-white tracking-tight'>
              igen.ai
            </h2>
          </div>

          {/* Platform Navigation */}
          <div className='flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-sm text-gray-600 dark:text-slate-300'>
            <button 
              onClick={() => {
                if (!userData && onOpenAuth) {
                  onOpenAuth()
                  return
                }
                navigate('/interview')
              }}
              className='hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer'
            >
              Mock Interview
            </button>
            <button 
              onClick={() => handleNavClick('#about')}
              className='hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer'
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('#faq')}
              className='hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer'
            >
              FAQ
            </button>
            <button 
              onClick={() => navigate('/history')}
              className='hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer'
            >
              History
            </button>
            <button 
              onClick={() => navigate('/pricing')}
              className='hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer'
            >
              Pricing
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright + Back to Top */}
        <div className='pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-slate-400'>
          <p>
            © {new Date().getFullYear()} <span className='font-semibold text-gray-900 dark:text-white'>igen.ai</span>. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className='inline-flex items-center gap-2 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-200 dark:hover:bg-slate-700 px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer border border-transparent dark:border-slate-700'
          >
            Back to top
            <BsArrowUp size={13} />
          </button>
        </div>

      </div>
    </footer>
  )
}

export default Footer
