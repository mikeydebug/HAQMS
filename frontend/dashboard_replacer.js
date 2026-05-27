const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/app/dashboard/page.js');
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('AnimatePresence')) {
  content = content.replace(
    "import { useRouter } from 'next/navigation';",
    "import { useRouter } from 'next/navigation';\nimport { AnimatePresence } from 'framer-motion';\nimport PageTransition from '@/components/animations/PageTransition';"
  );
}

content = content.replace(
  "{/* Global Notifications Panel */}",
  "<AnimatePresence mode=\"wait\">\n        {/* Global Notifications Panel */}"
);

content = content.replace(
  "      </main>",
  "      </AnimatePresence>\n      </main>"
);

const tabs = ['patients', 'book', 'appointments', 'queue', 'reports', 'physicians'];
for (const tab of tabs) {
  const openRe = new RegExp(`{activeTab === '${tab}' && \\(`, 'g');
  content = content.replace(openRe, `{activeTab === '${tab}' && (\n          <PageTransition transitionKey="${tab}">`);
}

// Manually replace the closing tags for each tab block.
// Each block ends with `)}` and is followed by the next comment or `</AnimatePresence>`.
// I will just use a regex to find all `        )}\n` that correspond to the end of a block.
// Since the indentation for the tab closing is 8 spaces: `        )}`
content = content.replace(/        \)}\n/g, "          </PageTransition>\n        )}\n");

fs.writeFileSync(file, content);
console.log('Replaced successfully');
