// Review notes for checkpoint 5 — run: npx tsc --noEmit playground/05-checkpoint-review.ts

// ── 1. `String` vs `string` ───────────────────────────────────────────
function isStringWrapper(v: unknown): v is String {
  return typeof v === 'string'
}
function isStringPrimitive(v: unknown): v is string {
  return typeof v === 'string'
}
const input: unknown = "hello"
if (isStringWrapper(input)) {
  const a: string = input // error? String is not assignable to string
}
if (isStringPrimitive(input)) {
  const b: string = input // fine
}

// ── 2. a throwing arrow WITHOUT an annotation does not narrow ─────────
const throwErr = () => {
  throw new Error('x')
}
const throwErrTyped: () => never = () => {
  throw new Error('x')
}
const user: unknown = "ada"
function demoA() {
  if (typeof user !== 'string') throwErr()
  user.toUpperCase() // still unknown here?
}
function demoB() {
  if (typeof user !== 'string') throwErrTyped()
  user.toUpperCase() // narrowed to string here?
}

// ── 3. `'text' in msg` vs the tag ─────────────────────────────────────
type Chat = { type: 'chat'; user: string; text: string }
type Notice = { type: 'notice'; text: string }
type Msg = Chat | Notice
function isChatByField(m: Msg): m is Chat { return 'text' in m }
function isChatByTag(m: Msg): m is Chat { return m.type === 'chat' }
const notice: Msg = { type: 'notice', text: 'server restarting' }
console.log(isChatByField(notice), isChatByTag(notice))
