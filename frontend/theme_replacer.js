const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove Dashboard3D import and usage
  content = content.replace(/import Dashboard3D from '@\/components\/3d\/Dashboard3D';\n/g, '');
  content = content.replace(/<Dashboard3D \/>\n/g, '');

  // Swap glass and heavy borders for minimal-card
  content = content.replace(/glass/g, 'minimal-card');
  
  // Replace big borders with minimal borders
  content = content.replace(/border-slate-200 dark:border-slate-800/g, 'border-white/10');
  content = content.replace(/border-slate-300 dark:border-slate-700/g, 'border-white/10');
  content = content.replace(/border-slate-100 dark:border-slate-800/g, 'border-white/10');
  
  // Replace backgrounds
  content = content.replace(/bg-white\/50 dark:bg-slate-900\/50/g, 'bg-black text-white focus:border-white/30');
  content = content.replace(/bg-slate-500\/5/g, 'bg-white/5');
  content = content.replace(/bg-slate-50 dark:bg-slate-900\/50/g, 'bg-white/5');
  content = content.replace(/bg-slate-100 dark:bg-slate-800\/40/g, 'bg-white/5');
  content = content.replace(/bg-slate-900/g, 'bg-white text-black');
  
  // Replace text colors
  content = content.replace(/text-slate-800 dark:text-slate-100/g, 'text-white');
  content = content.replace(/text-slate-900 dark:text-slate-100/g, 'text-white');
  content = content.replace(/text-slate-800 dark:text-slate-200/g, 'text-white');
  content = content.replace(/text-slate-700 dark:text-slate-300/g, 'text-zinc-300');
  content = content.replace(/text-slate-500 dark:text-slate-400/g, 'text-zinc-400');
  content = content.replace(/text-slate-400/g, 'text-zinc-500');
  
  // Replace teal with white/zinc
  content = content.replace(/text-teal-600 dark:text-teal-400/g, 'text-white');
  content = content.replace(/text-teal-600/g, 'text-white');
  content = content.replace(/border-teal-500/g, 'border-white');
  content = content.replace(/bg-teal-500\/10/g, 'bg-white/10');
  content = content.replace(/bg-teal-500\/15/g, 'bg-white/10');
  content = content.replace(/bg-teal-500\/20/g, 'bg-white/10');
  content = content.replace(/bg-teal-500\/25/g, 'bg-white/10');
  content = content.replace(/bg-teal-600 hover:bg-teal-700/g, 'bg-white text-black hover:bg-zinc-200');
  content = content.replace(/bg-teal-500 text-white/g, 'bg-white text-black');
  content = content.replace(/bg-teal-500/g, 'bg-white');
  
  // Glow buttons to simple buttons
  content = content.replace(/glow-btn/g, 'transition-colors');
  
  fs.writeFileSync(filePath, content);
}

processFile(path.join(__dirname, 'src/app/dashboard/page.js'));
if (fs.existsSync(path.join(__dirname, 'src/components/common/Navbar.js'))) {
  processFile(path.join(__dirname, 'src/components/common/Navbar.js'));
}

console.log('Theme replaced successfully');
