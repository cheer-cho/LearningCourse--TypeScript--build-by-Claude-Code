// Maintenance tool (used by the instructor, not part of the course):
// extracts every ```ts code block from each module's LESSON.md and
// type-checks it with the course tsconfig (all strict flags on).
//
//   npm run verify:lessons          -> verify every module's lesson
//   npm run verify:lessons -- 05    -> verify one module's lesson
//
// Rules a lesson block must follow:
//   - A block is compiled as its own module file (`export {}` is appended),
//     so each block must be self-contained: declare what it uses.
//   - A comment line containing ❌ marks the NEXT code line as one that
//     MUST produce a compile error. If the ❌ sits at the end of a line
//     that also has code, that line itself is the expected error.
//   - Every other line MUST compile cleanly.
//   - ```ts skip     -> the block is shown but not compiled (pseudo-code).
//   - ```ts continue -> the block is appended to the previous block's file
//                       (so it can reuse that block's declarations).
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const arg = process.argv[2]

const moduleDirs = readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^\d{2}-/.test(d.name))
  .map((d) => d.name)
  .sort()

let selected = moduleDirs
if (arg) {
  const wanted = /^\d+$/.test(arg) ? arg.padStart(2, '0') + '-' : arg
  selected = moduleDirs.filter((d) => d.startsWith(wanted))
  if (selected.length === 0) {
    console.error(`No module matches "${arg}".`)
    process.exit(1)
  }
}

// ---------- 1. extract blocks ----------

/**
 * @typedef {{ file: string, mod: string, index: number, lessonLine: number,
 *   lines: string[], expected: Set<number> }} Block
 */

/** @returns {Block[]} */
function extractBlocks(mod) {
  const lessonPath = path.join(root, mod, 'LESSON.md')
  if (!existsSync(lessonPath)) return []
  const src = readFileSync(lessonPath, 'utf8').split('\n')
  /** @type {Block[]} */
  const blocks = []
  let inFence = false
  let fenceInfo = ''
  let current = null
  for (let i = 0; i < src.length; i++) {
    const line = src[i]
    const fence = line.match(/^```(.*)$/)
    if (fence && !inFence) {
      inFence = true
      fenceInfo = fence[1].trim()
      const [lang, ...flags] = fenceInfo.split(/\s+/)
      if ((lang === 'ts' || lang === 'typescript') && !flags.includes('skip')) {
        if (flags.includes('continue') && blocks.length > 0) {
          current = blocks[blocks.length - 1]
          current.lines.push('') // visual separator, keeps line math simple
          current.segments.push({ lessonLine: i + 2, startLine: current.lines.length + 1 })
        } else {
          current = { mod, index: blocks.length + 1, lines: [], expected: new Set(), segments: [{ lessonLine: i + 2, startLine: 1 }] }
          blocks.push(current)
        }
      } else {
        current = null
      }
      continue
    }
    if (fence && inFence) {
      inFence = false
      current = null
      continue
    }
    if (inFence && current) current.lines.push(line)
  }
  for (const b of blocks) markExpected(b)
  return blocks
}

/** Decide which lines of a block must error, from ❌ markers. */
function markExpected(block) {
  const { lines } = block
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!line.includes('❌')) continue
    const codePart = line.replace(/\/\/.*$/, '').replace(/\/\*.*?\*\//g, '').trim()
    if (codePart.length > 0) {
      block.expected.add(i + 1)
      continue
    }
    // marker on a comment line: the next non-blank, non-comment line
    for (let j = i + 1; j < lines.length; j++) {
      const t = lines[j].trim()
      if (t === '' || t.startsWith('//') || t.startsWith('*') || t.startsWith('/*')) continue
      block.expected.add(j + 1)
      break
    }
  }
}

// ---------- 2. write files ----------

const verifyDir = path.join(root, `.verify-lessons-${process.pid}`)
rmSync(verifyDir, { recursive: true, force: true })
mkdirSync(verifyDir)
symlinkSync(path.join(root, 'node_modules'), path.join(verifyDir, 'node_modules'), 'dir')

/** @type {Block[]} */
const allBlocks = []
for (const mod of selected) {
  const blocks = extractBlocks(mod)
  mkdirSync(path.join(verifyDir, mod))
  for (const b of blocks) {
    b.file = path.join(verifyDir, mod, `block${String(b.index).padStart(2, '0')}.ts`)
    writeFileSync(b.file, b.lines.join('\n') + '\nexport {}\n')
    allBlocks.push(b)
  }
}

const base = JSON.parse(readFileSync(path.join(root, 'tsconfig.json'), 'utf8'))
writeFileSync(
  path.join(verifyDir, 'tsconfig.json'),
  JSON.stringify(
    {
      compilerOptions: { ...base.compilerOptions, noEmit: true, pretty: false },
      include: ['**/*.ts'],
      exclude: ['node_modules'],
    },
    null,
    2,
  ),
)

// ---------- 3. run tsc ----------

const tsc = spawnSync('npx', ['tsc', '-p', path.join(verifyDir, 'tsconfig.json')], {
  cwd: verifyDir,
  encoding: 'utf8',
})
const output = (tsc.stdout ?? '') + (tsc.stderr ?? '')

/** @type {Map<string, Map<number, string[]>>} file -> line -> messages */
const actual = new Map()
for (const raw of output.split('\n')) {
  const m = raw.match(/^(.+?)\((\d+),\d+\): error (TS\d+: .*)$/)
  if (!m) continue
  const file = path.resolve(verifyDir, m[1])
  const line = Number(m[2])
  if (!actual.has(file)) actual.set(file, new Map())
  const byLine = actual.get(file)
  if (!byLine.has(line)) byLine.set(line, [])
  byLine.get(line).push(m[3])
}

// ---------- 4. compare ----------

function lessonLineOf(block, blockLine) {
  let seg = block.segments[0]
  for (const s of block.segments) if (s.startLine <= blockLine) seg = s
  return seg.lessonLine + (blockLine - seg.startLine)
}

let failures = 0
let checked = 0
const perModule = new Map()
for (const b of allBlocks) {
  checked++
  perModule.set(b.mod, (perModule.get(b.mod) ?? 0) + 1)
  const got = actual.get(b.file) ?? new Map()
  const problems = []
  for (const line of b.expected) {
    if (!got.has(line)) problems.push(`  line ${lessonLineOf(b, line)}: expected a compile error (❌) but it compiled:\n      ${b.lines[line - 1].trim()}`)
  }
  for (const [line, msgs] of got) {
    if (!b.expected.has(line)) {
      const src = b.lines[line - 1] ?? '(export {} footer)'
      problems.push(`  line ${lessonLineOf(b, line)}: unexpected error\n      ${src.trim()}\n      ${msgs.join('\n      ')}`)
    }
  }
  if (problems.length > 0) {
    failures++
    console.log(`\n✗ ${b.mod}/LESSON.md block ${b.index} (starts at line ${b.segments[0].lessonLine})`)
    for (const p of problems) console.log(p)
  }
}

rmSync(verifyDir, { recursive: true, force: true })

console.log('')
for (const mod of selected) {
  const n = perModule.get(mod) ?? 0
  console.log(`${mod}: ${n} block${n === 1 ? '' : 's'} checked`)
}
if (failures === 0) {
  console.log(`\n✓ all ${checked} lesson code blocks verified`)
  process.exit(0)
}
console.log(`\n✗ ${failures} of ${checked} blocks have problems`)
process.exit(1)
