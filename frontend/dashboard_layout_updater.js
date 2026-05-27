const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/app/dashboard/page.js');
let content = fs.readFileSync(file, 'utf8');

// 1. Swap Navbar for Sidebar and Header
content = content.replace("import Navbar from '@/components/common/Navbar';", "import Sidebar from '@/components/common/Sidebar';\nimport Header from '@/components/common/Header';");

// 2. Remove the old Navbar and Dashboard3D components in the render block
content = content.replace(/<Navbar \/>\n/g, "");

// 3. Inject Sidebar and Header and adjust main classes
const renderStartRe = /return \(\n\s*<div className="relative min-h-screen flex flex-col">/;
content = content.replace(renderStartRe, `return (
    <div className="min-h-screen bg-[var(--background)]">
      <Sidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
      <Header />`);

content = content.replace(/<main className="flex-1 max-w-7xl w-full mx-auto p-6 sm:p-8 relative z-10">/, '<main className="ml-64 pt-16 p-6 sm:p-8 relative z-10 max-w-7xl mx-auto">');

// 4. Remove the old inline tabs rendering!
// The old inline tabs start at {/* Navigation Tabs based on Role */} and end just before {/* Global Notifications Panel */}
// Let's use a regex to match from the comment to the end of the div holding the buttons.
const tabsRegex = /\{\/\* Navigation Tabs based on Role \*\/\}.*?<\/div>/s;
content = content.replace(tabsRegex, '');

fs.writeFileSync(file, content);
console.log('Dashboard layout updated');
