const fs = require('fs');
const path = require('path');

// Fix dashboard/page.js buttons
const dashPath = path.join(__dirname, 'src/app/dashboard/page.js');
let dashContent = fs.readFileSync(dashPath, 'utf8');

dashContent = dashContent.replace(/bg-white text-black hover:bg-zinc-200 text-white/g, 'bg-indigo-500 text-white hover:bg-indigo-600');
dashContent = dashContent.replace(/bg-white text-black hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-teal-400/g, 'bg-indigo-500 text-white hover:bg-indigo-600');
dashContent = dashContent.replace(/bg-white text-black text-white dark:bg-white dark:text-slate-950/g, 'bg-indigo-500 text-white hover:bg-indigo-600');

fs.writeFileSync(dashPath, dashContent);
console.log('Fixed dashboard buttons');

// Fix Sidebar.js
const sidebarPath = path.join(__dirname, 'src/components/common/Sidebar.js');
let sidebarContent = fs.readFileSync(sidebarPath, 'utf8');

sidebarContent = sidebarContent.replace(/>Cliniva<\/span>/, '>HAQMS</span>');
sidebarContent = sidebarContent.replace(/bg-\[var\(--primary\)\]/g, 'bg-indigo-500');

fs.writeFileSync(sidebarPath, sidebarContent);
console.log('Fixed Sidebar');

