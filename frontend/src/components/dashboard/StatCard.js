'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, trend, trendValue, iconBgColor }) {
  const isPositive = trend === 'up';

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="cliniva-card p-5 relative overflow-hidden group cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${iconBgColor || 'bg-indigo-500/20 text-indigo-400'}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-[var(--muted-foreground)] mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-xs font-semibold mt-4 pt-4 border-t border-[var(--border)]">
        <span className={`flex items-center gap-1 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {trendValue}
        </span>
        <span className="text-[var(--muted-foreground)]">Than Last Month</span>
      </div>
    </motion.div>
  );
}
