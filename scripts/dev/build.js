import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';

const args = process.argv.slice(2);
const dirArgIndex = args.findIndex(arg => arg.startsWith('--dir='));

if (dirArgIndex === -1) {
  console.error('Error: You must specify the --dir=<directory> argument.');
  process.exit(1);
}

const dir = args[dirArgIndex].split('=')[1];
const entryPoint = path.join(dir, 'index.tsx');

// Check if the entry point exists
if (!fs.existsSync(entryPoint)) {
  console.error(`Error: Entry point "${entryPoint}" not found.`);
  process.exit(1);
}

esbuild.build({
  entryPoints: [entryPoint],
  bundle: true,
  outfile: `public/app-${path.basename(dir)}.js`,
  sourcemap: true, // Generate sourcemaps for easier debugging
  loader: {
    '.tsx': 'tsx', // Handle TSX files
    '.ts': 'ts',   // Handle TS files
    '.js': 'jsx',  // Handle JS files (could be JSX)
    '.css': 'css'  // Handle CSS files
  },
  minify: true, // Set to true for production builds
}).then(() => {
  console.log(`Build completed successfully for directory: ${dir}`);
}).catch((err) => {
  console.error(`Build failed: ${err.message}`);
  process.exit(1);
});
