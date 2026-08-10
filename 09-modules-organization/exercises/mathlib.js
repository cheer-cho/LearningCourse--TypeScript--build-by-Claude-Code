// Helper module for ex04 — complete, DO NOT EDIT.
// Untyped JavaScript. `allowJs` is off in this course, so the sibling
// mathlib.d.ts (which you edit) is the ONLY thing that gives the
// compiler this module's shape.

export function add(a, b) {
  return a + b
}

export function multiply(a, b) {
  return a * b
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export const VERSION = '2.1.0'
