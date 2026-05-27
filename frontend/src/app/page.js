'use client';

import Link from 'next/link';
import { Activity, ShieldAlert, MonitorPlay, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen justify-between py-12 px-6 lg:px-8 bg-[var(--background)] overflow-hidden selection:bg-indigo-500/30 selection:text-white">
      {/* Cliniva theme abstract background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none -z-10"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto w-full text-center mt-20 sm:mt-32 z-10"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-8 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          <Activity className="h-4 w-4 animate-pulse" />
          <span>Live Queue Tracking Enabled</span>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl font-semibold tracking-tighter text-white">
          HAQMS
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-xl sm:text-2xl font-medium mt-4 text-zinc-400 tracking-tight">
          Hospital Appointment & Queue Management
        </motion.p>
        
        <motion.p variants={itemVariants} className="mt-6 text-base text-zinc-500 max-w-lg mx-auto">
          A deliberately flawed reference application designed to evaluate engineering candidates. High-performance, scalable, and secure.
        </motion.p>

        {/* Action Cards */}
        <motion.div variants={containerVariants} className="mt-16 grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
          {/* Card 1: Staff Portal */}
          <Link href="/login" className="group block">
            <motion.div variants={itemVariants} className="cliniva-card p-6 text-left h-full group-hover:-translate-y-1 transition-transform">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/5 rounded-md border border-white/10 text-white">
                  <Users className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2 tracking-tight">
                Staff Portal
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Access the specialized dashboard. Supports role-based workflows for Administrators, Doctors, and Receptionists.
              </p>
            </motion.div>
          </Link>

          {/* Card 2: Public Queue Monitor */}
          <Link href="/queue" className="group block">
            <motion.div variants={itemVariants} className="cliniva-card p-6 text-left h-full group-hover:-translate-y-1 transition-transform">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/5 rounded-md border border-white/10 text-white">
                  <MonitorPlay className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2 tracking-tight">
                Live Public Monitor
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Real-time active queue board tracking patient check-ins and calling tokens by physician.
              </p>
            </motion.div>
          </Link>
        </motion.div>

        {/* Assessment Notice Box */}
        <motion.div variants={itemVariants} className="mt-24 border-t border-white/10 pt-8 max-w-xl mx-auto flex gap-4 text-left">
          <ShieldAlert className="h-5 w-5 text-zinc-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-zinc-300 text-sm">Assessment Environment Notice</h3>
            <p className="mt-1 text-zinc-500 text-xs leading-relaxed">
              This repository contains critical architectural, database performance, frontend memory, and security bugs. 
              Your evaluation criteria will measure your ability to identify, trace, profile, and fix these issues systematically.
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-center text-zinc-600 text-xs mt-12 z-10"
      >
        HAQMS &copy; {new Date().getFullYear()} Candidate Evaluation Framework.
      </motion.footer>
    </div>
  );
}
