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

async function watch() {
    let ctx = await context({
        entryPoints: [entryPoint],
        bundle: true,
        outfile: `public/app-${path.basename(dir)}.js`,
        minify: false,
        sourcemap: true,
        target: 'esnext',
        platform: 'browser',
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
        loader: { '.tsx': 'tsx', '.ts': 'ts', '.jsx': 'jsx', '.js': 'js' },
        plugins: [
            {
                name: 'ignore-static',
                setup(build) {
                    build.onResolve({ filter: /^\/public\// }, (args) => {
                        return { external: true };
                    });
                }
            }
        ]
    });
    await ctx.watch();
    console.log('Watching...');
}

watch();