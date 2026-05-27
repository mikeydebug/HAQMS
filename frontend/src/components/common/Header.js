'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { 
  Menu, Search, Maximize, Bell, Globe, LogOut 
} from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 cliniva-card border-t-0 border-l-0 border-r-0 rounded-none fixed top-0 right-0 left-64 z-40 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button className="text-[var(--muted-foreground)] hover:text-white transition-colors">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-[var(--muted-foreground)] hover:text-white transition-colors">
          <Search className="h-5 w-5" />
        </button>
        <button className="text-[var(--muted-foreground)] hover:text-white transition-colors hidden sm:block">
          <Maximize className="h-5 w-5" />
        </button>
        
        {/* Notifications */}
        <div className="relative">
          <button className="text-[var(--muted-foreground)] hover:text-white transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-[var(--card)]">
            3
          </span>
        </div>

        {/* Language (Mocked) */}
        <div className="hidden sm:flex items-center gap-2 cursor-pointer">
          <Globe className="h-4 w-4 text-[var(--muted-foreground)]" />
          <span className="text-sm font-semibold text-[var(--muted-foreground)]">ENG</span>
        </div>

        {/* Profile Dropdown Trigger */}
        <div className="flex items-center gap-3 pl-4 border-l border-[var(--border)]">
          <div className="flex flex-col items-end hidden md:flex">
            <span className="text-sm font-bold text-white">{user?.name || 'Guest'}</span>
            <span className="text-xs text-[var(--muted-foreground)] font-semibold">{user?.role || 'Visitor'}</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold overflow-hidden cursor-pointer">
            {user?.name?.charAt(0) || 'G'}
          </div>
          
          <button 
            onClick={logout}
            className="ml-2 text-rose-400 hover:text-rose-300 transition-colors p-1"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
