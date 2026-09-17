import React from 'react'
import { motion } from 'motion/react'
import { 
  BsShieldCheck, 
  BsLightningChargeFill, 
  BsGraphUpArrow, 
  BsPeopleFill
} from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'

function AboutUs() {
  const pillars = [
    {
      icon: <BsLightningChargeFill size={22} />,
      title: "Context-Aware Voice AI",
      desc: "Our neural speech model doesn't just read canned scripts. It actively listens to your logic, detects knowledge gaps, and asks authentic follow-up questions just like a Senior Staff Interviewer."
    },
    {
      icon: <BsShieldCheck size={22} />,
      title: "ATS Optimization & Resume Deep Dives",
      desc: "Audit your CV with our new AI ATS Checker to beat bot filters before your interview. Our system extracts your tech stack, identifies JD keyword gaps, and tests your real credentials in voice simulations."
    },
    {
      icon: <BsGraphUpArrow size={22} />,
      title: "Multidimensional Analytics",
      desc: "Receive instant evaluations graded against the STAR method (Situation, Task, Action, Result), technical precision, delivery speed, and vocal confidence with downloadable PDF dossiers."
    },
    {
      icon: <BsPeopleFill size={22} />,
      title: "Built for All Career Stages",
      desc: "Whether you are a fresher preparing for campus placements or an engineering lead aiming for FAANG/MNC roles, igen.ai calibrates complexity to match your exact seniority."
    }
  ];

  return (
    <section id="about" className='mb-32 scroll-mt-24'>
      {/* Section Header */}
      <div className='text-center max-w-3xl mx-auto mb-16'>
        <div className='inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4'>
          <HiSparkles size={14} />
          About igen.ai
        </div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight'>
          Transforming Interview Preparation into an{" "}
          <span className='text-emerald-600 dark:text-emerald-400'>Unfair Advantage</span>
        </motion.h2>
        <p className='mt-4 text-gray-600 dark:text-slate-400 text-base md:text-lg leading-relaxed'>
          igen.ai was founded by passionate software engineers and hiring managers who realized that traditional mock interviews are expensive, stressful, and rarely accessible on-demand. We built an intelligent AI partner that helps candidates practice anytime, anywhere.
        </p>
      </div>

      {/* Core Technology Pillars Grid */}
      <div className='grid md:grid-cols-2 gap-6 md:gap-8'>
        {pillars.map((pillar, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
            className='bg-white dark:bg-[#111622] border border-gray-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm dark:shadow-black/40 hover:shadow-xl dark:hover:shadow-black/70 hover:border-emerald-500/40 transition-all'>
            <div className='flex items-start gap-5'>
              <div className='shrink-0 w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800/60'>
                {pillar.icon}
              </div>
              <div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                  {pillar.title}
                </h3>
                <p className='text-gray-600 dark:text-slate-400 text-sm leading-relaxed'>
                  {pillar.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default AboutUs
