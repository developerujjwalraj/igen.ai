import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BsChevronDown } from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "General", "Interview Flow", "Credits & Pricing", "Privacy"]

  const faqs = [
    {
      category: "General",
      question: "What is igen.ai and how does it work?",
      answer: "igen.ai is an intelligent interview preparation platform powered by conversational AI. It simulates authentic mock interviews with dynamic follow-up questions, speech evaluation, real-time timer pressure, and deep rubrics covering technical accuracy, confidence, and articulation."
    },
    {
      category: "Interview Flow",
      question: "Can I customize the interview to my specific job role and resume?",
      answer: "Yes! In Step 1, you can select your target position (Frontend, Fullstack, Backend, Data Science, DevOps, HR, etc.), seniority level (Fresher, Mid, Senior), and upload your PDF resume. The AI will parse your skills and projects to ask targeted, role-specific questions."
    },
    {
      category: "Interview Flow",
      question: "How does the voice & speech recognition work?",
      answer: "igen.ai uses the browser's high-fidelity Speech-to-Text engine. You click the microphone button, speak naturally, and your voice is transcribed live into the answer box. You can review and edit your response before submitting it to the AI for evaluation."
    },
    {
      category: "Interview Flow",
      question: "What kind of feedback do I receive after answering?",
      answer: "After each answer, you receive immediate feedback highlighting strengths, missed nuances, and suggestions for improvement. Once the interview concludes, you get a full Analytics Dashboard with an overall score (out of 10), breakdown across confidence, correctness, and communication, plus a downloadable PDF report."
    },
    {
      category: "Credits & Pricing",
      question: "How do interview credits work?",
      answer: "Every new user receives free starter credits upon signing up. Each complete mock interview session consumes credits. You can easily replenish your credits anytime from the Pricing page via our secure Razorpay checkout."
    },
    {
      category: "Privacy",
      question: "Is my resume and audio data kept private and secure?",
      answer: "Absolutely. Your resume is parsed strictly to generate relevant questions during your active session, and your microphone input is processed directly without selling or sharing personal identifiable information with any third parties."
    },
    {
      category: "General",
      question: "Can I practice both Technical and Behavioral (HR) interviews?",
      answer: "Yes! igen.ai offers specialized interview modes including Technical deep-dives (algorithms, system design, architectural choices) and HR Behavioral questions (team conflict, leadership, STAR method scenarios)."
    },
    {
      category: "Credits & Pricing",
      question: "Can I review my past interview reports and analytics?",
      answer: "Yes! All your past sessions are permanently recorded in your 'Interview History' dashboard, complete with performance trends, score cards, and downloadable PDF reports so you can track your growth over time."
    }
  ]

  const filteredFaqs = selectedCategory === "All" 
    ? faqs 
    : faqs.filter(item => item.category === selectedCategory)

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className='mb-32 scroll-mt-24'>
      {/* Section Header */}
      <div className='text-center max-w-3xl mx-auto mb-12'>
        <div className='inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4'>
          <HiSparkles size={14} />
          Common Inquiries
        </div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight'>
          Frequently Asked{" "}
          <span className='text-emerald-600 dark:text-emerald-400'>Questions</span>
        </motion.h2>
        <p className='mt-4 text-gray-600 dark:text-slate-400 text-base md:text-lg'>
          Everything you need to know about using igen.ai to conquer your next interview.
        </p>
      </div>

      {/* Category Pills Filter */}
      <div className='flex flex-wrap justify-center gap-2 md:gap-3 mb-12'>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              selectedCategory === category
                ? "bg-black dark:bg-emerald-500 text-white dark:text-black shadow-md"
                : "bg-white dark:bg-[#111622] text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className='max-w-4xl mx-auto space-y-4'>
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen 
                  ? "bg-white dark:bg-[#111622] border-emerald-500/60 dark:border-emerald-500/50 shadow-md" 
                  : "bg-white dark:bg-[#111622] border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700"
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className='w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer'
              >
                <div className='flex items-center gap-4'>
                  <span className='shrink-0 w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-200 dark:border-emerald-800/60'>
                    Q{idx + 1}
                  </span>
                  <span className='font-semibold text-base md:text-lg text-gray-900 dark:text-white'>
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className='text-gray-400 dark:text-slate-400 shrink-0'
                >
                  <BsChevronDown size={18} />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className='overflow-hidden'
                  >
                    <div className='px-6 pb-6 pt-1 text-sm md:text-base text-gray-600 dark:text-slate-300 leading-relaxed border-t border-gray-100 dark:border-slate-800/80 mt-1 pl-18'>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default FAQ
