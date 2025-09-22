@echo off
echo Installing correct Tailwind CSS dependencies...
npm uninstall tailwind foundation-sites
npm install -D tailwindcss@^3.3.5 postcss@^8.4.31 autoprefixer@^10.4.16
echo Dependencies installed successfully!
echo Please restart your development server with: npm run dev
pause