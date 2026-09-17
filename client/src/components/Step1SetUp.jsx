import React from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
    FaFilePdf,
    FaExternalLinkAlt,
} from "react-icons/fa";
import { useState } from 'react';
import axios from "axios"
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function Step1SetUp({ onStart }) {
    const {userData}= useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);


    const handleUseSavedResume = () => {
        if (!userData?.resume) return;
        if (userData.resume.role) setRole(userData.resume.role);
        if (userData.resume.experience) setExperience(userData.resume.experience);
        if (userData.resume.projects && userData.resume.projects.length) setProjects(userData.resume.projects);
        if (userData.resume.skills && userData.resume.skills.length) setSkills(userData.resume.skills);
        if (userData.resume.text) setResumeText(userData.resume.text);
        setAnalysisDone(true);
    };

    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true)

        const formdata = new FormData()
        formdata.append("resume", resumeFile)

        try {
            const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true })

            console.log(result.data)

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);

            setAnalyzing(false);

            if (userData) {
                dispatch(setUserData({
                    ...userData,
                    resume: {
                        filename: result.data.filename || (resumeFile ? resumeFile.name : "resume.pdf"),
                        role: result.data.role,
                        experience: result.data.experience,
                        projects: result.data.projects,
                        skills: result.data.skills,
                        text: result.data.resumeText,
                        updatedAt: new Date().toISOString()
                    }
                }));
            }

        } catch (error) {
            console.log(error)
            setAnalyzing(false);
        }
    }

    const handleStart = async () => {
        setLoading(true)
        try {
           const result = await axios.post(ServerUrl + "/api/interview/generate-questions" , {role, experience, mode , resumeText, projects, skills } , {withCredentials:true}) 
           console.log(result.data)
           if(userData){
            dispatch(setUserData({...userData , credits:result.data.creditsLeft}))
           }
           setLoading(false)
           onStart(result.data)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#0a0d14] dark:to-[#0d1624] px-4 py-8 transition-colors duration-200'>

            <div className='w-full max-w-6xl bg-white dark:bg-[#111622] rounded-3xl shadow-2xl border border-transparent dark:border-slate-800 grid md:grid-cols-2 overflow-hidden'>

                <motion.div
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className='relative bg-gradient-to-br from-green-50 to-green-100 dark:from-emerald-950/40 dark:to-[#0d1624] p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-transparent dark:border-slate-800'>

                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
                        Start Your AI Interview
                    </h2>

                    <p className="text-gray-600 dark:text-slate-400 mb-10">
                        Practice real interview scenarios powered by AI.
                        Improve communication, technical skills, and confidence.
                    </p>

                    <div className='space-y-5'>

                        {
                            [
                                {
                                    icon: <FaUserTie className="text-emerald-600 dark:text-emerald-400 text-xl" />,
                                    text: "Choose Role & Experience",
                                },
                                {
                                    icon: <FaMicrophoneAlt className="text-emerald-600 dark:text-emerald-400 text-xl" />,
                                    text: "Smart Voice Interview",
                                },
                                {
                                    icon: <FaChartLine className="text-emerald-600 dark:text-emerald-400 text-xl" />,
                                    text: "Instant AI Performance Report",
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm border border-green-100 dark:border-slate-700/80 p-4 rounded-2xl shadow-sm"
                                >
                                    {item.icon}
                                    <span className="font-medium text-gray-700 dark:text-slate-200">
                                        {item.text}
                                    </span>
                                </div>
                            ))
                        }
                    </div>



                </motion.div>



                <motion.div
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="p-12 bg-white dark:bg-[#111622]">

                    <h2 className='text-3xl font-bold text-gray-800 dark:text-white mb-8'>
                        Interview SetUp
                    </h2>


                    <div className='space-y-6'>

                        <div className='relative'>
                            <FaUserTie className='absolute top-4 left-4 text-gray-400 dark:text-slate-500' />

                            <input type='text' placeholder='Enter role'
                                className='w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition'
                                onChange={(e) => setRole(e.target.value)} value={role} />
                        </div>


                        <div className='relative'>
                            <FaBriefcase className='absolute top-4 left-4 text-gray-400 dark:text-slate-500' />

                            <input type='text' placeholder='Experience (e.g. 2 years)'
                                className='w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition'
                                onChange={(e) => setExperience(e.target.value)} value={experience} />



                        </div>

                        <select value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className='w-full py-3 px-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 outline-none transition'>

                            <option value="Technical">Technical Interview</option>
                            <option value="HR">HR Interview</option>

                        </select>

                        {userData?.resume?.filename && !analysisDone && (
                            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-emerald-100 dark:border-emerald-900 shadow-sm">
                                        <FaFilePdf className="text-red-500 text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider font-semibold text-emerald-700 dark:text-emerald-400">
                                            Saved in Database
                                        </p>
                                        <p className="text-sm font-medium text-gray-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-xs">
                                            {userData.resume.filename}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <button
                                        type="button"
                                        onClick={handleUseSavedResume}
                                        className="flex-1 sm:flex-initial text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3.5 py-2 rounded-lg transition shadow-sm"
                                    >
                                        Use Saved Resume
                                    </button>
                                    <a
                                        href={`${ServerUrl}/api/user/resume`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 px-3 py-2 rounded-lg transition inline-flex items-center gap-1.5"
                                        title="View saved PDF"
                                    >
                                        <FaExternalLinkAlt className="text-[10px]" />
                                        View
                                    </a>
                                </div>
                            </div>
                        )}

                        {!analysisDone && (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                onClick={() => document.getElementById("resumeUpload").click()}
                                className='border-2 border-dashed border-gray-300 dark:border-slate-700 bg-transparent dark:bg-slate-900/30 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition'>

                                <FaFileUpload className='text-4xl mx-auto text-emerald-600 dark:text-emerald-400 mb-3' />

                                <input type="file"
                                    accept="application/pdf"
                                    id="resumeUpload"
                                    className='hidden'
                                    onChange={(e) => setResumeFile(e.target.files[0])} />

                                <p className='text-gray-600 dark:text-slate-300 font-medium'>
                                    {resumeFile ? resumeFile.name : (userData?.resume?.filename ? "Click to upload a new resume" : "Click to upload resume (Optional)")}
                                </p>

                                {resumeFile && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        onClick={(e) => {
                                             e.stopPropagation();
                                            handleUploadResume()
                                        }}

                                        className='mt-4 bg-gray-900 dark:bg-emerald-600 text-white px-5 py-2 rounded-lg hover:opacity-90 transition'>
                                        {analyzing ? "Analyzing..." : "Analyze Resume"}



                                    </motion.button>)}

                            </motion.div>


                        )}

                        {analysisDone && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-5 space-y-4'>
                                <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
                                    Resume Analysis Result</h3>

                                {projects.length > 0 && (
                                    <div>
                                        <p className='font-medium text-gray-700 dark:text-slate-300 mb-1'>
                                            Projects:</p>

                                        <ul className='list-disc list-inside text-gray-600 dark:text-slate-400 space-y-1'>
                                            {projects.map((p, i) => (
                                                <li key={i}>{p}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {skills.length > 0 && (
                                    <div>
                                        <p className='font-medium text-gray-700 dark:text-slate-300 mb-1'>
                                            Skills:</p>

                                        <div className='flex flex-wrap gap-2'>
                                            {skills.map((s, i) => (
                                                <span key={i} className='bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 px-3 py-1 rounded-full text-sm'>{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-slate-800 text-xs text-gray-500 dark:text-slate-400">
                                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                                        ✓ Resume saved in database
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAnalysisDone(false);
                                            setResumeFile(null);
                                        }}
                                        className="hover:text-emerald-600 underline"
                                    >
                                        Change resume
                                    </button>
                                </div>

                            </motion.div>
                        )}


                        <motion.button
                        onClick={handleStart}
                            disabled={!role || !experience || loading}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            className='w-full disabled:bg-gray-400 dark:disabled:bg-slate-800 bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-400 text-white dark:text-black py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md'>
                            {loading ? "Starting...":"Start Interview"}


                        </motion.button>
                    </div>

                </motion.div>
            </div>

        </motion.div>
    )
}

export default Step1SetUp
