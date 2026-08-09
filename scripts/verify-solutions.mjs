// Maintenance tool (used by the instructor, not part of the course):
// copies the repo into .verify/, overlays every solutions/ file onto its
// exercise stub, and runs the full test suite there. All tests should be
// GREEN when run against the reference solutions.
//   npm run verify:solutions          -> verify all modules
//   npm run verify:solutions -- 03    -> verify one module
import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// Unique per process so parallel verifications don't collide.
const verifyDir = path.join(root, `.verify-${process.pid}`)
const arg = process.argv[2]

rmSync(verifyDir, { recursive: true, force: true })
mkdirSync(verifyDir)

for (const entry of readdirSync(root)) {
  if (entry === 'node_modules' || entry === '.git' || entry.startsWith('.verify')) continue
  cpSync(path.join(root, entry), path.join(verifyDir, entry), { recursive: true })
}
symlinkSync(path.join(root, 'node_modules'), path.join(verifyDir, 'node_modules'), 'dir')

const moduleDirs = readdirSync(verifyDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^\d{2}-/.test(d.name))
  .map((d) => d.name)
  .sort()

for (const mod of moduleDirs) {
  const solutions = path.join(verifyDir, mod, 'solutions')
  if (!existsSync(solutions)) continue
  for (const file of readdirSync(solutions)) {
    if (!file.endsWith('.ts')) continue
    const target =
      file === 'checkpoint.ts'
        ? path.join(verifyDir, mod, 'checkpoint.ts')
        : path.join(verifyDir, mod, 'exercises', file)
    cpSync(path.join(solutions, file), target)
  }
}

let vitestArgs = ['vitest', 'run']
if (arg) {
  const wanted = /^\d+$/.test(arg) ? arg.padStart(2, '0') + '-' : arg
  const dir = moduleDirs.find((d) => d.startsWith(wanted))
  if (!dir) {
    console.error(`No module matches "${arg}".`)
    process.exit(1)
  }
  const scoped = path.join(verifyDir, '.tsconfig.module.json')
  writeFileSync(
    scoped,
    JSON.stringify({ extends: './tsconfig.json', include: [`${dir}/**/*.ts`], exclude: ['node_modules'] }, null, 2),
  )
  vitestArgs.push(dir, '--typecheck.tsconfig', scoped)
}

const result = spawnSync('npx', vitestArgs, { stdio: 'inherit', cwd: verifyDir })
rmSync(verifyDir, { recursive: true, force: true })
process.exit(result.status ?? 1)
