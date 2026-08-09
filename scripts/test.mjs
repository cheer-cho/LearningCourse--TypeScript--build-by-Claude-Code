// Course test runner.
//   npm test           -> run every module
//   npm test -- 03     -> run module 03 only (also accepts "3" or "03-objects-interfaces")
// Extra vitest flags pass straight through: npm test -- 03 --reporter=verbose
import { spawnSync } from 'node:child_process'
import { readdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)

const moduleDirs = readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^\d{2}-/.test(d.name))
  .map((d) => d.name)
  .sort()

let vitestArgs = ['run']
const first = args[0]

if (first && !first.startsWith('-')) {
  const wanted = /^\d+$/.test(first) ? first.padStart(2, '0') + '-' : first
  const dir = moduleDirs.find((d) => d.startsWith(wanted))
  if (!dir) {
    console.error(`No module matches "${first}". Available modules:\n  ${moduleDirs.join('\n  ')}`)
    process.exit(1)
  }
  // Scope the type-checker to this module only, so TODOs in other
  // modules don't show up as failures while you work on this one.
  const scopedTsconfig = path.join(root, `.tsconfig.${dir.slice(0, 2)}.json`)
  writeFileSync(
    scopedTsconfig,
    JSON.stringify(
      { extends: './tsconfig.json', include: [`${dir}/**/*.ts`], exclude: ['node_modules', '.verify'] },
      null,
      2,
    ),
  )
  vitestArgs.push(dir, '--typecheck.tsconfig', scopedTsconfig, ...args.slice(1))
} else {
  vitestArgs.push(...args)
}

const result = spawnSync('npx', ['vitest', ...vitestArgs], { stdio: 'inherit', cwd: root, shell: false })
process.exit(result.status ?? 1)
