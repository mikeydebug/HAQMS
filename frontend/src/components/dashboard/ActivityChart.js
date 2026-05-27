'use client';

import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart
} from 'recharts';

const data = [
  { name: 'Mon', steps: 4000, calories: 120 },
  { name: 'Tue', steps: 6000, calories: 130 },
  { name: 'Wed', steps: 7000, calories: 110 },
  { name: 'Thu', steps: 3000, calories: 140 },
  { name: 'Fri', steps: 5000, calories: 125 },
  { name: 'Sat', steps: 8000, calories: 115 },
  { name: 'Sun', steps: 4000, calories: 100 },
];

export default function ActivityChart() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="cliniva-card p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Weekly Activity</h3>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span className="text-[var(--muted-foreground)]">Steps</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span className="text-[var(--muted-foreground)]">Calories</span>
          </div>
        </div>
      </div>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', color: 'white' }}
              itemStyle={{ color: 'white' }}
            />
            <Bar dataKey="steps" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={20} />
            <Line type="monotone" dataKey="calories" stroke="#f97316" strokeWidth={3} dot={{ r: 4, fill: '#f97316' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
