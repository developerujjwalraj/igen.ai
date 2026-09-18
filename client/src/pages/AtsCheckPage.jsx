import React, { useState } from 'react';
import { motion } from "motion/react";
import { 
    FaFilePdf, 
    FaUpload, 
    FaBriefcase, 
    FaCheckCircle, 
    FaTimesCircle, 
    FaExclamationTriangle, 
    FaRedo, 
    FaDownload, 
    FaSearch,
    FaLightbulb,
    FaLock,
    FaTasks as FaListCheck
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsCoin } from "react-icons/bs";

import Navbar from '../components/Navbar';
import AuthModel from '../components/AuthModel';
import { ServerUrl } from '../App';
import { useTheme } from '../context/ThemeContext';
import { setUserData } from '../redux/userSlice';

function AtsCheckPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);

    const [resumeFile, setResumeFile] = useState(null);
    const [role, setRole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);
    const [showAuth, setShowAuth] = useState(!userData);

    const handleGoogleSignIn = async () => {
        setAuthLoading(true);
        setError("");
        try {
            const response = await signInWithPopup(auth, provider);
            const user = response.user;
            const name = user.displayName;
            const email = user.email;
            const res = await axios.post(ServerUrl + "/api/auth/google", { name, email }, { withCredentials: true });
            dispatch(setUserData(res.data));
            setShowAuth(false);
        } catch (err) {
            console.error("Google sign in error:", err);
            setError(err.response?.data?.message || err.message || "Failed to sign in with Google.");
        } finally {
            setAuthLoading(false);
        }
    };

    const handleFileChange = (e) => {
        if (!userData) {
            setShowAuth(true);
            return;
        }
        const file = e.target.files?.[0];
        if (file) {
            if (file.type !== "application/pdf") {
                setError("Please select a valid PDF file.");
                setResumeFile(null);
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError("File size must be under 5MB.");
                setResumeFile(null);
                return;
            }
            setError("");
            setResumeFile(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (!userData) {
            setShowAuth(true);
            return;
        }
        const file = e.dataTransfer.files?.[0];
        if (file) {
            if (file.type !== "application/pdf") {
                setError("Please drop a valid PDF file.");
                return;
            }
            setError("");
            setResumeFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData) {
            setShowAuth(true);
            return;
        }
        if (userData.credits < 30) {
            setError(`Not enough credits. You need 30 credits to run an ATS check (Current Balance: ${userData.credits} credits).`);
            return;
        }
        if (!resumeFile) {
            setError("Please upload your PDF resume.");
            return;
        }
        if (!role.trim() && !jobDescription.trim()) {
            setError("Please provide either a Target Job Profile or a Job Description.");
            return;
        }

        setError("");
        setLoading(true);

        const formData = new FormData();
        formData.append("resume", resumeFile);
        formData.append("role", role);
        formData.append("jobDescription", jobDescription);

        try {
            const response = await axios.post(`${ServerUrl}/api/ats/check`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });

            if (response.data?.success) {
                setResult(response.data.data);
                if (response.data.creditsLeft !== undefined) {
                    dispatch(setUserData({ ...userData, credits: response.data.creditsLeft }));
                }
            } else {
                setError(response.data?.message || "Analysis failed.");
            }
        } catch (err) {
            console.error("ATS Check Request Error:", err);
            setError(err.response?.data?.message || "Failed to connect to backend server. Make sure the server is running on port 8000.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setResumeFile(null);
        setRole("");
        setJobDescription("");
        setError("");
    };

    const downloadReportPdf = () => {
        if (!result) return;
        const doc = new jsPDF("p", "mm", "a4");
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        let currentY = 25;

        // Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(16, 185, 129); // emerald-500
        doc.text("igen.ai - ATS Audit Report", pageWidth / 2, currentY, { align: "center" });

        currentY += 8;
        doc.setFontSize(11);
        doc.setTextColor(100, 116, 139);
        doc.text(`Target Profile: ${role || "General"} | Match: ${result.matchLevel}`, pageWidth / 2, currentY, { align: "center" });

        currentY += 10;
        doc.setDrawColor(16, 185, 129);
        doc.line(margin, currentY, pageWidth - margin, currentY);

        currentY += 12;
        // Score Box
        doc.setFillColor(240, 253, 244);
        doc.roundedRect(margin, currentY, pageWidth - margin * 2, 22, 4, 4, "F");
        doc.setFontSize(16);
        doc.setTextColor(6, 95, 70);
        doc.text(`Overall ATS Score: ${result.atsScore}% (${result.matchLevel} Match)`, pageWidth / 2, currentY + 14, { align: "center" });

        currentY += 30;

        // Summary
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(30, 41, 59);
        doc.text("Executive Summary:", margin, currentY);
        currentY += 6;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);
        const splitSummary = doc.splitTextToSize(result.summary || "", pageWidth - margin * 2);
        doc.text(splitSummary, margin, currentY);

        currentY += splitSummary.length * 5 + 8;

        // Table of Missing Keywords & Skills
        const matchedStr = (result.matchingSkills || []).slice(0, 15).join(", ");
        const missingStr = (result.missingKeywords || []).slice(0, 15).join(", ");

        autoTable(doc, {
            startY: currentY,
            margin: { left: margin, right: margin },
            head: [["Category", "Keywords & Skills"]],
            body: [
                ["Matching Skills Found", matchedStr || "None detected"],
                ["Critical Missing Keywords", missingStr || "None - Good match!"],
            ],
            theme: "grid",
            headStyles: { fillColor: [16, 185, 129] },
        });

        currentY = doc.lastAutoTable.finalY + 12;

        // Actionable Recommendations
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(30, 41, 59);
        doc.text("Top Actionable Recommendations:", margin, currentY);
        currentY += 6;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);

        (result.actionableTips || []).forEach((tip, idx) => {
            const splitTip = doc.splitTextToSize(`${idx + 1}. ${tip}`, pageWidth - margin * 2);
            if (currentY + splitTip.length * 5 > 280) {
                doc.addPage();
                currentY = 20;
            }
            doc.text(splitTip, margin, currentY);
            currentY += splitTip.length * 5 + 3;
        });

        doc.save(`igen-ATS-Report-${role ? role.replace(/\s+/g, '_') : 'Resume'}.pdf`);
    };

    // Score Color Helper
    const getScoreColor = (score) => {
        if (score >= 80) return "#10b981"; // emerald
        if (score >= 60) return "#f59e0b"; // amber
        return "#ef4444"; // red
    };

    return (
        <div className="min-h-screen bg-[#f3f3f3] dark:bg-[#0a0d14] text-gray-900 dark:text-white transition-colors duration-200">
            <Navbar />

            <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
                {/* Header Title */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 mb-3">
                        <FaSearch size={12} />
                        AI-Powered ATS Match Checker
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                        Check Your <span className="text-emerald-600 dark:text-emerald-400">Resume ATS Score</span>
                    </h1>
                    <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Optimize your resume for applicant tracking systems. Scan your resume against target job profiles and descriptions to reveal missing keywords, strengths, and formatting fixes.
                    </p>
                </motion.div>

                {/* Error Banner */}
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-sm flex items-center gap-3"
                    >
                        <FaExclamationTriangle className="shrink-0" size={18} />
                        <span>{error}</span>
                    </motion.div>
                )}

                {/* Main Content Area: Upload Form or Results */}
                {!result ? (
                    <motion.form 
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-[#111622] rounded-3xl p-6 md:p-10 shadow-sm dark:shadow-black/40 border border-gray-200 dark:border-slate-800 transition-colors duration-200"
                    >
                        {/* Unauthenticated User Banner */}
                        {!userData && (
                            <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/5 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-3.5 text-left">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl shrink-0 border border-emerald-200 dark:border-emerald-800/60">
                                        🎁
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                            100 Free Credits on Sign Up
                                            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-emerald-500 text-white">Instant</span>
                                        </h4>
                                        <p className="text-xs text-gray-600 dark:text-slate-400 mt-0.5">
                                            Sign in with Google to check your resume ATS compatibility and access detailed keyword insights.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowAuth(true)}
                                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-sm cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                                >
                                    <FcGoogle size={16} />
                                    <span>Sign In with Google</span>
                                </button>
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column: File Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">
                                    1. Upload Resume (PDF) <span className="text-red-500">*</span>
                                </label>
                                
                                <div
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all flex flex-col items-center justify-center min-h-[260px] cursor-pointer ${
                                        resumeFile 
                                            ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20" 
                                            : "border-gray-300 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 bg-gray-50/60 dark:bg-slate-900/40"
                                    }`}
                                    onClick={() => {
                                        if (!userData) {
                                            setShowAuth(true);
                                            return;
                                        }
                                        document.getElementById("resume-upload-input")?.click();
                                    }}
                                >
                                    <input
                                        id="resume-upload-input"
                                        type="file"
                                        accept="application/pdf"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />

                                    {resumeFile ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                                <FaFilePdf size={28} />
                                            </div>
                                            <p className="font-semibold text-gray-900 dark:text-slate-100 text-sm mt-1 max-w-[240px] truncate">
                                                {resumeFile.name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-slate-400">
                                                {(resumeFile.size / 1024 / 1024).toFixed(2)} MB • Ready for audit
                                            </p>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setResumeFile(null);
                                                }}
                                                className="mt-2 text-xs text-red-500 hover:underline cursor-pointer"
                                            >
                                                Remove file
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                                                <FaUpload size={24} />
                                            </div>
                                            <p className="font-medium text-sm text-gray-800 dark:text-slate-200 mt-1">
                                                Drop your PDF resume here, or <span className="text-emerald-600 dark:text-emerald-400 underline">browse</span>
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-slate-500">
                                                Supports standard text-based PDF up to 5MB
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Column: Job Target Inputs */}
                            <div className="flex flex-col justify-between gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">
                                        2. Target Job Profile / Role
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                            <FaBriefcase size={14} />
                                        </div>
                                        <input
                                            type="text"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            placeholder="e.g. Senior Full Stack Developer, Data Scientist"
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-900/60 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                                        Specifying the title helps benchmark role-specific competencies.
                                    </p>
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">
                                        3. Job Description (Paste JD for Accurate Match)
                                    </label>
                                    <textarea
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        placeholder="Paste the full or partial job posting description here (requirements, responsibilities, tech stack)..."
                                        rows={6}
                                        className="w-full flex-1 p-3.5 bg-gray-50 dark:bg-slate-900/60 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition resize-none"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                                        The AI will compare your resume against every keyword in this JD.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button & Credit Information */}
                        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 w-full sm:w-auto justify-center sm:justify-start">
                                <BsCoin size={16} className="text-amber-500 shrink-0" />
                                <span>Cost: 30 Credits per audit</span>
                                {userData ? (
                                    <span className="text-gray-500 dark:text-slate-400">
                                        (Balance: <strong className={userData.credits < 30 ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"}>{userData.credits}</strong>)
                                    </span>
                                ) : (
                                    <span className="text-gray-400 dark:text-slate-500">(Sign in to use balance)</span>
                                )}
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                {userData && userData.credits < 30 && (
                                    <button
                                        type="button"
                                        onClick={() => navigate("/pricing")}
                                        className="px-4 py-3 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/60 transition cursor-pointer"
                                    >
                                        Buy More Credits
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={loading || (userData && !resumeFile) || (userData && userData.credits < 30)}
                                    className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                                        loading || (userData && !resumeFile) || (userData && userData.credits < 30)
                                            ? "bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-slate-500 cursor-not-allowed"
                                            : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 hover:scale-[1.01] active:scale-[0.99]"
                                    }`}
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Auditing Resume with AI...</span>
                                        </>
                                    ) : !userData ? (
                                        <>
                                            <FaSearch size={14} />
                                            <span>Sign In & Check ATS (30 Credits)</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaSearch size={14} />
                                            <span>Analyze ATS (30 Credits)</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.form>
                ) : (
                    /* Results Dashboard */
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {/* Top Bar Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-[#111622] rounded-2xl p-4 border border-gray-200 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">Target Role:</span>
                                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{role || "General Benchmark"}</span>
                                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                                    <BsCoin className="text-amber-500" size={12} />
                                    30 Credits Deducted (Remaining: {userData?.credits ?? 0})
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={downloadReportPdf}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/80 hover:bg-gray-100 dark:hover:bg-slate-700 transition flex items-center gap-2 cursor-pointer"
                                >
                                    <FaDownload size={12} />
                                    Download PDF Report
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-2 cursor-pointer shadow-sm"
                                >
                                    <FaRedo size={11} />
                                    Check Another Resume
                                </button>
                            </div>
                        </div>

                        {/* Overview Score Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Score Gauge Card */}
                            <div className="bg-white dark:bg-[#111622] rounded-3xl p-6 border border-gray-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-4">
                                    Overall ATS Match
                                </h3>
                                <div className="w-36 h-36 relative mb-4">
                                    <CircularProgressbar
                                        value={result.atsScore || 0}
                                        text={`${result.atsScore || 0}%`}
                                        styles={buildStyles({
                                            textSize: '22px',
                                            textColor: isDark ? '#ffffff' : '#111827',
                                            pathColor: getScoreColor(result.atsScore),
                                            trailColor: isDark ? '#1e293b' : '#f1f5f9',
                                        })}
                                    />
                                </div>
                                <span 
                                    className="px-3 py-1 rounded-full text-xs font-bold"
                                    style={{
                                        backgroundColor: `${getScoreColor(result.atsScore)}20`,
                                        color: getScoreColor(result.atsScore)
                                    }}
                                >
                                    {result.matchLevel} Fit for this Role
                                </span>
                            </div>

                            {/* Executive Summary */}
                            <div className="md:col-span-2 bg-white dark:bg-[#111622] rounded-3xl p-6 border border-gray-200 dark:border-slate-800 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                                        <FaLightbulb size={13} />
                                        Recruiter & ATS Assessment
                                    </div>
                                    <p className="text-sm md:text-base text-gray-700 dark:text-slate-300 leading-relaxed">
                                        {result.summary}
                                    </p>
                                </div>

                                {/* Section Breakdown Mini-Bars */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-gray-100 dark:border-slate-800/80">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-slate-400">Skills Match</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
                                            {result.sectionScores?.skillsMatch ?? 0}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-slate-400">Experience Fit</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
                                            {result.sectionScores?.experienceFit ?? 0}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-slate-400">Education</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
                                            {result.sectionScores?.educationFit ?? 0}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-slate-400">Formatting</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
                                            {result.sectionScores?.formattingReadability ?? 0}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Keyword Analysis Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Missing Keywords (Critical) */}
                            <div className="bg-white dark:bg-[#111622] rounded-3xl p-6 border border-gray-200 dark:border-slate-800">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center">
                                        <FaTimesCircle size={14} />
                                    </div>
                                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                                        Missing High-Value Keywords ({result.missingKeywords?.length || 0})
                                    </h3>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">
                                    ATS parsers look for these words from the job posting. Incorporate these into your skills and work descriptions:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {result.missingKeywords?.length > 0 ? (
                                        result.missingKeywords.map((kw, i) => (
                                            <span 
                                                key={i} 
                                                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-300 border border-red-200 dark:border-red-900/60"
                                            >
                                                + {kw}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                                            Excellent! No critical keywords missing from the provided description.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Matching Keywords */}
                            <div className="bg-white dark:bg-[#111622] rounded-3xl p-6 border border-gray-200 dark:border-slate-800">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                        <FaCheckCircle size={14} />
                                    </div>
                                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                                        Matching Keywords & Skills ({result.matchingSkills?.length || 0})
                                    </h3>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">
                                    Successfully detected in both your resume and the target role criteria:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {result.matchingSkills?.length > 0 ? (
                                        result.matchingSkills.map((sk, i) => (
                                            <span 
                                                key={i} 
                                                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60"
                                            >
                                                ✓ {sk}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-xs text-gray-400">No direct matches detected.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Formatting & Parser Diagnostics */}
                        {result.formatCheck && (
                            <div className="bg-white dark:bg-[#111622] rounded-3xl p-6 border border-gray-200 dark:border-slate-800">
                                <div className="flex items-center gap-2 mb-4">
                                    <FaListCheck size={16} className="text-emerald-600 dark:text-emerald-400" />
                                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                                        ATS Formatting Diagnostics
                                    </h3>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                                    <div className="flex items-center gap-2">
                                        {result.formatCheck.hasContactInfo ? <FaCheckCircle className="text-emerald-500" /> : <FaTimesCircle className="text-red-500" />}
                                        <span className="text-gray-700 dark:text-slate-300">Contact Details Found</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {result.formatCheck.hasActionVerbs ? <FaCheckCircle className="text-emerald-500" /> : <FaTimesCircle className="text-red-500" />}
                                        <span className="text-gray-700 dark:text-slate-300">Strong Action Verbs</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {result.formatCheck.hasQuantifiableMetrics ? <FaCheckCircle className="text-emerald-500" /> : <FaTimesCircle className="text-red-500" />}
                                        <span className="text-gray-700 dark:text-slate-300">Quantifiable Metrics</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {result.formatCheck.bulletPointsReadable ? <FaCheckCircle className="text-emerald-500" /> : <FaTimesCircle className="text-red-500" />}
                                        <span className="text-gray-700 dark:text-slate-300">Clean Bullet Formatting</span>
                                    </div>
                                </div>
                                {result.formatCheck.notes && (
                                    <p className="mt-3 text-xs text-gray-500 dark:text-slate-400">
                                        Note: {result.formatCheck.notes}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Bullet Point Optimization Suggestions */}
                        {result.bulletImprovements?.length > 0 && (
                            <div className="bg-white dark:bg-[#111622] rounded-3xl p-6 border border-gray-200 dark:border-slate-800">
                                <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4">
                                    Suggested Bullet Point Rewrites
                                </h3>
                                <div className="space-y-4">
                                    {result.bulletImprovements.map((item, i) => (
                                        <div key={i} className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/60 border border-gray-200 dark:border-slate-800 text-xs md:text-sm">
                                            <div className="mb-2">
                                                <span className="font-semibold text-red-500">Original: </span>
                                                <span className="text-gray-600 dark:text-slate-400 italic">"{item.original}"</span>
                                            </div>
                                            <div className="mb-2">
                                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Improved: </span>
                                                <span className="text-gray-900 dark:text-slate-200 font-medium">"{item.improved}"</span>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-slate-400">
                                                <span className="font-semibold">Why this works: </span>{item.reason}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actionable Tips */}
                        <div className="bg-white dark:bg-[#111622] rounded-3xl p-6 border border-gray-200 dark:border-slate-800">
                            <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4">
                                Prioritized Actionable Recommendations
                            </h3>
                            <ul className="space-y-2.5">
                                {(result.actionableTips || []).map((tip, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-gray-700 dark:text-slate-300">
                                        <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                            {idx + 1}
                                        </span>
                                        <span>{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </main>

            {showAuth && (
                <AuthModel 
                    onClose={() => setShowAuth(false)} 
                    titleBadge="ATS Score Check"
                    description="Sign in to check your resume ATS score, get AI keyword suggestions, and unlock detailed performance insights."
                />
            )}
        </div>
    );
}

export default AtsCheckPage;
