import React from 'react'
import { motion } from 'motion/react'
import { BsArrowRight } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function CallToAction({ onOpenAuth }) {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)

  const handleStart = () => {
    if (!userData) {
      onOpenAuth()
      return
    }
    navigate("/interview")
  }

  return (
    <section className='mb-24'>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-8 md:p-14 shadow-2xl'
      >
        {/* Decorative background glow circles */}
        <div className='absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none' />
        <div className='absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-950/20 rounded-full blur-2xl pointer-events-none' />

        <div className='relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8'>
          <div className='max-w-2xl text-center lg:text-left'>
            <h2 className='text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4'>
              Ready to Ace Your Next Tech Interview?
            </h2>
            <p className='text-emerald-50 text-base md:text-lg leading-relaxed max-w-xl'>
              Scan your resume with our AI ATS Checker, practice with role-tailored voice simulations, and land the job offer you deserve.
            </p>
          </div>

          <div className='shrink-0 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              className='bg-black text-white hover:bg-slate-900 font-bold px-7 py-4 rounded-full shadow-lg flex items-center justify-center gap-2 text-base transition-all cursor-pointer'
            >
              Start Mock Interview
              <BsArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/ats-check")}
              className='bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-6 py-4 rounded-full shadow-lg flex items-center justify-center gap-2 text-base transition-all cursor-pointer'
            >
              Check ATS Score
              <span className='text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold uppercase'>
                New
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/pricing")}
              className='bg-white/15 backdrop-blur-md border border-white/30 hover:bg-white/25 text-white font-semibold px-6 py-4 rounded-full flex items-center justify-center text-base transition-all cursor-pointer'
            >
              Explore Plans
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default CallToAction
