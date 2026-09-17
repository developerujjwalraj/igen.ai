import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft, FaFilePdf } from 'react-icons/fa'
import Footer from '../components/Footer'
function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })

                setInterviews(result.data)

            } catch (error) {
                console.log(error)
            }

        }

        getMyInterviews()

    }, [])


    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-[#0a0d14] dark:to-[#0d1624] text-gray-900 dark:text-gray-100 py-10 transition-colors duration-200' >
            <div className='w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto'>

                <div className='mb-10 w-full flex items-start gap-4 flex-wrap'>
                    <button
                        onClick={() => navigate("/")}
                        className='mt-1 p-3 rounded-full bg-white dark:bg-[#161f30] border border-gray-200 dark:border-slate-700 shadow hover:shadow-md transition text-gray-700 dark:text-slate-200'><FaArrowLeft /></button>

                    <div>
                        <h1 className='text-3xl font-bold flex-nowrap text-gray-900 dark:text-white'>
                            Interview History
                        </h1>
                        <p className='text-gray-500 dark:text-slate-400 mt-2'>
                            Track your past interviews and performance reports
                        </p>

                    </div>
                </div>


                {interviews.length === 0 ?
                    <div className='bg-white dark:bg-[#111622] border border-gray-200 dark:border-slate-800 p-10 rounded-2xl shadow text-center'>
                        <p className='text-gray-500 dark:text-slate-400'>
                            No interviews found. Start your first interview.
                        </p>

                    </div>

                    :

                    <div className='grid gap-6'>
                        {interviews.map((item, index) => (
                            <div key={index}
                            onClick={()=>navigate(`/report/${item._id}`)}
                             className='bg-white dark:bg-[#111622] p-6 rounded-2xl shadow-md dark:shadow-black/40 hover:shadow-xl dark:hover:border-emerald-500/50 transition-all duration-300 cursor-pointer border border-gray-100 dark:border-slate-800'>
                                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {item.role}
                                        </h3>

                                        <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
                                            {item.experience} • {item.mode}
                                        </p>

                                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                                            <p className="text-xs text-gray-400 dark:text-slate-500">
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </p>
                                            {item.resumeFile?.filename && (
                                                <a
                                                    href={`${ServerUrl}/api/interview/resume/${item._id}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition"
                                                    title="View resume PDF used for this interview"
                                                >
                                                    <FaFilePdf className="text-red-500 text-[11px]" />
                                                    {item.resumeFile.filename}
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-6'>

                                        {/* SCORE */}
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                                                {item.finalScore || 0}/10
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-slate-500">
                                                Overall Score
                                            </p>
                                        </div>

                                        {/* STATUS BADGE */}
                                        <span
                                            className={`px-4 py-1 rounded-full text-xs font-medium ${item.status === "completed"
                                                    ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60"
                                                    : "bg-yellow-100 dark:bg-yellow-950/60 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/60"
                                                }`}
                                        >
                                            {item.status}
                                        </span>


                                    </div>
                                </div>

                            </div>

                        ))
                        }

                    </div>
                }
            </div>

            <div className='mt-20'>
                <Footer />
            </div>

        </div>
    )
}

export default InterviewHistory
