'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Activity, LayoutDashboard, CalendarDays, Pill, Stethoscope, 
  Receipt, TestTube2, Video, ShieldAlert, HeartPulse, 
  Users, FolderOpen, Settings, MessageSquare, Bell, Cross
} from 'lucide-react';

export default function Sidebar({ user, activeTab, setActiveTab }) {
  const navItems = [
    { id: 'reports', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', name: 'Appointments', icon: CalendarDays },
    { id: 'patients', name: 'Patients', icon: Users },
    { id: 'physicians', name: 'Physicians', icon: Stethoscope },
    { id: 'book', name: 'Book Appointment', icon: CalendarDays },
    { id: 'queue', name: 'Live Queue', icon: Activity },
    { id: 'prescriptions', name: 'Prescriptions', icon: Pill },
    { id: 'billing', name: 'Billing', icon: Receipt },
    { id: 'labs', name: 'Lab Reports', icon: TestTube2 },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-0 cliniva-card border-l-0 border-t-0 border-b-0 rounded-none z-50 flex flex-col overflow-y-auto">
      {/* Branding */}
      <div className="p-6 flex items-center gap-3 border-b border-[var(--border)]">
        <div className="bg-rose-500 text-white p-1.5 rounded-lg shadow-lg shadow-rose-500/20">
          <Activity className="h-6 w-6" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">HAQMS</span>
      </div>

      {/* User Profile Card */}
      {user && (
        <div className="p-6 flex flex-col items-center border-b border-[var(--border)]">
          <div className="w-20 h-20 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30 mb-3 overflow-hidden shadow-lg shadow-indigo-500/10">
            <span className="text-3xl font-extrabold">{user.name.charAt(0)}</span>
          </div>
          <h3 className="font-bold text-white">{user.name}</h3>
          <p className="text-xs text-[var(--muted-foreground)] font-semibold tracking-wider uppercase mt-1">{user.role}</p>
        </div>
      )}

      {/* Navigation Menu */}
      <div className="p-4 flex-1">
        <p className="text-xs font-bold text-[var(--muted-foreground)] mb-4 px-2 uppercase tracking-widest">Main</p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className="w-full text-left"
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive 
                        ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20' 
                        : 'text-[var(--muted-foreground)] hover:text-white hover:bg-[var(--muted)]'
                    }`}
                  >
                    <item.icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-[var(--muted-foreground)]'}`} />
                    {item.name}
                  </motion.div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
