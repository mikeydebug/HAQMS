'use client';

import { motion } from 'framer-motion';

export default function WelcomeBanner({ name }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="cliniva-card relative overflow-hidden p-8 flex flex-col justify-center mb-6"
    >
      {/* Background abstract gradient blobs for depth */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 right-32 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2"></div>
      
      <div className="relative z-10 max-w-2xl">
        <h4 className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Welcome back</h4>
        <h1 className="text-4xl font-extrabold text-white mb-4">
          <span className="text-[var(--primary)]">{name}!</span>
        </h1>
        <p className="text-[var(--muted-foreground)] text-sm leading-relaxed max-w-xl">
          Your health journey and administrative dashboard are looking great. All your medical data, system analytics, and upcoming appointments are consolidated here for your convenience.
        </p>
      </div>

      {/* Placeholder for illustration since we don't have SVG assets */}
      <div className="absolute right-8 bottom-0 hidden md:flex items-end h-full">
        <div className="w-48 h-48 bg-gradient-to-t from-indigo-500/20 to-transparent rounded-t-full border-t border-indigo-500/30"></div>
      </div>
    </motion.div>
  );
}
