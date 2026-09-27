// Usage: npm run playground <name>
//   <name> may be "readonly-existant", "readonly-existant.ts",
//   or "playground/readonly-existant.ts".
// Type-checks the file first (tsx alone skips type errors), then runs it.
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { basename, join } from 'node:path'

const arg = process.argv[2]
if (!arg) {
  console.error('Usage: npm run playground <file>')
  process.exit(1)
}

let file = basename(arg)
if (!file.endsWith('.ts')) file += '.ts'
file = join('playground', file)

if (!existsSync(file)) {
  console.error(`Not found: ${file}`)
  process.exit(1)
}

const run = (cmd, args) =>
  spawnSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' })

console.log(`\n── typecheck ${file} ──`)
const check = run('npx', ['tsc', '--noEmit', '--strict', '--target', 'es2022',
  '--module', 'esnext', '--moduleResolution', 'bundler', file])
if (check.status !== 0) console.log('(type errors above — running anyway)')

console.log(`\n── run ${file} ──`)
const exec = run('npx', ['tsx', file])
process.exit(exec.status ?? 1)
