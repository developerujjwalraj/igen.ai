import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsFileEarmarkCheck,
  BsArrowRight,
  BsCheckCircleFill
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import atsFeatureImg from "../assets/ats-feature.png";
import Footer from '../components/Footer';
import AboutUs from '../components/AboutUs';
import FAQ from '../components/FAQ';
import CallToAction from '../components/CallToAction';


function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-[#f8fafc] dark:bg-[#07090e] text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300 relative overflow-hidden'>
      {/* Dynamic Ambient Background Aura & Grid */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Top center emerald glow orb */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[950px] h-[550px] bg-emerald-500/12 dark:bg-emerald-500/18 blur-[140px] rounded-full animate-pulse-glow" />
        {/* Right cyan/teal orb */}
        <div className="absolute top-[30%] -right-40 w-[650px] h-[650px] bg-teal-500/10 dark:bg-teal-500/12 blur-[160px] rounded-full" />
        {/* Left emerald orb */}
        <div className="absolute top-[60%] -left-40 w-[650px] h-[650px] bg-emerald-600/8 dark:bg-emerald-800/15 blur-[160px] rounded-full" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:32px_32px] opacity-60 dark:opacity-40" />
      </div>

      <Navbar />

      <div className='flex-1 px-4 sm:px-6 py-16 md:py-24 relative z-10'>
        <div className='max-w-6xl mx-auto'>

          {/* Hero Announcement Badges */}
          <div className='flex justify-center items-center mb-6'>
            <div className='inline-flex items-center gap-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-gray-700 dark:text-slate-200 text-xs sm:text-sm px-4 py-2 rounded-full border border-emerald-500/30 shadow-md shadow-emerald-500/5'>
              <span className='flex h-2 w-2 relative'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-500'></span>
              </span>
              <span className='font-semibold tracking-wide'>
                Next-Gen AI Interview Coaching
              </span>
              <HiSparkles size={16} className="text-emerald-500" />
            </div>
          </div>

          {/* Hero Header */}
          <div className='text-center mb-24 md:mb-32'>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.1] max-w-4xl mx-auto text-gray-900 dark:text-white tracking-tight'>
              Practice Interviews with
              <span className='relative block sm:inline-block sm:ml-4 mt-2 sm:mt-0'>
                <span className='bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(16,185,129,0.35)]'>
                  AI Intelligence
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='text-gray-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed'>
              Audit your resume with our new AI ATS Checker, then simulate role-based mock interviews with smart follow-ups, adaptive difficulty, and real-time speech evaluation.
            </motion.p>

            <div className='flex flex-wrap justify-center items-center gap-4 mt-10'>
              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/interview")
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className='relative group overflow-hidden bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all cursor-pointer flex items-center gap-2'>
                <span className='relative z-10 flex items-center gap-2'>
                  Start Mock Interview
                  <BsRobot size={18} />
                </span>
                <div className='absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300' />
              </motion.button>

              <motion.button
                onClick={() => navigate("/ats-check")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className='relative group overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-emerald-500/50 hover:border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold px-7 py-3.5 rounded-full shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-2'>
                <BsFileEarmarkCheck size={18} className="text-emerald-500" />
                <span>Check ATS Score</span>
                <span className='px-1.5 py-0.5 text-[10px] uppercase font-extrabold bg-emerald-500 text-white rounded-full'>
                  New
                </span>
              </motion.button>

              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/history")
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className='bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-gray-300 dark:border-slate-700 text-gray-800 dark:text-slate-200 px-7 py-3.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition shadow-sm font-semibold cursor-pointer'>
                View History
              </motion.button>
            </div>
          </div>

          {/* Super Animated Floating 3 Step Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 items-stretch'>
            {
              [
                {
                  icon: <BsRobot size={26} />,
                  step: "STEP 01",
                  title: "Role & Experience Selection",
                  desc: "Select your target engineering, product, or leadership track. Our AI calibrates problem depth to your exact level.",
                  tags: ["30+ Roles", "Custom Seniority", "Adaptive AI"],
                  floatClass: "animate-float-slow",
                  glowColor: "from-emerald-500/20 to-teal-500/10"
                },
                {
                  icon: <BsMic size={26} />,
                  step: "STEP 02",
                  title: "Smart Voice Interview",
                  desc: "Speak naturally into your microphone. Our neural speech engine transcribes and grills with authentic follow-ups.",
                  tags: ["Live Voice STT", "STAR Logic Check", "Tone Analysis"],
                  floatClass: "animate-float-delayed",
                  glowColor: "from-teal-500/20 to-cyan-500/10"
                },
                {
                  icon: <BsClock size={26} />,
                  step: "STEP 03",
                  title: "Timer Based Simulation",
                  desc: "Experience real-world pressure with time tracking, answer evaluation, and downloadable performance feedback.",
                  tags: ["Real Pressure", "Multidim Scoring", "Instant PDF"],
                  floatClass: "animate-float-delayed-2",
                  glowColor: "from-emerald-500/20 to-green-500/10"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className={`group relative rounded-[28px] p-8 md:p-9 flex flex-col justify-between 
                    bg-white/80 dark:bg-[#0e1422]/90 backdrop-blur-xl 
                    border border-gray-200/80 dark:border-slate-800/90 
                    hover:border-emerald-500/60 dark:hover:border-emerald-400/60 
                    shadow-xl dark:shadow-black/60 
                    hover:shadow-[0_25px_60px_-15px_rgba(16,185,129,0.25)] 
                    transition-all duration-300 overflow-hidden ${item.floatClass}`}
                >
                  {/* Glowing ambient background gradient inside card on hover */}
                  <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${item.glowColor} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />
                  
                  {/* Top shimmer sheen line */}
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Large futuristic watermark number */}
                  <div className="absolute top-4 right-6 text-6xl font-black text-gray-200/50 dark:text-slate-800/40 select-none font-sans group-hover:text-emerald-500/20 transition-colors">
                    0{index + 1}
                  </div>

                  <div className="relative z-10">
                    {/* Glowing Icon Container with pulse ring */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-6 group-hover:scale-110 group-hover:shadow-emerald-500/50 transition-all duration-300 relative">
                      <div className="absolute inset-0 rounded-2xl bg-emerald-400 animate-ping opacity-25 pointer-events-none" />
                      {item.icon}
                    </div>

                    {/* Step pill */}
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 px-3 py-1 rounded-full mb-3 tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {item.step}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-xl md:text-2xl mb-3 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  {/* Micro feature pills at bottom */}
                  <div className="relative z-10 pt-4 border-t border-gray-100 dark:border-slate-800/80 flex flex-wrap gap-2">
                    {item.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-800/70 text-gray-600 dark:text-slate-400 border border-transparent dark:border-slate-700/50 group-hover:border-emerald-500/30 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))
            }
          </div>


          <div id='features' className='mb-32 scroll-mt-24'>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <div className='inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4'>
                <HiSparkles size={14} />
                Feature Suite
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight'>
                Advanced AI{" "}
                <span className="text-emerald-600 dark:text-emerald-400">Capabilities</span>
              </motion.h2>
              <p className='mt-4 text-gray-600 dark:text-slate-400 text-base md:text-lg'>
                From bot-beating ATS resume screening to realistic mock interviews with speech evaluation.
              </p>
            </div>

            {/* ATS Resume Checker Spotlight Banner */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mb-12 rounded-[32px] p-8 sm:p-12 overflow-hidden bg-gradient-to-br from-emerald-950/50 via-[#0e1422] to-slate-900/90 dark:from-[#06151a] dark:via-[#0c1421] dark:to-[#08101a] border border-emerald-500/40 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl group"
            >
              {/* Ambient glowing radial effects */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
                {/* Left Column: Information, Tags, & CTA */}
                <div className="w-full lg:w-3/5 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    New Flagship Feature
                  </div>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                    AI ATS Resume Checker & <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">Job Match Audit</span>
                  </h3>

                  <p className="text-gray-300 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                    Over 75% of resumes are filtered out by Applicant Tracking Systems before a recruiter reads them. Scan your CV against any job title or custom Job Description, detect missing keywords, check parseability, and get an instant ATS score.
                  </p>

                  {/* Feature Bullet Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    <div className="flex items-center gap-2.5 text-sm text-gray-200">
                      <BsCheckCircleFill className="text-emerald-400 shrink-0" size={16} />
                      <span>Real-time ATS Match Score (0–100%)</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-gray-200">
                      <BsCheckCircleFill className="text-emerald-400 shrink-0" size={16} />
                      <span>JD Keyword & Skill Gap Analysis</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-gray-200">
                      <BsCheckCircleFill className="text-emerald-400 shrink-0" size={16} />
                      <span>ATS Formatting & Parseability Check</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-gray-200">
                      <BsCheckCircleFill className="text-emerald-400 shrink-0" size={16} />
                      <span>Instant Downloadable PDF Audit Dossier</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => navigate("/ats-check")}
                      className="relative group overflow-hidden bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2.5"
                    >
                      <span>Check Your ATS</span>
                      <BsArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-xs text-gray-400">
                      ⚡ 30 credits per comprehensive audit • Instant PDF export
                    </span>
                  </div>
                </div>

                {/* Right Column: Generated 3D Asset Preview */}
                <div className="w-full lg:w-2/5 flex justify-center">
                  <div className="relative group/img cursor-pointer" onClick={() => navigate("/ats-check")}>
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-3xl blur-xl opacity-75 group-hover/img:opacity-100 transition duration-500" />
                    <img
                      src={atsFeatureImg}
                      alt="AI ATS Resume Scanner & Keyword Match Audit"
                      className="relative rounded-2xl border border-emerald-500/30 shadow-2xl object-cover w-full max-w-md aspect-square group-hover/img:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <div className='grid md:grid-cols-2 gap-8 md:gap-10'>
              {
                [
                  {
                    image: evalImg,
                    icon: <BsBarChart size={22} />,
                    title: "AI Answer Evaluation",
                    desc: "Scores communication, technical accuracy, and vocal confidence with actionable feedback."
                  },
                  {
                    image: resumeImg,
                    icon: <BsFileEarmarkText size={22} />,
                    title: "Resume Based Interview",
                    desc: "Project-specific grilling based on your uploaded PDF resume and tech stack."
                  },
                  {
                    image: pdfImg,
                    icon: <BsFileEarmarkText size={22} />,
                    title: "Downloadable PDF Report",
                    desc: "Detailed strengths, weaknesses, question scoring, and improvement roadmaps."
                  },
                  {
                    image: analyticsImg,
                    icon: <BsBarChart size={22} />,
                    title: "History & Analytics",
                    desc: "Track interview score progression with performance charts and topic drilldowns."
                  }
                ].map((item, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.01 }}
                    className='group relative bg-white/80 dark:bg-[#0e1422]/90 backdrop-blur-xl border border-gray-200/80 dark:border-slate-800/90 hover:border-emerald-500/60 dark:hover:border-emerald-400/60 rounded-3xl p-8 shadow-lg dark:shadow-black/50 hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.2)] transition-all overflow-hidden'>
                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className='flex flex-col md:flex-row items-center gap-8 relative z-10'>
                      <div className='w-full md:w-1/2 flex justify-center'>
                        <img src={item.image} alt={item.title} className='w-full h-auto object-contain max-h-64 group-hover:scale-105 transition-transform duration-500' />
                      </div>

                      <div className='w-full md:w-1/2'>
                        <div className='bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border border-emerald-500/20 group-hover:scale-110 transition-transform'>
                          {item.icon}
                        </div>
                        <h3 className='font-bold mb-2 text-xl md:text-2xl text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors'>{item.title}</h3>
                        <p className='text-gray-600 dark:text-slate-400 text-sm leading-relaxed'>{item.desc}</p>
                      </div>

                    </div>
                  </motion.div>
                ))
              }
            </div>


          </div>

          <div className='mb-32'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-900 dark:text-white tracking-tight'>
              Multiple Interview{" "}
              <span className="text-emerald-600 dark:text-emerald-400">Modes</span>
            </motion.h2>

            <div className='grid md:grid-cols-2 gap-8 md:gap-10'>
              {
                [
                  {
                    img: hrImg,
                    title: "HR Interview Mode",
                    desc: "Behavioral, leadership, and communication-based evaluation using the STAR technique."
                  },
                  {
                    img: techImg,
                    title: "Technical Mode",
                    desc: "Deep algorithmic, system architecture, and domain-specific questioning based on your role."
                  },
                  {
                    img: confidenceImg,
                    title: "Confidence Detection",
                    desc: "Voice tonality, delivery pacing, and hesitation analysis insights."
                  },
                  {
                    img: creditImg,
                    title: "Credits System",
                    desc: "Seamless session management with starter credits and transparent top-ups."
                  }
                ].map((mode, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative bg-white/80 dark:bg-[#0e1422]/90 backdrop-blur-xl border border-gray-200/80 dark:border-slate-800/90 hover:border-emerald-500/60 dark:hover:border-emerald-400/60 rounded-3xl p-8 shadow-lg dark:shadow-black/50 hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.2)] transition-all overflow-hidden">
                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className='flex items-center justify-between gap-6 relative z-10'>
                      <div className="w-1/2">
                        <h3 className="font-bold text-xl md:text-2xl mb-3 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {mode.title}
                        </h3>

                        <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                          {mode.desc}
                        </p>
                      </div>

                      {/* RIGHT IMAGE */}
                      <div className="w-1/2 flex justify-end">
                        <img
                          src={mode.img}
                          alt={mode.title}
                          className="w-28 h-28 object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))
              }
            </div>


          </div>

          {/* About Us Section */}
          <AboutUs />

          {/* Frequently Asked Questions */}
          <FAQ />

          {/* Call To Action Banner */}
          <CallToAction onOpenAuth={() => setShowAuth(true)} />

        </div>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

      <Footer onOpenAuth={() => setShowAuth(true)} />

    </div>
  )
}

export default Home
