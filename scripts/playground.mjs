// Usage: npm run playground <name>
//   <name> may be a path ("playground/03-objects-interfaces/ex03__split.ts")
//   or just a name ("ex03__split", "split") — it is searched for under
//   playground/<NN-module>/; a bare topic matches the "<prefix>__<topic>" file.
// Type-checks the file first (tsx alone skips type errors), then runs it.
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { basename, join } from 'node:path'

const arg = process.argv[2]
if (!arg) {
  console.error('Usage: npm run playground <file>')
  process.exit(1)
}

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)])

let file = arg.endsWith('.ts') ? arg : `${arg}.ts`
if (!existsSync(file)) {
  const name = basename(file)
  const all = walk('playground').filter((f) => f.endsWith('.ts'))
  let hits = all.filter((f) => basename(f) === name)
  if (hits.length === 0) hits = all.filter((f) => basename(f).endsWith(`__${name}`))
  if (hits.length !== 1) {
    console.error(hits.length ? `Ambiguous: ${arg}\n  ${hits.join('\n  ')}` : `Not found: ${arg}`)
    process.exit(1)
  }
  file = hits[0]
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
